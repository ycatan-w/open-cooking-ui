<script setup lang="ts">
import type { Annotation } from '@/open-cooking-core/runtime/objects';
import { AnnotationView } from '.';

defineModel<{
  name: string
  summary: string
  url: string
  annotations: Annotation[]
}>('source');
</script>

<template>
  <div class="p-4">
    <div class="border-l-5 border-focus pl-4">
      <h3 class="font-medium ">{{ source?.name }}</h3>
      <p class="mt-2 text-sm text-subtle">{{ source?.summary }}</p>
      <a v-if="source?.url" :href="source?.url" target="__blank" class="mt-2 text-xs link-external">{{ source?.url
        }}</a>
    </div>
  </div>

  <AnnotationView v-bind="{ annotations: source?.annotations }" />
</template>
