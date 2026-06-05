<script setup lang="ts">
import type { Technique } from '@/open-cooking-core/runtime/objects';
import { AnnotationView, MediaView } from '.';

defineModel<Technique>('technique');
</script>

<template>
  <div class="p-4">
    <div class="border-l-5 border-focus pl-4">
      <h3 class="font-medium ">{{ technique?.name }}</h3>
      <p class="mt-2 text-sm text-subtle">{{ technique?.summary }}</p>
    </div>
    <p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
      {{ technique?.description }}
    </p>
    <div class="mb-4 flex items-center gap-2 text-sm text-subtle">
      <span v-for="(related, index) in technique?.related">
        <span v-if="index > 0"> • </span>
        {{ related }}
      </span>
    </div>
  </div>

  <MediaView v-bind="{ media: technique?.media }" />
  <AnnotationView v-bind="{ annotations: technique?.annotations }" />
</template>
