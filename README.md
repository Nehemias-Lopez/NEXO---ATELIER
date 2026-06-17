# NEXO---ATELIER

## Rescate estable mínimo

Esta rama reconstruye NEXO---ATELIER desde una base limpia de `main` como un sitio estático mínimo compatible con GitHub Pages.

### Qué incluye

- `index.html`, `styles.css`, `app.js`, `README.md` y `.nojekyll`.
- Diseño mobile-first premium estilo Apple, oscuro y simple.
- Pantalla principal ATELIER/NEXO.
- Captura de idea.
- Generación local de plan sin backend, APIs ni dependencias.
- Resultado con título del proyecto, objetivo, categoría, próxima acción y 5 tareas simples.
- Persistencia del último plan en `localStorage`.
- Botones funcionales: **Capturar idea**, **Generar plan**, **Copiar plan**, **Reiniciar**.
- Navegación inferior: **Inicio**, **Idea**, **Plan**, **Tools**.

### Cómo probar

1. Abrir `index.html` en navegador o desde GitHub Pages.
2. Tocar **Capturar idea** y confirmar que baja al formulario.
3. Escribir: `Quiero vender plantillas digitales desde mi teléfono`.
4. Tocar **Generar plan**.
5. Confirmar que aparece título, objetivo, categoría, próxima acción y 5 tareas.
6. Tocar **Copiar plan** y confirmar que copia el resumen.
7. Refrescar la página y confirmar que el último plan sigue visible.
8. Tocar **Reiniciar** y confirmar que limpia el estado local.
9. Probar la navegación inferior: Inicio, Idea, Plan y Tools.

### GitHub Pages

Este proyecto no requiere build. Para publicarlo:

1. Ir a **Settings → Pages** en GitHub.
2. Seleccionar despliegue desde rama `main` y carpeta `/root`.
3. Al fusionar este PR, la URL esperada será:

```text
https://<usuario-o-organizacion>.github.io/NEXO---ATELIER/
```
