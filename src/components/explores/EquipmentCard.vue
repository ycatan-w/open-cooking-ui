<script setup lang="ts">
import { useExploreDrawer } from '@/composables/useExploreDrawer';
import { Equipment } from '@/open-cooking-core/runtime/objects';

defineModel<Equipment>('equipment');
const { drawerView } = useExploreDrawer()

</script>

<template>
  <div class="equipment-card rounded-xl border border-soft bg-surface overflow-hidden">
    <div class="border-b border-soft px-4 py-3">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="font-medium text-default">
            {{ equipment?.name }}
          </h3>
          <p class="mt-1 text-xs text-muted">
            Equipment
          </p>
        </div>
        <span class="rounded-full border border-soft bg-elevated px-2 py-0.5 text-xs text-subtle">
          {{ equipment?.category }}
        </span>
      </div>
    </div>

    <div class="p-4 space-y-3">
      <div class="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
        <span v-if="equipment?.id" class="text-muted">Id</span>
        <span v-if="equipment?.id" class="text-subtle">{{ equipment?.id }}</span>

        <span v-if="equipment?.category" class="text-muted">Category</span>
        <span v-if="equipment?.category">{{ equipment?.category }}</span>

        <span v-if="equipment?.description" class="text-muted">Description</span>
        <span v-if="equipment?.description">{{ equipment?.description }}</span>

        <span v-if="equipment?.uses" class="text-muted">Uses</span>
        <span v-if="equipment?.uses">
          <span v-for="(use, index) in equipment?.uses">
            <span v-if="index > 0"> • </span>
            {{ use }}
          </span>
        </span>
      </div>

      <div class="flex flex-wrap gap-2 pt-2 border-t border-soft">
        <span v-if="equipment?.annotations.length"
          class="inline-flex items-center rounded-md border border-soft bg-elevated px-2 py-1 text-xs text-subtle">
          {{ equipment?.annotations.length }} annotations
        </span>
        <span v-if="equipment?.media.length"
          class="inline-flex items-center rounded-md border border-soft bg-elevated px-2 py-1 text-xs text-subtle">
          {{ equipment?.media.length }} media
        </span>
      </div>
    </div>

    <div class="border-t border-soft px-4 py-3 flex gap-2">
      <span class="link-ref text-xs cursor-pointer" v-if="equipment?.media.length"
        @click="drawerView = { type: 'media', media: equipment.media }">
        Media
      </span>
      <span class="link-ref text-xs cursor-pointer" v-if="equipment?.annotations.length"
        @click="drawerView = { type: 'annotation', annotations: equipment.annotations }">
        Annotations
      </span>
    </div>
  </div>
</template>

<style lang="css" scoped>
.equipment-card .link-ref {
  font-size: var(--text-xs);
}
</style>
