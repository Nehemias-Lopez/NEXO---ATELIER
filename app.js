const storageKey = 'nexo-atelier-state';

const defaultAgents = [
  { role: 'Estratega', mission: 'Convierte una idea ambigua en objetivo, alcance y prioridades.', status: 'Listo' },
  { role: 'Arquitecto', mission: 'Define bloques técnicos simples para una primera versión navegable.', status: 'Listo' },
  { role: 'Diseñador', mission: 'Cuida claridad, jerarquía visual y experiencia mobile-first.', status: 'Listo' },
  { role: 'Programador', mission: 'Transforma el plan en tareas implementables con HTML, CSS y JavaScript.', status: 'Listo' },
  { role: 'QA', mission: 'Revisa errores, accesibilidad básica y pasos para publicar.', status: 'Listo' }
];

const builderBlocks = [
  { title: 'Pantalla', text: 'Una vista enfocada en una tarea clave del usuario.' },
  { title: 'Formulario', text: 'Entrada simple para capturar información desde móvil.' },
  { title: 'Plan', text: 'Objetivo, fases y tareas persistidas localmente.' },
  { title: 'Agente', text: 'Rol especializado que ayuda a ejecutar una parte del proyecto.' },
  { title: 'Deploy', text: 'Publica el sitio desde el repositorio ATELIER con GitHub Pages.' }
];

let state = loadState();

function initialState() {
  return {
    ideas: [],
    tasks: [],
    plan: null,
    agents: defaultAgents
  };
}

function loadState() {
  try {
    return { ...initialState(), ...JSON.parse(localStorage.getItem(storageKey)) };
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

function makePlan(idea) {
  const cleanIdea = idea.trim();
  const tasks = [
    `Definir usuario principal y problema para: ${cleanIdea}`,
    'Reducir el alcance a una sola experiencia mobile-first.',
    'Crear estructura HTML de las pantallas necesarias.',
    'Aplicar diseño oscuro, legible y táctil para iPhone y Android.',
    'Guardar estado con localStorage para funcionar sin backend.',
    'Publicar desde el repositorio ATELIER y validar GitHub Pages desde un teléfono.'
  ];

  return {
    objective: `Lanzar una versión M0.1 navegable de “${cleanIdea}”.`,
    phases: ['Clarificar', 'Prototipar', 'Persistir', 'Publicar'],
    nextStep: 'Construir la pantalla más importante y probarla con un usuario real.',
    tasks
  };
}

function renderStats() {
  byId('ideasCount').textContent = state.ideas.length;
  byId('tasksCount').textContent = state.tasks.length;
  byId('agentsCount').textContent = state.agents.length;
}

function renderPlan() {
  const output = byId('planOutput');
  if (!state.plan) {
    output.className = 'empty-state';
    output.textContent = 'Captura una idea para generar objetivo, fases, tareas y próximos pasos.';
    return;
  }

  output.className = 'plan-stack';
  output.innerHTML = `
    <article class="info-card">
      <p class="eyebrow">Objetivo</p>
      <h3>${escapeHtml(state.plan.objective)}</h3>
    </article>
    <article class="info-card">
      <p class="eyebrow">Fases</p>
      <ul>${state.plan.phases.map((phase) => `<li>${escapeHtml(phase)}</li>`).join('')}</ul>
    </article>
    <article class="info-card">
      <p class="eyebrow">Tareas</p>
      <ul>${state.plan.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join('')}</ul>
    </article>
    <article class="info-card accent-card">
      <p class="eyebrow">Próximo paso</p>
      <p>${escapeHtml(state.plan.nextStep)}</p>
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

byId('generatePlan').addEventListener('click', () => {
  const idea = byId('ideaInput').value.trim();
  if (!idea) {
    byId('ideaInput').focus();
    return;
  }

  const plan = makePlan(idea);
  state.ideas.unshift(idea);
  state.plan = plan;
  state.tasks = plan.tasks;
  saveState();
  renderPlan();
  renderStats();
  window.location.hash = '#planner';
});

byId('clearData').addEventListener('click', () => {
  state = initialState();
  byId('ideaInput').value = '';
  saveState();
  renderPlan();
  renderAgents();
  renderStats();
});

window.addEventListener('hashchange', updateActiveNav);

renderPlan();
renderAgents();
renderBlocks();
renderStats();
updateActiveNav();
