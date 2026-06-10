<script setup lang="ts">
import { ref, onMounted, watch, type ComponentPublicInstance } from 'vue'
import { IconMagnifyingGlass } from '@/assets/icons'

const isDark = ref(true)
function applyTheme() {
  document.documentElement.classList.toggle(
    'dark',
    isDark.value,
  )
}
function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme()
}
const bgOptions = ref<string[]>([
  'bg-page',
  'bg-surface',
  'bg-sidebar',
  'bg-header',
  'bg-surface-hover',
  'bg-surface-active',
  'bg-surface-elevated',
  'bg-surface-soft',
  'bg-brand',
  'bg-brand-violet',
  'bg-brand-purple',
  'bg-brand-fuchsia',
  'bg-success-soft',
  'bg-warning-soft',
  'bg-error-soft',
  'bg-fatal-soft',
])
const textOptions = ref<string[]>([
  'text-default',
  'text-muted',
  'text-subtle',
  'text-inverse',
  'text-success',
  'text-warning',
  'text-error',
  'text-fatal',
  'text-brand',
  'text-brand-muted',
  'text-brand-soft',
  'text-brand-violet',
  'text-brand-purple',
  'text-brand-fuchsia',
])
const linkOptions = ref<string[]>([
  'link',
  'link-external',
  'link-reference',
  'link-ref',
  'link-brand',
  'link-disabled',
  'link-inline',
  'link-underline',
  'link-underline-subtle',
  'link-underline-hover',
  'link-underline link-brand',
  'link-nav',
])
const inputOptions = ref<string[]>([
  'oc-input',
  'oc-input oc-input-success',
  'oc-input oc-input-warning',
  'oc-input oc-input-error',
])
const inputGroupOptions = ref<string[]>([
  'oc-input-group',
  'oc-input-group oc-input-group-success',
  'oc-input-group oc-input-group-warning',
  'oc-input-group oc-input-group-error',
  'oc-input-group oc-input-group-fatal',
])
const inputFloatingOptions = ref<string[]>([
  'oc-input-floating',
  'oc-input-floating oc-input-floating-success',
  'oc-input-floating oc-input-floating-warning',
  'oc-input-floating oc-input-floating-error',
  'oc-input-floating oc-input-floating-fatal',
])
const inputFloatingIconOptions = ref<string[]>([
  'oc-input-floating oc-input-floating-icon',
  'oc-input-floating oc-input-floating-icon oc-input-floating-success',
  'oc-input-floating oc-input-floating-icon oc-input-floating-warning',
  'oc-input-floating oc-input-floating-icon oc-input-floating-error',
  'oc-input-floating oc-input-floating-icon oc-input-floating-fatal',
])
const btnOptions = ref<string[]>([
  'btn',
  'btn btn-primary',
  'btn btn-secondary',
  'btn btn-success',
  'btn btn-warning',
  'btn btn-error',
  'btn btn-fatal',
  'btn btn-outline',
  'btn btn-ghost',
  'btn btn-brand',
  'btn btn-link',
  'btn btn-sm',
  'btn btn-lg',
  'btn btn-link-reference'
])
const headingOptions = ref<string[]>([
  'heading-default',
  'heading-muted',
  'heading-subtle',
  'heading-brand',
  'heading-violet',
  'heading-purple',
  'heading-fuchsia',
  'heading-success',
  'heading-warning',
  'heading-error',
  'heading-gradient',
  'heading-light',
  'heading-normal',
  'heading-medium',
  'heading-semibold',
  'heading-bold',
  'heading-black',
  'heading-uppercase',
  'heading-tight',
  'heading-normal-spacing',
  'heading-wide',
  'heading-underline',
  'heading-dash',
  'heading-accent',
  'heading-subtitle',
])
const cardOptions = ref<string[]>([
  'card card-rounded',
  'card-elevated',
  'card card-interactive',
  'card-soft',
  'card-brand',
  'card card-success',
  'card card-warning',
  'card card-error',
  'card card-fatal',
  'card card-glass',
])

const listOptions = ref<string[]>([
  'list',
  'list list-bordered',
  'list list-hover',
  'list list-interactive',
  'list list-compact',
  'list list-spacious',
  'list list-soft',
  'list-cards',
  'list list-nav',
  'list list-numbered',
  'list list-numbered list-numbered-brand',
  'list list-bullets',
  'list list-check',
  'list list-timeline',
])
const progressBarOptions = ref<string[]>([
  'progress',
  'progress progress-brand',
  'progress progress-success',
  'progress progress-warning',
  'progress progress-error',
])
const stepNum = 7
const stepsGenerated = ref({
  'sv-h-fixed': {
    current: 0,
    next: 1
  },
  'sv-animated': {
    current: 0,
    next: 1
  },
  'sv-h-fixed-animated': {
    current: 0,
    next: 1
  }
})
const nextStep = ref<number>(1)
const stepRefs = new Map<string, HTMLElement>()

function setStepRef(
  el: Element | ComponentPublicInstance<any>,
  step: string
) {

  if (el instanceof HTMLElement) {
    stepRefs.set(step, el)
  }
}

function moveStep(key: 'sv-h-fixed' | 'sv-animated' | 'sv-h-fixed-animated') {

  stepsGenerated.value[key].current += 1
  if (stepsGenerated.value[key].current > (stepNum + 1)) {
    stepsGenerated.value[key].current = 0
  }
  stepsGenerated.value[key].next += 1
  if (stepsGenerated.value[key].next > (stepNum + 1)) {
    stepsGenerated.value[key].next = 0
  }
  console.log(key, stepsGenerated.value[key].current, stepsGenerated.value[key].next)
}

watch(() => stepsGenerated.value['sv-h-fixed'].current, (step) => {
  const element = stepRefs.get(`sv-h-fixed-${step === 0 ? 1 : step}`)
  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  })
})

watch(() => stepsGenerated.value['sv-animated'].current, (step) => {
  const element = stepRefs.get(`sv-animated-${step === 0 ? 1 : step}`)
  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  })
})

watch(() => stepsGenerated.value['sv-h-fixed-animated'].current, (step) => {
  const element = stepRefs.get(`sv-h-fixed-animated-${step === 0 ? 1 : step}`)
  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  })
})

onMounted(applyTheme)
</script>

<template>
  <div class="min-h-screen bg-page text-default pt-16">
    <!-- HEADER -->
    <header
      class="header fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-default">
      <div class="flex items-center gap-3">
        <div class="oc-logo-dot" />
        <span class="font-semibold text-lg">
          Open Cooking Playground
        </span>
      </div>
      <div>
        <RouterLink class="link m-3" to="/">Go back Home</RouterLink>
      </div>

      <button class="btn-secondary" @click="toggleTheme">
        {{ isDark ? '☀ Light' : '🌙 Dark' }}
      </button>
    </header>

    <!-- CONTENT -->
    <div class="mx-auto max-w-7xl space-y-10 p-8">

      <!-- BACKGROUND COLORS -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Background Colors
        </h2>
        <div class="grid grid-cols-5 gap-4">
          <div v-for="bg in bgOptions" class="card card-rounded p-4">
            <div :class="['h-16 rounded', bg]" />
            <p class="mt-2 text-sm">.{{ bg }}</p>
          </div>
        </div>
      </section>

      <!-- CARDS -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Cards
        </h2>
        <div class="grid grid-cols-5 gap-4">
          <div class="h-24 w-50 card">
            <div class="card-body">
              <h3 class="card-title">
                Default Card
              </h3>
              <p class="card-description">
                Basic card component.
              </p>
            </div>
          </div>
          <div class="h-24 w-50 card card-accent ">
            <div class="card-body">
              <h3 class="card-title">
                Accent Card
              </h3>
              <p class="card-description">
                Accent card component.
              </p>
            </div>
          </div>
          <div v-for="card in cardOptions" :class="['h-24 w-50', card]">
            <div class="card-body">
              <p class="card-description">
                .{{ card.split(' ').join(' .') }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- POPOVER -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Popover
        </h2>
        <div class="card card-rounded p-6 grid grid-cols-4 gap-4">
          <div class="card card-rounded card-elevated oc-popover oc-popover-left">
            <div class="card-body">
              Popover Left
              <div class="oc-popover-content border-default bg-surface">Left</div>
            </div>
          </div>
          <div class="card card-rounded card-elevated oc-popover oc-popover-top">
            <div class="card-body">
              Popover Top
              <div class="oc-popover-content border-default bg-surface">Top</div>
            </div>
          </div>
          <div class="card card-rounded card-elevated oc-popover oc-popover-right">
            <div class="card-body">
              Popover Right
              <div class="oc-popover-content border-default bg-surface">Right</div>
            </div>
          </div>
          <div class="card card-rounded card-elevated oc-popover oc-popover-bottom">
            <div class="card-body">
              Popover Bottom
              <div class="oc-popover-content border-default bg-surface">Bottom</div>
            </div>
          </div>
        </div>
      </section>

      <!-- TEXT -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Text
        </h2>
        <div class="card card-rounded space-y-3 p-6">
          <p v-for="txt in textOptions" :class="['text-default', txt]">
            .{{ txt }}
          </p>
        </div>
      </section>

      <!-- HEADING -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          HEADING
        </h2>
        <div class="card card-rounded space-y-3 p-6">
          <h3 v-for="heading in headingOptions" :class="heading">.{{ heading }}</h3>
        </div>
      </section>

      <!-- LINKS -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Links
        </h2>
        <div class="card card-rounded flex flex-col gap-3 p-6">
          <a v-for="link in linkOptions" href="#" :class="link">.{{ link.split(' ').join(' .') }}</a>
        </div>
      </section>

      <!-- BUTTONS -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Buttons
        </h2>
        <div class="grid grid-cols-5 gap-4">
          <button v-for="btn in btnOptions" :class="btn">
            .{{ btn.split(' ').join(' .') }}
          </button>
        </div>
      </section>

      <!-- INPUTS -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Inputs
        </h2>
        <div class="card card-rounded flex flex-col gap-3 p-6">
          <span v-for="input in inputOptions">
            <label class="block text-xs font-medium pb-1">.{{ input.split(' ').join(' .') }}</label>
            <input :class="input" placeholder="Search..." />
          </span>
          <span>
            <label class="block text-xs font-medium pb-1">.oc-input disabled</label>
            <input class="oc-input" placeholder="Disabled" disabled />
          </span>
          <span>
            <label class="block text-xs font-medium pb-1">.oc-input readonly</label>
            <input class="oc-input" value="Readonly value" readonly />
          </span>
        </div>
      </section>

      <!-- INPUTS GROUP -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Inputs Group
        </h2>
        <div class="card card-rounded flex flex-col gap-3 p-6">
          <span v-for="input in inputGroupOptions">
            <label class="block text-xs font-medium pb-1">.{{ input.split(' ').join(' .') }}</label>
            <div :class="input">
              <IconMagnifyingGlass class="h-4 w-4" />
              <input type="search" placeholder="Search" />
            </div>
          </span>
        </div>
      </section>

      <!-- INPUTS FLOATING -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Inputs Floating
        </h2>
        <div class="card card-rounded flex flex-col gap-3 p-6">
          <span v-for="input in inputFloatingOptions">
            <label class="block text-xs font-medium pb-1">.{{ input.split(' ').join(' .') }}</label>
            <div :class="input">
              <input :id="input.split(' ').join('_')" type="search" placeholder=" " />
              <label :for="input.split(' ').join('_')">Search...</label>
            </div>
          </span>
        </div>
      </section>

      <!-- INPUTS FLOATING ICON -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Inputs Floating
        </h2>
        <div class="card card-rounded flex flex-col gap-3 p-6">
          <span v-for="input in inputFloatingIconOptions">
            <label class="block text-xs font-medium pb-1">.{{ input.split(' ').join(' .') }}</label>
            <div :class="input">
              <input :id="input.split(' ').join('_')" class="px-4 py-2" type="search" placeholder=" " />
              <label :for="input.split(' ').join('_')">Search...</label>
              <IconMagnifyingGlass class="oc-input-icon" />
            </div>
          </span>
        </div>
      </section>

      <!-- LISTS -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Lists
        </h2>
        <div class="grid grid-cols-5 gap-4">
          <div v-for="list in listOptions" class="card card-rounded">
            <div class="card-body">
              <h3 class="card-title">
                .{{ list.split(' ').join(' .') }}
              </h3>
              <span class="card-description">
                <ul :class="list">
                  <li v-for="item in 5" class="list-item">item {{ item }}</li>
                </ul>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- LOADER -->
      <div class="rounded m-4">
        <h1 class="heading-underline">
          Loader
        </h1>
        <div class="grid grid-cols-5 gap-5 p-4">
          <div class="loader"></div>
          <div class="loader loader-comet"></div>
          <div class="loader loader-brand"></div>
          <div class="loader loader-brand-2"></div>
          <div class="loader loader-progress"></div>

          <div class="loader loader-warning"></div>
          <div class="loader loader-comet loader-warning"></div>
          <div class="loader loader-brand loader-warning"></div>
          <div class="loader loader-brand-2 loader-warning"></div>
          <div class="loader loader-progress loader-warning"></div>

          <div class="loader loader-error"></div>
          <div class="loader loader-comet loader-error"></div>
          <div class="loader loader-brand loader-error"></div>
          <div class="loader loader-brand-2 loader-error"></div>
          <div class="loader loader-progress loader-error"></div>

          <div class="loader loader-fatal"></div>
          <div class="loader loader-comet loader-fatal"></div>
          <div class="loader loader-brand loader-fatal"></div>
          <div class="loader loader-brand-2 loader-fatal"></div>
          <div class="loader loader-progress loader-fatal"></div>
        </div>
      </div>

      <!-- PROGRESS BAR -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Progress Bar
        </h2>

        <div class="grid grid-cols-5 gap-4">
          <div v-for="progress in progressBarOptions" class="card card-rounded">
            <div class="card-body">
              <div :class="progress">
                <div class="progress-bar" style="width: 65%;" />
              </div>
              <h3 class="heading-subtitle">.{{ progress.split(' ').join(' .') }}</h3>
            </div>
          </div>
        </div>
      </section>

      <!-- STEPPER HORIZONTAL -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          STEPPER HORIZONTAL
        </h2>

        <div class="flex flex-col gap-3 p-6">
          <div class="stepper-horizontal stepper-lg">
            <div class="step completed">
              <div class="step-marker">
                <div class="step-bullet" />
              </div>
              <div class="step-label">
                completed
              </div>
            </div>

            <div class="step completed">
              <div class="step-marker">
                <div class="step-bullet" />
              </div>
            </div>

            <div class="step current">
              <div class="step-marker">
                <div class="step-bullet" />
              </div>
              <div class="step-label">
                current
              </div>
            </div>

            <div class="step pending">
              <div class="step-marker">
                <div class="step-bullet" />
              </div>
              <div class="step-label">
                pending
              </div>
            </div>
          </div>

          <div class="stepper-horizontal stepper-flow stepper-lg">
            <div class="step current">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                current
              </div>
            </div>

            <div class="step">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>
            </div>

            <div class="step">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>
            </div>

            <div class="step">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                pending
              </div>
            </div>
          </div>

          <div class="stepper-horizontal stepper-flow stepper-lg">
            <div class="step completed step-current-path">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                completed
              </div>
            </div>

            <div class="step current">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                current
              </div>
            </div>

            <div class="step">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>
            </div>

            <div class="step">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                pending
              </div>
            </div>
          </div>

          <div class="stepper-horizontal stepper-flow stepper-lg">
            <div class="step completed">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                completed
              </div>
            </div>

            <div class="step completed step-current-path">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>
            </div>

            <div class="step current">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                current
              </div>
            </div>

            <div class="step">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                pending
              </div>
            </div>
          </div>

          <div class="stepper-horizontal stepper-flow stepper-lg">
            <div class="step completed">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                completed
              </div>
            </div>

            <div class="step completed">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>
            </div>

            <div class="step completed">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>
            </div>

            <div class="step completed">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                complete
              </div>
            </div>
          </div>

          <div class="stepper-horizontal stepper-warning stepper-lg">
            <div class="step completed">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                completed
              </div>
            </div>

            <div class="step completed step-current-path">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>
            </div>

            <div class="step current">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                warning
              </div>
            </div>

            <div class="step">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                pending
              </div>
            </div>
          </div>

          <div class="stepper-horizontal stepper-error stepper-lg">
            <div class="step completed">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                completed
              </div>
            </div>

            <div class="step completed step-current-path">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>
            </div>

            <div class="step current">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                error
              </div>
            </div>

            <div class="step">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                pending
              </div>
            </div>
          </div>

          <div class="stepper-horizontal stepper-fatal stepper-lg">
            <div class="step completed">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                completed
              </div>
            </div>

            <div class="step completed step-current-path">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>
            </div>

            <div class="step current">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                fatal
              </div>
            </div>

            <div class="step">
              <div class="step-marker">
                <div class="step-bullet"></div>
              </div>

              <div class="step-label">
                pending
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- STEPPER VERTICAL -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          Stepper Vertical
          <small class="text-subtle text-sm">--step-default-w: 6; --step-default-h: 30;</small>
        </h2>
        <div class="card rounde m-4">
          <div class="card-body">
            <h1 class="card-title heading-underline">
              Steps Pending
            </h1>
            <div class="grid grid-cols-2">
              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-top">
                  <div class="sv-step-indicator" />
                </div>
              </div>

              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-bottom">
                  <div class="sv-step-indicator" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card rounded m-4">
          <div class="card-body">
            <h1 class="card-title heading-underline">
              Steps Current
            </h1>
            <div class="grid grid-cols-2">
              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-top sv-current">
                  <div class="sv-step-indicator" />
                </div>
              </div>

              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-bottom sv-current">
                  <div class="sv-step-indicator" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card rounded m-4">
          <div class="card-body">
            <h1 class="card-title heading-underline">
              Steps Completed
            </h1>
            <div class="grid grid-cols-2">
              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-top sv-completed">
                  <div class="sv-step-indicator" />
                </div>
              </div>

              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-bottom sv-completed">
                  <div class="sv-step-indicator" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card rounded m-4">
          <div class="card-body">
            <h1 class="card-title heading-underline">
              Multiple Steps
            </h1>
            <div class="grid grid-cols-6 p-4">
              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-top">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom">
                  <div class="sv-step-indicator" />
                </div>
              </div>
              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-top sv-current">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom">
                  <div class="sv-step-indicator" />
                </div>
              </div>
              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-top sv-completed">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom sv-current">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom">
                  <div class="sv-step-indicator" />
                </div>
              </div>
              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-top sv-completed">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom sv-completed">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom sv-current">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom">
                  <div class="sv-step-indicator" />
                </div>
              </div>

              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-top sv-completed">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom sv-completed">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom sv-completed">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom sv-current">
                  <div class="sv-step-indicator" />
                </div>
              </div>

              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-top sv-completed">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom sv-completed">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom sv-completed">
                  <div class="sv-step-indicator" />
                </div>
                <div class="sv-step sv-step-bottom sv-completed">
                  <div class="sv-step-indicator" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card rounded m-4">
          <div class="card-body">
            <h1 class="card-title heading-underline">
              Fixed Height
            </h1>
            <button class="btn btn-primary m-2" @click="moveStep('sv-h-fixed')">Goto Step {{
              stepsGenerated['sv-h-fixed'].next }}</button>
            <div class="card-body">
              <div class="card-description">
                Current: {{ stepsGenerated['sv-h-fixed'].current }}
                Next: {{ stepsGenerated['sv-h-fixed'].next }} {{ stepsGenerated['sv-h-fixed'].next === 0 ?
                  '(all stepspending) ' : (
                    stepsGenerated['sv-h-fixed'].next === (stepNum + 1) ? '(all steps completed)' : ''
                  )
                }}
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div ref="stepperRef" class="stepper-vertical sv-h-fixed"
                style="--step-default-w: 6; --step-default-h: 30;">
                <div v-for="step in stepNum" :key="'sv-h-fixed-' + step"
                  :ref="el => setStepRef(el, `sv-h-fixed-${step}`)" :class="[
                    'sv-step',
                    step === 1 ? 'sv-step-top' : 'sv-step-bottom',
                    stepsGenerated['sv-h-fixed'].current > 0 && step === stepsGenerated['sv-h-fixed'].current ? 'sv-current' : '',
                    stepsGenerated['sv-h-fixed'].current > step ? 'sv-completed' : ''
                  ]">
                  <div class="sv-step-indicator" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card rounded m-4">
          <div class="card-body">
            <h1 class="card-title heading-underline">
              Content
            </h1>

            <div class="grid grid-cols-2">
              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-top">
                  <div class="sv-step-indicator" />
                  <div class="sv-step-content">
                    <div class="sv-step-title">
                      Content
                    </div>

                    <div class="sv-step-description">
                      Description
                    </div>
                  </div>
                </div>
              </div>
              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-bottom">
                  <div class="sv-step-indicator" />

                  <div class="sv-step-content">
                    <div class="sv-step-title">
                      Content
                    </div>

                    <div class="sv-step-description">
                      Description
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card rounded m-4">
          <div class="card-body">
            <h1 class="card-title heading-underline">
              Label
            </h1>

            <div class="grid grid-cols-2">
              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-top">
                  <div class="sv-step-indicator" />
                  <div class="sv-step-label">
                    Label
                  </div>
                </div>
              </div>
              <div class="stepper-vertical" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-bottom">
                  <div class="sv-step-indicator" />
                  <div class="sv-step-label">
                    Label
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card rounded m-4">
          <div class="card-body">
            <h1 class="card-title heading-underline">
              Current Animated
            </h1>
            <div class="grid grid-cols-2">
              <div class="stepper-vertical sv-animated" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-top sv-current">
                  <div class="sv-step-indicator" />
                </div>
              </div>

              <div class="stepper-vertical sv-animated" style="--step-default-w: 6; --step-default-h: 30;">
                <div class="sv-step sv-step-bottom sv-current">
                  <div class="sv-step-indicator">
                    <div class="sv-step-flow" />
                  </div>
                </div>
              </div>

              <div class="card-body">
                <div class="card-description">
                  <button class="btn btn-primary m-2" @click="moveStep('sv-animated')">Goto Step {{ nextStep }}</button>
                  Current: {{ stepsGenerated['sv-animated'].current }}
                  Next: {{ stepsGenerated['sv-animated'].next }} {{ stepsGenerated['sv-animated'].next === 0 ?
                    '(all stepspending) ' : (
                      stepsGenerated['sv-animated'].next === (stepNum + 1) ? '(all steps completed)' : ''
                    )
                  }}
                </div>
              </div>
              <div class="card-body">
                <div class="card-description">
                  <button class="btn btn-primary m-2" @click="moveStep('sv-h-fixed-animated')">Goto Step {{ nextStep
                    }}</button>
                  Current: {{ stepsGenerated['sv-h-fixed-animated'].current }}
                  Next: {{ stepsGenerated['sv-h-fixed-animated'].next }} {{ stepsGenerated['sv-h-fixed-animated'].next
                    === 0 ?
                    '(all stepspending) ' : (
                      stepsGenerated['sv-h-fixed-animated'].next === (stepNum + 1) ? '(all steps completed)' : ''
                    )
                  }}
                </div>
              </div>
              <div ref="stepperRef" class="stepper-vertical sv-animated"
                style="--step-default-w: 6; --step-default-h: 30;">
                <div v-for="step in stepNum" :key="'sv-animated-' + step"
                  :ref="el => setStepRef(el, `sv-animated-${step}`)" :class="[
                    'sv-step',
                    step === 1 ? 'sv-step-top' : 'sv-step-bottom',
                    stepsGenerated['sv-animated'].current > 0 && step === stepsGenerated['sv-animated'].current ? 'sv-current' : '',
                    stepsGenerated['sv-animated'].current > step ? 'sv-completed' : ''
                  ]">
                  <div class="sv-step-indicator">
                    <div class="sv-step-flow" />
                  </div>
                </div>
              </div>
              <div ref="stepperRef" class="stepper-vertical sv-animated sv-h-fixed"
                style="--step-default-w: 6; --step-default-h: 30;">
                <div v-for="step in stepNum" :key="'sv-h-fixed-animated-' + step"
                  :ref="el => setStepRef(el, `sv-h-fixed-animated-${step}`)" :class="[
                    'sv-step',
                    step === 1 ? 'sv-step-top' : 'sv-step-bottom',
                    stepsGenerated['sv-h-fixed-animated'].current > 0 && step === stepsGenerated['sv-h-fixed-animated'].current ? 'sv-current' : '',
                    stepsGenerated['sv-h-fixed-animated'].current > step ? 'sv-completed' : ''
                  ]">
                  <div class="sv-step-indicator">
                    <div class="sv-step-flow" />
                  </div>
                  <div class="sv-step-label">
                    Step {{ step }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>