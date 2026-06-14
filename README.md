# NEXO Mobile Control Center

NEXO Mobile Control Center es una aplicación web estática, mobile-first y sin dependencias complejas para transformar una idea en un plan accionable y una colección de herramientas que el usuario puede guardar, compartir o monetizar.

## Archivos incluidos

- `index.html`: estructura de la aplicación y pantallas principales.
- `styles.css`: diseño moderno, responsive y optimizado para teléfonos.
- `app.js`: lógica de captura de ideas, generación de plan, tareas, herramientas y persistencia local.
- `.github/workflows/pages.yml`: workflow de GitHub Actions para validar y desplegar GitHub Pages.
- `.nojekyll`: evita procesamiento Jekyll en GitHub Pages.

## Pantallas

1. **Dashboard**: resumen de ideas, tareas y herramientas.
2. **Idea Capture**: entrada principal para describir una idea.
3. **Project Planner**: plan estructurado con objetivo, fases y tareas.
4. **Builder**: bloques conceptuales para construir el proyecto.
5. **Herramientas**: recursos guardables, compartibles, gratis o de pago.

## Uso local

Abre `index.html` directamente en un navegador moderno. No se requiere instalación, build ni servidor local.

## Despliegue en GitHub Pages

1. Sube esta rama a GitHub y abre un pull request contra `main`.
2. Verifica que el workflow `Deploy GitHub Pages` pase en el pull request.
3. Haz merge a `main`.
4. En GitHub, entra a **Settings → Pages**.
5. En **Build and deployment**, selecciona **GitHub Actions** como fuente.
6. El próximo push a `main` publicará el sitio usando `.github/workflows/pages.yml`.

## Notas técnicas

- La app usa `localStorage` para conservar ideas, planes y herramientas en el dispositivo.
- El proyecto está diseñado para funcionar desde navegador móvil con HTML, CSS y JavaScript puros.
- El workflow valida los archivos requeridos en pull requests y despliega únicamente en eventos que no son `pull_request`.
