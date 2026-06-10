<script setup lang="ts">
import { useExploreDrawer } from '@/composables/useExploreDrawer';
import { Technique } from '@/open-cooking-core/runtime/objects';

defineModel<Technique>('technique');
const { drawerView } = useExploreDrawer()

</script>

<template>
  <div class="technique-card rounded-xl border border-soft bg-surface overflow-hidden">
    <div class="border-b border-soft px-4 py-3">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="font-medium text-default">
            {{ technique?.name }}
          </h3>
          <p class="mt-1 text-xs text-muted">
            Technique
          </p>
        </div>
        <span class="rounded-full border border-soft bg-elevated px-2 py-0.5 text-xs text-subtle">
          {{ technique?.category }}
        </span>
      </div>
    </div>

    <div class="p-4 space-y-3">
      <div class="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
        <span v-if="technique?.id" class="text-muted">Id</span>
        <span v-if="technique?.id" class="text-subtle">{{ technique?.id }}</span>

        <span v-if="technique?.category" class="text-muted">Category</span>
        <span v-if="technique?.category">{{ technique?.category }}</span>

        <span v-if="technique?.summary" class="text-muted">Summary</span>
        <span v-if="technique?.summary">{{ technique?.summary }}</span>

        <span v-if="technique?.description" class="text-muted">Description</span>
        <span v-if="technique?.description">{{ technique?.description }}</span>

        <span v-if="technique?.related" class="text-muted">Related</span>
        <span v-if="technique?.related">
          <span v-for="(related, index) in technique?.related">
            <span v-if="index > 0"> • </span>
            {{ related }}
          </span>
        </span>
      </div>

      <div class="flex flex-wrap gap-2 pt-2 border-t border-soft">
        <span v-if="technique?.annotations.length"
          class="inline-flex items-center rounded-md border border-soft bg-elevated px-2 py-1 text-xs text-subtle">
          {{ technique?.annotations.length }} annotations
        </span>
        <span v-if="technique?.media.length"
          class="inline-flex items-center rounded-md border border-soft bg-elevated px-2 py-1 text-xs text-subtle">
          {{ technique?.media.length }} media
        </span>
      </div>
    </div>

    <div class="border-t border-soft px-4 py-3 flex gap-2">
      <span class="link-ref text-xs cursor-pointer" v-if="technique?.media.length"
        @click="drawerView = { type: 'media', media: technique.media }">
        Media
      </span>
      <span class="link-ref text-xs cursor-pointer" v-if="technique?.annotations.length"
        @click="drawerView = { type: 'annotation', annotations: technique.annotations }">
        Annotations
      </span>
    </div>
  </div>
</template>

<style lang="css" scoped>
.technique-card .link-ref {
  font-size: var(--text-xs);
}
</style>
