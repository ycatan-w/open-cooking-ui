<script setup lang="ts">
const app = document.getElementById("app");
const sidebar = document.getElementById("sidebar");

/* ===================== */
/* SIDEBAR MOBILE        */
/* ===================== */
function toggleSidebar() {
  sidebar?.classList.toggle("open");
}

/* ===================== */
/* COLLAPSE DESKTOP      */
/* ===================== */
function toggleCollapse() {
  app?.classList.toggle("sidebar-collapsed");
}

/* ===================== */
/* ACCORDION             */
/* ===================== */
function toggleAccordion(el: any) {
  el.parentElement.classList.toggle("open");
}

/* ===================== */
/* DARK MODE TOGGLE      */
/* ===================== */
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}
</script>

<template>
  <div class="app" id="app">

    <!-- SIDEBAR -->
    <aside class="app-sidebar" id="sidebar">

      <div class="sidebar-item" @click="toggleCollapse()">
        ☰ <span class="sidebar-label">Collapse</span>
      </div>

      <!-- ACCORDION -->
      <div class="accordion open">
        <div class="accordion-header" @click="toggleAccordion(this)">
          Menu
        </div>

        <div class="accordion-content">
          <div class="sidebar-item">🏠 <span class="sidebar-label">Home</span></div>
          <div class="sidebar-item">⚙️ <span class="sidebar-label">Settings</span></div>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-header" @click="toggleAccordion(this)">
          Tools
        </div>

        <div class="accordion-content">
          <div class="sidebar-item">🔧 <span class="sidebar-label">Builder</span></div>
          <div class="sidebar-item">📦 <span class="sidebar-label">Packages</span></div>
        </div>
      </div>

    </aside>

    <!-- HEADER -->
    <header class="app-header">
      <div class="text-brand-violet font-semibold">Pro App</div>

      <div>
        <RouterLink class="link m-3" to="/">Go to Home</RouterLink>
        <RouterLink class="link m-3" to="/playground">Playground</RouterLink>
        <RouterLink class="link m-3" to="/playground/page-1">Page 1</RouterLink>
        <RouterLink class="link m-3" to="/playground/page-2">Page 2</RouterLink>
      </div>


      <div style="display:flex; gap:0.5rem;">
        <button class="btn btn-sm btn-secondary" @click="toggleSidebar()">
          Sidebar
        </button>

        <button class="btn btn-sm btn-secondary" @click="toggleTheme()">
          Dark
        </button>
      </div>
    </header>

    <!-- MAIN -->
    <main class="app-main">
      <div class="card card-rounded">
        <div class="card-header">
          <div class="card-title">Dashboard</div>
        </div>

        <div class="card-body">
          <div style="height:1200px"></div>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="app-footer">
      Footer
    </footer>

  </div>
</template>

<style scoped>
/* ===================== */
/* BASE                  */
/* ===================== */

#app {
  margin: 0;
  font-family: system-ui;
  background: var(--oc-background);
  color: var(--oc-text);
}

/* ===================== */
/* APP GRID              */
/* ===================== */

.app {
  height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 64px 1fr 48px;

  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";

  overflow: hidden;
}

/* COLLAPSED SIDEBAR */
.app.sidebar-collapsed {
  grid-template-columns: 72px 1fr;
}

/* ===================== */
/* HEADER GLASS          */
/* ===================== */

.app-header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;

  background: color-mix(in srgb, var(--oc-header-bg) 80%, transparent);
  backdrop-filter: blur(12px);

  border-bottom: 1px solid var(--oc-border);

  /* position: sticky; */
  top: 0;
  z-index: 20;
}

/* ===================== */
/* SIDEBAR               */
/* ===================== */

.app-sidebar {
  grid-area: sidebar;
  overflow: auto;

  background: var(--oc-sidebar-bg);
  border-right: 1px solid var(--oc-border);

  transition: width 200ms ease;
}

/* collapse mode */
.app.sidebar-collapsed .sidebar-label {
  display: none;
}

.app.sidebar-collapsed .sidebar-section-title {
  display: none;
}

/* icons centered */
.app.sidebar-collapsed .sidebar-item {
  justify-content: center;
}

/* ===================== */
/* MAIN + SCROLL SHADOWS */
/* ===================== */

.app-main {
  grid-area: main;
  overflow: auto;
  padding: 1rem;

  background: var(--oc-main-bg);

  /* position: relative; */

  /* scroll shadows */
  background:
    linear-gradient(var(--oc-main-bg), var(--oc-main-bg)) padding-box,
    linear-gradient(to bottom, rgba(0, 0, 0, 0.08), transparent) top,
    linear-gradient(to top, rgba(0, 0, 0, 0.08), transparent) bottom;

  background-repeat: no-repeat;
  background-size: 100% 12px, 100% 12px;
  background-position: top, bottom;
}

/* ===================== */
/* FOOTER                */
/* ===================== */

.app-footer {
  grid-area: footer;
  display: flex;
  align-items: center;
  padding: 0 1rem;

  border-top: 1px solid var(--oc-border);
  background: var(--oc-surface);
}

/* ===================== */
/* SIDEBAR ITEMS         */
/* ===================== */

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  padding: 0.6rem 0.75rem;
  cursor: pointer;
  border-radius: var(--oc-radius-md);
}

.sidebar-item:hover {
  background: var(--oc-surface-hover);
}

/* ===================== */
/* ACCORDION             */
/* ===================== */

.accordion {
  border-top: 1px solid var(--oc-border-soft);
}

.accordion-header {
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.accordion-content {
  display: none;
  padding-left: 0.5rem;
}

.accordion.open .accordion-content {
  display: block;
}

/* ===================== */
/* MOBILE                */
/* ===================== */

@media (max-width: 768px) {
  .app {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "footer";
  }

  .app-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 280px;
    z-index: 50;

    transform: translateX(-100%);
    transition: transform 200ms ease;

    box-shadow: var(--oc-shadow-lg);
  }

  .app-sidebar.open {
    transform: translateX(0);
  }
}
</style>
