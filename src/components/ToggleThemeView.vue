<script setup lang="ts">
import { onMounted } from 'vue';
import { IconMoon, IconSun } from '../assets/icons';
import { themeService } from '@/services/ThemeService';
import { useSettingsStore } from '@/stores/settings.store';

const { theme } = useSettingsStore()

onMounted(() => {
  themeService.apply(theme.value)
})
</script>

<template>
  <div class="scheme-toggler" :class="{ 'is-dark': theme === 'dark' }"
    @click="theme = theme === 'dark' ? 'light' : 'dark'; themeService.apply(theme)">
    <div class="scheme-toggler-thumb-container">
      <div class="scheme-toggler-thumb" />
    </div>
    <div class="scheme-toggler-item">
      <IconMoon />
    </div>
    <div class="scheme-toggler-item">
      <IconSun />
    </div>
  </div>
</template>

<style lang="css" scoped>
.scheme-toggler {
  --st-default-h: 8;
  --st-height: calc(var(--spacing) * var(--st-default-h));

  position: relative;
  display: inline-flex;
  align-items: center;
  width: calc(var(--spacing) * calc(var(--st-default-h) * 2));
  height: var(--st-height);
  outline: 2px dashed var(--oc-purple);
  border-radius: var(--oc-radius-full);
  background: var(--oc-surface);
  color: var(--oc-text);
  cursor: pointer;
  user-select: none;
  transition:
    background-color 150ms ease,
    border-color 150ms ease;
}

/* ===================== */
/* THUMB                 */
/* ===================== */

.scheme-toggler-thumb-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--st-height);
  aspect-ratio: 1;
  position: absolute;
}

.scheme-toggler-thumb {
  position: absolute;
  width: calc(var(--st-height) - calc(var(--st-height) / 8));
  aspect-ratio: 1;
  border-radius: var(--oc-radius-full);
  background: var(--oc-gradient);
  transition:
    transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
    background 150ms ease;
}

.scheme-toggler.is-dark .scheme-toggler-thumb {
  transform: translateX(0);
}

.scheme-toggler:not(.is-dark) .scheme-toggler-thumb {
  transform: translateX(var(--st-height));
}

/* ===================== */
/* ITEMS                 */
/* ===================== */

.scheme-toggler-item {
  position: relative;
  z-index: 1;
  width: var(--st-height);
  aspect-ratio: 1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    color 150ms ease,
    transform 150ms ease;
}

.scheme-toggler-item svg {
  width: calc(var(--st-height) / 2);
  height: calc(var(--st-height) / 2);
}

.scheme-toggler:not(.is-dark) .scheme-toggler-item {
  color: var(--oc-text);
}

.scheme-toggler:not(.is-dark) .scheme-toggler-item:last-child {
  color: white;
}

/* ===================== */
/* HOVER                 */
/* ===================== */

.scheme-toggler:hover {
  border-color: var(--oc-fuchsia);
}

.scheme-toggler:hover .scheme-toggler-thumb {
  box-shadow: var(--oc-shadow);
}
</style>
