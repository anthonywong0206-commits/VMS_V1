# Volunteer Hours Management System - Vercel Static Build

This folder is the Vercel-safe static version.

Deploy only these files:

- `index.html`
- `vercel.json`
- `README.md`

Vercel project settings:

- Framework Preset: `Other`
- Build Command: leave empty
- Install Command: leave empty
- Output Directory: `.`

Do not include `package.json`, lockfiles, `vite.config.js`, `src/`, or `node_modules` in this static deployment. Those files make Vercel run an install/build step, which can fail if a lockfile points to a private or internal npm registry.


## 2026-06-17 更新

- Added Excel-compatible `.xls` export for Service Hours Record and Allowance Receipt.
- Updated report preview and print/PDF layout to better match the uploaded official templates.
- Keep deployment static: only `index.html`, `vercel.json`, and `README.md` are required.
