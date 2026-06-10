<script setup lang="ts">
import { useExploreDrawer } from '@/composables/useExploreDrawer';
import { resolveOneRef } from '@/helpers/routing.helper';
import { type Ingredient } from '@/open-cooking-core/runtime/objects';
import { RoutingService } from '@/services/RoutingService';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const ingredient = defineModel<Ingredient>('ingredient');
const computedRecipeIngredient = computed(() => resolveOneRef(ingredient?.value?.recipeRef || undefined))
const { drawerView } = useExploreDrawer()

</script>

<template>
  <div class="ingredient-card rounded-xl border border-soft bg-surface overflow-hidden">
    <div class="border-b border-soft px-4 py-3">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="font-medium text-default">
            {{ ingredient?.name }}
          </h3>
          <p class="mt-1 text-xs text-muted">
            Ingredient
          </p>
        </div>
        <span class="rounded-full border border-soft bg-elevated px-2 py-0.5 text-xs text-subtle">
          {{ ingredient?.category }}
        </span>
      </div>
    </div>

    <div class="p-4 space-y-3">
      <div class="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
        <span v-if="ingredient?.id" class="text-muted">Id</span>
        <span v-if="ingredient?.id" class="text-subtle">{{ ingredient?.id }}</span>

        <span v-if="ingredient?.quantity" class="text-muted">Quantity</span>
        <span v-if="ingredient?.quantity">{{ ingredient?.quantity }} {{ ingredient?.unit }}</span>

        <span v-if="ingredient?.category" class="text-muted">Category</span>
        <span v-if="ingredient?.category">{{ ingredient?.category }}</span>

        <span v-if="computedRecipeIngredient.object" class="text-muted">Recipe</span>
        <RouterLink v-if="computedRecipeIngredient.object"
          :to="`${RoutingService.recipe(computedRecipeIngredient.object.id || '')}`" class="text-left link-ref">
          {{ computedRecipeIngredient.object.name }}
        </RouterLink>
      </div>

      <div class="flex flex-wrap gap-2 pt-2 border-t border-soft">
        <span v-if="ingredient?.annotations.length"
          class="inline-flex items-center rounded-md border border-soft bg-elevated px-2 py-1 text-xs text-subtle">
          {{ ingredient?.annotations.length }} annotations
        </span>
        <span v-if="ingredient?.media.length"
          class="inline-flex items-center rounded-md border border-soft bg-elevated px-2 py-1 text-xs text-subtle">
          {{ ingredient?.media.length }} media
        </span>
        <span v-if="ingredient?.recipeRef?.id"
          class="inline-flex items-center rounded-md border border-soft bg-elevated px-2 py-1 text-xs text-subtle">
          Sub-recipe
        </span>
      </div>
    </div>

    <div class="border-t border-soft px-4 py-3 flex gap-2">
      <span class="link-ref text-xs cursor-pointer" v-if="ingredient?.media.length"
        @click="drawerView = { type: 'media', media: ingredient.media }">
        Media
      </span>
      <span class="link-ref text-xs cursor-pointer" v-if="ingredient?.annotations.length"
        @click="drawerView = { type: 'annotation', annotations: ingredient.annotations }">
        Annotations
      </span>
    </div>
  </div>
</template>

<style lang="css" scoped>
.ingredient-card .link-ref {
  font-size: var(--text-xs);
}
</style>
