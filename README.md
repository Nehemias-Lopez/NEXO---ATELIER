# NEXO---ATELIER

## NEXO M0.3 — Mobile Execution Builder

NEXO M0.3 turns the static planner into a more useful local execution tool. It still works with pure HTML, CSS, and JavaScript on GitHub Pages: no backend, no API keys, no frameworks, and no external dependencies.

### Product direction

NEXO is not a chatbot. NEXO is a creation operating system that helps a user move through:

`IDEA → ENTENDER → PLANIFICAR → CONSTRUIR → EJECUTAR → MEJORAR`

M0.3 keeps that flow lightweight and local so someone can start from a phone and leave with a plan plus resources they can act on immediately.

### What M0.3 does

- Captures an idea from the mobile textarea.
- Generates a local structured project plan using JavaScript keyword templates.
- Shows summary, main objective, target user, suggested MVP, 5 concrete tasks, tools, risks, next action, and a 7-day mini roadmap.
- Adds an Execution Pack with a project brief, validation checklist, construction prompt, and feedback message.
- Lets users check completed tasks and updates the completed counter live.
- Saves the last idea, generated plan, task completion state, counters, execution resources, and last updated timestamp in `localStorage`.
- Restores the last saved plan after refresh.
- Exports the full plan by copying it to the clipboard or downloading a `.txt` file.
- Lets users copy individual execution resources.
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

The repository includes `.github/workflows/pages.yml` for GitHub Pages. The workflow validates the static files, prepares the `_site` artifact, and deploys on pushes to `main` or `master` while skipping deployment on pull requests.
