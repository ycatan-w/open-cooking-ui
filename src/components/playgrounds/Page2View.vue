<script setup lang="ts">

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  console.log(sidebar, overlay)
  sidebar?.classList.toggle('open');
  overlay?.classList.toggle('open');
}
</script>

<template>

  <div class="app" id="app">

    <!-- HEADER -->
    <header class="app-header">
      <div class="text-brand-violet font-semibold">Open App</div>

      <div>
        <RouterLink class="link m-3" to="/">Go to Home</RouterLink>
        <RouterLink class="link m-3" to="/playground">Playground</RouterLink>
        <RouterLink class="link m-3" to="/playground/page-1">Page 1</RouterLink>
        <RouterLink class="link m-3" to="/playground/page-3">Page 3</RouterLink>
      </div>

      <button class="btn btn-sm btn-secondary" @click="toggleSidebar()">
        Menu
      </button>
    </header>

    <!-- SIDEBAR -->
    <aside class="app-sidebar" id="sidebar">
      <div class="card card-soft m-2">
        <div class="card-body">
          Sidebar content
        </div>
      </div>

      <div style="height:1200px"></div>
    </aside>

    <!-- OVERLAY MOBILE -->
    <div class="overlay" id="overlay" @click="toggleSidebar()"></div>

    <!-- MAIN -->
    <main class="app-main">
      <div class="card card-rounded">
        <div class="card-header">
          <div class="card-title">Main</div>
          <div class="card-description">Grid layout + scroll area</div>
        </div>

        <div class="card-body">
          <p>Scroll ici uniquement</p>
          <div style="height:1200px"></div>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="app-footer">
      Footer fixed in grid
    </footer>
  </div>

</template>

<style scoped>
/* ===================== */
/* THEME BASE            */
/* ===================== */

#app {
  margin: 0;
  font-family: system-ui, sans-serif;
  color: var(--oc-text);
  background: var(--oc-background);
}

/* auto dark mode */
@media (prefers-color-scheme: dark) {
  #app:not(.light) {
    color-scheme: dark;
  }
}

/* ===================== */
/* APP GRID              */
/* ===================== */

.app {
  height: 100vh;
  display: grid;

  grid-template-rows: 64px 1fr 48px;
  grid-template-columns: 260px 1fr;

  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";

  overflow: hidden;
}

/* ===================== */
/* HEADER                */
/* ===================== */

.app-header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;
  background: var(--oc-header-bg);
  border-bottom: 1px solid var(--oc-border);
}

/* ===================== */
/* SIDEBAR               */
/* ===================== */

.app-sidebar {
  grid-area: sidebar;
  background: var(--oc-sidebar-bg);
  border-right: 1px solid var(--oc-border);

  overflow: auto;
}

/* ===================== */
/* MAIN                  */
/* ===================== */

.app-main {
  grid-area: main;
  overflow: auto;
  padding: 1rem;
  background: var(--oc-main-bg);
}

/* ===================== */
/* FOOTER                */
/* ===================== */

.app-footer {
  grid-area: footer;
  display: flex;
  align-items: center;

  padding: 0 1rem;
  background: var(--oc-surface);
  border-top: 1px solid var(--oc-border);
}

/* ===================== */
/* MOBILE DRAWER         */
/* ===================== */

.overlay {
  display: none;
}

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
    top: 0;
    left: 0;
    bottom: 0;

    width: 280px;
    z-index: 100;

    transform: translateX(-100%);
    transition: transform 200ms ease;

    box-shadow: var(--oc-shadow-lg);
  }

  .app-sidebar.open {
    transform: translateX(0);
  }

  .overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: var(--oc-overlay);
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms ease;
  }

  .overlay.open {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
