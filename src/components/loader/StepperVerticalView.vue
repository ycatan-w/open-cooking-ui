<script setup lang="ts">
import { pipelineState } from '@/stores/PipelineState';
import { watch, type ComponentPublicInstance } from 'vue';
const stepRefs = new Map<string, HTMLElement>()

function setStepRef(
  el: Element | ComponentPublicInstance<any>,
  step: string
) {

  if (el instanceof HTMLElement) {
    stepRefs.set(step, el)
  }
}

watch(() => pipelineState.currentProcess, () => {
  const element = stepRefs.get(`sv-loader-${pipelineState.currentProcess}`)

  console.log(pipelineState.completed);
  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  })
})
</script>

<template>
  <div ref="stepperRef" class="stepper-vertical sv-animated sv-h-fixed"
    style="--step-default-w: 20; --step-default-h: 60;">
    <div v-for="(step, index) in pipelineState.processesInfo" :key="'sv-loader-' + step.name"
      :ref="el => setStepRef(el, `sv-loader-${step.name}`)" :class="[
        'sv-step',
        index === 0 ? 'sv-step-top' : 'sv-step-bottom',
        { 'sv-current': pipelineState.currentProcess === step.name && !pipelineState.completed.includes(step.name) },
        { 'sv-completed': pipelineState.completed.includes(step.name) }
      ]">
      <div class="sv-step-indicator">
        <div class="sv-step-flow" />
      </div>
      <div class="sv-step-label text-muted text-5xl uppercase">
        {{ step.name }}
      </div>
    </div>
  </div>
</template>
