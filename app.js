const storageKey = 'nexo-atelier-v03-state';

const baseTools = [
  { name: 'NEXO Planner', price: 'Gratis', description: 'Genera planes locales y tareas accionables.' },
  { name: 'Plantilla de landing', price: 'Gratis', description: 'Estructura simple para presentar una oferta.' },
  { name: 'Checklist QA móvil', price: 'Gratis', description: 'Pruebas rápidas antes de compartir el prototipo.' }
];

const builderBlocks = [
  { title: '1. Entender', text: 'Resume la idea, define usuario y objetivo principal.' },
  { title: '2. Planificar', text: 'Reduce el alcance a un MVP ejecutable desde móvil.' },
  { title: '3. Construir', text: 'Convierte tareas en pantallas, contenido, documentos o herramientas.' },
  { title: '4. Ejecutar', text: 'Avanza con checklist, herramientas recomendadas y próxima acción.' },
  { title: '5. Mejorar', text: 'Usa feedback real para ajustar el plan sin perder simplicidad.' }
];

const templates = [
  {
    type: 'ecommerce',
    keywords: ['ecommerce', 'tienda', 'vender', 'venta', 'producto', 'plantilla', 'plantillas', 'catálogo', 'pago'],
    targetUser: 'personas que quieren comprar una solución digital rápida desde el móvil',
    objective: 'validar una oferta vendible con una página clara, precio simple y entrega manual al inicio',
    mvp: 'una landing mobile-first con 1 producto principal, beneficios, precio, botón de contacto o pago y registro básico de interesados',
    tools: ['Plantilla de landing', 'Calculadora de precio', 'Checklist de oferta', 'Registro de pedidos', 'Mensaje de venta'],
    risks: ['No definir un comprador específico', 'Publicar demasiados productos al inicio', 'No explicar el beneficio concreto', 'No tener un método simple de cobro o entrega'],
    roadmap: ['Definir producto y comprador ideal', 'Escribir promesa, beneficios y precio', 'Crear landing mobile-first', 'Agregar contacto o pago manual', 'Pedir feedback a 3 compradores potenciales', 'Ajustar oferta con respuestas reales', 'Publicar y medir interesados']
  },
  {
    type: 'software',
    keywords: ['app', 'software', 'plataforma', 'web', 'saas', 'sistema'],
    targetUser: 'usuarios que necesitan completar una tarea digital sin fricción',
    objective: 'probar el flujo principal antes de construir funciones avanzadas',
    mvp: 'un prototipo web estático con entrada de datos, resultado visible, persistencia local y navegación móvil',
    tools: ['Mapa de flujo', 'Wireframe mobile', 'Backlog MVP', 'Checklist QA', 'GitHub Pages'],
    risks: ['Construir demasiadas pantallas', 'No validar el flujo principal', 'Ignorar rendimiento móvil', 'No guardar progreso'],
    roadmap: ['Definir usuario y tarea central', 'Dibujar flujo en 3 pasos', 'Crear HTML base', 'Aplicar diseño mobile-first', 'Agregar JavaScript local', 'Probar en teléfono', 'Publicar demo y pedir feedback']
  },
  {
    type: 'content',
    keywords: ['contenido', 'tiktok', 'youtube', 'redes', 'instagram', 'creator', 'video'],
    targetUser: 'audiencia que consume contenido corto y necesita valor inmediato',
    objective: 'crear un sistema repetible de contenido con una promesa clara',
    mvp: 'un calendario de 7 publicaciones con tema, gancho, formato, CTA y métrica de aprendizaje',
    tools: ['Calendario editorial', 'Banco de hooks', 'Guion corto', 'Checklist de publicación', 'Tracker de métricas'],
    risks: ['Publicar sin nicho claro', 'No medir respuestas', 'Copiar formatos sin propuesta propia', 'Abandonar antes de iterar'],
    roadmap: ['Elegir nicho y promesa', 'Crear 10 hooks', 'Grabar 2 piezas simples', 'Publicar primera pieza', 'Medir comentarios y retención', 'Repetir el mejor formato', 'Planear la semana siguiente']
  },
  {
    type: 'business',
    keywords: ['negocio', 'dinero', 'ingreso', 'ingresos', 'libertad financiera', 'emprender', 'monetizar'],
    targetUser: 'personas que buscan generar ingresos con recursos limitados',
    objective: 'crear una primera oferta monetizable y validarla con conversaciones reales',
    mvp: 'una oferta simple con problema, promesa, precio inicial, canal de venta y lista de primeros prospectos',
    tools: ['Validador de oferta', 'Calculadora de margen', 'Lista de prospectos', 'Script de venta', 'Tracker de ingresos'],
    risks: ['Elegir una idea sin comprador', 'No hablar con prospectos', 'Calcular mal precio o margen', 'No medir respuestas'],
    roadmap: ['Definir habilidad o recurso disponible', 'Elegir problema con disposición de pago', 'Crear oferta mínima', 'Contactar 10 prospectos', 'Registrar respuestas', 'Cerrar preventa o primera venta', 'Ajustar precio y entrega']
  }
];

const defaultTemplate = {
  type: 'generic',
  targetUser: 'personas que necesitan resolver el problema principal con la menor fricción posible',
  objective: 'convertir la idea en una solución pequeña, clara y comprobable',
  mvp: 'una página mobile-first que explique el problema, capture información clave, muestre un resultado útil y guarde progreso local',
  tools: ['NEXO Planner', 'Checklist de validación', 'Mapa de usuario', 'Tablero de tareas', 'Documento de alcance'],
  risks: ['Alcance demasiado amplio', 'Usuario objetivo poco definido', 'No probar en teléfono', 'Falta de feedback real'],
  roadmap: ['Definir usuario principal', 'Escribir problema y objetivo', 'Reducir alcance del MVP', 'Diseñar flujo móvil', 'Crear prototipo estático', 'Probar con una persona', 'Priorizar mejoras']
};

function initialState() {
  return { ideas: [], lastIdea: '', plan: null, tasks: [], completedTasks: {}, tools: baseTools, lastUpdated: null };
}

let state = loadState();

function byId(id) { return document.getElementById(id); }
function normalizeIdea(idea) { return idea.replace(/\s+/g, ' ').trim(); }
function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return { ...initialState(), ...saved, tools: Array.isArray(saved?.tools) && saved.tools.length ? saved.tools : baseTools };
  } catch {
    return initialState();
  }
}

function saveState() {
  state.lastUpdated = new Date().toISOString();
  localStorage.setItem(storageKey, JSON.stringify(state));
  renderSaveStatus();
}

function getTemplate(idea) {
  const text = idea.toLowerCase();
  return templates.find((template) => template.keywords.some((keyword) => text.includes(keyword))) || defaultTemplate;
}

function summarizeIdea(idea) { return idea.length <= 155 ? idea : `${idea.slice(0, 152)}...`; }

function makePlan(rawIdea) {
  const idea = normalizeIdea(rawIdea);
  const template = getTemplate(idea);
  const tasks = [
    `Definir el usuario objetivo: ${template.targetUser}.`,
    `Transformar la idea en este MVP: ${template.mvp}.`,
    'Crear una primera pantalla o documento que explique el valor en menos de 30 segundos.',
    `Validar los riesgos iniciales: ${template.risks.slice(0, 2).join(' y ')}.`,
    'Compartir el prototipo con una persona real y anotar qué entendió, qué pidió y qué pagaría.'
  ];

  return {
    type: template.type,
    summary: summarizeIdea(idea),
    objective: `Usar “${idea}” para ${template.objective}.`,
    targetUser: template.targetUser,
    mvp: template.mvp,
    tasks,
    tools: template.tools,
    risks: template.risks,
    nextAction: `Hoy: ${template.roadmap[0].toLowerCase()} y completar la primera tarea del checklist.`,
    roadmap: template.roadmap.map((item, index) => ({ day: index + 1, item }))
  };
}

function completedCount() { return Object.values(state.completedTasks || {}).filter(Boolean).length; }

function setMessage(message = '', isError = false) {
  const element = byId('ideaMessage');
  element.textContent = message;
  element.classList.toggle('error', isError);
}

function renderStats() {
  byId('ideasCount').textContent = state.ideas.length;
  byId('tasksCount').textContent = state.tasks.length;
  byId('toolsCount').textContent = state.tools.length;
  byId('completedCount').textContent = completedCount();
}

function renderSaveStatus() {
  const label = byId('lastSaved');
  const pill = byId('saveStatus');
  if (!state.lastUpdated) {
    label.textContent = 'Sin guardar todavía';
    pill.textContent = 'Local';
    return;
  }
  const formatted = new Date(state.lastUpdated).toLocaleString('es', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  label.textContent = `Guardado localmente: ${formatted}`;
  pill.textContent = 'Guardado';
}

function renderPlan() {
  const output = byId('planOutput');
  if (!state.plan) {
    output.className = 'empty-state';
    output.textContent = 'Captura una idea para generar resumen, objetivo, MVP, 5 tareas, herramientas, riesgos, próxima acción y roadmap de 7 días.';
    return;
  }

  output.className = 'plan-stack';
  output.innerHTML = `
    <article class="info-card"><p class="eyebrow">Resumen</p><p>${escapeHtml(state.plan.summary)}</p></article>
    <article class="info-card"><p class="eyebrow">Objetivo principal</p><h3>${escapeHtml(state.plan.objective)}</h3></article>
    <article class="info-card"><p class="eyebrow">Usuario objetivo</p><p>${escapeHtml(state.plan.targetUser)}</p></article>
    <article class="info-card"><p class="eyebrow">MVP sugerido</p><p>${escapeHtml(state.plan.mvp)}</p></article>
    <article class="info-card"><p class="eyebrow">5 tareas concretas</p><div class="task-list">${state.plan.tasks.map((task, index) => `
      <label class="task-item"><input type="checkbox" data-task-index="${index}" ${state.completedTasks[index] ? 'checked' : ''} /><span>${escapeHtml(task)}</span></label>
    `).join('')}</div></article>
    <article class="info-card"><p class="eyebrow">Herramientas recomendadas</p><div class="tool-tags">${state.plan.tools.map((tool) => `<span>${escapeHtml(tool)}</span>`).join('')}</div></article>
    <article class="info-card"><p class="eyebrow">Riesgos o bloqueos</p><ul>${state.plan.risks.map((risk) => `<li>${escapeHtml(risk)}</li>`).join('')}</ul></article>
    <article class="info-card accent-card"><p class="eyebrow">Próxima acción</p><p>${escapeHtml(state.plan.nextAction)}</p></article>
    <article class="info-card"><p class="eyebrow">Roadmap de 7 días</p><ol>${state.plan.roadmap.map((step) => `<li><strong>Día ${step.day}:</strong> ${escapeHtml(step.item)}</li>`).join('')}</ol></article>
  `;

  output.querySelectorAll('[data-task-index]').forEach((checkbox) => checkbox.addEventListener('change', handleTaskToggle));
}

function renderBuilder() {
  byId('builderBlocks').innerHTML = builderBlocks.map((block) => `
    <article class="info-card"><h3>${escapeHtml(block.title)}</h3><p>${escapeHtml(block.text)}</p></article>
  `).join('');
}

function renderTools() {
  byId('toolList').innerHTML = state.tools.map((tool) => `
    <article class="tool-card">
      <div><h3>${escapeHtml(tool.name)}</h3><p>${escapeHtml(tool.description || 'Herramienta guardada por el usuario.')}</p></div>
      <span class="price-pill">${escapeHtml(tool.price || 'Gratis')}</span>
    </article>
  `).join('');
}

function syncUi() {
  renderStats();
  renderSaveStatus();
  renderPlan();
  renderBuilder();
  renderTools();
  updateActiveNav();
}

function scrollToSection(id) {
  const target = byId(id);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
  updateActiveNav();
}

function captureAndPlan() {
  const idea = normalizeIdea(byId('ideaInput').value);
  if (!idea) {
    setMessage('Escribe una idea primero. Ejemplo: “Quiero vender plantillas digitales desde mi teléfono”.', true);
    scrollToSection('idea');
    byId('ideaInput').focus();
    return;
  }

  const plan = makePlan(idea);
  state.lastIdea = idea;
  state.ideas = [idea, ...state.ideas.filter((savedIdea) => savedIdea !== idea)].slice(0, 10);
  state.plan = plan;
  state.tasks = plan.tasks;
  state.completedTasks = {};
  plan.tools.forEach((tool) => {
    if (!state.tools.some((savedTool) => savedTool.name.toLowerCase() === tool.toLowerCase())) {
      state.tools.push({ name: tool, price: 'Gratis', description: 'Recomendada por el plan actual.' });
    }
  });
  saveState();
  setMessage('Plan generado y guardado localmente.');
  syncUi();
  scrollToSection('plan');
}

function handleTaskToggle(event) {
  state.completedTasks[event.target.dataset.taskIndex] = event.target.checked;
  saveState();
  renderStats();
}

function planAsText() {
  if (!state.plan) return '';
  return [
    'NEXO v0.3 — Plan local', '',
    `Idea: ${state.lastIdea}`,
    `Resumen: ${state.plan.summary}`,
    `Objetivo: ${state.plan.objective}`,
    `Usuario objetivo: ${state.plan.targetUser}`,
    `MVP sugerido: ${state.plan.mvp}`, '',
    '5 tareas concretas:',
    ...state.plan.tasks.map((task, index) => `${index + 1}. ${state.completedTasks[index] ? '[x]' : '[ ]'} ${task}`), '',
    'Herramientas recomendadas:',
    ...state.plan.tools.map((tool) => `- ${tool}`), '',
    'Riesgos o bloqueos:',
    ...state.plan.risks.map((risk) => `- ${risk}`), '',
    `Próxima acción: ${state.plan.nextAction}`, '',
    'Roadmap de 7 días:',
    ...state.plan.roadmap.map((step) => `Día ${step.day}: ${step.item}`)
  ].join('\n');
}

async function copyPlan() {
  const text = planAsText();
  if (!text) { setMessage('Genera un plan antes de copiarlo.', true); return; }
  try {
    await navigator.clipboard.writeText(text);
    setMessage('Plan copiado al portapapeles.');
  } catch {
    const area = byId('ideaInput');
    area.value = text;
    area.select();
    setMessage('No se pudo copiar automáticamente; el texto quedó seleccionado para copiar manualmente.', true);
  }
}

function downloadPlan() {
  const text = planAsText();
  if (!text) { setMessage('Genera un plan antes de descargarlo.', true); return; }
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'nexo-v03-plan.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setMessage('Plan descargado como .txt.');
}

function resetProject() {
  state = initialState();
  localStorage.removeItem(storageKey);
  byId('ideaInput').value = '';
  setMessage('Proyecto reiniciado.');
  syncUi();
  scrollToSection('inicio');
}

function addTool(event) {
  event.preventDefault();
  const name = normalizeIdea(byId('toolName').value);
  const price = normalizeIdea(byId('toolPrice').value) || 'Gratis';
  if (!name) { setMessage('Escribe el nombre de la herramienta antes de añadirla.', true); scrollToSection('tools'); return; }
  state.tools = [{ name, price, description: 'Herramienta personalizada guardada localmente.' }, ...state.tools];
  byId('toolName').value = '';
  byId('toolPrice').value = '';
  saveState();
  setMessage('Herramienta añadida y guardada.');
  syncUi();
  scrollToSection('tools');
}

function updateActiveNav() {
  const sections = ['inicio', 'idea', 'plan', 'builder', 'tools'];
  const current = sections.reduce((active, id) => {
    const section = byId(id);
    if (section && section.getBoundingClientRect().top <= 120) return id;
    return active;
  }, 'inicio');
  document.querySelectorAll('[data-scroll-target]').forEach((button) => button.classList.toggle('active', button.dataset.scrollTarget === current));
}

function bindEvents() {
  byId('heroCapture').addEventListener('click', () => scrollToSection('idea'));
  byId('heroPlan').addEventListener('click', () => scrollToSection('plan'));
  byId('captureIdea').addEventListener('click', captureAndPlan);
  byId('generatePlan').addEventListener('click', captureAndPlan);
  byId('copyPlan').addEventListener('click', copyPlan);
  byId('downloadPlan').addEventListener('click', downloadPlan);
  byId('resetProject').addEventListener('click', resetProject);
  byId('toolForm').addEventListener('submit', addTool);
  document.querySelectorAll('[data-scroll-target]').forEach((control) => control.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToSection(control.dataset.scrollTarget);
  }));
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('hashchange', updateActiveNav);
}

byId('ideaInput').value = state.lastIdea || '';
bindEvents();
syncUi();
