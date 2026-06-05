<script setup lang="ts">
import { IconMagnifyingGlass } from '@/components/icons';
import ToggleThemeView from '@/components/ToggleThemeView.vue';
import { useOpenCookingManager } from '@/composables/useOpenCookingManager';
const { manager } = useOpenCookingManager()
</script>

<template>
  <header class="ocui-header flex p-2">
    <div class="ocui-header-logo tracking-widest flex-none" />

    <div class="grow">
      <div class="oc-input-floating oc-input-floating-icon oc-input-floating-sm">
        <input id="ocui-search" class="px-4 py-2" type="search" placeholder=" "
          :disabled="!manager.loadedSpecIsValid()" />
        <label for="ocui-search" class="text-xs">Search recipes, ingredients, techniques...</label>
        <IconMagnifyingGlass class="oc-input-icon" />
      </div>
    </div>

    <div class="flex-none ml-4">
      <ToggleThemeView />
    </div>
  </header>
</template>

<style lang="css" scoped>
.ocui-header {
  grid-area: header;
  background: color-mix(in srgb, var(--oc-header-bg) 80%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--oc-border);
  top: 0;
  z-index: 20;
}

.ocui-header-logo {
  --header-logo-default-size: 9;
  --header-logo-size: calc(var(--spacing) * var(--header-logo-default-size));

  width: var(--header-logo-size);
  height: var(--header-logo-size);
  position: relative;
  aspect-ratio: 1;
  border-radius: 999px;
  background: var(--oc-gradient);
  margin-right: calc(var(--header-logo-size) * 6);
}

.ocui-header-logo:after {
  position: absolute;
  content: 'pen Cooking UI';
  left: var(--header-logo-size);
  top: calc(var(--header-logo-size) / 4);
  white-space: nowrap;
  color: var(--text-default);
  font-size: calc(var(--header-logo-size) * 0.45);
  font-weight: 900;
}
</style>
