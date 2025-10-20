// Theme toggle with auto mode
let currentThemeMode = "auto"; // 'light', 'dark', 'auto'

function updateThemeDisplay() {
  const icon = document.getElementById("theme-icon");
  const text = document.getElementById("theme-text");

  switch (currentThemeMode) {
    case "light":
      icon.textContent = "☀️";
      text.textContent = "Light";
      break;
    case "dark":
      icon.textContent = "🌙";
      text.textContent = "Dark";
      break;
    case "auto":
      icon.textContent = "🌓";
      text.textContent = "Auto";
      break;
  }
}

function applyTheme() {
  const html = document.documentElement;

  if (currentThemeMode === "auto") {
    // Use system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    html.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    html.setAttribute("data-theme", currentThemeMode);
  }
}

function toggleTheme() {
  // Cycle through: auto -> light -> dark -> auto
  switch (currentThemeMode) {
    case "auto":
      currentThemeMode = "light";
      break;
    case "light":
      currentThemeMode = "dark";
      break;
    case "dark":
      currentThemeMode = "auto";
      break;
  }

  localStorage.setItem("themeMode", currentThemeMode);
  updateThemeDisplay();
  applyTheme();
}

// Load saved theme mode
const savedThemeMode = localStorage.getItem("themeMode") || "auto";
currentThemeMode = savedThemeMode;
updateThemeDisplay();
applyTheme();

// Listen for system theme changes when in auto mode
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (currentThemeMode === "auto") {
      applyTheme();
    }
  });

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = "0.1s";
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});
