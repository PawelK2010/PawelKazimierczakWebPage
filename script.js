const form = document.querySelector("#demo-form");
const result = document.querySelector("#demo-result");
const resultMessage = document.querySelector("#result-message");
const languageButtons = document.querySelectorAll("[data-language]");
const copyButton = document.querySelector("#copy-button");
const resetButton = document.querySelector("#reset-button");
let selectedLanguage = "Español";

const dateInput = document.querySelector("#date");
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
dateInput.min = new Date().toISOString().split("T")[0];
dateInput.value = tomorrow.toISOString().split("T")[0];

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedLanguage = button.dataset.language;
    languageButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", active ? "true" : "false");
    });
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const activity = document.querySelector("#activity").value;
  const people = document.querySelector("#people").value;
  const experience = document.querySelector("#experience").value;
  const date = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateInput.value}T12:00:00`));

  resultMessage.textContent = `NUEVA SOLICITUD\n\nActividad: ${activity}\nFecha preferida: ${date}\nPersonas: ${people}\nExperiencia: ${experience}\nIdioma del cliente: ${selectedLanguage}\n\nEstado: datos completos para responder`;
  result.hidden = false;
  copyButton.focus();
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(resultMessage.textContent);
    copyButton.textContent = "Copiado ✓";
    setTimeout(() => { copyButton.textContent = "Copiar mensaje"; }, 1800);
  } catch {
    copyButton.textContent = "Selecciona y copia el texto";
  }
});

resetButton.addEventListener("click", () => {
  result.hidden = true;
  form.querySelector("select").focus();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
