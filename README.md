# NEXO---ATELIER

## NEXO Engine v1 — local project operating system


NEXO Engine v1 turns the prototype into a usable local creation engine. A user can enter an idea, receive a developed project plan, keep a history of idea cards, mark each idea public or private, chat with the selected project, complete tasks, and copy a clean share summary.

### v1 additions

- Idea cards/history with selectable saved projects.
- Public/private toggle per idea.
- Share button that copies a clean project summary.
- Lightweight local engine that expands an idea into project name, problem, target user, value proposition, MVP scope, phases, tasks, and next 3 actions.
- Project chat panel with local responses based on the selected project and saved chat history.
- Checkable tasks persisted per project in `localStorage`.

NEXO Engine v1 is a premium mobile-first static web app that helps a user turn an idea into a useful project plan directly from an iPhone or Android browser.

The project remains simple and GitHub Pages friendly:

- Pure `HTML`, `CSS`, and `JavaScript`.
- No backend, API keys, frameworks, build tools, or external dependencies.
- Local plan generation with JavaScript keyword templates.
- `localStorage` persistence for the last idea, generated plan, task completion state, custom tools, counters, and saved timestamp.
- Copy-to-clipboard, `.txt` download, reset, bottom navigation, and custom tool creation.
- Reset restores a fresh copy of the default tools so generated or custom tools do not leak back into the default state.

### v1 experience

- Apple-inspired interface with soft glass cards, rounded corners, subtle shadows, premium system typography, and adaptive light/dark styling.
- Working navigation for Inicio, Idea, Ideas, Plan, Chat, Builder, and Tools.
- Working buttons for Capturar idea, Ver plan, Generar plan, Reiniciar, Copiar plan, Descargar `.txt`, Compartir, public/private toggle, chat Enviar, and Añadir tool.
- Readable structured plans in Spanish with project name, problem, target user, value proposition, MVP scope, phases, checkable tasks, recommended tools, risks, and next 3 actions.
- Mobile-first layout designed to avoid horizontal overflow on small screens.

### Manual test steps

1. Open `index.html` locally or from GitHub Pages on a phone-sized viewport.
2. Tap **Capturar idea** in the hero and confirm it scrolls to the idea form.
3. Type: `Quiero vender plantillas digitales desde mi teléfono`.
4. Tap **Generar plan** and confirm NEXO scrolls to **Plan desarrollado**.
5. Confirm the plan includes project name, problem, user, value proposition, MVP scope, phases, tasks, tools, risks, and next 3 actions.
6. Check one task and confirm the completed counter updates.
7. Tap **Copiar plan** and **Descargar .txt**.
8. Toggle a saved idea between **Público** and **Privado**, then tap **Compartir** and confirm a clean summary is copied.
9. Ask the chat: `¿Qué hago primero?` and confirm NEXO answers from the selected project.
10. Add a custom tool in **Tools** with **Añadir** and confirm it appears in the list.
11. Refresh the page and confirm the idea, plan, tools, counters, and saved status persist.
12. Tap **Reiniciar** and confirm local state and UI reset.

### Deployment

The repository includes `.github/workflows/static.yml` for GitHub Pages. The workflow validates required static files, prepares the `_site` artifact, and deploys on pushes to `main` or `master` while skipping deployment on pull requests.
