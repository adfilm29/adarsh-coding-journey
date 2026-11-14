const STORAGE_KEY = "adarsh-coding-journey-progress-v1";
const grid = document.getElementById("day-grid");
const count = document.getElementById("completed-count");
const fill = document.getElementById("progress-fill");
const message = document.getElementById("progress-message");
const percent = document.getElementById("progress-percent");

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter(day => Number.isInteger(day) && day >= 1 && day <= 30) : [];
  } catch {
    return [];
  }
}

let completedDays = new Set(loadProgress());

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedDays]));
}

function renderProgress() {
  grid.replaceChildren();
  for (let day = 1; day <= 30; day += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = completedDays.has(day) ? "day done" : "day";
    button.textContent = String(day).padStart(2, "0");
    button.setAttribute("aria-label", `Day ${day}: ${completedDays.has(day) ? "completed" : "not completed"}`);
    button.setAttribute("aria-pressed", String(completedDays.has(day)));
    button.addEventListener("click", () => {
      if (completedDays.has(day)) completedDays.delete(day);
      else completedDays.add(day);
      saveProgress();
      renderProgress();
    });
    grid.append(button);
  }

  const total = completedDays.size;
  const completion = Math.round((total / 30) * 100);
  count.innerHTML = `${total} <small>/ 30</small>`;
  fill.style.width = `${completion}%`;
  percent.textContent = `${completion}% complete`;
  message.textContent = total === 30
    ? "30 days completed. Keep building and keep learning."
    : total === 0
      ? "Start with day one. Consistency beats intensity."
      : `${total} day${total === 1 ? "" : "s"} completed. Keep your learning streak going.`;
}

document.getElementById("reset-progress").addEventListener("click", () => {
  if (!completedDays.size) return;
  if (window.confirm("Reset all 30 days of progress?")) {
    completedDays.clear();
    saveProgress();
    renderProgress();
  }
});

renderProgress();
