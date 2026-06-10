<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useOpenCookingManager } from '@/composables/useOpenCookingManager';
import { RoutingService } from '@/services/RoutingService';

const { recipes, ingredients, techniques, equipment, metadata, currentRecipe } = useOpenCookingManager()
</script>

<template>
  <aside class="ocui-sidebar">
    <div class="p-4">
      <div class="rounded-lg border border-soft bg-surface p-4 space-y-3">
        <div class="text-xs uppercase tracking-wider text-muted">
          Specification
        </div>
        <h6 class="mt-1 font-semibold leading-tight">
          {{ metadata.title }}
        </h6>
        <p v-if="metadata.description" class="mt-2 text-xs text-muted line-clamp-3">
          {{ metadata.description }}
        </p>
        <div class="border-t border-soft pt-3 space-y-2 text-sm">
          <div v-if="metadata.author" class="flex items-center justify-between gap-4">
            <span class="text-muted">Author</span>
            <span class="text-right">{{ metadata.author }}</span>
          </div>
          <div v-if="metadata.version" class="flex items-center justify-between gap-4">
            <span class="text-muted">Version</span>
            <span>OCS {{ metadata.version }}</span>
          </div>
          <div v-if="metadata.format" class="flex items-center justify-between gap-4">
            <span class="text-muted">Format</span>
            <span class="uppercase">{{ metadata.format }}</span>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex items-center justify-between mb-3">
          <div class="text-xs uppercase tracking-wider text-muted">
            Recipes
          </div>
          <span class="text-xs text-muted">
            {{ recipes?.size || 0 }}
          </span>
        </div>
        <ul class="space-y-1 list list-hover">
          <RouterLink v-for="[_, recipe] in recipes" :to="`${RoutingService.recipe(recipe.id || '')}`">
            <li class="list-item cursor-pointer px-3 py-2 rounded border border-soft">
              <div class="font-medium text-sm">
                {{ recipe.name }}
              </div>
              <div v-if="currentRecipe?.id === recipe.id" class="text-xs text-muted">
                <span v-for="(category, index) in recipe?.category">
                  <span v-if="index > 0"> • </span>
                  {{ category }}
                </span>
              </div>
            </li>
          </RouterLink>
        </ul>
      </div>

      <div class="mt-6">
        <div class="mb-2 text-xs uppercase tracking-wider text-muted">
          Explore
        </div>
        <ul class="space-y-1 list list-hover ocui-explore">
          <RouterLink v-if="ingredients?.size" to="/explore?object=ingredients">
            <li class="list-item items-center justify-between px-3 py-2 rounded cursor-pointer">
              Ingredients
              <span class="text-xs text-muted">
                {{ ingredients.size }}
              </span>
            </li>
          </RouterLink>
          <RouterLink v-if="equipment?.size" to="/explore?object=equipment">
            <li v-if="equipment?.size" class="list-item items-center justify-between px-3 py-2 rounded cursor-pointer">
              Equipment
              <span class="text-xs text-muted">
                {{ equipment.size }}
              </span>
            </li>
          </RouterLink>
          <RouterLink v-if="techniques?.size" to="/explore?object=techniques">
            <li v-if="techniques?.size" class="list-item items-center justify-between px-3 py-2 rounded cursor-pointer">
              Techniques
              <span class="text-xs text-muted">
                {{ techniques.size }}
              </span>
            </li>
          </RouterLink>
          <!-- <li v-if="addition?.size" class="list-item px-3 py-2 rounded cursor-pointer">
            Additional values
          </li> -->
        </ul>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.ocui-sidebar {
  grid-area: sidebar;
  background: var(--oc-sidebar-bg);
  border-right: 1px solid var(--oc-border);
  overflow: auto;
  transition: transform 200ms ease;
}

.ocui-explore .list-item {
  display: flex;
}
</style>
