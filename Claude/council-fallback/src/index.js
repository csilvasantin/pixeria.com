/* ============================================================================
 * council-fallback — 3er nivel del failover del Consejo (Cloudflare, degradado)
 * ----------------------------------------------------------------------------
 * Último recurso SOLO-LECTURA cuando el Mac Mini (primario) Y el respaldo local
 * (este Mac, :10000) están caídos. Vive en el edge (dominio propio
 * fallback.admira.store, no bloqueado por el ISP ES). Responde a los endpoints
 * que la web del Consejo necesita para no quedarse muerta, marcando degraded:true.
 * Si hay snapshots en KV (claves snap:tasks / snap:feed, que un día empujaríamos
 * desde el Mini/este Mac), sirve el último estado conocido; si no, vacío con aviso.
 * ========================================================================== */
'use strict';

const ROSTER = [
  ['Neo', 'CEO', 'Elon Musk'], ['Morfeo', 'CTO', 'Jensen Huang'],
  ['Trinity', 'COO', 'Gwynne Shotwell'], ['Oráculo', 'CFO', 'Ruth Porat'],
  ['Mouse', 'CCO', 'John Lasseter'], ['Arquitecto', 'CDO', 'Jony Ive'],
  ['Link', 'CXO', 'Carlos Ratti'], ['Cypher', 'CSO', 'Ryan Reynolds'],
  ['Smith', 'Soporte', 'Agent Smith'],
];
const NOTE = '⚠️ Modo degradado (Cloudflare): el Mac Mini y el respaldo local están caídos. Datos de solo-lectura / último estado conocido.';

function cors(h) {
  h.set('access-control-allow-origin', '*');
  h.set('access-control-allow-methods', 'GET,POST,OPTIONS');
  h.set('access-control-allow-headers', 'Content-Type, Authorization, X-Council-Token, X-Fleet-Token, X-Agora-Panel-Key, X-Council-Hack-Token');
  h.set('vary', 'Origin');
}
function J(obj, status) {
  const h = new Headers({ 'content-type': 'application/json; charset=utf-8' });
  cors(h);
  return new Response(JSON.stringify(obj), { status: status || 200, headers: h });
}
async function snap(env, key, fallback) {
  try { if (env.FALLBACK_KV) { const v = await env.FALLBACK_KV.get('snap:' + key); if (v) return JSON.parse(v); } } catch (e) {}
  return fallback;
}

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') { const h = new Headers(); cors(h); return new Response(null, { status: 204, headers: h }); }
    const url = new URL(req.url);
    const p = url.pathname;

    if (p === '/' || p === '/health' || p === '/__fallback/health')
      return J({ ok: true, service: 'council-fallback', degraded: true, note: NOTE, comic: env.OPENAI_API_KEY ? 'gpt-image-1' : 'sin-key' });

    // Enviar el cómic (imagen b64) al grupo de Telegram (AdmiraXP) vía el bot del grupo.
    if (p === '/comic-telegram' && req.method === 'POST') {
      const token = env.TELEGRAM_GROUP_TOKEN, chat = env.GROUP_CHAT_ID;
      if (!token || !chat) return J({ ok: false, error: 'sin token/chat de grupo' }, 500);
      let body; try { body = await req.json(); } catch (e) { return J({ ok: false, error: 'json inválido' }, 400); }
      const b64 = (body && body.b64 || '').replace(/^data:[^,]+,/, '');
      if (!b64) return J({ ok: false, error: 'sin imagen' }, 400);
      try {
        const bin = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
        const fd = new FormData();
        fd.append('chat_id', chat);
        if (body.caption) fd.append('caption', String(body.caption).slice(0, 1000));
        fd.append('photo', new Blob([bin], { type: 'image/png' }), 'comic-consejo.png');
        const r = await fetch('https://api.telegram.org/bot' + token + '/sendPhoto', { method: 'POST', body: fd });
        const d = await r.json();
        return d.ok ? J({ ok: true, message_id: d.result.message_id }) : J({ ok: false, error: d.description || 'telegram error' }, 502);
      } catch (e) { return J({ ok: false, error: String((e && e.message) || e) }, 502); }
    }

    // Enviar el VÍDEO del cómic al grupo de Telegram (AdmiraXP). Descarga el mp4 (URL pública,
    // p.ej. vidgen.x.ai de Grok) y lo sube con sendVideo (más fiable que pasarle la URL a Telegram).
    if (p === '/comic-telegram-video' && req.method === 'POST') {
      const token = env.TELEGRAM_GROUP_TOKEN, chat = env.GROUP_CHAT_ID;
      if (!token || !chat) return J({ ok: false, error: 'sin token/chat de grupo' }, 500);
      let body; try { body = await req.json(); } catch (e) { return J({ ok: false, error: 'json inválido' }, 400); }
      const videoUrl = body && (body.url || body.videoUrl);
      if (!videoUrl) return J({ ok: false, error: 'sin url de vídeo' }, 400);
      try {
        const vr = await fetch(String(videoUrl));
        if (!vr.ok) return J({ ok: false, error: 'no pude descargar el vídeo (HTTP ' + vr.status + ')' }, 502);
        const buf = await vr.arrayBuffer();
        const fd = new FormData();
        fd.append('chat_id', chat);
        if (body.caption) fd.append('caption', String(body.caption).slice(0, 1000));
        fd.append('video', new Blob([buf], { type: 'video/mp4' }), 'comic-consejo.mp4');
        const r = await fetch('https://api.telegram.org/bot' + token + '/sendVideo', { method: 'POST', body: fd });
        const d = await r.json();
        return d.ok ? J({ ok: true, message_id: d.result.message_id }) : J({ ok: false, error: d.description || 'telegram error' }, 502);
      } catch (e) { return J({ ok: false, error: String((e && e.message) || e) }, 502); }
    }

    // Cómic de la reunión con gpt-image-1 (OpenAI). Sin key → needKey (la web cae a SVG).
    if (p === '/comic' && req.method === 'POST') {
      if (!env.OPENAI_API_KEY) return J({ ok: false, needKey: true, error: 'sin OPENAI_API_KEY en el worker' });
      let body; try { body = await req.json(); } catch (e) { return J({ ok: false, error: 'json inválido' }, 400); }
      const prompt = (body && body.prompt || '').slice(0, 4000);
      if (!prompt) return J({ ok: false, error: 'prompt vacío' }, 400);
      try {
        const r = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + env.OPENAI_API_KEY },
          body: JSON.stringify({ model: 'gpt-image-1', prompt, size: '1536x1024', n: 1 }),
        });
        const d = await r.json();
        if (!r.ok) return J({ ok: false, error: (d.error && d.error.message) || ('HTTP ' + r.status) }, 502);
        const b64 = d.data && d.data[0] && d.data[0].b64_json;
        if (!b64) return J({ ok: false, error: 'sin imagen en la respuesta' }, 502);
        return J({ ok: true, b64 });
      } catch (e) { return J({ ok: false, error: String((e && e.message) || e) }, 502); }
    }

    // Ingesta de snapshots desde el respaldo local (este Mac), protegida por token.
    // Cuerpo: {tasks?, feed?, assignees?} → guarda snap:<clave> en KV.
    if (p === '/snap' && req.method === 'POST') {
      if (!env.SNAP_TOKEN || req.headers.get('x-snap-token') !== env.SNAP_TOKEN)
        return J({ ok: false, error: 'token requerido' }, 401);
      if (!env.FALLBACK_KV) return J({ ok: false, error: 'sin KV' }, 500);
      let body; try { body = await req.json(); } catch (e) { return J({ ok: false, error: 'json inválido' }, 400); }
      const wrote = [];
      for (const k of ['tasks', 'feed', 'assignees']) {
        if (body && body[k] !== undefined) { await env.FALLBACK_KV.put('snap:' + k, JSON.stringify(body[k]), { expirationTtl: 86400 }); wrote.push(k); }
      }
      await env.FALLBACK_KV.put('snap:at', String(Date.now()));
      return J({ ok: true, wrote });
    }

    if (p === '/api/council/health') {
      const bots = ROSTER.map(([id, role, persona]) => ({
        id, label: id + ' · ' + role, persona, role,
        online: false, host: null, sessions: [], lastSeen: null, lastTask: null,
      }));
      return J({ ok: true, degraded: true, note: NOTE, bots, fetchedAt: new Date().toISOString() });
    }
    if (p === '/api/council/tasks')
      return J({ ok: true, degraded: true, note: NOTE, tasks: await snap(env, 'tasks', []), fetchedAt: new Date().toISOString() });
    if (p === '/api/council/assignees')
      return J({ ok: true, degraded: true, assignees: await snap(env, 'assignees', []) });
    if (p === '/api/agora/coetaneos' || p === '/api/agora/status')
      return J({ ok: true, degraded: true, feed: await snap(env, 'feed', [NOTE]), who: [] });
    if (p === '/api/council/health' || p === '/api/council/heartbeat')
      return J({ ok: true, degraded: true });

    if (p === '/fleet/api/health')
      return J({ ok: true, service: 'fleet-fallback', degraded: true, machines: 3, note: NOTE });
    if (p === '/fleet/api/status') {
      const machines = [
        { id: 'macmini', name: 'Mac Mini', emoji: '🖥️', role: 'Hub central', online: false, info: 'sin datos (degradado)' },
        { id: 'mbp16', name: 'MacBook Pro 16', emoji: '💻', role: 'Respaldo', online: false, info: 'sin datos (degradado)' },
        { id: 'mbp14', name: 'MacBook Pro 14', emoji: '💻', role: 'Pruebas', online: false, info: 'sin datos (degradado)' },
      ];
      return J({ ok: true, degraded: true, note: NOTE, machines, ts: Date.now() });
    }

    // Escrituras: no hay backend que ejecute → 200 degradado para no romper la UI.
    if (req.method === 'POST')
      return J({ ok: false, degraded: true, error: 'modo degradado (Cloudflare): sin backend para ejecutar. Reintenta cuando vuelva el Mini o el respaldo local.' });

    return J({ ok: false, degraded: true, note: NOTE, error: 'endpoint no disponible en modo degradado' });
  },
};
