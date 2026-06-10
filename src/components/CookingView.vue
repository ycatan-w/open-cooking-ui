<script setup lang="ts">
import { useCooking } from '@/composables/useCooking';
import { useOpenCookingManager } from '@/composables/useOpenCookingManager';
import { formatDuration, resolveRef } from '@/helpers/routing.helper';
import type { Technique } from '@/open-cooking-core/runtime/objects';
import { RoutingService } from '@/services/RoutingService';
import { useDocumentStore } from '@/stores/document.store';
import { onUnmounted, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const { currentRecipe } = useOpenCookingManager()

const {
  state,
  stateSteps,
  currentStepNumber,

  currentStep,
  nextStep,
  previousStep,
  availableSteps,

  currentStepState,

  // progress,

  isRecipeCompleted,

  completeCurrentStep,

  goToPreviousStep,
  goToNextStep,

  toggleSubStep,
} = useCooking(currentRecipe)


const computedIngredients = computed(() => resolveRef(currentRecipe.value?.ingredients))
const documentStore = useDocumentStore()

async function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    await router.push(RoutingService.recipe(documentStore.recipeId.value || ''))
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div class="ocui-cooking fixed bottom-0 left-0 right-0 z-50 bg-surface border-default">
      <div class="h-screen grid grid-cols-5 bg-surface text-default">

        <div class="col-span-3 flex flex-col min-h-0 border-r border-soft">
          <div class="p-4 flex items-center justify-between">
            <div>
              <h1 class="text-lg font-semibold">{{ currentRecipe?.name }}</h1>
              <p class="text-xs text-muted">Cooking mode • Instruction {{ currentStep?.data.stepNumber }} of {{
                currentRecipe?.steps.length }}</p>
            </div>
          </div>


          <div class="stepper-horizontal stepper-flow stepper-lg">
            <div v-for="s in stateSteps" :class="[
              'step ',
              { 'completed': s.completed },
              { 'step-current-path': s.completed && s.data.id === previousStep?.data.id },
              { 'current': s.data.id === currentStep?.data.id },
            ]">
              <div class="step-marker">
                <div class="step-bullet" />
              </div>
            </div>
            <!-- <div v-for="[id, s] in state.entries()" :class="[
              'step ',
              { 'completed': s.completed },
              { 'step-current-path': s.completed && id === previousStep?.data.id },
              { 'current': id === currentStep?.data.id },
            ]">
              <div class="step-marker">
                <div class="step-bullet" />
              </div>
            </div> -->
          </div>

          <div class="flex-1 overflow-auto p-6 space-y-6">
            <div class="rounded-xl border border-soft bg-surface-active p-5 shadow-sm">
              <div v-if="!isRecipeCompleted" class="flex items-center justify-between mb-3">
                <div>
                  <p class="text-xs uppercase tracking-wider text-muted">Instruction {{ currentStep?.data.stepNumber }}
                  </p>
                  <h2 class="text-xl font-semibold" v-if="currentStep?.data.name">{{ currentStep?.data.name }}</h2>
                </div>
                <span class="text-xs px-2 py-1 rounded bg-brand text-white">
                  Active
                </span>
              </div>

              <p class="text-sm text-muted leading-relaxed">
                {{ currentStep?.data.instruction }}
              </p>

              <div class="mt-4 space-y-2">
                <label class="flex items-center gap-2 text-sm" v-for="(subStep, index) in currentStep?.subSteps"
                  :key="currentStep?.data.id + 'substep_' + index">
                  <input :checked="currentStepState?.subSteps[index]?.completed" @change="toggleSubStep(index)"
                    type="checkbox" class="accent-brand">
                  {{ subStep.data.instruction }}
                </label>
              </div>



              <div class="mt-8 space-y-4">
                <div v-if="isRecipeCompleted" class="rounded-2xl border border-success p-8 text-center">
                  <div class="text-6xl">
                    🎉
                  </div>
                  <h2 class="mt-4 text-2xl font-bold">
                    Recipe completed
                  </h2>
                  <p class="mt-2 text-muted">
                    Great job! {{ currentRecipe?.name }} is ready.
                  </p>
                  <RouterLink :to="RoutingService.recipe(currentRecipe?.id || '')" class="link-underline link-brand">
                    View Recipe
                  </RouterLink>
                </div>
                <div v-else class="flex items-center justify-between">
                  <button v-if="currentStepNumber > 0" class="link-underline-hover cursor-pointer"
                    @click="goToPreviousStep">
                    ← Previous
                  </button>
                  <div v-else class="w-[100px]" />
                  <div class="text-center">
                    <p class="text-sm text-muted">
                      Instruction {{ currentStepNumber + 1 }}
                      of
                      {{ currentRecipe?.steps.length }}
                    </p>
                  </div>
                  <button class="link-inline cursor-pointer" @click="completeCurrentStep">
                    {{
                      nextStep
                        ? 'Next →'
                        : 'Finish 🎉'
                    }}
                  </button>
                </div>
              </div>
              <!-- <div class="mt-5 flex gap-2">
                <button v-if="!isRecipeCompleted && previousStep" class="btn btn-ghost" @click="goToPreviousStep">
                  Previous Step
                </button>
                <button v-if="!isRecipeCompleted" class="btn btn-brand" @click="completeCurrentStep">
                  {{ nextStep ? 'Next step →' : 'Complete recipe →' }}
                </button>
                <div v-else class="text-center">
                  <h2 class="text-xl font-semibold">
                    🎉 Recipe completed
                  </h2>
                </div>
              </div> -->
            </div>

            <div v-if="nextStep" class="rounded-lg border border-soft p-4 opacity-70">
              <p class="text-xs text-muted">Next</p>
              <p class="font-medium">{{ nextStep?.data.name || nextStep?.data.instruction }}</p>
              <p v-if="nextStep?.data.duration" class="text-xs text-muted mt-1">{{
                formatDuration(nextStep?.data.duration || 0)
                }}
              </p>
            </div>

            <div class="space-y-3">
              <div v-for="step in availableSteps" class="p-3 border border-soft rounded-lg flex justify-between">
                <span class="text-sm">{{ step.data.name || step.data.instruction }}</span>
                <span class="text-xs text-muted">{{ step?.completed ? '✔ done' : 'locked' }}</span>
              </div>
            </div>
          </div>
        </div>

        <aside class="col-span-2 flex flex-col min-h-0">
          <div class="p-5 border-b border-soft">
            <h3 class="font-semibold mb-3">Ingredients</h3>
            <ul class="space-y-2 text-sm">
              <li v-for="ingredient in computedIngredients" class="flex justify-between">
                {{ ingredient.object.name }}
                <span v-if="ingredient.object.quantity > 0" class="text-muted">
                  {{ ingredient.object.quantity + ' ' + ingredient.object.unit.replace('unit', '') }}
                </span>
              </li>
            </ul>
          </div>

          <div v-if="currentStep?.data.techniques.length" class="p-5 border-b border-soft">
            <h3 class="font-semibold mb-2">Technique</h3>
            <p class="text-sm text-muted" v-for="technique in resolveRef(currentStep?.data?.techniques as Technique[])">
              {{ technique.object.description }}
            </p>
          </div>

          <div class="p-5 flex-1 overflow-auto" v-if="currentStep?.data.annotations.length">
            <h3 class="font-semibold mb-3">Instruction Notes</h3>
            <div class="space-y-3">
              <div v-for="annotation in currentStep?.data.annotations" class="p-3 border-l-2 border-soft">
                <p class="text-xs text-muted capitalize">{{ annotation.type }}</p>
                <p class="text-sm">{{ annotation.text }}</p>
              </div>
            </div>
          </div>

          <div class="p-4 border-t border-soft flex gap-2">
            <RouterLink :to="`${RoutingService.recipe(currentRecipe?.id || '')}`"
              class="flex-1 px-3 py-2 btn btn-secondary text-sm">
              Exit Cooking
            </RouterLink>
          </div>
        </aside>
      </div>
    </div>
  </Teleport>
</template>

<style lang="css" scoped>
.ocui-cooking {
  min-height: 100%;

  overflow: auto;
  border-top-width: 1px;

  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
</style>
