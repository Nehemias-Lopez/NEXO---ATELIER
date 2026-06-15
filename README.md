# NEXO---ATELIER

## NEXO v0.3 — Apple-style feedback-ready prototype

NEXO v0.3 is a premium mobile-first static web app that helps a user turn an idea into a useful project plan directly from an iPhone or Android browser.

The project remains simple and GitHub Pages friendly:

- Pure `HTML`, `CSS`, and `JavaScript`.
- No backend, API keys, frameworks, build tools, or external dependencies.
- Local plan generation with JavaScript keyword templates.
- `localStorage` persistence for the last idea, generated plan, task completion state, custom tools, counters, and saved timestamp.
- Copy-to-clipboard, `.txt` download, reset, bottom navigation, and custom tool creation.

### v0.3 improvements

- Apple-inspired interface with soft glass cards, rounded corners, subtle shadows, premium system typography, and adaptive light/dark styling.
- Working navigation for Inicio, Idea, Plan, Builder, and Tools.
- Working buttons for Capturar idea, Ver plan, Generar plan, Reiniciar, Copiar plan, Descargar `.txt`, and Añadir tool.
- Readable structured plans in Spanish with summary, objective, target user, MVP, 5 tasks, recommended tools, risks, next action, and 7-day roadmap.
- Mobile-first layout designed to avoid horizontal overflow on small screens.

### Manual test steps

1. Open `index.html` locally or from GitHub Pages on a phone-sized viewport.
2. Tap **Capturar idea** in the hero and confirm it scrolls to the idea form.
3. Type: `Quiero vender plantillas digitales desde mi teléfono`.
4. Tap **Generar plan** and confirm NEXO scrolls to **Plan generado**.
5. Confirm the plan includes summary, objective, user, MVP, 5 tasks, tools, risks, next action, and a 7-day roadmap.
6. Check one task and confirm the completed counter updates.
7. Tap **Copiar plan** and **Descargar .txt**.
8. Add a custom tool in **Tools** with **Añadir** and confirm it appears in the list.
9. Refresh the page and confirm the idea, plan, tools, counters, and saved status persist.
10. Tap **Reiniciar** and confirm local state and UI reset.

### Deployment

The repository includes `.github/workflows/static.yml` for GitHub Pages. The workflow validates required static files, prepares the `_site` artifact, and deploys on pushes to `main` or `master` while skipping deployment on pull requests.
