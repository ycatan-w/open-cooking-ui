<script setup lang="ts">
import type { Equipment } from '@/open-cooking-core/runtime/objects';
import { AnnotationView, MediaView } from '.';

defineModel<Equipment>('equipment');
</script>

<template>
  <div class="p-4">
    <div class="border-l-5 border-focus pl-4">
      <h3 class="font-medium ">{{ equipment?.name }}</h3>
    </div>
    <p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
      {{ equipment?.description }}
    </p>
    <div class="mb-4 flex items-center gap-2 text-sm text-subtle">
      <span v-for="(use, index) in equipment?.uses">
        <span v-if="index > 0"> • </span>
        {{ use }}
      </span>
    </div>
  </div>

  <MediaView v-bind="{ media: equipment?.media }" />
  <AnnotationView v-bind="{ annotations: equipment?.annotations }" />
</template>
