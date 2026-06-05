<script setup lang="ts">
import { pipelineState } from '@/stores/PipelineState';
</script>

<template>
  <div class="flex h-full flex-col justify-center items-center">
    <div class="loader loader-brand" style="--loader-default-size: 20;"></div>
    <div v-for="(step, index) in pipelineState.processesInfo" :class="[
      'text-lg mt-4',
      { 'hidden': pipelineState.currentProcess !== step.name || pipelineState.completed.includes(step.name) },
    ]">
      Executing: <span class="text-subtle capitalize">{{ step.name }}</span>
    </div>
  </div>
</template>
