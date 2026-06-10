<script setup lang="ts">
import { useOpenCookingManager } from '@/composables/useOpenCookingManager';
import type { Ingredient, Equipment, Technique } from '@/open-cooking-core/runtime/objects';
import Drawer from './Drawer.vue';
import { useExploreDrawer } from '@/composables/useExploreDrawer.ts';
import { IngredientCard, EquipmentCard, TechniqueCard } from './explores';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const { ingredients, techniques, equipment } = useOpenCookingManager()
const { drawerView, drawerComponent } = useExploreDrawer()
const route = useRoute()
const types = computed(() => {
  return route.query.object ? [route.query.object as string] : ['ingredients', 'techniques', 'equipment']
})
</script>

<template>
  <Drawer :open="!!drawerView" @close="drawerView = undefined">
    <component :is="drawerComponent?.component" v-bind="drawerComponent?.props" />
  </Drawer>

  <section class="space-y-12">
    <section v-if="types.includes('ingredients')">
      <div class="mb-6 flex items-center gap-3">
        <h2 class="text-2xl font-semibold heading-underline">
          Ingredients
        </h2>

        <span class="text-sm text-muted">
          {{ ingredients?.size }} items
        </span>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <IngredientCard v-for="[_, ingredient] in ingredients" v-bind="{ ingredient: ingredient as Ingredient }" />
      </div>
    </section>
    <section v-if="types.includes('equipment')">
      <div class="mb-6 flex items-center gap-3">
        <h2 class="text-2xl font-semibold heading-underline">
          Equipment
        </h2>

        <span class="text-sm text-muted">
          {{ equipment?.size }} items
        </span>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <EquipmentCard v-for="[_, e] in equipment" v-bind="{ equipment: e as Equipment }" />
      </div>
    </section>
    <section v-if="types.includes('techniques')">
      <div class="mb-6 flex items-center gap-3">
        <h2 class="text-2xl font-semibold heading-underline">
          Techniques
        </h2>

        <span class="text-sm text-muted">
          {{ techniques?.size }} items
        </span>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <TechniqueCard v-for="[_, t] in techniques" v-bind="{ technique: t as Technique }" />
        <!-- <TechniqueCard /> -->
        <!-- <TechniqueCard /> -->
      </div>
    </section>
  </section>

</template>
