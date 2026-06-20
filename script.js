// i18n translations
var i18n = {
  en: {
    overview: "Overview",
    gettingStarted: "Getting Started",
    benchmarks: "Benchmarks",
    protocol: "Protocol",
    encryption: "Encryption",
    repositories: "Repositories",
    footer: 'bleRPC is licensed under <a href="https://www.gnu.org/licenses/lgpl-3.0.html">LGPL-3.0</a> with static linking exception. &copy; 2025 tdaira.'
  },
  ja: {
    overview: "概要",
    gettingStarted: "はじめに",
    benchmarks: "ベンチマーク",
    protocol: "プロトコル",
    encryption: "暗号化",
    repositories: "リポジトリ",
    footer: 'bleRPC is licensed under <a href="https://www.gnu.org/licenses/lgpl-3.0.html">LGPL-3.0</a> with static linking exception. &copy; 2025 tdaira.'
  },
  zh: {
    overview: "概述",
    gettingStarted: "快速开始",
    benchmarks: "基准测试",
    protocol: "协议",
    encryption: "加密",
    repositories: "仓库",
    footer: 'bleRPC is licensed under <a href="https://www.gnu.org/licenses/lgpl-3.0.html">LGPL-3.0</a> with static linking exception. &copy; 2025 tdaira.'
  }
};

// Browser language auto-redirect (only on English/root pages, respects manual choice)
function autoRedirect() {
  var path = window.location.pathname;
  // Only redirect on root (English) pages
  if (path.indexOf("/ja/") === 0 || path === "/ja" || path.indexOf("/zh/") === 0 || path === "/zh") return;
  // Skip if user has manually chosen a language
  if (localStorage.getItem("lang-manual")) return;
  var langs = navigator.languages || [navigator.language || ""];
  for (var i = 0; i < langs.length; i++) {
    var code = langs[i].toLowerCase();
    if (code === "ja" || code.indexOf("ja-") === 0) {
      window.location.replace("/ja" + path);
      return;
    }
    if (code === "zh" || code.indexOf("zh-") === 0) {
      window.location.replace("/zh" + path);
      return;
    }
    if (code === "en" || code.indexOf("en-") === 0) {
      return; // English preferred, stay on root
    }
  }
}
autoRedirect();

// Language detection
function getLang() {
  var path = window.location.pathname;
  if (path.indexOf("/ja/") === 0 || path === "/ja") return "ja";
  if (path.indexOf("/zh/") === 0 || path === "/zh") return "zh";
  return "en";
}

// Get path prefix for current language
function getLangPrefix() {
  var lang = getLang();
  if (lang === "en") return "";
  return "/" + lang;
}

// Get path to root from current language
function getRootPath() {
  var lang = getLang();
  if (lang === "en") return ".";
  return "..";
}

// Theme toggle
function initTheme() {
  var saved = localStorage.getItem("theme");
  var theme = saved || "dark";
  document.documentElement.setAttribute("data-theme", theme);
  updateToggleIcon(theme);
}

function toggleTheme() {
  var current = document.documentElement.getAttribute("data-theme");
  var next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateToggleIcon(next);
  renderMermaid();
}

function updateToggleIcon(theme) {
  var btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = theme === "dark" ? "\u2600\ufe0f" : "\ud83c\udf19";
}

// Hamburger menu
function toggleMenu() {
  document.querySelector("nav").classList.toggle("open");
}

// Language switcher
function buildLangSwitcher() {
  var lang = getLang();
  var labels = { en: "EN", ja: "JA", zh: "ZH" };
  var page = window.location.pathname.split("/").pop() || "index.html";
  if (page === "" || page === "ja" || page === "zh") page = "index.html";

  var html = '<div class="lang-switcher">'
    + '<button class="lang-btn" onclick="toggleLangMenu()">' + labels[lang] + '</button>'
    + '<div class="lang-menu" id="lang-menu">'
    + '<a href="/' + page + '" onclick="setLangManual();"' + (lang === "en" ? ' class="active"' : '') + '>English</a>'
    + '<a href="/ja/' + page + '" onclick="setLangManual();"' + (lang === "ja" ? ' class="active"' : '') + '>日本語</a>'
    + '<a href="/zh/' + page + '" onclick="setLangManual();"' + (lang === "zh" ? ' class="active"' : '') + '>中文</a>'
    + '</div></div>';
  return html;
}

function toggleLangMenu() {
  var menu = document.getElementById("lang-menu");
  if (menu) menu.classList.toggle("open");
}

function setLangManual() {
  localStorage.setItem("lang-manual", "1");
}

// Close lang menu when clicking outside
document.addEventListener("click", function(e) {
  var switcher = document.querySelector(".lang-switcher");
  if (switcher && !switcher.contains(e.target)) {
    var menu = document.getElementById("lang-menu");
    if (menu) menu.classList.remove("open");
  }
});

// Header generation
function initHeader() {
  var header = document.querySelector("header");
  if (!header) return;
  var lang = getLang();
  var t = i18n[lang];
  var prefix = getLangPrefix();
  var base = prefix || ".";

  header.innerHTML = '<div class="header-inner">'
    + '<a href="' + base + '/" class="logo"><span class="logo-ble">ble</span>RPC</a>'
    + '<button class="hamburger" onclick="toggleMenu()">&#9776;</button>'
    + '<nav>'
    + '<a href="' + base + '/">' + t.overview + '</a>'
    + '<a href="' + base + '/getting-started.html">' + t.gettingStarted + '</a>'
    + '<a href="' + base + '/benchmarks.html">' + t.benchmarks + '</a>'
    + '<a href="' + base + '/protocol.html">' + t.protocol + '</a>'
    + '<a href="' + base + '/encryption.html">' + t.encryption + '</a>'
    + '<a href="' + base + '/repositories.html">' + t.repositories + '</a>'
    + '<a href="https://github.com/tdaira/blerpc" class="github-link" title="GitHub"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg></a>'
    + buildLangSwitcher()
    + '<button class="theme-toggle" id="theme-toggle" onclick="toggleTheme()"></button>'
    + '</nav>'
    + '</div>';
}

// Footer generation
function initFooter() {
  var footer = document.querySelector("footer");
  if (!footer) return;
  var lang = getLang();
  var t = i18n[lang];
  footer.innerHTML = '<p>' + t.footer + '</p>';
}

// Normalize a URL/href to a page key (home -> "index")
function navPageKey(p) {
  var seg = p.replace(/\.html$/, "").replace(/\/+$/, "").split("/").pop();
  if (!seg || seg === "." || seg === "ja" || seg === "zh" || seg === "index") return "index";
  return seg;
}

// Set active nav link
function setActiveNav() {
  var path = navPageKey(window.location.pathname);
  document.querySelectorAll("nav > a").forEach(function(a) {
    var href = a.getAttribute("href");
    if (!href || href.startsWith("http")) return;
    if (navPageKey(href) === path) {
      a.classList.add("active");
    }
  });
}

// Inject logo into hero section
function initLogo() {
  var hero = document.querySelector(".hero-logo");
  if (hero) {
    hero.innerHTML = '<span class="logo-ble">ble</span>RPC';
  }
}

// Codegen showcase: language tab switcher (index hero only; no-op elsewhere)
function initCodegen() {
  var tabs = document.querySelectorAll(".codegen-tab");
  if (!tabs.length) return;
  tabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
      var lang = tab.getAttribute("data-lang");
      document.querySelectorAll(".codegen-tab").forEach(function(t) {
        t.classList.toggle("active", t === tab);
      });
      document.querySelectorAll(".codegen-panel").forEach(function(p) {
        p.classList.toggle("active", p.getAttribute("data-lang") === lang);
      });
    });
  });
}

// Sequence diagrams (design system component, rendered from JSON)
function escHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function renderSeqDiagram(el, spec) {
  var actors = spec.actors || [], messages = spec.messages || [];
  var n = Math.max(1, actors.length), rh = spec.rowHeight || 56;
  function idx(a) { return typeof a === "number" ? a : actors.indexOf(a); }
  var html = '<div class="seqdiag-inner" style="min-width:' + (spec.minWidth || n * 150) + 'px">';
  html += '<div class="seqdiag-actors">';
  actors.forEach(function(a) {
    html += '<div class="seqdiag-actor-cell"><div class="seqdiag-actor">' + escHtml(a) + '</div></div>';
  });
  html += '</div>';
  html += '<div class="seqdiag-body" style="height:' + (messages.length * rh) + 'px">';
  for (var i = 0; i < n; i++) {
    var lx = ((i + 0.5) / n) * 100;
    html += '<div class="seqdiag-life" style="left:' + lx + '%;transform:translateX(-50%)"></div>';
  }
  messages.forEach(function(m, r) {
    var yMid = r * rh + rh / 2;
    if (m.note) {
      html += '<div class="seqdiag-note" style="top:' + (yMid - 14) + 'px;left:8%;right:8%"><span>' + escHtml(m.note) + '</span></div>';
      return;
    }
    var from = idx(m.self != null ? m.self : m.from);
    var to = idx(m.self != null ? m.self : m.to);
    if (m.self != null || from === to) {
      var sx = ((from + 0.5) / n) * 100;
      html += '<div class="seqdiag-self" style="top:' + (yMid - 15) + 'px;left:' + sx + '%;width:46%;transform:translateX(-50%)"><span>↻ ' + escHtml(m.label) + '</span></div>';
      return;
    }
    var f = (from + 0.5) / n, t = (to + 0.5) / n;
    var leftPct = Math.min(f, t) * 100, widthPct = Math.abs(t - f) * 100, toRight = t > f;
    var color = m.accent ? "var(--accent)" : "var(--text-secondary)";
    var borderStyle = m.dashed ? "dashed" : "solid";
    html += '<div class="seqdiag-msg-label" style="top:' + (yMid - rh / 2 + 6) + 'px;left:' + leftPct + '%;width:' + widthPct + '%"><span>' + escHtml(m.label) + '</span></div>';
    html += '<div class="seqdiag-line" style="top:' + yMid + 'px;left:' + leftPct + '%;width:' + widthPct + '%;border-top:1.5px ' + borderStyle + ' ' + color + '"></div>';
    var ahLeft = toRight ? "calc(" + (leftPct + widthPct) + "% - 7px)" : leftPct + "%";
    var ah = "border-top:4px solid transparent;border-bottom:4px solid transparent;" +
      (toRight ? "border-left:7px solid " + color : "border-right:7px solid " + color);
    html += '<div class="seqdiag-arrow" style="top:' + (yMid - 4) + 'px;left:' + ahLeft + ';' + ah + '"></div>';
  });
  html += '</div></div>';
  el.innerHTML = html;
}
function initSequenceDiagrams() {
  document.querySelectorAll(".seqdiag").forEach(function(el) {
    var dataEl = el.querySelector('script[type="application/json"]');
    if (!dataEl) return;
    try {
      renderSeqDiagram(el, JSON.parse(dataEl.textContent));
    } catch (e) { /* leave as-is on parse error */ }
  });
}

// Wrap content tables in a horizontal-scroll container so a wide table
// (e.g. long code identifiers) scrolls instead of widening the whole page.
function initTableScroll() {
  document.querySelectorAll("main table").forEach(function(table) {
    if (table.parentElement && table.parentElement.classList.contains("table-wrap")) return;
    var wrap = document.createElement("div");
    wrap.className = "table-wrap";
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });
}

// Flow charts (design system component, rendered from JSON)
function initFlowCharts() {
  var DOWN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v15M6 13l6 6 6-6"/></svg>';
  var RIGHT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
  document.querySelectorAll(".flowchart").forEach(function(el) {
    var dataEl = el.querySelector('script[type="application/json"]');
    if (!dataEl) return;
    var spec;
    try { spec = JSON.parse(dataEl.textContent); } catch (e) { return; }
    var steps = spec.steps || [], horiz = spec.direction === "horizontal";
    if (horiz) el.classList.add("is-horizontal");
    var arrow = horiz ? RIGHT : DOWN;
    var html = "";
    steps.forEach(function(s, i) {
      html += '<div class="fc-node' + (s.accent ? " is-accent" : "") + '">';
      html += '<div class="fc-head"><span class="fc-title">' + escHtml(s.title) + '</span>';
      if (s.tag) html += '<span class="fc-tag">' + escHtml(s.tag) + '</span>';
      html += '</div>';
      if (s.desc) html += '<div class="fc-desc">' + escHtml(s.desc) + '</div>';
      html += '</div>';
      if (i < steps.length - 1) html += '<div class="fc-arrow">' + arrow + '</div>';
    });
    el.innerHTML = html;
  });
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

document.addEventListener("DOMContentLoaded", function() {
  initHeader();
  initFooter();
  initTheme();
  initLogo();
  setActiveNav();
  initCodegen();
  initTableScroll();
  initSequenceDiagrams();
  initFlowCharts();
  initPrism();
  initMermaid();
});
