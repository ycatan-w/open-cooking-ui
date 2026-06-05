<script setup lang="ts">
import { useOpenCookingManager } from '@/composables/useOpenCookingManager';

const { manager, recipes, ingredients, metadata, equipment, techniques } = useOpenCookingManager()
</script>
<template>
  <footer class="ocui-footer items-center justify-between">
    <div class="flex items-center gap-4">
      <span
        class="inline-flex items-center px-2 py-1 ring-1 ring-inset ring-default text-heading text-sm font-medium rounded bg-surface">
        OCS {{ metadata.version }}
      </span>
      <span class="text-muted text-sm">{{ metadata.title }}</span>
      <span class="uppercase text-sm">{{ metadata.format }}</span>
      <span :class="[
        'flex items-center gap-1 text-sm',
        { 'text-success': manager.loadedSpecIsValid() },
        { 'text-error': !manager.loadedSpecIsValid() },
        { 'text-subtle': !manager.hasLoadedSpec() },
      ]">
        <span :class="[
          'h-1.5 w-1.5 rounded-full',
          { 'bg-success-soft': manager.loadedSpecIsValid() },
          { 'bg-error-soft': !manager.loadedSpecIsValid() },
          { 'bg-soft': !manager.hasLoadedSpec() },
        ]"></span>
        {{ manager.loadedSpecIsValid() ? 'Valid' : (manager.hasLoadedSpec() ? 'Invalid' : 'No Spec') }}
      </span>
    </div>

    <div class="flex items-center gap-4" v-if="manager.loadedSpecIsValid()">
      <small class="text-subtle">{{ recipes?.size }} recipes</small>
      <small class="text-subtle">{{ ingredients?.size }} ingredients</small>
      <small class="text-subtle">{{ equipment?.size }} equipment</small>
      <small class="text-subtle">{{ techniques?.size }} techniques</small>
    </div>
  </footer>

</template>
<style lang="css" scoped>
.ocui-footer {
  grid-area: footer;
  display: flex;
  align-items: center;

  padding: 0 1rem;
  background: var(--oc-surface);
  border-top: 1px solid var(--oc-border);
}
</style>