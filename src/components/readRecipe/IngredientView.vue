<script setup lang="ts">
import type { Ingredient } from '@/open-cooking-core/runtime/objects';
import { AnnotationView, MediaView } from '.';

defineModel<Ingredient>('ingredient');
</script>

<template>
  <div class="p-4">
    <div class="border-l-5 border-focus pl-4">
      <h3 class="font-medium ">{{ ingredient?.name }}</h3>
    </div>
  </div>

  <MediaView v-bind="{ media: ingredient?.media }" />
  <AnnotationView v-bind="{ annotations: ingredient?.annotations }" />
</template>
