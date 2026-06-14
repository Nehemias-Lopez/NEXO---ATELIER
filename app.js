const screens = [...document.querySelectorAll(".screen")];
const navItems = [...document.querySelectorAll("[data-go]")];
const ideaInput = document.querySelector("#ideaInput");
const generatePlanButton = document.querySelector("#generatePlanButton");
const resetButton = document.querySelector("#resetButton");
const projectStatus = document.querySelector("#projectStatus");
const projectSummary = document.querySelector("#projectSummary");
const planGoal = document.querySelector("#planGoal");
const planDescription = document.querySelector("#planDescription");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const previewTitle = document.querySelector("#previewTitle");
const previewCopy = document.querySelector("#previewCopy");
const agentList = document.querySelector("#agentList");
const toolNameInput = document.querySelector("#toolNameInput");
const toolPriceInput = document.querySelector("#toolPriceInput");
const addToolButton = document.querySelector("#addToolButton");

const templates = {
  landing: "Quiero crear una landing page moderna para validar una idea de negocio y recibir contactos por WhatsApp.",
  negocio: "Quiero estructurar un plan de negocio simple para un emprendimiento local con bajo presupuesto.",
  automatizacion: "Quiero automatizar tareas repetitivas de atención al cliente para ahorrar tiempo cada semana.",
  app: "Quiero crear una app simple para organizar usuarios, tareas y recordatorios desde el navegador."
};

const defaultTools = [
  {
    name: "Estratega de Ideas",
    role: "Gratis",
    description: "Convierte ideas desordenadas en objetivos, alcance y prioridades.",
    price: 0
  },
  {
    name: "Arquitecto de Proyecto",
    role: "Gratis",
    description: "Define módulos, datos, integraciones y límites técnicos para una solución.",
    price: 0
  },
  {
    name: "Diseñador Mobile",
    role: "Pro",
    description: "Propone pantallas, bloques y experiencia mobile-first lista para presentar.",
    price: 9
  },
  {
    name: "Constructor de Landing",
    role: "Gratis",
    description: "Transforma un plan en una estructura inicial de página, secciones y CTA.",
    price: 0
  },
  {
    name: "Revisor QA",
    role: "Pro",
    description: "Revisa claridad, errores, riesgos y pasos incompletos antes de compartir.",
    price: 5
  },
  {
    name: "Analizador de Prioridades",
    role: "Gratis",
    description: "Resume progreso, costos, riesgos y próximas decisiones del proyecto.",
    price: 0
  }
];

let project = loadProject();
let tools = loadTools();

function setScreen(target) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === target);
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.go === target);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function normalizeIdea(value) {
  return value.trim().replace(/\s+/g, " ");
}

function detectProjectType(idea) {
  const text = idea.toLowerCase();

  if (text.includes("landing") || text.includes("página") || text.includes("pagina") || text.includes("web")) {
    return "landing page";
  }

  if (text.includes("automat")) {
    return "automatización";
  }

  if (text.includes("app") || text.includes("aplicación") || text.includes("aplicacion")) {
    return "aplicación web";
  }

  if (text.includes("negocio") || text.includes("emprend")) {
    return "plan de negocio";
  }

  return "proyecto digital";
}

function createPlan(idea) {
  const cleanIdea = normalizeIdea(idea);
  const type = detectProjectType(cleanIdea);
  const shortIdea = cleanIdea.length > 120 ? `${cleanIdea.slice(0, 120)}...` : cleanIdea;

  return {
    idea: cleanIdea,
    type,
    goal: `Crear un primer ${type} útil y compartible desde móvil`,
    description: `NEXO organizará la idea: “${shortIdea}” en un entregable simple, validable y de bajo consumo.`,
    tasks: [
      "Definir usuario objetivo y problema principal.",
      "Escribir una propuesta de valor en una frase clara.",
      "Crear estructura inicial con secciones, beneficios y llamada a la acción.",
      "Preparar una lista mínima de funciones o contenidos necesarios.",
      "Revisar el resultado con QA y simplificar lo que no sea esencial.",
      "Exportar o compartir el primer entregable para recibir feedback."
    ],
    updatedAt: new Date().toISOString()
  };
}

function renderProject() {
  if (!project) {
    projectStatus.textContent = "Sin proyecto activo";
    projectSummary.textContent = "Describe una idea para que NODO genere objetivos, tareas y próximos pasos.";
    planGoal.textContent = "Aún no hay plan";
    planDescription.textContent = "Captura una idea para generar el plan inicial.";
    taskList.innerHTML = "";
    taskCount.textContent = "0";
    previewTitle.textContent = "Tu proyecto aparecerá aquí";
    previewCopy.textContent = "Genera un plan para crear una primera landing o documento.";
    return;
  }

  projectStatus.textContent = `Proyecto activo · ${project.type}`;
  projectSummary.textContent = project.description;
  planGoal.textContent = project.goal;
  planDescription.textContent = project.description;
  taskCount.textContent = project.tasks.length;
  taskList.innerHTML = project.tasks
    .map(
      (task, index) => `
        <li class="task-item">
          <span class="task-index">${index + 1}</span>
          <span>${task}</span>
        </li>
      `
    )
    .join("");
  previewTitle.textContent = project.goal;
  previewCopy.textContent = "Una primera versión clara, ligera y lista para compartir con usuarios reales.";
}

function renderTools() {
  agentList.innerHTML = tools
    .map(
      (tool) => `
        <article class="agent-card">
          <div class="agent-avatar">${tool.name.charAt(0)}</div>
          <div>
            <span class="agent-role">${tool.role}</span>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <span class="tool-price">${tool.price > 0 ? `$${tool.price} USD` : "Gratis"}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function saveTools() {
  localStorage.setItem("nexo-tools", JSON.stringify(tools));
}

function loadTools() {
  const storedTools = localStorage.getItem("nexo-tools");

  if (!storedTools) {
    return defaultTools;
  }

  try {
    const parsedTools = JSON.parse(storedTools);
    return Array.isArray(parsedTools) && parsedTools.length ? parsedTools : defaultTools;
  } catch {
    localStorage.removeItem("nexo-tools");
    return defaultTools;
  }
}

function addTool() {
  const name = normalizeIdea(toolNameInput.value);
  const price = Number(toolPriceInput.value || 0);

  if (!name) {
    toolNameInput.focus();
    return;
  }

  tools = [
    {
      name,
      role: price > 0 ? "De pago" : "Gratis",
      description: "Herramienta guardada por el usuario para reutilizar, compartir o vender en NEXO.",
      price: Math.max(0, price)
    },
    ...tools
  ];

  toolNameInput.value = "";
  toolPriceInput.value = "";
  saveTools();
  renderTools();
}

function saveProject() {
  if (project) {
    localStorage.setItem("nexo-project", JSON.stringify(project));
  } else {
    localStorage.removeItem("nexo-project");
  }
}

function loadProject() {
  const storedProject = localStorage.getItem("nexo-project");

  if (!storedProject) {
    return null;
  }

  try {
    return JSON.parse(storedProject);
  } catch {
    localStorage.removeItem("nexo-project");
    return null;
  }
}

function generatePlan() {
  const idea = normalizeIdea(ideaInput.value);

  if (!idea) {
    ideaInput.focus();
    ideaInput.placeholder = "Escribe una idea antes de generar el plan.";
    return;
  }

  project = createPlan(idea);
  saveProject();
  renderProject();
  setScreen("planner");
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const template = item.dataset.template;

    if (template) {
      ideaInput.value = templates[template];
      setScreen("idea");
      ideaInput.focus();
      return;
    }

    setScreen(item.dataset.go);
  });
});

document.querySelectorAll("[data-prompt]").forEach((chip) => {
  chip.addEventListener("click", () => {
    ideaInput.value = chip.dataset.prompt;
    ideaInput.focus();
  });
});

generatePlanButton.addEventListener("click", generatePlan);

ideaInput.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    generatePlan();
  }
});

resetButton.addEventListener("click", () => {
  project = null;
  ideaInput.value = "";
  saveProject();
  renderProject();
  setScreen("dashboard");
});

addToolButton.addEventListener("click", addTool);

renderTools();
renderProject();
