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

function initialState() {
  return {
    ideas: [],
    lastIdea: '',
    tasks: [],
    tools: [],
    plan: null,
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

function summarizeIdea(idea) {
  const cleanIdea = idea.replace(/\s+/g, ' ').trim();
  if (cleanIdea.length <= 130) return cleanIdea;
  return `${cleanIdea.slice(0, 127)}...`;
}

function inferAudience(idea) {
  const lowerIdea = idea.toLowerCase();
  if (lowerIdea.includes('venta') || lowerIdea.includes('tienda') || lowerIdea.includes('cliente')) return 'clientes que necesitan comprar o solicitar el servicio rápido desde móvil';
  if (lowerIdea.includes('estudiante') || lowerIdea.includes('curso') || lowerIdea.includes('aprender')) return 'personas que quieren aprender con pasos simples y seguimiento claro';
  if (lowerIdea.includes('negocio') || lowerIdea.includes('empresa')) return 'equipos pequeños que necesitan organizar operación, tareas y entregables';
  return 'usuarios que necesitan resolver el problema principal con la menor fricción posible';
}

function recommendTools(idea) {
  const lowerIdea = idea.toLowerCase();
  const tools = ['NEXO Planner', 'Checklist de validación', 'Tablero de tareas móvil'];

  if (lowerIdea.includes('venta') || lowerIdea.includes('tienda') || lowerIdea.includes('pago')) {
    tools.push('Catálogo simple', 'Calculadora de precios');
  } else if (lowerIdea.includes('contenido') || lowerIdea.includes('redes') || lowerIdea.includes('marketing')) {
    tools.push('Calendario de contenido', 'Generador de mensajes');
  } else if (lowerIdea.includes('app') || lowerIdea.includes('web') || lowerIdea.includes('sitio')) {
    tools.push('Wireframe mobile', 'Publicador GitHub Pages');
  } else {
    tools.push('Mapa de usuario', 'Documento de alcance');
  }

  return tools.slice(0, 5);
}

function makePlan(idea) {
  const cleanIdea = idea.replace(/\s+/g, ' ').trim();
  const audience = inferAudience(cleanIdea);
  const tools = recommendTools(cleanIdea);
  const tasks = [
    `Definir el usuario principal: ${audience}.`,
    'Escribir el problema en una frase y confirmar que es urgente o frecuente.',
    'Diseñar una pantalla móvil con el flujo principal de inicio a resultado.',
    'Construir un MVP estático con captura de datos, plan visible y persistencia local.',
    'Probar el flujo completo en un teléfono y anotar 3 mejoras prioritarias.'
  ];

  return {
    summary: summarizeIdea(cleanIdea),
    objective: `Convertir la idea en una primera solución usable para ${audience}.`,
    mvp: 'Una página mobile-first que capture la necesidad, muestre un resultado útil, guarde el progreso en el dispositivo y pueda publicarse con GitHub Pages.',
    tasks,
    tools,
    nextAction: 'Crear el primer prototipo navegable con una sola pantalla crítica y probarlo hoy con una persona real.'
  };
}

function renderStats() {
  byId('ideasCount').textContent = state.ideas.length;
  byId('tasksCount').textContent = state.tasks.length;
  byId('toolsCount').textContent = state.tools.length;
}

function renderPlan() {
  const output = byId('planOutput');
  if (!state.plan) {
    output.className = 'empty-state';
    output.textContent = 'Captura una idea para generar resumen, objetivo, MVP, 5 tareas, herramientas y próxima acción.';
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
      <p class="eyebrow">MVP sugerido</p>
      <p>${escapeHtml(state.plan.mvp)}</p>
    </article>
    <article class="info-card">
      <p class="eyebrow">5 tareas concretas</p>
      <ol>${state.plan.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join('')}</ol>
    </article>
    <article class="info-card">
      <p class="eyebrow">Herramientas recomendadas</p>
      <div class="tool-tags">${state.plan.tools.map((tool) => `<span>${escapeHtml(tool)}</span>`).join('')}</div>
    </article>
    <article class="info-card accent-card">
      <p class="eyebrow">Próxima acción</p>
      <p>${escapeHtml(state.plan.nextAction)}</p>
    </article>
  `;
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

function captureAndPlan() {
  const idea = byId('ideaInput').value.trim();
  if (!idea) {
    byId('ideaInput').focus();
    return;
  }

  const plan = makePlan(idea);
  state.lastIdea = idea;
  state.ideas = [idea, ...state.ideas.filter((savedIdea) => savedIdea !== idea)].slice(0, 10);
  state.plan = plan;
  state.tasks = plan.tasks;
  state.tools = plan.tools;
  saveState();
  renderPlan();
  renderStats();
  window.location.hash = '#planner';
}

function resetData() {
  state = initialState();
  byId('ideaInput').value = '';
  localStorage.removeItem(storageKey);
  renderPlan();
  renderAgents();
  renderBlocks();
  renderStats();
}

byId('captureIdea').addEventListener('click', captureAndPlan);
byId('generatePlan').addEventListener('click', captureAndPlan);
byId('clearData').addEventListener('click', resetData);
window.addEventListener('hashchange', updateActiveNav);

byId('ideaInput').value = state.lastIdea || '';
renderPlan();
renderAgents();
renderBlocks();
renderStats();
updateActiveNav();
