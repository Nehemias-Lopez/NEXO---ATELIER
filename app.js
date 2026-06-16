const storageKey = 'nexo-engine-v1-state';

const baseTools = [
  { name: 'NEXO Engine', price: 'Gratis', description: 'Expande ideas en proyectos accionables localmente.' },
  { name: 'Checklist MVP', price: 'Gratis', description: 'Reduce el alcance a una primera versión útil.' },
  { name: 'Guía de validación', price: 'Gratis', description: 'Preguntas para validar problema, usuario y propuesta.' }
];

const templates = [
  {
    type: 'commerce',
    keywords: ['vender', 'tienda', 'ecommerce', 'producto', 'plantilla', 'plantillas', 'pago', 'cliente'],
    problem: 'personas con una necesidad concreta no encuentran una solución simple, rápida y accesible desde el móvil',
    targetUser: 'creadores, emprendedores y compradores que quieren resolver una tarea sin procesos complejos',
    value: 'una oferta clara, comprable y fácil de entregar desde el teléfono',
    mvp: ['Landing mobile con una oferta principal', 'Catálogo mínimo de 1 a 3 productos', 'Botón de contacto o pago manual', 'Entrega simple por enlace, email o mensaje'],
    phases: ['Definir oferta', 'Publicar demo', 'Validar ventas', 'Automatizar entrega'],
    tools: ['Landing simple', 'WhatsApp/Email', 'Stripe o pago manual', 'Plantilla de seguimiento'],
    risks: ['Precio poco claro', 'Demasiados productos al inicio', 'No hablar con compradores reales']
  },
  {
    type: 'software',
    keywords: ['app', 'software', 'plataforma', 'web', 'saas', 'sistema', 'automatizar'],
    problem: 'un usuario pierde tiempo haciendo manualmente una tarea repetible',
    targetUser: 'personas que necesitan completar una acción digital con menos pasos',
    value: 'un flujo simple que captura datos, genera un resultado y guarda progreso',
    mvp: ['Pantalla de entrada', 'Motor local de resultado', 'Checklist de ejecución', 'Persistencia en el navegador'],
    phases: ['Mapear flujo', 'Construir prototipo', 'Probar en móvil', 'Iterar con feedback'],
    tools: ['HTML/CSS/JS', 'GitHub Pages', 'LocalStorage', 'Checklist QA móvil'],
    risks: ['Construir funciones secundarias', 'Ignorar Safari móvil', 'No validar el flujo central']
  },
  {
    type: 'content',
    keywords: ['contenido', 'tiktok', 'youtube', 'redes', 'instagram', 'video', 'creator'],
    problem: 'crear contenido sin sistema consume energía y no produce aprendizaje claro',
    targetUser: 'creadores que quieren publicar de forma consistente desde el teléfono',
    value: 'un sistema de ideas, guiones y métricas para mejorar cada semana',
    mvp: ['Calendario de 7 piezas', 'Banco de hooks', 'Plantilla de guion corto', 'Registro de métricas'],
    phases: ['Definir nicho', 'Crear formatos', 'Publicar pruebas', 'Doblar en lo que funciona'],
    tools: ['Notas', 'CapCut', 'Calendario', 'Tracker de métricas'],
    risks: ['Nicho difuso', 'No medir retención', 'Cambiar de formato demasiado pronto']
  },
  {
    type: 'business',
    keywords: ['negocio', 'dinero', 'ingreso', 'ingresos', 'financiera', 'emprender', 'monetizar'],
    problem: 'personas con recursos limitados necesitan convertir habilidades en una oferta vendible',
    targetUser: 'emprendedores móviles que quieren validar ingresos sin infraestructura costosa',
    value: 'una oferta mínima con cliente, precio, entrega y siguiente venta claros',
    mvp: ['Oferta de una página', 'Lista de 20 prospectos', 'Script de conversación', 'Registro de respuestas'],
    phases: ['Elegir problema pagable', 'Crear oferta', 'Contactar prospectos', 'Cerrar primera venta'],
    tools: ['Documento de oferta', 'CRM simple', 'Calculadora de margen', 'Mensaje de venta'],
    risks: ['No contactar clientes', 'Precio sin margen', 'Confundir idea con demanda real']
  }
];

const defaultTemplate = {
  type: 'general',
  problem: 'la idea todavía está desordenada y necesita convertirse en un proyecto concreto',
  targetUser: 'personas que quieren resolver el problema con una solución simple y accesible',
  value: 'claridad, foco y una primera versión ejecutable desde el móvil',
  mvp: ['Pantalla o documento principal', 'Resultado útil visible', 'Checklist de tareas', 'Forma simple de compartir feedback'],
  phases: ['Entender', 'Planificar', 'Construir', 'Validar'],
  tools: ['NEXO Engine', 'Notas', 'GitHub Pages', 'Checklist de feedback'],
  risks: ['Alcance amplio', 'Usuario poco definido', 'Falta de prueba real']
};

function cloneTools(tools = baseTools) { return tools.map((tool) => ({ ...tool })); }
function uid() { return `idea-${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function byId(id) { return document.getElementById(id); }
function clean(text) { return String(text || '').replace(/\s+/g, ' ').trim(); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char])); }
function short(text, length = 70) { return text.length <= length ? text : `${text.slice(0, length - 1)}…`; }

function initialState() {
  return { ideas: [], selectedId: null, tools: cloneTools(), chat: {}, lastUpdated: null };
}

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved) return initialState();
    return { ...initialState(), ...saved, tools: cloneTools(saved.tools?.length ? saved.tools : baseTools), chat: saved.chat || {} };
  } catch {
    return initialState();
  }
}

function saveState() {
  state.lastUpdated = new Date().toISOString();
  localStorage.setItem(storageKey, JSON.stringify(state));
  renderSavedStatus();
}

function templateFor(idea) {
  const lower = idea.toLowerCase();
  return templates.find((template) => template.keywords.some((keyword) => lower.includes(keyword))) || defaultTemplate;
}

function projectNameFrom(idea, template) {
  const words = idea.replace(/[¿?¡!.,]/g, '').split(' ').filter((word) => word.length > 3).slice(0, 3);
  const base = words.length ? words.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ') : 'Proyecto NEXO';
  return `${base} ${template.type === 'general' ? 'Lab' : 'Pilot'}`;
}

function buildEnginePlan(idea) {
  const template = templateFor(idea);
  const projectName = projectNameFrom(idea, template);
  const tasks = [
    `Escribir en 3 líneas qué problema resuelve ${projectName}.`,
    `Definir el primer usuario: ${template.targetUser}.`,
    `Construir el MVP inicial: ${template.mvp[0]}.`,
    `Crear una prueba de valor: ${template.value}.`,
    'Compartir el resumen con 3 personas y registrar respuestas.',
    'Elegir una mejora usando feedback real, no suposiciones.'
  ];

  return {
    projectName,
    originalIdea: idea,
    summary: short(idea, 150),
    problem: template.problem,
    targetUser: template.targetUser,
    valueProposition: template.value,
    mvpScope: template.mvp,
    phases: template.phases.map((phase, index) => ({ name: phase, detail: phaseDetail(phase, index, template) })),
    tasks,
    tools: template.tools,
    risks: template.risks,
    nextActions: [
      'Pulir el problema en una frase que cualquier persona entienda.',
      'Crear la primera pantalla, documento u oferta mínima.',
      'Pedir feedback a una persona real hoy y guardar la respuesta.'
    ],
    createdAt: new Date().toISOString()
  };
}

function phaseDetail(phase, index, template) {
  const details = [
    `Aclarar problema, usuario y resultado esperado para ${template.targetUser}.`,
    `Convertir la idea en alcance pequeño: ${template.mvp.slice(0, 2).join(' + ')}.`,
    `Producir una versión compartible usando ${template.tools.slice(0, 2).join(' y ')}.`,
    `Medir respuestas, riesgos y la próxima mejora con evidencia.`
  ];
  return details[index] || `Ejecutar ${phase.toLowerCase()} con foco en valor real.`;
}

function selectedProject() { return state.ideas.find((idea) => idea.id === state.selectedId) || state.ideas[0] || null; }
function completedCount(project = selectedProject()) { return project ? Object.values(project.completed || {}).filter(Boolean).length : 0; }
function totalTasks() { return state.ideas.reduce((sum, idea) => sum + idea.plan.tasks.length, 0); }
function publicCount() { return state.ideas.filter((idea) => idea.public).length; }
function allToolNames() { return Array.from(new Set([...state.tools.map((tool) => tool.name), ...state.ideas.flatMap((idea) => idea.plan.tools)])); }

function setMessage(message = '', isError = false) {
  const element = byId('ideaMessage');
  element.textContent = message;
  element.classList.toggle('error', isError);
}

function renderSavedStatus() {
  const pill = byId('saveStatus');
  const label = byId('lastSaved');
  if (!state.lastUpdated) {
    pill.textContent = 'Local';
    label.textContent = 'Sin guardar todavía';
    return;
  }
  const date = new Date(state.lastUpdated).toLocaleString('es', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  pill.textContent = 'Guardado';
  label.textContent = `Guardado localmente: ${date}`;
}

function renderStats() {
  byId('ideasCount').textContent = state.ideas.length;
  byId('tasksCount').textContent = totalTasks();
  byId('toolsCount').textContent = allToolNames().length;
  byId('completedCount').textContent = completedCount();
}

function renderIdeas() {
  const list = byId('ideaHistory');
  if (!state.ideas.length) {
    list.innerHTML = '<div class="empty-state">Tus ideas aparecerán aquí como tarjetas. Podrás seleccionarlas, hacerlas públicas o privadas y compartir un resumen limpio.</div>';
    return;
  }
  list.innerHTML = state.ideas.map((idea) => `
    <article class="idea-card ${idea.id === state.selectedId ? 'selected' : ''}" data-idea-card="${idea.id}">
      <button type="button" class="idea-main" data-select-idea="${idea.id}">
        <span class="idea-title">${escapeHtml(idea.plan.projectName)}</span>
        <span class="idea-summary">${escapeHtml(short(idea.plan.summary, 96))}</span>
      </button>
      <div class="idea-actions">
        <button type="button" class="mini-button" data-toggle-public="${idea.id}">${idea.public ? 'Público' : 'Privado'}</button>
        <button type="button" class="mini-button" data-share-idea="${idea.id}">Compartir</button>
      </div>
    </article>
  `).join('');
}

function renderPlan() {
  const project = selectedProject();
  const output = byId('planOutput');
  if (!project) {
    output.className = 'empty-state';
    output.textContent = 'Captura una idea para que NEXO Engine genere nombre, problema, usuario, propuesta, MVP, fases, tareas y próximas acciones.';
    return;
  }
  const plan = project.plan;
  output.className = 'plan-stack';
  output.innerHTML = `
    <article class="info-card hero-plan"><p class="eyebrow">Proyecto seleccionado</p><h3>${escapeHtml(plan.projectName)}</h3><p>${escapeHtml(plan.summary)}</p><span class="visibility-pill">${project.public ? 'Público' : 'Privado'}</span></article>
    <article class="info-card"><p class="eyebrow">Problema</p><p>${escapeHtml(plan.problem)}</p></article>
    <article class="info-card"><p class="eyebrow">Usuario objetivo</p><p>${escapeHtml(plan.targetUser)}</p></article>
    <article class="info-card accent-card"><p class="eyebrow">Propuesta de valor</p><p>${escapeHtml(plan.valueProposition)}</p></article>
    <article class="info-card"><p class="eyebrow">Alcance MVP</p><ul>${plan.mvpScope.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></article>
    <article class="info-card"><p class="eyebrow">Fases</p><div class="phase-grid">${plan.phases.map((phase) => `<div><strong>${escapeHtml(phase.name)}</strong><span>${escapeHtml(phase.detail)}</span></div>`).join('')}</div></article>
    <article class="info-card"><p class="eyebrow">Tareas checkables</p><div class="task-list">${plan.tasks.map((task, index) => `<label class="task-item"><input type="checkbox" data-task-index="${index}" ${project.completed?.[index] ? 'checked' : ''} /><span>${escapeHtml(task)}</span></label>`).join('')}</div></article>
    <article class="info-card"><p class="eyebrow">Herramientas recomendadas</p><div class="tool-tags">${plan.tools.map((tool) => `<span>${escapeHtml(tool)}</span>`).join('')}</div></article>
    <article class="info-card"><p class="eyebrow">Riesgos</p><ul>${plan.risks.map((risk) => `<li>${escapeHtml(risk)}</li>`).join('')}</ul></article>
    <article class="info-card"><p class="eyebrow">Próximas 3 acciones</p><ol>${plan.nextActions.map((action) => `<li>${escapeHtml(action)}</li>`).join('')}</ol></article>
  `;
  output.querySelectorAll('[data-task-index]').forEach((input) => input.addEventListener('change', handleTaskToggle));
}

function renderTools() {
  byId('toolList').innerHTML = state.tools.map((tool) => `
    <article class="tool-card"><div><h3>${escapeHtml(tool.name)}</h3><p>${escapeHtml(tool.description || 'Herramienta guardada localmente.')}</p></div><span class="price-pill">${escapeHtml(tool.price || 'Gratis')}</span></article>
  `).join('');
}

function renderChat() {
  const project = selectedProject();
  const panel = byId('chatHistory');
  if (!project) {
    panel.innerHTML = '<div class="empty-state">Genera o selecciona un proyecto para conversar con NEXO Engine.</div>';
    return;
  }
  const messages = state.chat[project.id] || [];
  if (!messages.length) {
    panel.innerHTML = '<div class="empty-state">Pregunta algo como: “¿Qué hago primero?” o “¿Cuál es el mayor riesgo?”.</div>';
    return;
  }
  panel.innerHTML = messages.map((message) => `<div class="chat-bubble ${message.role}"><span>${message.role === 'user' ? 'Tú' : 'NEXO'}</span><p>${escapeHtml(message.text)}</p></div>`).join('');
  panel.scrollTop = panel.scrollHeight;
}

function syncUi() {
  renderStats();
  renderSavedStatus();
  renderIdeas();
  renderPlan();
  renderTools();
  renderChat();
  updateActiveNav();
}

function scrollToSection(id) {
  const target = byId(id);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
  updateActiveNav();
}

function createProject() {
  const idea = clean(byId('ideaInput').value);
  if (!idea) {
    setMessage('Escribe una idea primero. Ejemplo: “Quiero crear un negocio desde mi teléfono”.', true);
    scrollToSection('idea');
    byId('ideaInput').focus();
    return;
  }
  const existing = state.ideas.find((item) => item.originalIdea.toLowerCase() === idea.toLowerCase());
  if (existing) {
    state.selectedId = existing.id;
    setMessage('Idea existente seleccionada. Puedes seguir trabajando desde el plan.');
  } else {
    const project = { id: uid(), originalIdea: idea, public: false, completed: {}, plan: buildEnginePlan(idea) };
    state.ideas = [project, ...state.ideas].slice(0, 20);
    state.selectedId = project.id;
    setMessage('Proyecto creado y guardado localmente.');
  }
  saveState();
  syncUi();
  scrollToSection('plan');
}

function selectIdea(id) {
  state.selectedId = id;
  const project = selectedProject();
  byId('ideaInput').value = project?.originalIdea || '';
  saveState();
  syncUi();
  scrollToSection('plan');
}

function togglePublic(id) {
  const project = state.ideas.find((idea) => idea.id === id);
  if (!project) return;
  project.public = !project.public;
  saveState();
  syncUi();
}

function handleTaskToggle(event) {
  const project = selectedProject();
  if (!project) return;
  project.completed = { ...(project.completed || {}), [event.target.dataset.taskIndex]: event.target.checked };
  saveState();
  renderStats();
}

function summaryText(project = selectedProject()) {
  if (!project) return '';
  const plan = project.plan;
  return [
    `NEXO Engine v1 — ${plan.projectName}`,
    `Estado: ${project.public ? 'Público' : 'Privado'}`,
    '',
    `Idea: ${project.originalIdea}`,
    `Problema: ${plan.problem}`,
    `Usuario: ${plan.targetUser}`,
    `Propuesta de valor: ${plan.valueProposition}`,
    '',
    'MVP:',
    ...plan.mvpScope.map((item) => `- ${item}`),
    '',
    'Fases:',
    ...plan.phases.map((phase) => `- ${phase.name}: ${phase.detail}`),
    '',
    'Tareas:',
    ...plan.tasks.map((task, index) => `${index + 1}. ${project.completed?.[index] ? '[x]' : '[ ]'} ${task}`),
    '',
    'Próximas 3 acciones:',
    ...plan.nextActions.map((action) => `- ${action}`)
  ].join('\n');
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    setMessage(successMessage);
  } catch {
    const area = byId('ideaInput');
    area.value = text;
    area.select();
    setMessage('No se pudo copiar automáticamente; el texto quedó seleccionado para copiar manualmente.', true);
  }
}

function shareProject(id) {
  const project = state.ideas.find((idea) => idea.id === id) || selectedProject();
  if (!project) { setMessage('Crea un proyecto antes de compartir.', true); return; }
  copyText(summaryText(project), 'Resumen limpio copiado para compartir.');
}

function copyPlan() {
  const text = summaryText();
  if (!text) { setMessage('Crea un proyecto antes de copiar.', true); return; }
  copyText(text, 'Plan copiado al portapapeles.');
}

function downloadPlan() {
  const text = summaryText();
  if (!text) { setMessage('Crea un proyecto antes de descargar.', true); return; }
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'nexo-engine-v1-project.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setMessage('Proyecto descargado como .txt.');
}

function resetProject() {
  state = initialState();
  localStorage.removeItem(storageKey);
  byId('ideaInput').value = '';
  byId('chatInput').value = '';
  setMessage('NEXO reiniciado. Puedes crear un proyecto nuevo.');
  syncUi();
  scrollToSection('inicio');
}

function addTool(event) {
  event.preventDefault();
  const name = clean(byId('toolName').value);
  const price = clean(byId('toolPrice').value) || 'Gratis';
  if (!name) { setMessage('Escribe el nombre de la herramienta antes de añadirla.', true); scrollToSection('tools'); return; }
  state.tools = [{ name, price, description: 'Herramienta personalizada guardada localmente.' }, ...state.tools];
  byId('toolName').value = '';
  byId('toolPrice').value = '';
  saveState();
  setMessage('Herramienta añadida y guardada.');
  syncUi();
  scrollToSection('tools');
}

function engineAnswer(question, project) {
  const q = question.toLowerCase();
  const plan = project.plan;
  if (q.includes('primero') || q.includes('empezar') || q.includes('siguiente')) return `Empieza por esto: ${plan.nextActions[0]} Después completa la primera tarea del checklist y pide feedback rápido.`;
  if (q.includes('riesgo') || q.includes('bloqueo')) return `El mayor riesgo es: ${plan.risks[0]}. Para reducirlo, valida con una persona real antes de ampliar el MVP.`;
  if (q.includes('mvp') || q.includes('alcance')) return `Tu MVP debe mantenerse pequeño: ${plan.mvpScope.join(' + ')}. No agregues funciones hasta confirmar interés.`;
  if (q.includes('usuario') || q.includes('cliente')) return `El usuario inicial es: ${plan.targetUser}. Escribe un mensaje directo para preguntarle si este problema le duele hoy.`;
  if (q.includes('compartir') || q.includes('venta') || q.includes('vender')) return `Comparte esta propuesta: ${plan.valueProposition}. Usa el botón Compartir para copiar un resumen limpio.`;
  return `Para “${question}”, NEXO recomienda mirar el plan de ${plan.projectName}: problema claro, MVP pequeño y una acción hoy: ${plan.nextActions[0]}`;
}

function sendChat(event) {
  event.preventDefault();
  const project = selectedProject();
  const input = byId('chatInput');
  const question = clean(input.value);
  if (!project) { setMessage('Crea o selecciona un proyecto antes de usar el chat.', true); scrollToSection('idea'); return; }
  if (!question) return;
  const messages = state.chat[project.id] || [];
  messages.push({ role: 'user', text: question, at: new Date().toISOString() });
  messages.push({ role: 'engine', text: engineAnswer(question, project), at: new Date().toISOString() });
  state.chat[project.id] = messages.slice(-30);
  input.value = '';
  saveState();
  renderChat();
  renderSavedStatus();
}

function updateActiveNav() {
  const sections = ['inicio', 'idea', 'history', 'plan', 'chat', 'builder', 'tools'];
  const current = sections.reduce((active, id) => {
    const section = byId(id);
    if (section && section.getBoundingClientRect().top <= 130) return id;
    return active;
  }, 'inicio');
  document.querySelectorAll('[data-scroll-target]').forEach((control) => control.classList.toggle('active', control.dataset.scrollTarget === current));
}

function bindEvents() {
  byId('heroCapture').addEventListener('click', () => scrollToSection('idea'));
  byId('heroPlan').addEventListener('click', () => scrollToSection('plan'));
  byId('captureIdea').addEventListener('click', createProject);
  byId('generatePlan').addEventListener('click', createProject);
  byId('copyPlan').addEventListener('click', copyPlan);
  byId('downloadPlan').addEventListener('click', downloadPlan);
  byId('resetProject').addEventListener('click', resetProject);
  byId('toolForm').addEventListener('submit', addTool);
  byId('chatForm').addEventListener('submit', sendChat);
  document.addEventListener('click', (event) => {
    const select = event.target.closest('[data-select-idea]');
    const toggle = event.target.closest('[data-toggle-public]');
    const share = event.target.closest('[data-share-idea]');
    const scroll = event.target.closest('[data-scroll-target]');
    if (select) selectIdea(select.dataset.selectIdea);
    if (toggle) togglePublic(toggle.dataset.togglePublic);
    if (share) shareProject(share.dataset.shareIdea);
    if (scroll) { event.preventDefault(); scrollToSection(scroll.dataset.scrollTarget); }
  });
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('hashchange', updateActiveNav);
}

const project = selectedProject();
byId('ideaInput').value = project?.originalIdea || '';
bindEvents();
syncUi();
