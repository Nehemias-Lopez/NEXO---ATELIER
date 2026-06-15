const storageKey = 'nexo-atelier-m02-state';

const defaultAgents = [
  { role: 'Estratega', mission: 'Convierte una idea ambigua en objetivo, alcance y prioridades.', status: 'Listo' },
  { role: 'Arquitecto', mission: 'Define bloques técnicos simples para una primera versión navegable.', status: 'Listo' },
  { role: 'Diseñador', mission: 'Cuida claridad, jerarquía visual y experiencia mobile-first.', status: 'Listo' },
  { role: 'Programador', mission: 'Transforma el plan en tareas implementables con HTML, CSS y JavaScript.', status: 'Listo' },
  { role: 'QA', mission: 'Revisa errores, accesibilidad básica y pasos para publicar.', status: 'Listo' }
];

const builderBlocks = [
  { title: 'Idea', text: 'Texto inicial capturado desde el teléfono.' },
  { title: 'Plan M0.2', text: 'Resumen, objetivo, MVP, 5 tareas, herramientas y próxima acción.' },
  { title: 'Persistencia', text: 'Estado guardado en localStorage sin backend ni API keys.' },
  { title: 'Agent Center', text: 'Roles ligeros para revisar estrategia, UX, código y calidad.' },
  { title: 'Deploy', text: 'Publica el sitio desde el repositorio ATELIER con GitHub Pages.' }
];

const templates = [
  {
    type: 'ecommerce',
    keywords: ['ecommerce', 'tienda', 'vender', 'venta', 'producto', 'plantilla', 'plantillas', 'catálogo', 'pago'],
    targetUser: 'personas que quieren comprar una solución digital rápida desde el móvil',
    objective: 'validar una oferta vendible, simple y accesible desde teléfono',
    mvp: 'una página catálogo con 1 producto principal, descripción clara, precio, botón de contacto/compra y seguimiento manual de pedidos',
    tools: ['Catálogo móvil', 'Calculadora de precio', 'Checklist de oferta', 'Plantilla de landing', 'Registro de pedidos'],
    risks: ['No definir un comprador específico', 'Poner demasiados productos al inicio', 'No explicar el valor de la plantilla', 'Falta de método simple para cobrar o entregar'],
    roadmap: ['Definir el producto digital principal', 'Escribir promesa, precio y comprador ideal', 'Crear una landing mobile-first', 'Agregar botón de contacto o pago', 'Probar compra con 3 personas', 'Ajustar oferta y mensajes', 'Publicar y medir interesados']
  },
  {
    type: 'software',
    keywords: ['app', 'software', 'plataforma', 'web', 'saas', 'sistema'],
    targetUser: 'usuarios que necesitan completar una tarea digital sin fricción',
    objective: 'probar el flujo principal antes de construir funciones avanzadas',
    mvp: 'un prototipo web con una pantalla principal, captura de datos, resultado visible y persistencia local',
    tools: ['Mapa de flujo', 'Wireframe mobile', 'Backlog MVP', 'Checklist QA', 'GitHub Pages'],
    risks: ['Construir demasiadas pantallas', 'No validar el flujo principal', 'Ignorar rendimiento móvil', 'No guardar estado del usuario'],
    roadmap: ['Definir usuario y tarea central', 'Dibujar flujo en 3 pasos', 'Crear HTML base', 'Aplicar estilos mobile-first', 'Agregar JavaScript local', 'Probar en teléfono', 'Publicar demo y pedir feedback']
  },
  {
    type: 'music',
    keywords: ['música', 'musica', 'beat', 'artista', 'ep', 'canción', 'cancion', 'album', 'álbum'],
    targetUser: 'fans o colaboradores que necesitan entender la propuesta artística rápidamente',
    objective: 'convertir el concepto musical en un lanzamiento pequeño y promocionable',
    mvp: 'una página de lanzamiento con concepto, 1 demo/preview, portada provisional, calendario y llamada a seguir o contactar',
    tools: ['Calendario de lanzamiento', 'Checklist de assets', 'Guion para teaser', 'Lista de distribución', 'Plan de contenido'],
    risks: ['Lanzar sin historia clara', 'No preparar portada o previews', 'Falta de calendario', 'Promocionar tarde'],
    roadmap: ['Definir concepto del lanzamiento', 'Elegir canción o beat principal', 'Preparar portada provisional', 'Escribir bio y descripción corta', 'Planear 3 piezas de contenido', 'Compartir preview con audiencia pequeña', 'Publicar calendario de lanzamiento']
  },
  {
    type: 'content',
    keywords: ['contenido', 'tiktok', 'youtube', 'redes', 'instagram', 'creator', 'video'],
    targetUser: 'audiencia que consume contenido corto y necesita valor inmediato',
    objective: 'crear un sistema repetible de contenido con una promesa clara',
    mvp: 'un calendario de 7 publicaciones con tema, gancho, formato, CTA y métrica de aprendizaje',
    tools: ['Calendario editorial', 'Banco de hooks', 'Checklist de publicación', 'Guion corto', 'Tracker de métricas'],
    risks: ['Publicar sin nicho', 'No medir retención o respuestas', 'Copiar formatos sin propuesta propia', 'Abandonar antes de iterar'],
    roadmap: ['Elegir nicho y promesa', 'Crear 10 hooks', 'Grabar 2 videos simples', 'Publicar primera pieza', 'Medir comentarios y retención', 'Repetir el mejor formato', 'Planear la semana siguiente']
  },
  {
    type: 'construction',
    keywords: ['construcción', 'construccion', 'casa', 'obra', 'diseño', 'arquitectura', 'remodelación'],
    targetUser: 'personas que necesitan visualizar, cotizar u organizar una obra desde el móvil',
    objective: 'ordenar el alcance de la obra y reducir incertidumbre antes de ejecutar',
    mvp: 'una ficha móvil con necesidad, medidas, presupuesto estimado, materiales clave, fotos de referencia y próximos pasos',
    tools: ['Checklist de obra', 'Estimador simple', 'Lista de materiales', 'Tablero de avances', 'Galería de referencias'],
    risks: ['Alcance poco claro', 'Costos no estimados', 'Falta de medidas', 'No documentar cambios de diseño'],
    roadmap: ['Definir espacio y objetivo', 'Recolectar medidas y fotos', 'Listar materiales básicos', 'Crear presupuesto inicial', 'Priorizar fases de obra', 'Validar con experto o cliente', 'Cerrar alcance de MVP']
  },
  {
    type: 'business',
    keywords: ['negocio', 'dinero', 'ingreso', 'ingresos', 'libertad financiera', 'emprender', 'monetizar'],
    targetUser: 'personas que buscan generar ingresos con recursos limitados',
    objective: 'crear una primera oferta monetizable y validarla rápido',
    mvp: 'una oferta simple con problema, promesa, precio inicial, canal de venta y lista de primeros prospectos',
    tools: ['Validador de oferta', 'Calculadora de margen', 'Lista de prospectos', 'Script de venta', 'Tracker de ingresos'],
    risks: ['Elegir una idea sin comprador', 'No hablar con prospectos', 'Precio mal calculado', 'No medir ingresos y costos'],
    roadmap: ['Definir habilidad o recurso disponible', 'Elegir problema con disposición de pago', 'Crear oferta mínima', 'Contactar 10 prospectos', 'Registrar respuestas', 'Cerrar primera venta o preventa', 'Ajustar precio y entrega']
  }
];

const defaultTemplate = {
  type: 'generic',
  targetUser: 'usuarios que necesitan resolver el problema principal con la menor fricción posible',
  objective: 'convertir la idea en una solución clara, pequeña y comprobable',
  mvp: 'una página mobile-first que explique el problema, capture información clave, muestre un resultado útil y guarde el progreso localmente',
  tools: ['NEXO Planner', 'Checklist de validación', 'Mapa de usuario', 'Tablero de tareas móvil', 'Documento de alcance'],
  risks: ['Alcance demasiado amplio', 'Usuario objetivo poco definido', 'No probar en teléfono', 'Falta de feedback real'],
  roadmap: ['Definir usuario principal', 'Escribir problema y objetivo', 'Reducir alcance del MVP', 'Diseñar flujo móvil', 'Crear prototipo estático', 'Probar con una persona', 'Priorizar mejoras']
};

function initialState() {
  return {
    ideas: [],
    lastIdea: '',
    tasks: [],
    tools: [],
    completedTasks: {},
    plan: null,
    lastUpdated: null,
    agents: defaultAgents
  };
}

let state = loadState();

function loadState() {
  try {
    const savedState = JSON.parse(localStorage.getItem(storageKey));
    return { ...initialState(), ...savedState };
  } catch {
    return initialState();
  }
}

function saveState() {
  state.lastUpdated = new Date().toISOString();
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function byId(id) {
  return document.getElementById(id);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
}

function normalizeIdea(idea) {
  return idea.replace(/\s+/g, ' ').trim();
}

function getTemplate(idea) {
  const lowerIdea = idea.toLowerCase();
  return templates.find((template) => template.keywords.some((keyword) => lowerIdea.includes(keyword))) || defaultTemplate;
}

function summarizeIdea(idea) {
  const cleanIdea = normalizeIdea(idea);
  if (cleanIdea.length <= 150) return cleanIdea;
  return `${cleanIdea.slice(0, 147)}...`;
}

function makePlan(idea) {
  const cleanIdea = normalizeIdea(idea);
  const template = getTemplate(cleanIdea);
  const tasks = [
    `Definir el usuario objetivo: ${template.targetUser}.`,
    `Convertir la idea en este MVP: ${template.mvp}.`,
    'Crear una pantalla mobile-first con el flujo principal de inicio a resultado.',
    `Validar riesgos iniciales: ${template.risks.slice(0, 2).join(' y ')}.`,
    'Probar el plan en un teléfono y ajustar con feedback de una persona real.'
  ];

  return {
    type: template.type,
    summary: summarizeIdea(cleanIdea),
    targetUser: template.targetUser,
    objective: `Usar “${cleanIdea}” para ${template.objective}.`,
    mvp: template.mvp,
    tasks,
    tools: template.tools,
    risks: template.risks,
    nextAction: `Hoy: ${template.roadmap[0].toLowerCase()} y completar la primera tarea del checklist.`,
    roadmap: template.roadmap.map((item, index) => ({ day: index + 1, item }))
  };
}

function completedCount() {
  return Object.values(state.completedTasks || {}).filter(Boolean).length;
}

function renderStats() {
  byId('ideasCount').textContent = state.ideas.length;
  byId('tasksCount').textContent = state.tasks.length;
  byId('toolsCount').textContent = state.tools.length;
  byId('completedCount').textContent = completedCount();
}

function renderLastSaved() {
  const savedAt = byId('lastSaved');
  if (!state.lastUpdated) {
    savedAt.textContent = 'Sin guardar todavía';
    return;
  }

  savedAt.textContent = `Guardado: ${new Date(state.lastUpdated).toLocaleString('es', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`;
}

function renderValidation(message = '') {
  byId('ideaMessage').textContent = message;
}

function renderPlan() {
  const output = byId('planOutput');
  if (!state.plan) {
    output.className = 'empty-state';
    output.textContent = 'Captura una idea para generar resumen, objetivo, usuario, MVP, tareas, herramientas, riesgos y roadmap de 7 días.';
    return;
  }

  output.className = 'plan-stack';
  output.innerHTML = `
    <article class="info-card">
      <p class="eyebrow">Resumen de la idea</p>
      <p>${escapeHtml(state.plan.summary)}</p>
    </article>
    <article class="info-card">
      <p class="eyebrow">Objetivo principal</p>
      <h3>${escapeHtml(state.plan.objective)}</h3>
    </article>
    <article class="info-card">
      <p class="eyebrow">Usuario objetivo</p>
      <p>${escapeHtml(state.plan.targetUser)}</p>
    </article>
    <article class="info-card">
      <p class="eyebrow">MVP sugerido</p>
      <p>${escapeHtml(state.plan.mvp)}</p>
    </article>
    <article class="info-card">
      <p class="eyebrow">5 tareas concretas</p>
      <div class="task-list">${state.plan.tasks.map((task, index) => `
        <label class="task-item">
          <input type="checkbox" data-task-index="${index}" ${state.completedTasks[index] ? 'checked' : ''} />
          <span>${escapeHtml(task)}</span>
        </label>
      `).join('')}</div>
    </article>
    <article class="info-card">
      <p class="eyebrow">Herramientas recomendadas</p>
      <div class="tool-tags">${state.plan.tools.map((tool) => `<span>${escapeHtml(tool)}</span>`).join('')}</div>
    </article>
    <article class="info-card">
      <p class="eyebrow">Riesgos o bloqueos</p>
      <ul>${state.plan.risks.map((risk) => `<li>${escapeHtml(risk)}</li>`).join('')}</ul>
    </article>
    <article class="info-card accent-card">
      <p class="eyebrow">Próxima acción</p>
      <p>${escapeHtml(state.plan.nextAction)}</p>
    </article>
    <article class="info-card">
      <p class="eyebrow">Roadmap de 7 días</p>
      <ol>${state.plan.roadmap.map((step) => `<li><strong>Día ${step.day}:</strong> ${escapeHtml(step.item)}</li>`).join('')}</ol>
    </article>
  `;

  output.querySelectorAll('[data-task-index]').forEach((checkbox) => {
    checkbox.addEventListener('change', handleTaskToggle);
  });
}

function renderAgents() {
  byId('agentList').innerHTML = state.agents.map((agent) => `
    <article class="info-card agent-card">
      <div>
        <h3>${escapeHtml(agent.role)}</h3>
        <p class="muted">${escapeHtml(agent.mission)}</p>
      </div>
      <span class="status-pill">${escapeHtml(agent.status)}</span>
    </article>
  `).join('');
}

function renderBlocks() {
  byId('builderBlocks').innerHTML = builderBlocks.map((block) => `
    <article class="info-card">
      <h3>${escapeHtml(block.title)}</h3>
      <p class="muted">${escapeHtml(block.text)}</p>
    </article>
  `).join('');
}

function updateActiveNav() {
  const hash = window.location.hash || '#dashboard';
  document.querySelectorAll('.bottom-nav a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === hash);
  });
}

function syncDashboard() {
  renderStats();
  renderLastSaved();
}

function captureAndPlan() {
  const idea = normalizeIdea(byId('ideaInput').value);
  if (!idea) {
    renderValidation('Escribe una idea primero. Ejemplo: “Quiero vender plantillas digitales desde mi teléfono”.');
    byId('ideaInput').focus();
    return;
  }

  const plan = makePlan(idea);
  state.lastIdea = idea;
  state.ideas = [idea, ...state.ideas.filter((savedIdea) => savedIdea !== idea)].slice(0, 10);
  state.plan = plan;
  state.tasks = plan.tasks;
  state.tools = plan.tools;
  state.completedTasks = {};
  saveState();
  renderValidation('Plan generado y guardado localmente.');
  renderPlan();
  syncDashboard();
  window.location.hash = '#planner';
  byId('planner').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleTaskToggle(event) {
  const index = event.target.dataset.taskIndex;
  state.completedTasks[index] = event.target.checked;
  saveState();
  syncDashboard();
}

function planAsText() {
  if (!state.plan) return '';
  const lines = [
    'NEXO M0.2 — Plan local',
    '',
    `Idea: ${state.lastIdea}`,
    `Resumen: ${state.plan.summary}`,
    `Objetivo: ${state.plan.objective}`,
    `Usuario objetivo: ${state.plan.targetUser}`,
    `MVP sugerido: ${state.plan.mvp}`,
    '',
    '5 tareas concretas:',
    ...state.plan.tasks.map((task, index) => `${index + 1}. ${state.completedTasks[index] ? '[x]' : '[ ]'} ${task}`),
    '',
    'Herramientas recomendadas:',
    ...state.plan.tools.map((tool) => `- ${tool}`),
    '',
    'Riesgos o bloqueos:',
    ...state.plan.risks.map((risk) => `- ${risk}`),
    '',
    `Próxima acción: ${state.plan.nextAction}`,
    '',
    'Roadmap de 7 días:',
    ...state.plan.roadmap.map((step) => `Día ${step.day}: ${step.item}`)
  ];
  return lines.join('\n');
}

async function copyPlan() {
  const text = planAsText();
  if (!text) {
    renderValidation('Genera un plan antes de copiarlo.');
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    renderValidation('Plan copiado al portapapeles.');
  } catch {
    renderValidation('No se pudo copiar automáticamente. Selecciona y copia el plan manualmente.');
  }
}

function downloadPlan() {
  const text = planAsText();
  if (!text) {
    renderValidation('Genera un plan antes de descargarlo.');
    return;
  }

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'nexo-m02-plan.txt';
  link.click();
  URL.revokeObjectURL(url);
  renderValidation('Plan descargado como .txt.');
}

function resetData() {
  state = initialState();
  byId('ideaInput').value = '';
  localStorage.removeItem(storageKey);
  renderValidation('Proyecto reiniciado.');
  renderPlan();
  renderAgents();
  renderBlocks();
  syncDashboard();
}

byId('captureIdea').addEventListener('click', captureAndPlan);
byId('generatePlan').addEventListener('click', captureAndPlan);
byId('copyPlan').addEventListener('click', copyPlan);
byId('downloadPlan').addEventListener('click', downloadPlan);
byId('clearData').addEventListener('click', resetData);
window.addEventListener('hashchange', updateActiveNav);

byId('ideaInput').value = state.lastIdea || '';
renderPlan();
renderAgents();
renderBlocks();
syncDashboard();
updateActiveNav();
