<script setup lang="ts">
import {
  AppHeader,
  AppSidebar,
  AppFooter,
  AppMain,
} from './components/'
</script>

<template>
  <div class="ocui-app">
    <AppHeader />
    <AppSidebar />
    <AppMain />
    <AppFooter />
  </div>
</template>

<style lang="css" scoped>
.ocui-app {
  margin: 0;
  font-family: system-ui, sans-serif;
  color: var(--oc-text);
  background: var(--oc-background);

  height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 64px 1fr 36px;

  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";

  overflow: hidden;
}
</style>
