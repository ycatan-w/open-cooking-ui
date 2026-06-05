<script setup lang="ts">
import { ref, watch } from 'vue';
import { IconDocument } from '@/components/icons';
import { RouterLink, useRouter } from 'vue-router';
import { useLoading } from '@/composables/useLoading';
import { useOpenCookingManager } from '@/composables/useOpenCookingManager';
import { useReadRecipe } from '@/composables/useReadRecipe';

const { manager, recipes, actions } = useOpenCookingManager()
const currentFile = ref<string | null>(manager.specs[0]?.id || null)
const router = useRouter()
const loading = useLoading({ router });

const publicUrls = manager.specs
</script>

<template>
  <aside class="ocui-sidebar">
    <div class="border-b border-default">
      <h3 class="m-4 heading-underline">Specifications</h3>
      <ul v-if="publicUrls.length" class="list list-interactive">
        <li v-for="file in publicUrls" :key="file.id" class="cursor-pointer list-item link-underline-hover"
          @click="loading.loadUrlSpec(file.id)">
          <button class="flex items-center gap-2 cursor-pointer text-xs">
            <IconDocument class="w-4 h-4 shrink-0" />
            <span class="spec-filename text-left">{{ file.filename }}</span>
          </button>
        </li>
      </ul>
    </div>
    <div v-if="manager.loadedSpecIsValid()">
      <div>
        <h3 class="m-4 heading-underline">Recipes <small class="align-super text-muted text-xs">({{ recipes?.size
        }})</small></h3>
      </div>
      <ul class="list list-interactive">
        <li v-for="[_, recipe] in recipes" class="list-item text-xs" @click="actions.setCurrentRecipe(recipe.id)">{{
          recipe.name }}</li>
      </ul>
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

.list-item .spec-filename {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item:hover .spec-filename {
  overflow: unset;
  text-overflow: unset;
  white-space: unset;
}
</style>
