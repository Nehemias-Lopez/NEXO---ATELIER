# NEXO---ATELIER

## NEXO M0.2 — Functional Local Planner

NEXO M0.2 is a mobile-first static planning tool for GitHub Pages. It works with pure HTML, CSS, and JavaScript: no backend, no API keys, no frameworks, and no external dependencies.

### What M0.2 does

- Captures an idea from the mobile textarea.
- Generates a local structured project plan using JavaScript keyword templates.
- Shows summary, main objective, target user, suggested MVP, 5 concrete tasks, tools, risks, next action, and a 7-day mini roadmap.
- Lets users check completed tasks and updates the completed counter live.
- Saves the last idea, generated plan, task completion state, counters, and last updated timestamp in `localStorage`.
- Restores the last saved plan after refresh.
- Exports the plan by copying it to the clipboard or downloading a `.txt` file.
- Resets all local project data from the app.

### Supported local templates

The planner detects simple keywords for:

- ecommerce / tienda / vender / producto
- app / software / plataforma
- música / beat / artista / EP
- contenido / TikTok / YouTube / redes
- construcción / casa / obra / diseño
- negocio / dinero / ingreso / libertad financiera
- default generic project

### Deployment

The repository includes `.github/workflows/static.yml` for GitHub Pages. The workflow validates the static files, prepares the `_site` artifact, and deploys on pushes to `main` or `master` while skipping deployment on pull requests.
