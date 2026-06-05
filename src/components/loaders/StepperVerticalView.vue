<script setup lang="ts">
import { pipelineState } from '@/stores/PipelineState';
import { watch } from 'vue';
const stepRefs = new Map<string, HTMLElement>()

watch(() => pipelineState.currentProcess, () => {
  stepRefs.get(`sv-loader-${pipelineState.currentProcess}`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  })
})
</script>

<template>
  <div ref="stepperRef" class="stepper-vertical sv-animated sv-h-fixed m-10"
    style="--step-default-w: 20; --step-default-h: 60;">
    <div v-for="(step, index) in pipelineState.processesInfo" :key="'sv-loader-' + step.name"
      :ref="el => stepRefs.set(`sv-loader-${step.name}`, el as HTMLElement)" :class="[
        'sv-step',
        index === 0 ? 'sv-step-top' : 'sv-step-bottom',
        { 'sv-current': pipelineState.currentProcess === step.name && !pipelineState.completed.includes(step.name) },
        { 'sv-completed': pipelineState.completed.includes(step.name) }
      ]">
      <div class="sv-step-indicator">
        <div class="sv-step-flow" />
      </div>
      <div class="sv-step-label text-muted text-xl uppercase">
        {{ step.name }}
      </div>
    </div>
  </div>
</template>
