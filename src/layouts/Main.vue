<template>
  <main class="ocui-main">
    <RouterView />
  </main>
</template>

<style lang="css" scoped>
.ocui-main {
  grid-area: main;
  overflow: auto;
  padding: 1rem;
  background: var(--oc-main-bg);
}
</style>
