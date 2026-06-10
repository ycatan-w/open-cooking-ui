<script setup lang="ts">
import { useOpenCookingManager } from '@/composables/useOpenCookingManager';

const { manager, recipes, ingredients, metadata, equipment, techniques } = useOpenCookingManager()
</script>
<template>
  <footer class="ocui-footer items-center justify-between text-xs">
    <div class="flex items-center gap-4">
      <span :class="[
        'flex items-center gap-1',
        { 'text-success': manager.loadedSpecIsValid() },
        { 'text-error': !manager.loadedSpecIsValid() },
        { 'text-subtle': !manager.hasLoadedSpec() },
      ]">
        <span :class="[
          'h-2 w-2 rounded-full',
          { 'bg-success-soft': manager.loadedSpecIsValid() },
          { 'bg-error-soft': !manager.loadedSpecIsValid() },
          { 'bg-soft': !manager.hasLoadedSpec() },
        ]"></span>
        {{ manager.loadedSpecIsValid() ?
          'Valid Specification' :
          (
            manager.hasLoadedSpec() ?
              'Invalid Specification' :
              'No Specification'
          ) }}
      </span>
      <span class="text-muted" v-if="metadata.version">
        OCS {{ metadata.version }}
      </span>
    </div>

    <div class="flex items-center gap-4" v-if="manager.loadedSpecIsValid()">
      <span class="text-subtle">{{ recipes?.size }} recipes</span>
      <span class="text-subtle">{{ ingredients?.size }} ingredients</span>
      <span class="text-subtle">{{ equipment?.size }} equipment</span>
      <span class="text-subtle">{{ techniques?.size }} techniques</span>
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