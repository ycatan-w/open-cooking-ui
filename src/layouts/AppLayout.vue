<script setup lang="ts">
import Header2 from './Header.vue';
import Sidebar2 from './Sidebar.vue';
import Footer from './Footer.vue';
import Main from './Main.vue';
</script>

<template>
  <!-- <div class="h-screen grid grid-cols-4 overflow-hidden">
    <div class="col-span-3">
      <div>
        fixed
      </div>

      <div class="overflow-auto">
        <div class="h-full">
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
          <div>scrollable</div>
        </div>
      </div>
    </div>

    <div>
      fixed
    </div>
  </div> -->
  <div class="ocui-app">
    <Header2 />
    <Sidebar2 />
    <Main />
    <Footer />
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
  grid-template-columns: 260px 1fr;
  grid-template-rows: 55px 1fr 50px;

  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";

  overflow: hidden;
}
</style>
