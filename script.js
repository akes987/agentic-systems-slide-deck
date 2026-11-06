const stage = document.querySelector(".stage");
const preferredOrder = [
  "Building agentic systems",
  "The evolution of agentic systems",
  "How organizations adopted agents",
  "The autonomy spectrum",
  "The anatomy of an agentic system",
  "An agentic system in action",
  "The delivery run uses every component",
  "The growing decision surface",
  "The production cost of direct tool exposure",
  "One delivery question creates nine tool decisions",
  "The model rebuilds the workflow",
  "Repeatable choreography below the main model",
  "A bounded delivery capability request",
  "The internal delivery investigation",
  "Structured evidence and allowed options",
  "Nine visible tools become one domain capability",
  "Another example: loan eligibility",
  "Approach 1: prompt-owned workflow",
  "Approach 2: domain-owned capability",
  "Implementation lessons from both cases",
  "Industry patterns for domain expertise",
  "Where should reasoning happen?",
  "Reasoning boundaries",
  "A task split across the right mechanisms",
  "How do we know it worked?",
  "Layered evaluation",
  "Tracing the execution path",
  "Production design checklist",
  "Articles and references",
  "Reliable agents have deliberate boundaries",
];

const slidesByTitle = new Map(Array.from(document.querySelectorAll(".slide")).map((slide) => [slide.dataset.title, slide]));
preferredOrder.forEach((title) => stage.appendChild(slidesByTitle.get(title)));

const slides = Array.from(document.querySelectorAll(".slide"));
let sectionNumber = 1;
slides.forEach((slide) => {
  const number = slide.querySelector(".section-number");
  if (!number) return;
  number.textContent = String(sectionNumber).padStart(2, "0");
  sectionNumber += 1;
});
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const currentSlideLabel = document.querySelector("#current-slide");
const totalSlidesLabel = document.querySelector("#total-slides");
const progressFill = document.querySelector("#progress-fill");
const helpButton = document.querySelector("#help-button");
const helpPanel = document.querySelector("#help-panel");

let currentIndex = 0;
let touchStartX = null;

function clamp(index) {
  return Math.max(0, Math.min(index, slides.length - 1));
}

function indexFromHash() {
  const requestedSlide = Number.parseInt(window.location.hash.slice(1), 10);
  return Number.isNaN(requestedSlide) ? 0 : clamp(requestedSlide - 1);
}

function updateControls() {
  currentSlideLabel.textContent = String(currentIndex + 1);
  totalSlidesLabel.textContent = String(slides.length);
  progressFill.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === slides.length - 1;
}

function showSlide(nextIndex, { updateHash = true } = {}) {
  const safeIndex = clamp(nextIndex);
  slides[currentIndex].classList.remove("is-active");
  slides[currentIndex].setAttribute("aria-hidden", "true");
  currentIndex = safeIndex;
  slides[currentIndex].classList.add("is-active");
  slides[currentIndex].removeAttribute("aria-hidden");
  document.title = `${slides[currentIndex].dataset.title} · Building agentic systems`;
  updateControls();
  if (updateHash) history.replaceState(null, "", `#${currentIndex + 1}`);
}

function closeHelp() {
  helpPanel.hidden = true;
  helpButton.setAttribute("aria-expanded", "false");
}

function toggleHelp() {
  const shouldOpen = helpPanel.hidden;
  helpPanel.hidden = !shouldOpen;
  helpButton.setAttribute("aria-expanded", String(shouldOpen));
}

async function toggleFullscreen() {
  if (document.fullscreenElement) await document.exitFullscreen();
  else await document.documentElement.requestFullscreen();
}

previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
nextButton.addEventListener("click", () => showSlide(currentIndex + 1));
helpButton.addEventListener("click", toggleHelp);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !helpPanel.hidden) {
    closeHelp();
    return;
  }

  const actions = {
    ArrowLeft: () => showSlide(currentIndex - 1),
    ArrowRight: () => showSlide(currentIndex + 1),
    PageUp: () => showSlide(currentIndex - 1),
    PageDown: () => showSlide(currentIndex + 1),
    Home: () => showSlide(0),
    End: () => showSlide(slides.length - 1),
    f: toggleFullscreen,
    F: toggleFullscreen,
    "?": toggleHelp,
  };

  if (actions[event.key]) {
    event.preventDefault();
    actions[event.key]();
  }
});

window.addEventListener("hashchange", () => showSlide(indexFromHash(), { updateHash: false }));

document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) > 50) showSlide(currentIndex + (distance < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });

slides.forEach((slide, index) => {
  if (index !== 0) slide.setAttribute("aria-hidden", "true");
});

showSlide(indexFromHash(), { updateHash: window.location.hash === "" });
