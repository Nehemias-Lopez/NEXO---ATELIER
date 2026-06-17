const storageKey = 'nexo-atelier-stable-plan';

const defaultTools = [
  { name: 'Notas del teléfono', use: 'Capturar decisiones y feedback rápido.' },
  { name: 'GitHub Pages', use: 'Publicar una página estática simple.' },
  { name: 'WhatsApp o email', use: 'Compartir el plan y pedir validación.' }
];

const categories = [
  { name: 'Comercio digital', words: ['vender', 'tienda', 'producto', 'plantilla', 'plantillas', 'pago', 'cliente'], objective: 'validar una oferta clara y conseguir los primeros interesados desde el móvil' },
  { name: 'Software', words: ['app', 'software', 'plataforma', 'web', 'sistema', 'automatizar'], objective: 'probar un flujo útil antes de construir funciones avanzadas' },
  { name: 'Contenido', words: ['contenido', 'tiktok', 'youtube', 'instagram', 'redes', 'video'], objective: 'crear un formato repetible y medir qué responde la audiencia' },
  { name: 'Negocio', words: ['negocio', 'dinero', 'ingreso', 'emprender', 'monetizar'], objective: 'convertir una habilidad o idea en una oferta simple con valor real' }
];

let state = loadState();

function byId(id) {
  return document.getElementById(id);
}

function clean(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function escapeHtml(text) {
  return String(text).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || { idea: '', plan: null, savedAt: null };
  } catch {
    return { idea: '', plan: null, savedAt: null };
  }
}

function saveState() {
  state.savedAt = new Date().toISOString();
  localStorage.setItem(storageKey, JSON.stringify(state));
  renderSavedStatus();
}

function detectCategory(idea) {
  const lower = idea.toLowerCase();
  return categories.find((category) => category.words.some((word) => lower.includes(word))) || {
    name: 'Proyecto general',
    objective: 'convertir la idea en un primer resultado pequeño, claro y compartible'
  };
}

function titleFromIdea(idea) {
  const words = idea.replace(/[¿?¡!.,]/g, '').split(' ').filter((word) => word.length > 3).slice(0, 3);
  if (!words.length) return 'Proyecto NEXO';
  return words.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function generatePlanFromIdea(idea) {
  const category = detectCategory(idea);
  const title = titleFromIdea(idea);
  return {
    title,
    category: category.name,
    objective: `Usar “${idea}” para ${category.objective}.`,
    nextAction: 'Hoy: escribe la versión más simple del resultado, compártela con una persona real y anota su respuesta.',
    tasks: [
      'Definir quién necesita esta solución y por qué le importa ahora.',
      'Escribir el resultado prometido en una frase clara.',
      'Crear una primera pantalla, documento u oferta mínima.',
      'Compartir el plan con una persona y pedir feedback específico.',
      'Elegir una mejora pequeña basada en la respuesta recibida.'
    ]
  };
}

function setMessage(text, isError = false) {
  const message = byId('message');
  message.textContent = text;
  message.classList.toggle('error', isError);
}

function renderSavedStatus() {
  const status = byId('saveStatus');
  const saved = byId('lastSaved');
  if (!state.savedAt) {
    status.textContent = 'Local';
    saved.textContent = 'Sin guardar todavía';
    return;
  }
  const label = new Date(state.savedAt).toLocaleString('es', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  status.textContent = 'Guardado';
  saved.textContent = `Guardado localmente: ${label}`;
}

function renderPlan() {
  const target = byId('planResult');
  if (!state.plan) {
    target.className = 'empty';
    target.textContent = 'Todavía no hay plan. Captura una idea para empezar.';
    return;
  }
  target.className = 'plan-stack';
  target.innerHTML = `
    <article class="card accent"><p class="eyebrow">Título del proyecto</p><h3>${escapeHtml(state.plan.title)}</h3></article>
    <article class="card"><p class="eyebrow">Objetivo</p><p>${escapeHtml(state.plan.objective)}</p></article>
    <article class="card"><p class="eyebrow">Categoría</p><p>${escapeHtml(state.plan.category)}</p></article>
    <article class="card accent"><p class="eyebrow">Próxima acción</p><p>${escapeHtml(state.plan.nextAction)}</p></article>
    <article class="card"><p class="eyebrow">5 tareas simples</p><ol class="task-list">${state.plan.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join('')}</ol></article>
  `;
}

function renderTools() {
  byId('toolList').innerHTML = defaultTools.map((tool) => `
    <article class="tool-card"><strong>${escapeHtml(tool.name)}</strong><span>${escapeHtml(tool.use)}</span></article>
  `).join('');
}

function render() {
  byId('ideaInput').value = state.idea || '';
  renderSavedStatus();
  renderPlan();
  renderTools();
  updateActiveNav();
}

function scrollToSection(id) {
  const section = byId(id);
  if (!section) return;
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
  updateActiveNav();
}

function captureIdea() {
  const idea = clean(byId('ideaInput').value);
  if (!idea) {
    setMessage('Escribe una idea primero. Ejemplo: “Quiero vender plantillas digitales desde mi teléfono”.', true);
    scrollToSection('idea');
    byId('ideaInput').focus();
    return;
  }
  state.idea = idea;
  state.plan = generatePlanFromIdea(idea);
  saveState();
  setMessage('Plan generado y guardado en este dispositivo.');
  renderPlan();
  scrollToSection('plan');
}

function planAsText() {
  if (!state.plan) return '';
  return [
    `ATELIER / NEXO — ${state.plan.title}`,
    `Idea: ${state.idea}`,
    `Categoría: ${state.plan.category}`,
    `Objetivo: ${state.plan.objective}`,
    `Próxima acción: ${state.plan.nextAction}`,
    '',
    'Tareas:',
    ...state.plan.tasks.map((task, index) => `${index + 1}. ${task}`)
  ].join('\n');
}

async function copyPlan() {
  const text = planAsText();
  if (!text) {
    setMessage('Genera un plan antes de copiarlo.', true);
    scrollToSection('idea');
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    setMessage('Plan copiado al portapapeles.');
  } catch {
    const input = byId('ideaInput');
    input.value = text;
    input.select();
    setMessage('No se pudo copiar automáticamente; el texto quedó seleccionado para copiar manualmente.', true);
  }
}

function resetApp() {
  state = { idea: '', plan: null, savedAt: null };
  localStorage.removeItem(storageKey);
  byId('ideaInput').value = '';
  setMessage('Listo. Puedes capturar una idea nueva.');
  render();
  scrollToSection('inicio');
}

function updateActiveNav() {
  const ids = ['inicio', 'idea', 'plan', 'tools'];
  const active = ids.reduce((current, id) => {
    const section = byId(id);
    return section && section.getBoundingClientRect().top <= 130 ? id : current;
  }, 'inicio');
  document.querySelectorAll('[data-target]').forEach((button) => button.classList.toggle('active', button.dataset.target === active));
}

function bindEvents() {
  byId('heroCapture').addEventListener('click', () => scrollToSection('idea'));
  byId('heroPlan').addEventListener('click', () => scrollToSection('plan'));
  byId('captureIdea').addEventListener('click', captureIdea);
  byId('generatePlan').addEventListener('click', captureIdea);
  byId('copyPlan').addEventListener('click', copyPlan);
  byId('resetApp').addEventListener('click', resetApp);
  document.querySelectorAll('[data-target]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      scrollToSection(button.dataset.target);
    });
  });
  window.addEventListener('scroll', updateActiveNav, { passive: true });
}

bindEvents();
render();
