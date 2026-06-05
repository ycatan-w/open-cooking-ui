<script setup lang="ts">
import type { Annotation } from '@/open-cooking-core/runtime/objects';

defineModel<Annotation[]>('annotations');
</script>

<template>
  <div class="p-4">
    <div class="space-y-3">
      <ul class="list list-timeline">
        <li v-for="annotation in annotations" class="list-item">
          <h5 class="capitalize link-underline-hover">{{ annotation.type }}</h5>
          <p class="text-muted">{{ annotation.text }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
