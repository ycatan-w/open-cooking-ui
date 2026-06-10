import type { Recipe, RecipeStep } from '@/open-cooking-core/runtime/objects'
import { computed, ref, watch, type Ref } from 'vue'

export type CookingSubStepState = {
  completed: boolean
}

export type CookingStepState = {
  completed: boolean
  subSteps: CookingSubStepState[]
}
const currentStepNumber = ref(0)

const state = ref<Map<string, CookingStepState>>(new Map<string, CookingStepState>())
const stateSteps = ref<
  { completed: boolean; data: RecipeStep; subSteps: { completed: boolean; data: RecipeStep }[] }[]
>([])

export function useCooking(recipe: Ref<Recipe | undefined>) {
  let stepIds: string[] = []
  function initialize() {
    stateSteps.value =
      recipe.value?.steps.map((s) => ({
        completed: false,
        data: s,
        subSteps: s.subSteps.map((sub) => ({
          completed: false,
          data: sub,
        })),
      })) || []

    state.value.clear()
    stepIds = []
    currentStepNumber.value = 0
    recipe.value?.steps.forEach((step) => {
      if (step.id === undefined) {
        return
      }
      state.value?.set(step.id, {
        completed: false,
        subSteps: step.subSteps.map(() => ({
          completed: false,
        })),
      })
      stepIds.push(step.id)
    })
  }

  watch(
    recipe,
    () => {
      initialize()
    },
    {
      immediate: true,
    },
  )

  const currentStep = computed(() => {
    return isRecipeCompleted.value ? null : stateSteps.value[currentStepNumber.value]
    // return isRecipeCompleted.value ? null : recipe.value?.steps[currentStepNumber.value]
  })

  const nextStep = computed(() => {
    return isRecipeCompleted.value ? null : stateSteps.value[currentStepNumber.value + 1]

    // return isRecipeCompleted.value ? null : recipe.value?.steps[currentStepNumber.value + 1]
  })
  const previousStep = computed(() => {
    return isRecipeCompleted.value
      ? stateSteps.value[currentStepNumber.value]
      : stateSteps.value[currentStepNumber.value - 1] || null
    // return isRecipeCompleted.value
    //   ? recipe.value?.steps[currentStepNumber.value]
    //   : recipe.value?.steps[currentStepNumber.value - 1] || null
  })
  const availableSteps = computed(
    () =>
      stateSteps.value.filter(
        (s) => ![nextStep.value?.data.id, currentStep.value?.data.id].includes(s.data.id),
      ),
    // recipe.value?.steps.filter((s) => ![nextStep.value?.id, currentStep.value?.id].includes(s.id)),
  )

  const currentStepState = computed(() => {
    return stateSteps.value[currentStepNumber.value]
    // return state.value?.get(stepIds[currentStepNumber.value] as string)
  })

  const isRecipeCompleted = computed(() => {
    return stateSteps.value.filter((s) => !s.completed).length === 0
    // let completed = 0
    // for (const [_, st] of state.value || []) {
    //   completed += st.completed ? 1 : 0
    // }
    // return state.value?.size === completed
  })

  function goToPreviousStep() {
    if (currentStepNumber.value <= 0) {
      return
    }

    currentStepNumber.value--
  }

  function goToNextStep() {
    if (!recipe.value || currentStepNumber.value >= recipe.value.steps.length - 1) {
      return
    }

    currentStepNumber.value++
  }

  function completeCurrentStep() {
    // const step = state.value?.get(stepIds[currentStepNumber.value] as string)
    const step = stateSteps.value[currentStepNumber.value]

    if (!step) {
      return
    }

    step.completed = true

    goToNextStep()
  }

  function toggleSubStep(index: number) {
    const subStep = currentStepState.value?.subSteps[index]

    if (!subStep) {
      return
    }

    subStep.completed = !subStep.completed
  }

  function reset() {
    initialize()
  }

  return {
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

    initialize,

    goToPreviousStep,
    goToNextStep,

    completeCurrentStep,

    toggleSubStep,

    reset,
  }
}
