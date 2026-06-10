<script setup lang="ts">
import { useOpenCookingManager } from '@/composables/useOpenCookingManager';
import { Annotation, Equipment, Ingredient, Media, Technique } from '@/open-cooking-core/runtime/objects';
import { computed, ref } from 'vue';
import Drawer from './Drawer.vue';
import { AnnotationView, EquipmentView, MediaView, SourceView } from './readRecipe';
import TechniqueView from './readRecipe/TechniqueView.vue';
import IngredientView from './readRecipe/IngredientView.vue';
import { formatDuration, resolveRef } from '@/helpers/routing.helper.ts';
import { RoutingService } from '@/services/RoutingService.ts';

type DrawerState =
  | {
    type: 'annotation'
    annotations: Annotation[]
  }
  | {
    type: 'equipment'
    equipment: Equipment
  }
  | {
    type: 'technique',
    technique: Technique
  }
  | {
    type: 'ingredient',
    ingredient: Ingredient
  }
  | {
    type: 'source'
    source: {}
  }
  | {
    type: 'media'
    media: Media[]
  }
  | undefined
const { currentRecipe } = useOpenCookingManager()

const computedIngredients = computed(() => resolveRef(currentRecipe.value?.ingredients))
const computedEquipment = computed(() => resolveRef(currentRecipe.value?.equipments))
const drawerView = ref<DrawerState>()
const drawerComponent = computed(() => {
  switch (drawerView.value?.type) {
    case 'annotation':
      return {
        component: AnnotationView,
        props: {
          annotations: drawerView.value.annotations
        }
      }

    case 'equipment':
      return {
        component: EquipmentView,
        props: {
          equipment: drawerView.value.equipment
        }
      }

    case 'technique':
      return {
        component: TechniqueView,
        props: {
          technique: drawerView.value.technique
        }
      }

    case 'ingredient':
      return {
        component: IngredientView,
        props: {
          ingredient: drawerView.value.ingredient
        }
      }

    case 'source':
      return {
        component: SourceView,
        props: {
          source: drawerView.value.source
        }
      }

    case 'media':
      return {
        component: MediaView,
        props: {
          media: drawerView.value.media
        }
      }
  }
})
</script>

<template>
  <Drawer :open="!!drawerView" @close="drawerView = undefined">
    <component :is="drawerComponent?.component" v-bind="drawerComponent?.props" />
  </Drawer>

  <div class="h-full grid grid-cols-4">
    <div class="col-span-3 min-h-0 flex flex-col">
      <header class="mb-4">
        <h1 class="text-5xl font-semibold tracking-tight heading-accent">
          {{ currentRecipe?.name }}
        </h1>
        <p v-if="currentRecipe?.summary?.length" class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {{ currentRecipe?.summary }}
        </p>
        <div class="mb-4 flex items-center gap-2 text-sm text-subtle">
          <span v-for="(category, index) in currentRecipe?.category">
            <span v-if="index > 0"> • </span>
            {{ category }}
          </span>
        </div>
        <div class="mb-4 flex items-center gap-2 text-sm text-muted">
          <div v-if="currentRecipe?.sourceName.length">
            Source:
            <span class="link-ref cursor-pointer"
              @click="drawerView = { type: 'source', source: { name: currentRecipe?.sourceName, summary: currentRecipe?.sourceSummary, url: currentRecipe?.sourceUrl, annotations: currentRecipe?.sourceAnnotations } }">
              {{ currentRecipe?.sourceName }}
            </span>
          </div>
          <span v-if="currentRecipe?.sourceName.length && currentRecipe?.version.length"> • </span>
          <div v-if="currentRecipe?.version.length">
            Version:
            <span class="text-muted">
              {{ currentRecipe?.version }}
            </span>
          </div>
          <span
            v-if="(currentRecipe?.sourceName.length || currentRecipe?.version.length) && currentRecipe?.media.length"> •
          </span>
          <div v-if="currentRecipe?.media.length" class="cursor-pointer link-nav"
            @click="drawerView = { type: 'media', media: (currentRecipe?.media || []) }">
            Resources ({{ currentRecipe?.media.length }})
          </div>
          <!-- <RouterLink v-if="currentRecipe?.id" :to="`${RoutingService.cook(currentRecipe.id || '')}`"
            class="flex items-center gap-2 text-xs px-3 py-1 link-inline cursor-pointer">
            <IconPlay class="w-4 h-4" /> Start Cooking
          </RouterLink> -->

        </div>

        <div class="mt-6 flex flex-wrap gap-3">
          <div v-if="currentRecipe?.difficulty?.length" class="rounded-lg border bg-surface border-soft px-3 py-2">
            <p class="text-xs font-semibold">Difficulty</p>
            <p class="mt-1 text-sm text-muted">
              {{ currentRecipe?.difficulty }}
              <span v-if="currentRecipe?.difficultyRational" class="oc-popover oc-popover-right group cursor-help">
                ⓘ
                <span class="oc-popover-content border-soft bg-surface-active text-muted">
                  {{ currentRecipe?.difficultyRational }}
                </span>
              </span>
            </p>
          </div>
          <div v-if="currentRecipe?.details?.prepTime" class="rounded-lg border bg-surface border-soft px-3 py-2">
            <p class="text-xs font-semibold">Prep Time</p>
            <p class="mt-1 text-sm text-muted">
              {{ formatDuration(currentRecipe.details.prepTime) }}
            </p>
          </div>
          <div v-if="currentRecipe?.details?.cookTime" class="rounded-lg border bg-surface border-soft px-3 py-2">
            <p class="text-xs font-semibold">Cook Time</p>

            <p class="mt-1 text-sm text-muted">
              {{ formatDuration(currentRecipe.details.cookTime) }}
            </p>
          </div>
          <div v-if="currentRecipe?.details?.quantity?.length"
            class="rounded-lg border bg-surface border-soft px-3 py-2">
            <p class="text-xs font-semibold">Yield</p>
            <p class="mt-1 text-sm text-muted">
              {{ currentRecipe?.details?.quantity }}
            </p>
          </div>
        </div>
      </header>
      <section class="min-h-0 flex-1 overflow-auto">
        <div class="">
          <h5 class="font-semibold tracking-wider heading-dash-2">
            Instructions
          </h5>
          <ol class="pt-4 space-y-6">
            <li v-for="(step, index) in currentRecipe?.steps" :class="[
              'space-y-1',
              { 'border-b border-default': !((index + 1) === currentRecipe?.steps.length) }
            ]">
              <div class="flex items-center gap-3">
                <span class="text-muted">
                  {{ step.stepNumber ? step.stepNumber : (index + 1) }}
                </span>
                <span v-if="step.name.length"> • </span>
                <span v-if="step.name.length" class="font-medium">
                  {{ step.name }}
                </span>
                <span v-if="step.duration"> • </span>
                <span v-if="step.duration" class="text-xs text-muted">
                  {{ formatDuration(step.duration) }}
                </span>
                <span v-if="step.annotations.length"> • </span>
                <button v-if="step.annotations.length" class="cursor-pointer link-underline link-brand text-xs"
                  @click="drawerView = { type: 'annotation', annotations: step.annotations }">
                  {{ step.annotations.length }} note
                </button>
                <span v-if="step.media.length"> • </span>
                <div v-if="step?.media.length" class="cursor-pointer text-xs link-nav"
                  @click="drawerView = { type: 'media', media: (step?.media || []) }">
                  Resources ({{ step?.media.length }})
                </div>
              </div>
              <p class="text-sm leading-relaxed">
                {{ step.instruction }}
              </p>
              <ul class="list list-timeline">
                <li v-for="subStep in step.subSteps" class="text-xs list-item">
                  {{ subStep.instruction }}
                </li>
              </ul>
              <div class="flex gap-2 pb-4">
                <span v-for="t in resolveRef(step.techniques)" class="link-ref cursor-pointer text-xs"
                  @click="drawerView = { type: 'technique', technique: t.object }">
                  {{ t.object.name }}
                </span>
              </div>

            </li>
          </ol>
        </div>
      </section>
    </div>

    <aside class="flex-none hidden md:block border-l border-soft">
      <div class="h-full sticky top-0 p-6 space-y-6">
        <h5 class="font-semibold tracking-wider heading-dash-2">
          Ingredients
        </h5>
        <ul class="space-y-3 text-sm">
          <li v-for="ingredient in computedIngredients" class="flex justify-between">
            <router-link v-if="ingredient.object.recipeRef !== null"
              class="cursor-pointer link-sub-recipe oc-popover oc-popover-bottom"
              :to="`${RoutingService.recipe(ingredient.object.recipeRef.id || '')}`">
              {{ ingredient.object.name }}
              <span v-if="ingredient.object.recipeRef !== null"
                class="oc-popover-content border-soft bg-surface-active text-muted">
                View the recipe
              </span>
            </router-link>
            <span v-else class="cursor-pointer link-ref"
              @click="drawerView = { type: 'ingredient', ingredient: ingredient.object }">
              {{ ingredient.object.name }}
            </span>
            <span v-if="ingredient.object.quantity > 0" class="text-muted">
              {{ ingredient.object.quantity + ' ' + ingredient.object.unit.replace('unit', '') }}
            </span>
          </li>
        </ul>

        <h5 v-if="computedEquipment.length" class="font-semibold tracking-wider heading-dash-2">
          Equipment
        </h5>
        <ul v-if="computedEquipment.length" class="space-y-3 text-sm">
          <li v-for="equipment in computedEquipment" class="flex justify-between"
            @click="drawerView = { type: 'equipment', equipment: equipment.object }">
            <span :class="[
              { 'cursor-pointer link-ref': equipment.type === 'reference' },
            ]">{{ equipment.object.name }}</span>
          </li>
        </ul>
        <div v-if="currentRecipe?.tags.length" class="flex flex-wrap pt-2 border-t text-sm border-soft text-subtle">
          <span v-for="(tag, index) in currentRecipe?.tags" class="m-2 word-wrap">
            <span class="whitespace-nowrap border border-soft bg-elevated rounded px-1.5 py-0.5">{{ tag }}</span>
          </span>
        </div>
      </div>
    </aside>
  </div>
</template>
