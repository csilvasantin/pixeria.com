# Guion — Vídeo explicativo ADcelerate (para NotebookLM Video Overview)

> Capa 3 (Infra) · Trinity · 2026-07-12
> Fuentes: README + docs/00-definicion.md + docs/01-diseno.md del repo privado `csilvasantin/adcelerate`,
> más el informe `informe-metahuman-crowds-adcelerate-2026-07-12.md`.

## 1. Cabecera

- **Título del vídeo**: «ADcelerate by Admira — el soporte que se activa solo»
- **Duración objetivo**: 3-5 minutos
- **Audiencia**: equipo Admira (interno) + socios/comerciales que necesitan explicar el producto sin jerga técnica
- **Tono**: claro, comercial-técnico, español de España, sin humo — se afirma solo lo que está probado o construido; lo que es hipótesis o roadmap se marca como tal
- **Idioma**: español de España en toda la narración

---

## 2. Guion por escenas

### Escena 1 — El problema: publicidad geo-contextual sin cookies, pero desde fuera
**Narración**: «La publicidad exterior lleva años prometiendo algo simple: mostrar el anuncio adecuado en el lugar adecuado, sin cookies. El problema es que casi todo el que hace esto hoy lo hace desde fuera de la pantalla. Miden el movimiento de la gente por la ciudad, pero no ven lo que pasa delante del soporte.»
**Qué se ve**: una ciudad nocturna estilizada con pantallas publicitarias encendidas (referencia visual: estética retro-futurista de ADcelerate, ciudad de neón); una flecha o icono que representa datos "flotando fuera" de las pantallas, sin tocarlas.

### Escena 2 — Cómo lo hacen los de fuera
**Narración**: «El referente español de este mercado es un spin-off de una consultora, con stack completo de publicidad programática geo-contextual: 21 millones de dispositivos, más de 15.000 apps, un data lake propio de telco y SDKs, DSP propio y medición drive-to-store validada por una auditora externa. Trabajan con clientes como Clear Channel, Havas, Ogilvy, Publicis, Vodafone o Telefónica.»
**Qué se ve**: infografía simple con las cifras (21M dispositivos, 15.000+ apps) y logos genéricos tipo "data lake telco → DSP → pantallas ajenas"; flujo de datos que entra desde fuera del soporte.

### Escena 3 — La tesis Admira: nosotros SOMOS el soporte
**Narración**: «Admira parte de un punto distinto: no medimos soportes ajenos, somos el soporte. Más de 40.000 pantallas y 250 proyectos en nuestro propio circuito. Eso significa que podemos cerrar el círculo completo con datos propios, sin cookies y sin intermediarios: detectamos la audiencia en la propia pantalla, activamos la campaña en el propio circuito y medimos la conversión en el propio punto de venta.»
**Qué se ve**: la misma ciudad de la escena 1, pero ahora las pantallas se iluminan desde dentro; aparece el lema «detecta → activa → mide» como eje visual que se repetirá en el resto del vídeo.

### Escena 4 — DETECTA: Analytics en la propia pantalla
**Narración**: «El primer paso es detectar. Admira Analytics mide audiencia real en el punto: tráfico, atención y perfiles, no datos inferidos desde fuera. Esa medición se organiza en GeoAudiencias First-Party: perfiles por punto, por zona, por franja horaria y por tipo de local, como un estanco, un kiosko o una tienda. Todo agregado y anónimo por diseño, sin cookies ni identificadores personales.»
**Qué se ve**: explorador visual tipo mapa con zonas y segmentos de audiencia (pantalla real de `audiencias.html` del prototipo ADcelerate); cámara del punto de venta detectando siluetas de forma agregada, sin rostros identificables.

### Escena 5 — ACTIVA: brief en lenguaje natural → paquete de pantallas
**Narración**: «El segundo paso es activar. El usuario describe la campaña en lenguaje natural o con un formulario, y el sistema propone un paquete: qué pantallas del circuito, qué creatividad, en qué franjas y con qué presupuesto. Se previsualiza sobre una pantalla simulada antes de activarla de verdad en el circuito, a través del CMS y el middleware programático que Admira ya tiene en marcha.»
**Qué se ve**: pantalla de `activacion.html` del prototipo: campo de texto con el brief, log tipo terminal generando el paquete paso a paso, previsualización de la creatividad en una pantalla simulada.

### Escena 6 — MIDE: drive-to-store y uplift
**Narración**: «El tercer paso es medir. El panel de drive-to-store compara la afluencia con campaña activa frente a sin ella, con un embudo y una gráfica de uplift. Es la misma metodología que el mercado valida con auditoras externas, pero con datos que nacen dentro del propio circuito, no de paneles de movilidad de terceros.»
**Qué se ve**: pantalla de `medicion.html`: gráfica con/sin campaña, ticker de cifras estilo Bloomberg, cifra de uplift destacada.

### Escena 7 — La fusión con el dato de las operadoras: la zona y el punto
**Narración**: «Hay un dato que Admira no tiene y que las operadoras sí: cuánta gente hay en una zona amplia de la ciudad. Orange, por ejemplo, ofrece este dato mediante Flux Vision, con una rejilla de 150 por 150 metros y franjas de 30 minutos; en España se contrata como proyecto, no como API abierta. Ese dato dice cuánta gente hay en la zona. Nuestra cámara del punto, en cambio, calibra exactamente lo que pasa en la plaza. Esa fusión, zona más punto, es el argumento de venta de ADcelerate.»
**Qué se ve**: mapa con una cuadrícula de 150x150 metros superpuesta sobre una plaza; dentro de esa cuadrícula, un círculo más pequeño que representa el alcance real de la cámara del kiosko, con la etiqueta "aquí calibramos".

### Escena 8 — La demo estrella: Plaça de la Vila de Gràcia en 3D
**Narración**: «La demostración que lo hace tangible es la Plaça de la Vila de Gràcia, en Barcelona. Se reconstruye la plaza en 3D, con el kiosko de prensa real en el centro: un player del circuito OOH Media que emite desde admira.tv y se vende a través de clearchannel.tv. La pantalla del kiosko reacciona en la escena a la audiencia que, según el dato de la operadora, pasa por la zona en cada franja horaria.»
**Qué se ve**: reconstrucción 3D estilizada de la plaza (referencia: proyectos de ciudad 3D interactiva tipo "Ciudad 2026"), con el kiosko como elemento central; un selector de franja horaria (08h / 13h / 18h / 22h) que cambia la afluencia representada y la campaña emitida en la pantalla del kiosko.

### Escena 9 — El roadmap: multitudes fotorrealistas
**Narración**: «Para representar esa afluencia de forma realista, se está explorando MetaHuman Crowds de Unreal Engine 5.8, capaz de mostrar cientos de personajes en móvil y miles en PC según Epic. Es una tecnología todavía experimental, por lo que el primer resultado será vídeo renderizado por franjas horarias, no una demo interactiva en vivo. Ese vídeo alimentará la página de activación de ADcelerate como material comercial.»
**Qué se ve**: comparación simple "renderizado offline" vs "interactivo en la nube"; clip corto (mock o placeholder) de una multitud estilizada moviéndose por una plaza hacia una pantalla.

### Escena 10 — Cierre con el lema
**Narración**: «Los demás miden el soporte desde fuera. Admira es el soporte. ADcelerate cierra el círculo: detecta, activa y mide, con datos propios, sin cookies y sin intermediarios.»
**Qué se ve**: vuelve la ciudad de neón de la escena 1, ahora completamente iluminada desde dentro; aparece el lema «detecta → activa → mide» a pantalla completa junto con el nombre ADcelerate by Admira.

---

## 3. Instrucciones para NotebookLM

Al generar el Video Overview en NotebookLM, usar como instrucciones de personalización:
«Genera el vídeo en español de España, con una duración de entre 3 y 5 minutos. Enfócate en la tesis central: Admira es el soporte propio (no un intermediario de datos externos) y cierra el ciclo detecta-activa-mide con datos first-party. Da protagonismo visual al contraste entre el modelo "desde fuera" del mercado y el modelo "desde dentro" de Admira, y dedica un bloque claro a la demo de la Plaça de la Vila de Gràcia como cierre práctico. Tono claro y comercial-técnico, sin tecnicismos innecesarios, sin inventar cifras que no estén en las fuentes.»

---

## 4. Fuentes usadas

- `gh api repos/csilvasantin/adcelerate/readme` (README del repo privado `csilvasantin/adcelerate`)
- `gh api repos/csilvasantin/adcelerate/contents/docs/00-definicion.md` (definición de producto, tesis, referente de mercado, activos Admira, módulos, roadmap)
- `gh api repos/csilvasantin/adcelerate/contents/docs/01-diseno.md` (sistema de diseño, contrato de 3 vistas, estética retro-futurista)
- `/Users/csilvasantin/Claude/agents-notes/informe-metahuman-crowds-adcelerate-2026-07-12.md` (MetaHuman Crowds UE 5.8, dato Orange Flux Vision, MITMA, plan D1-D5 de la demo Plaça de la Vila de Gràcia)
