// Theme toggle
function initTheme() {
  const saved = localStorage.getItem("theme");
  const theme = saved || "dark";
  document.documentElement.setAttribute("data-theme", theme);
  updateToggleIcon(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateToggleIcon(next);
}

function updateToggleIcon(theme) {
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = theme === "dark" ? "\u2600\ufe0f" : "\ud83c\udf19";
}

// Hamburger menu
function toggleMenu() {
  document.querySelector("nav").classList.toggle("open");
}

// Set active nav link
function setActiveNav() {
  const path = window.location.pathname.replace(/\/$/, "").split("/").pop() || "index";
  document.querySelectorAll("nav a").forEach(a => {
    const href = a.getAttribute("href").replace(/\.html$/, "").replace(/\/$/, "").split("/").pop() || "index";
    if (href === path || (path === "index" && href === ".")) {
      a.classList.add("active");
    }
  });
}

// Inject SVG logo from external file
function initLogo() {
  fetch("logo.svg")
    .then(r => r.text())
    .then(svg => {
      const header = document.querySelector(".logo");
      if (header) {
        header.innerHTML = svg;
        header.querySelector("svg").classList.add("logo-svg");
      }
      const hero = document.querySelector(".hero-logo");
      if (hero) {
        hero.innerHTML = svg;
        hero.querySelector("svg").classList.add("hero-logo-svg");
        const headerSvg = header && header.querySelector("svg");
        if (headerSvg) headerSvg.style.visibility = "hidden";
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLogo();
  setActiveNav();
});
