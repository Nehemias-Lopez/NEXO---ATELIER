# NEXO Mobile Control Center

NEXO Mobile Control Center es un centro de control universal impulsado por IA para convertir ideas en productos, proyectos, negocios y soluciones reales desde cualquier dispositivo inteligente, con prioridad absoluta en teléfonos móviles, navegador web y bajo consumo de recursos.

## 1. Auditoría estratégica

### Fortalezas

- **Democratización real:** permite a personas sin equipos costosos ni conocimientos avanzados construir soluciones tecnológicas desde un teléfono.
- **Mobile-first nativo:** no adapta una herramienta de escritorio al móvil; nace para pantallas pequeñas, conexiones inestables y uso intermitente.
- **Sistema modular:** separa pensamiento, creación, ejecución, herramientas y bloques visuales para crecer sin rehacer todo el producto.
- **IA como núcleo:** NEXO no usa IA como una función secundaria; la IA organiza, genera, ejecuta, revisa y aprende de cada proyecto.
- **Mercado amplio:** estudiantes, emprendedores, freelancers, microempresas, ONGs, creadores de contenido y usuarios de economías emergentes.
- **Potencial de red:** plantillas, herramientas, bloques, proyectos públicos y marketplace pueden crear efectos de comunidad.

### Debilidades

- **Riesgo de amplitud excesiva:** intentar competir a la vez con ChatGPT, Replit, Figma, Notion, Cursor y herramientas no-code puede diluir el foco.
- **Dependencia de modelos IA externos:** costos, latencia, disponibilidad y cambios de APIs pueden afectar la experiencia.
- **Complejidad de UX:** coordinar herramientas, documentos, código, diseño y despliegue desde móvil puede abrumar a principiantes.
- **Calidad variable de entregables:** la IA puede producir código, planes o diseños incorrectos si no hay verificación y límites claros.
- **Costos operativos:** inferencia, almacenamiento, ejecución de sandboxes y despliegues pueden crecer más rápido que los ingresos.

### Riesgos

- **Riesgo técnico:** ejecutar proyectos generados por IA de forma segura requiere aislamiento, límites de recursos y auditoría.
- **Riesgo legal:** contenido generado, licencias de código, privacidad de datos y uso de APIs externas deben controlarse desde el inicio.
- **Riesgo de confianza:** si el usuario final obtiene errores frecuentes, abandonará antes de percibir valor.
- **Riesgo competitivo:** grandes plataformas pueden integrar flujos mobile-first y herramientas rápidamente.
- **Riesgo de accesibilidad:** si el producto consume demasiados datos, batería o memoria, falla para el público principal.

### Oportunidades

- **Mercados subatendidos:** millones de usuarios tienen teléfono pero no laptop potente.
- **Educación y empleabilidad:** NEXO puede enseñar mientras construye, creando rutas de aprendizaje prácticas.
- **Micro-SaaS y automatización local:** pequeños negocios necesitan formularios, páginas, dashboards, bots, catálogos y flujos simples.
- **Alianzas:** telcos, universidades, incubadoras, gobiernos locales, ONGs y comunidades maker.
- **Marketplace:** herramientas, plantillas, bloques ATELIER, conectores y flujos reutilizables.

## 2. MVP

### Objetivo del MVP

Construir en 30 días una versión mínima que permita a un usuario desde móvil:

1. Escribir una idea desordenada.
2. Recibir un plan claro.
3. Convertir el plan en tareas.
4. Generar un primer artefacto útil: landing page, documento, prompt, checklist o prototipo simple.
5. Revisar el resultado con una herramienta QA básica.
6. Exportar o compartir el resultado.

### Alcance incluido

- Autenticación básica por email, magic link o proveedor OAuth.
- Panel móvil con proyectos.
- Chat de proyecto con IA.
- Motor NODO v0 con herramientas simuladas por roles: Estratega, Creador y QA.
- Editor de documentos Markdown.
- Constructor ATELIER v0 con bloques simples: texto, sección, botón, formulario, lista, imagen y tarea.
- Exportación a Markdown, HTML estático y PDF básico.
- Historial de versiones por proyecto.
- Plantillas iniciales: landing page, plan de negocio, campaña de contenido, automatización simple y backlog de app.

### Alcance excluido inicialmente

- Ejecución de código arbitrario del usuario.
- Marketplace público.
- Colaboración multiusuario en tiempo real.
- App nativa iOS/Android.
- Entrenamiento propio de modelos.
- Despliegues complejos con backend generado.

### Métrica de éxito del MVP

- Un usuario nuevo crea un proyecto útil en menos de 10 minutos desde teléfono.
- El 40% de usuarios completa el primer flujo de idea a entregable.
- El costo medio de IA por proyecto gratuito se mantiene bajo un límite definido por plan.
- El producto funciona correctamente en redes móviles lentas y dispositivos de gama baja.

## 3. Arquitectura técnica

### Frontend

- **Aplicación web responsive/PWA:** React, Next.js o SvelteKit con enfoque mobile-first.
- **UI liviana:** componentes accesibles, CSS optimizado, carga diferida y modo offline parcial.
- **Estado local:** Zustand, TanStack Query o equivalente para sincronizar datos con baja fricción.
- **Editor:** Markdown compacto para documentos y editor visual ATELIER basado en JSON schema.
- **PWA:** instalación desde navegador, cache de proyectos recientes, reintentos cuando vuelve la conexión.

### Backend

- **API principal:** Node.js/NestJS, FastAPI o Supabase Edge Functions para velocidad de MVP.
- **Orquestador NODO:** servicio separado responsable de tareas, herramientas, colas, memoria y evaluación.
- **Procesamiento asíncrono:** colas con Redis, BullMQ, Cloud Tasks o similar.
- **Control de costos:** límites por usuario, presupuestos por proyecto, streaming, caching y compresión de contexto.
- **Observabilidad:** logs estructurados, trazas por tarea, métricas de costo, latencia y tasa de error.

### Base de datos

- **PostgreSQL:** usuarios, proyectos, tareas, versiones, herramientas, permisos y billing.
- **Almacenamiento de objetos:** documentos exportados, imágenes, assets y snapshots.
- **Vector store:** pgvector, Qdrant o servicio gestionado para memoria semántica por proyecto.
- **Cache:** Redis para sesiones, rate limits, resultados temporales y colas.

### Sistema de herramientas

- **Herramientas iniciales:** Estratega, Arquitecto, Diseñador, Programador, QA, Investigador y Analista.
- **Contrato común:** cada herramienta recibe objetivo, contexto, restricciones, formato de salida y criterios de calidad.
- **Memoria:** resumen de proyecto, decisiones, archivos, tareas, preferencias y errores recurrentes.
- **Evaluación:** cada entrega pasa por verificación de consistencia, seguridad, utilidad y costo.

### APIs

- **IA:** capa abstracta para cambiar entre proveedores y modelos según costo/calidad.
- **Exportación:** HTML, PDF, Markdown, JSON y ZIP.
- **Integraciones futuras:** GitHub, Google Drive, Notion, Airtable, Slack, WhatsApp Business, Zapier y Make.
- **Webhooks:** eventos de proyecto, tarea completada, exportación generada y límite alcanzado.

### Autenticación

- Magic link para reducir fricción.
- OAuth con Google/GitHub para usuarios avanzados.
- Roles: usuario, colaborador, administrador, creador de marketplace.
- Seguridad: rate limiting, validación server-side, cifrado de secretos y auditoría de acciones críticas.

### Despliegue

- **MVP rápido:** Vercel/Netlify para frontend, Supabase/Fly.io/Render para backend y Postgres gestionado.
- **Escala:** contenedores, Kubernetes opcional, workers separados y colas dedicadas.
- **Regiones:** iniciar en una región económica y añadir edge caching para mercados globales.
- **CI/CD:** pruebas, lint, migraciones, despliegues preview y rollback automático.

## 4. Diseño UX

### Principios UX

- Una acción principal por pantalla.
- Texto claro, botones grandes y estados visibles.
- Interfaces progresivas: principiante primero, opciones avanzadas ocultas.
- Modo ahorro de datos.
- Guardado automático.
- Explicaciones breves de la IA: qué hizo, por qué y qué falta.

### Mapa de navegación

```text
Inicio
├── Crear proyecto
├── Proyectos recientes
├── Plantillas
├── Aprender
└── Cuenta

Proyecto
├── Chat / Comando
├── Plan
├── Tareas
├── ATELIER
├── Archivos
├── Herramientas NODO
├── Exportar
└── Ajustes
```

### Pantallas principales

#### Pantalla 1: Inicio

- Saludo breve.
- Botón principal: `Crear algo nuevo`.
- Accesos rápidos: `Convertir idea en plan`, `Crear landing`, `Organizar negocio`, `Generar documento`.
- Lista de proyectos recientes.

#### Pantalla 2: Captura de idea

- Campo grande: `Describe tu idea como puedas`.
- Botones de ayuda: audio, ejemplo, plantilla, foto o documento.
- Selector de intención: pensar, crear o ejecutar.
- Botón: `Ordenar mi idea`.

#### Pantalla 3: Plan generado

- Objetivo principal.
- Problema que resuelve.
- Usuario objetivo.
- Tareas sugeridas.
- Riesgos.
- Botones: `Editar`, `Aprobar`, `Pedir versión más simple`.

#### Pantalla 4: Centro de control del proyecto

- Barra superior con progreso y costo aproximado.
- Tarjetas: plan, tareas, entregables, herramientas activas.
- Botón fijo inferior: `Pedir a NEXO`.

#### Pantalla 5: ATELIER

- Lista de bloques verticales.
- Botón `+ Bloque`.
- Vista previa inmediata.
- Propiedades simples por bloque.
- Exportar a HTML o compartir enlace.

#### Pantalla 6: NODO

- Herramientas como tarjetas.
- Estado: esperando, trabajando, revisando, bloqueado o completado.
- Bitácora resumida.
- Botón `Revisar resultado`.

### Flujos de usuario

#### Flujo A: idea a plan

1. Usuario escribe una idea informal.
2. NEXO pregunta máximo tres aclaraciones.
3. Estratega genera objetivo, alcance y tareas.
4. Usuario aprueba o pide simplificación.
5. Se crea proyecto con roadmap inicial.

#### Flujo B: plan a landing page

1. Usuario elige `Crear landing`.
2. Diseñador propone estructura.
3. Programador genera HTML editable en ATELIER.
4. QA revisa claridad, enlaces y responsive.
5. Usuario exporta o publica.

#### Flujo C: proyecto a ejecución por herramientas

1. Usuario define resultado deseado.
2. NODO divide en tareas.
3. Cada herramienta trabaja en su especialidad.
4. QA valida entregables.
5. NEXO entrega resumen final y próximos pasos.

### Wireframes descriptivos

#### Mobile: inicio

```text
┌────────────────────────┐
│ NEXO                   │
│ ¿Qué quieres crear hoy?│
├────────────────────────┤
│ [ Crear algo nuevo  ]  │
│ [ Ordenar una idea  ]  │
│ [ Usar plantilla    ]  │
├────────────────────────┤
│ Proyectos recientes    │
│ ▣ Tienda local         │
│ ▣ App de turnos        │
└────────────────────────┘
```

#### Mobile: proyecto

```text
┌────────────────────────┐
│ Proyecto: Tienda local │
│ Progreso 35%  Costo $  │
├────────────────────────┤
│ ▣ Plan                 │
│ ▣ Tareas               │
│ ▣ Landing en progreso  │
│ ▣ QA pendiente         │
├────────────────────────┤
│ [ Pedir a NEXO      ]  │
└────────────────────────┘
```

#### Mobile: ATELIER

```text
┌────────────────────────┐
│ ATELIER     Vista previa│
├────────────────────────┤
│ Bloque: Hero           │
│ Texto: [___________]   │
│ Botón: [___________]   │
│ [ + Bloque ] [Exportar]│
└────────────────────────┘
```

## 5. Roadmap

### 30 días

- Definir identidad de producto y propuesta de valor.
- Implementar autenticación básica.
- Crear dashboard móvil de proyectos.
- Crear flujo idea → plan → tareas.
- Implementar NODO v0 con herramientas por prompt.
- Implementar ATELIER v0 con bloques básicos.
- Añadir exportación Markdown y HTML.
- Medir costos por usuario y latencia.
- Probar con 20 usuarios reales en teléfonos de gama baja/media.

### 90 días

- Añadir colaboración simple por invitación.
- Crear biblioteca de plantillas.
- Agregar exportación PDF y ZIP.
- Añadir memoria semántica por proyecto.
- Implementar QA automático más robusto.
- Integrar GitHub o almacenamiento externo.
- Lanzar plan gratuito con límites y plan Pro.
- Crear onboarding educativo.
- Optimizar PWA offline y ahorro de datos.
- Preparar métricas para inversionistas: activación, retención, costo por proyecto y conversión.

### 1 año

- Marketplace de herramientas, plantillas y bloques.
- Constructor ATELIER avanzado con lógica, formularios, datos y acciones.
- Ejecución segura de prototipos con sandbox.
- Integraciones con WhatsApp, Google Drive, Notion, Airtable y herramientas de negocio.
- Model routing inteligente por costo/calidad.
- Versiones para educación, emprendimiento y microempresas.
- Programa de creadores certificados.
- Expansión multilingüe completa.
- Alianzas con instituciones educativas, telcos e incubadoras.

## 6. Plan de negocio

### Modelo de monetización

- **Freemium:** proyectos limitados, plantillas básicas y uso mensual de IA controlado.
- **Pro:** más proyectos, más herramientas, exportaciones avanzadas y mayor cuota de IA.
- **Equipos:** colaboración, permisos, historial extendido y analíticas.
- **Educación:** licencias para escuelas, bootcamps y universidades.
- **Marketplace:** comisión por plantillas, herramientas, bloques e integraciones vendidos por creadores.
- **Servicios premium:** implementación asistida para organizaciones y gobiernos locales.

### Costos estimados

- IA: principal costo variable; debe controlarse con límites, modelos pequeños, caching y resúmenes.
- Infraestructura: hosting, base de datos, almacenamiento, colas y observabilidad.
- Producto: diseño, desarrollo, QA y soporte.
- Go-to-market: comunidad, contenido, alianzas y programas educativos.
- Legal y seguridad: privacidad, términos, licencias y auditorías.

### Crecimiento

1. Comunidad inicial de makers mobile-first.
2. Casos de uso concretos: landing para negocio, plan de emprendimiento, catálogo, automatización simple.
3. Plantillas virales compartibles.
4. Programa educativo gratuito para crear el primer proyecto desde teléfono.
5. Marketplace para aumentar retención y oferta.

### Ventajas competitivas

- Experiencia móvil superior.
- Producto diseñado para usuarios con recursos limitados.
- Orquestación de herramientas orientada a resultados, no solo conversación.
- Constructor visual integrado con IA.
- Enfoque global y multilingüe desde el inicio.

## 7. Competencia y aprendizajes

| Producto | Lo mejor | Qué debe aprender NEXO | Riesgo competitivo |
| --- | --- | --- | --- |
| ChatGPT | Conversación general, razonamiento y generación de contenido | Interfaz natural, memoria útil y rapidez para pasar de idea a respuesta | Puede lanzar flujos de creación más integrados |
| Claude | Escritura larga, análisis cuidadoso y manejo de contexto | Calidad documental, tono claro y revisión crítica | Fuerte en planes, documentos y código asistido |
| Lovable | Generación rápida de apps desde prompts | Flujo prompt → app → edición visual | Muy cercano a usuarios no técnicos |
| Bolt | Prototipado web rápido en navegador | Entorno de creación inmediato | Competidor directo en creación técnica |
| Replit | IDE web, hosting y comunidad | Ejecución, despliegue y colaboración | Más potente para usuarios técnicos |
| Figma | Diseño colaborativo y ecosistema | Componentes visuales, comunidad y plugins | Puede incorporar IA para prototipos funcionales |
| Notion | Organización, documentos y bases ligeras | Flexibilidad de espacios de trabajo | Fuerte como sistema operativo personal/equipos |
| Cursor | Desarrollo con IA dentro del código | Edición asistida, contexto de repo y productividad dev | Domina usuarios avanzados de programación |
| GitHub Copilot | Asistencia integrada al flujo dev | Sugerencias contextuales y adopción empresarial | Puede cubrir generación técnica con gran distribución |

### Síntesis competitiva

NEXO debe combinar:

- La conversación natural de ChatGPT.
- La calidad analítica de Claude.
- La velocidad de Lovable y Bolt.
- La capacidad de ejecución de Replit.
- La claridad visual de Figma.
- La organización de Notion.
- La asistencia contextual de Cursor y Copilot.

Pero debe diferenciarse por una obsesión: **construir desde un teléfono para personas que hoy están excluidas de las herramientas profesionales**.

## 8. Sistema NODO / Herramientas

NODO es el motor interno de coordinación de herramientas inteligentes. Su función es transformar una intención humana en un conjunto de tareas coordinadas, verificadas y convertidas en entregables.

### Componentes

- **Intake:** recibe la idea, detecta intención, nivel del usuario, restricciones y formato esperado.
- **Planner:** divide el objetivo en fases, tareas y dependencias.
- **Router:** asigna tareas a herramientas según especialidad, costo, riesgo y prioridad.
- **Runtime de herramientas:** ejecuta herramientas con instrucciones, permisos y memoria controlada.
- **Memory Layer:** guarda decisiones, archivos, resúmenes, preferencias y resultados.
- **Evaluator:** revisa calidad, seguridad, consistencia, completitud y utilidad.
- **Cost Governor:** limita tokens, número de iteraciones y herramientas costosas.
- **Human Gate:** pide aprobación del usuario en decisiones críticas.

### Herramientas

- **Estratega:** define objetivos, público, propuesta de valor y plan.
- **Arquitecto:** diseña sistemas, datos, integraciones y restricciones técnicas.
- **Diseñador:** crea experiencia, pantallas, textos y componentes.
- **Programador:** genera código, estructura archivos y corrige errores.
- **QA:** prueba, detecta riesgos y crea checklist de validación.
- **Investigador:** busca contexto, ejemplos, regulación y mercado cuando esté habilitado.
- **Analista:** resume métricas, costos, progreso y prioridades.

### Ciclo de ejecución

```text
Idea → Clarificación → Plan → Asignación → Ejecución → QA → Revisión humana → Entrega → Memoria
```

### Reglas de seguridad

- Nunca ejecutar código no confiable sin sandbox.
- Nunca gastar presupuesto adicional sin confirmación.
- Nunca exponer secretos del usuario.
- Siempre explicar acciones irreversibles.
- Siempre generar salida exportable y auditable.

## 9. Sistema ATELIER

ATELIER es el constructor visual de NEXO para crear herramientas mediante bloques modulares desde móvil.

### Objetivo

Permitir que un usuario construya páginas, documentos, flujos, formularios, dashboards y prototipos sin programar, con asistencia de IA y exportación sencilla.

### Bloques iniciales

- Texto.
- Encabezado/Hero.
- Imagen.
- Botón.
- Formulario.
- Lista.
- Tarjeta.
- Tabla simple.
- Checklist.
- Sección de precios.
- Preguntas frecuentes.
- Acción externa.

### Bloques avanzados futuros

- Condiciones.
- Variables.
- Conectores API.
- Autenticación de usuarios finales.
- Base de datos ligera.
- Gráficos.
- Automatizaciones.
- Herramientas embebidas.

### Modelo de datos

Cada proyecto ATELIER puede representarse como JSON:

```json
{
  "type": "page",
  "version": "1.0",
  "blocks": [
    {
      "id": "hero_1",
      "type": "hero",
      "props": {
        "title": "Mi negocio",
        "subtitle": "Solución creada desde NEXO",
        "buttonText": "Contactar"
      }
    }
  ]
}
```

### UX de edición móvil

- Edición por tarjetas verticales.
- Vista previa plegable.
- Reordenar con botones subir/bajar además de drag-and-drop.
- Botón `Mejorar con IA` por bloque.
- Historial de cambios y restauración rápida.


### Biblioteca y marketplace de herramientas

- Cada usuario puede guardar herramientas privadas para reutilizarlas en proyectos futuros.
- Cada herramienta puede marcarse como gratis o de pago.
- Las herramientas compartidas deben incluir nombre, descripción, categoría, precio, autor y permisos de uso.
- El MVP solo almacena herramientas localmente; la versión con backend permitirá publicación, búsqueda, compra, reseñas y clonación.
- El objetivo es que NEXO no sea solo un asistente, sino una economía de herramientas creadas por usuarios.

## 10. Propuesta para competencia

### Problema

La capacidad de crear tecnología está distribuida de forma desigual. Millones de personas tienen ideas, necesidades locales y teléfonos inteligentes, pero no tienen laptops potentes, equipos técnicos, capital inicial ni formación avanzada en programación. Las herramientas actuales suelen estar diseñadas para profesionales, pantallas grandes o usuarios con experiencia técnica.

### Solución

NEXO Mobile Control Center convierte un teléfono en un centro de creación impulsado por IA. El usuario describe una idea en lenguaje natural, NEXO la organiza, crea un plan, coordina herramientas especializadas, genera entregables y permite construir herramientas visuales mediante bloques modulares.

### Innovación

NEXO combina tres capas en una experiencia móvil:

1. **Pensar:** convertir ideas confusas en planes accionables.
2. **Crear:** generar documentos, sitios, prototipos, código y contenido.
3. **Ejecutar:** coordinar herramientas inteligentes mediante NODO y construir visualmente con ATELIER.

La innovación no es solo usar IA, sino diseñar un sistema completo de creación tecnológica accesible desde dispositivos modestos.

### Impacto social

NEXO puede ayudar a estudiantes, emprendedores, trabajadores independientes, comunidades rurales, organizaciones sociales y pequeños negocios a crear soluciones sin depender de infraestructura costosa. Puede convertirse en una puerta de entrada a la educación tecnológica, la productividad y el emprendimiento digital.

### Escalabilidad

El producto escala mediante arquitectura web, modelos IA intercambiables, plantillas, marketplace y alianzas educativas. Cada nuevo bloque, herramienta o plantilla aumenta la utilidad del sistema para todos los usuarios.

### Visión a largo plazo

NEXO aspira a ser el sistema operativo creativo para la nueva generación de constructores mobile-first: una plataforma donde cualquier persona pueda pensar, crear, ejecutar, aprender y lanzar soluciones reales desde el dispositivo que ya tiene en la mano.

## 11. Crítica extrema del jurado

### Objeción 1: “Es demasiado amplio”

NEXO intenta ser chat, IDE, no-code, gestor de proyectos, documento, diseño y marketplace. Eso puede generar un producto mediocre en todo.

### Objeción 2: “Los competidores ya tienen distribución”

OpenAI, Anthropic, GitHub, Replit, Figma y Notion tienen usuarios, capital, modelos y ecosistemas.

### Objeción 3: “Construir desde móvil es incómodo”

Diseñar, programar y coordinar proyectos complejos desde una pantalla pequeña puede ser frustrante.

### Objeción 4: “Los costos de IA pueden matar el margen”

Usuarios con bajo poder adquisitivo y alto uso de IA pueden ser económicamente difíciles.

### Objeción 5: “La calidad de la IA no garantiza productos reales”

Una demo puede verse bien, pero el usuario necesita resultados confiables, seguros y mantenibles.

### Objeción 6: “El público objetivo puede necesitar educación antes que herramienta”

Si el usuario no sabe formular objetivos, validar negocios o evaluar resultados, la herramienta puede no bastar.

### Objeción 7: “El marketplace llega demasiado tarde o demasiado pronto”

Sin masa crítica no hay marketplace; con marketplace temprano se distrae al equipo.

## 12. Versión final optimizada

### Enfoque ganador

NEXO no debe comenzar como “todo para todos”. Debe iniciar como:

> La forma más simple de convertir una idea en un plan, una landing page y un entregable compartible desde un teléfono en menos de 10 minutos.

### Prioridades de construcción

1. **Flujo idea → plan → landing/documento.**
2. **Experiencia móvil impecable.**
3. **NODO simple con tres herramientas reales:** Estratega, Creador y QA.
4. **ATELIER mínimo para editar bloques verticales.**
5. **Exportar y compartir.**
6. **Medición estricta de costos y activación.**

### Lo que debe evitarse al inicio

- No construir IDE completo.
- No ejecutar código arbitrario.
- No lanzar marketplace.
- No crear app nativa.
- No prometer automatizaciones complejas.
- No competir frontalmente con herramientas profesionales de escritorio.

### Segmento inicial recomendado

- Emprendedores, estudiantes y pequeños negocios que necesitan una página, plan, catálogo, presentación o documento profesional desde el móvil.

### Caso de uso inicial dominante

`Tengo una idea o negocio → NEXO la ordena → NEXO crea una landing/documento → la edito en ATELIER → la comparto.`

### Producto priorizado para móvil

- Interfaz de chat con acciones claras.
- Tarjetas de decisión, no menús complejos.
- Bloques editables de una columna.
- Exportación rápida.
- Ahorro de datos.
- Modo principiante.
- Plantillas listas para contextos reales.

### Métrica norte

**Proyectos útiles creados y compartidos desde móvil por usuario activo semanal.**

### Tesis final

NEXO gana si no intenta ser el IDE más poderoso ni el chatbot más general. Gana si se convierte en la herramienta más accesible, rápida y confiable para que una persona con solo un teléfono transforme una idea en un primer activo real que pueda mostrar, vender, probar o mejorar.

## 13. Despliegue en GitHub Pages

Este repositorio está preparado para publicarse como sitio estático en GitHub Pages usando GitHub Actions.

### Archivos de despliegue

- `.github/workflows/pages.yml`: workflow que empaqueta el sitio estático y lo publica en GitHub Pages.
- `.nojekyll`: evita que GitHub Pages procese el proyecto con Jekyll y permite servir archivos estáticos directamente.

### Pasos para activar GitHub Pages

1. Subir la rama principal del repositorio a GitHub.
2. En GitHub, abrir `Settings → Pages`.
3. En `Build and deployment`, seleccionar `GitHub Actions` como fuente.
4. Hacer push a `main` o `master`, o ejecutar manualmente el workflow `Deploy static site to GitHub Pages` desde la pestaña `Actions`.
5. Al finalizar el workflow, GitHub mostrará la URL pública del sitio en el ambiente `github-pages`.

### Estructura publicada

El workflow copia a `_site/` y GitHub Pages servirá directamente:

- `index.html`
- `styles.css`
- `app.js`
- `.nojekyll`

No se requieren dependencias, build step ni servidor backend para esta primera versión.
