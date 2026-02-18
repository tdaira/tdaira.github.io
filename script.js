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
  renderMermaid();
}

function updateToggleIcon(theme) {
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = theme === "dark" ? "\u2600\ufe0f" : "\ud83c\udf19";
}

// Hamburger menu
function toggleMenu() {
  document.querySelector("nav").classList.toggle("open");
}

// Header generation
function initHeader() {
  const header = document.querySelector("header");
  if (!header) return;
  header.innerHTML = '<div class="header-inner">'
    + '<a href="." class="logo"><span class="logo-ble">ble</span>RPC</a>'
    + '<button class="hamburger" onclick="toggleMenu()">&#9776;</button>'
    + '<nav>'
    + '<a href=".">Overview</a>'
    + '<a href="getting-started.html">Getting Started</a>'
    + '<a href="benchmarks.html">Benchmarks</a>'
    + '<a href="protocol.html">Protocol</a>'
    + '<a href="repositories.html">Repositories</a>'
    + '<a href="https://github.com/tdaira/blerpc" class="github-link" title="GitHub"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg></a>'
    + '<button class="theme-toggle" id="theme-toggle" onclick="toggleTheme()"></button>'
    + '</nav>'
    + '</div>';
}

// Footer generation
function initFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;
  footer.innerHTML = '<p>bleRPC is licensed under <a href="https://www.gnu.org/licenses/lgpl-3.0.html">LGPL-3.0</a> with static linking exception. &copy; 2025 tdaira.</p>';
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

// Inject logo into hero section
function initLogo() {
  const hero = document.querySelector(".hero-logo");
  if (hero) {
    hero.innerHTML = '<span class="logo-ble">ble</span>RPC';
  }
}

// Dynamic Prism loading
function initPrism() {
  var script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js";
  script.onload = function() {
    var autoloader = document.createElement("script");
    autoloader.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js";
    document.body.appendChild(autoloader);
  };
  document.body.appendChild(script);
}

// Dynamic Mermaid loading (conditional)
function initMermaid() {
  var els = document.querySelectorAll(".mermaid");
  if (!els.length) return;
  els.forEach(function(el) {
    el.dataset.source = el.textContent;
  });
  var script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.1/mermaid.min.js";
  script.onload = function() {
    var theme = localStorage.getItem("theme") || "dark";
    mermaid.initialize({ startOnLoad: false, theme: theme === "dark" ? "dark" : "default" });
    mermaid.run();
  };
  document.body.appendChild(script);
}

// Mermaid re-render on theme toggle
function renderMermaid() {
  if (typeof mermaid === "undefined") return;
  var els = document.querySelectorAll(".mermaid");
  if (!els.length) return;
  var theme = document.documentElement.getAttribute("data-theme");
  els.forEach(function(el) {
    if (el.dataset.source) {
      var newEl = document.createElement("pre");
      newEl.className = "mermaid";
      newEl.dataset.source = el.dataset.source;
      newEl.textContent = el.dataset.source;
      el.parentNode.replaceChild(newEl, el);
    }
  });
  mermaid.initialize({
    startOnLoad: false,
    theme: theme === "dark" ? "dark" : "default"
  });
  mermaid.run();
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initFooter();
  initTheme();
  initLogo();
  setActiveNav();
  initPrism();
  initMermaid();
});
