const storageKey = 'nexo-pages-clean-state';

const starterTools = [
  { name: 'Generador de roadmap', price: 'Gratis', description: 'Convierte metas en fases, tareas y prioridades.' },
  { name: 'Checklist de lanzamiento', price: '$5', description: 'Lista compacta para publicar una versión inicial sin olvidar pasos críticos.' },
  { name: 'Validador de idea', price: 'Gratis', description: 'Preguntas simples para confirmar problema, usuario y propuesta de valor.' }
];

const builderBlocks = [
  { title: 'Captura', text: 'Recibe una idea en lenguaje natural desde móvil.' },
  { title: 'Plan', text: 'Divide la idea en objetivo, fases y tareas.' },
  { title: 'Herramienta', text: 'Guarda recursos que pueden ser privados, gratis o de pago.' },
  { title: 'Publicación', text: 'Prepara el proyecto para compartirlo como página estática.' }
];

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved || { ideas: [], tasks: [], tools: starterTools };
  } catch {
    return { ideas: [], tasks: [], tools: starterTools };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function byId(id) {
  return document.getElementById(id);
}

function makePlan(idea) {
  const cleanIdea = idea.trim();
  const tasks = [
    `Definir el usuario principal para: ${cleanIdea}`,
    'Escribir una propuesta de valor en una frase.',
    'Crear una lista de funcionalidades mínimas.',
    'Diseñar una pantalla mobile-first para el flujo principal.',
    'Publicar una primera versión navegable y pedir feedback.'
  ];

  return {
    objective: `Transformar “${cleanIdea}” en un proyecto validable desde navegador móvil.`,
    phases: ['Clarificar', 'Construir MVP', 'Compartir', 'Mejorar'],
    tasks
  };
}

function renderPlan() {
  const output = byId('planOutput');
  if (!state.plan) {
    output.className = 'empty-state';
    output.textContent = 'Captura una idea para crear objetivos, fases y tareas accionables.';
    return;
  }

  output.className = '';
  output.innerHTML = `
    <article class="plan-card">
      <p class="eyebrow">Objetivo</p>
      <h3>${escapeHtml(state.plan.objective)}</h3>
    </article>
    <article class="plan-card">
      <p class="eyebrow">Fases</p>
      <ul>${state.plan.phases.map((phase) => `<li>${escapeHtml(phase)}</li>`).join('')}</ul>
    </article>
    <article class="plan-card">
      <p class="eyebrow">Tareas</p>
      <ul>${state.plan.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join('')}</ul>
    </article>
  `;
}

function renderTools() {
  byId('toolList').innerHTML = state.tools.map((tool) => `
    <article class="tool-card">
      <h3>${escapeHtml(tool.name)}</h3>
      <p class="muted">${escapeHtml(tool.description || 'Herramienta guardada por el usuario para uso personal o publicación.')}</p>
      <span class="price-pill">${escapeHtml(tool.price || 'Gratis')}</span>
    </article>
  `).join('');
}

function renderBlocks() {
  byId('builderBlocks').innerHTML = builderBlocks.map((block) => `
    <article class="block-card">
      <h3>${escapeHtml(block.title)}</h3>
      <p class="muted">${escapeHtml(block.text)}</p>
    </article>
  `).join('');
}

function renderStats() {
  byId('ideasCount').textContent = state.ideas.length;
  byId('tasksCount').textContent = state.tasks.length;
  byId('toolsCount').textContent = state.tools.length;
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
  state = { ideas: [], tasks: [], tools: starterTools };
  byId('ideaInput').value = '';
  saveState();
  renderPlan();
  renderTools();
  renderStats();
});

byId('toolForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = byId('toolName').value.trim();
  const price = byId('toolPrice').value.trim() || 'Gratis';
  if (!name) return;
  state.tools.unshift({ name, price, description: 'Herramienta creada desde NEXO para guardar, compartir o vender.' });
  byId('toolForm').reset();
  saveState();
  renderTools();
  renderStats();
});

window.addEventListener('hashchange', updateActiveNav);

renderBlocks();
renderPlan();
renderTools();
renderStats();
updateActiveNav();
