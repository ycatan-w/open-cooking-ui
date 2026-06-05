<script setup lang="ts">
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const body = document.body;

  sidebar?.classList.toggle('is-hidden');
  body.classList.toggle('sidebar-hidden');
}
</script>

<template>
  <div class="sidebar-visible">
    <!-- HEADER -->
    <header class="app-header">
      <div class="text-brand-violet font-semibold">My App</div>
      <div>
        <RouterLink class="link m-3" to="/">Go to Home</RouterLink>
        <RouterLink class="link m-3" to="/playground">Playground</RouterLink>
        <RouterLink class="link m-3" to="/playground/page-2">Page 2</RouterLink>
        <RouterLink class="link m-3" to="/playground/page-3">Page 3</RouterLink>
      </div>
      <button class="btn btn-sm btn-secondary" @click="toggleSidebar()">
        Toggle sidebar
      </button>
    </header>

    <!-- SIDEBAR -->
    <aside class="app-sidebar" id="sidebar">
      <div class="card card-soft m-2">
        <div class="card-body">
          Sidebar content
        </div>
      </div>

      <div class="block"></div>
    </aside>

    <!-- MAIN -->
    <main class="app-main" id="main">
      <div class="card card-rounded">
        <div class="card-header">
          <div class="card-title">Main content</div>
          <div class="card-description">Scroll inside only</div>
        </div>

        <div class="card-body">
          <p>Content area</p>

          <div class="block"></div>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="app-footer">
      Footer fixed
    </footer>
  </div>
</template>

<style scoped>
/* ===================== */
/* LAYOUT CORE           */
/* ===================== */

.sidebar-visible {
  --header-h: 64px;
  --footer-h: 48px;
  --sidebar-w: 260px;

  margin: 0;
  background: var(--oc-background);
  color: var(--oc-text);
  font-family: system-ui, sans-serif;
  overflow: hidden;
  /* important: empêche scroll page */
}

/* ===================== */
/* HEADER                */
/* ===================== */

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background: var(--oc-header-bg);
  border-bottom: 1px solid var(--oc-border);
  z-index: 50;
}

/* ===================== */
/* SIDEBAR               */
/* ===================== */

.app-sidebar {
  position: fixed;
  top: var(--header-h);
  left: 0;
  bottom: var(--footer-h);
  width: var(--sidebar-w);
  background: var(--oc-sidebar-bg);
  border-right: 1px solid var(--oc-border);
  overflow-y: auto;
  transition: transform 200ms ease;
}

.app-sidebar.is-hidden {
  transform: translateX(-100%);
}

/* ===================== */
/* MAIN                  */
/* ===================== */

.app-main {
  position: fixed;
  top: var(--header-h);
  left: var(--sidebar-w);
  right: 0;
  bottom: var(--footer-h);
  overflow: auto;
  /* scroll interne */
  padding: 1rem;
  background: var(--oc-main-bg);
  transition: left 200ms ease;
}

.sidebar-hidden .app-main {
  left: 0;
}

/* ===================== */
/* FOOTER                */
/* ===================== */

.app-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--footer-h);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background: var(--oc-surface);
  border-top: 1px solid var(--oc-border);
  z-index: 50;
}

/* debug helper */
.block {
  height: 1200px;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.05));
}
</style>
