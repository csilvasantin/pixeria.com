# pixeria.com

**Personal configuration and environment repository** for [Carlos Silva](https://github.com/csilvasantin) / [PixerIA](https://pixeria.com).

> **⚠️ Warning**
>
> This repository is initialized directly in the user's home directory (`~`).
> **Do not clone this repository** with `git clone` over an existing home folder — it will overwrite files.
>
> This is a **selective configuration backup** repo, not a full dotfiles management system.

## Purpose

- Version control of selected shell, editor, and tool configurations
- Backup of important environment setup for PixerIA development
- Quick restoration across machines

## What's Tracked

Only explicitly added files and directories are versioned. A comprehensive `.gitignore` excludes:

- All PixerIA / Pixer.ai source code and builds
- Caches, node_modules, Python venvs, build artifacts
- Secrets, SSH private keys, credentials, tokens
- Large media folders (Downloads, Pictures, Movies, etc.)
- macOS system files and Trash

## Key Ignored Areas (PixerIA-specific)

```gitignore
PixerIA/
PixerIA-*/
*pixer*
Pixer.ai/
pixer-worker/
**/PixerIA/**
**/Pixer/**
```

## Getting Started (for the owner)

```bash
# After fresh install, you can selectively restore files:
git checkout -- .zshrc
git checkout -- .config/some-tool
```

## License

Private configuration — all rights reserved.
