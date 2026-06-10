<script setup lang="ts">
import { IconChevronDown, IconDocument, IconMagnifyingGlass, IconBoxes } from '@/assets/icons';
import ToggleThemeView from '@/components/ToggleThemeView.vue';
import { useLoading } from '@/composables/useLoading';
import { useOpenCookingManager } from '@/composables/useOpenCookingManager';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const { manager, metadata } = useOpenCookingManager()
const publicUrls = manager.specs
const router = useRouter()
const loading = useLoading({ router });
const specDropdownOpen = ref(false)
</script>

<template>
  <header class="ocui-header">
    <div class="h-full flex items-center px-6 gap-6">
      <router-link to="/" class="flex items-center gap-3 shrink-0">
        <div class="ocui-header-logo" />
        <div class="hidden xl:block">
          <div class="font-semibold tracking-wide">Open Cooking UI</div>
          <div class="text-xs text-muted">Specification Explorer</div>
        </div>
      </router-link>

      <div v-click-outside="() => specDropdownOpen = false" class="relative border-l border-soft pl-6">
        <button class="text-left group cursor-pointer" @click="specDropdownOpen = !specDropdownOpen">
          <div v-if="manager.loadedSpec.value?.data?.metadata.title.length"
            class="text-xs uppercase tracking-wider text-muted">
            Loaded Specification
          </div>
          <div v-else class="text-xs uppercase tracking-wider text-muted">
            Select Specification
          </div>
          <div class="font-medium flex items-center gap-2">
            {{ metadata.title }}
            <IconChevronDown />
          </div>
        </button>
        <div v-if="specDropdownOpen"
          class="absolute left-0 mt-2 w-72 bg-surface border border-soft rounded-lg shadow-lg">
          <div class="p-2 border-b border-soft">
            <div class="text-xs uppercase tracking-wider text-muted">
              Available Specs
            </div>
          </div>
          <ul class="max-h-64 overflow-auto list list-interactive">
            <li v-for="file in publicUrls" :key="file.id" class="cursor-pointer list-item link-underline-hover"
              @click="() => { specDropdownOpen = false; loading.loadUrlSpec(file); }">
              <button class="flex items-center gap-2 cursor-pointer text-xs">
                <IconDocument class="w-4 h-4 shrink-0 text-muted" />
                {{ file.filename }}
              </button>
            </li>
          </ul>
          <div class="p-2 border-t border-soft text-xs text-muted">
            {{ publicUrls.length }} specs available
          </div>
        </div>
      </div>

      <div class="grow">
        <!-- <div class="oc-input-floating oc-input-floating-icon oc-input-floating-sm">
          <input id="ocui-search" class="px-4 py-2" type="search" placeholder=" "
            :disabled="!manager.loadedSpecIsValid()" />
          <label for="ocui-search" class="text-xs">Search recipes, ingredients, techniques...</label>
          <IconMagnifyingGlass class="oc-input-icon" />
        </div> -->
      </div>

      <!-- <RouterLink :to="{ path: '/playground' }">
        <IconBoxes />
      </RouterLink> -->
      <div class="flex-none ml-4">
        <ToggleThemeView />
      </div>
    </div>
  </header>
</template>

<style lang="css" scoped>
.ocui-header {
  grid-area: header;
  background: color-mix(in srgb, var(--oc-header-bg) 80%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--oc-border);
  top: 0;
  z-index: 20;
}

.ocui-header-logo {
  --header-logo-default-size: 10;
  --header-logo-size: calc(var(--spacing) * var(--header-logo-default-size));

  width: var(--header-logo-size);
  height: var(--header-logo-size);
  /* position: relative; */
  /* aspect-ratio: 1; */
  border-radius: 999px;
  background: var(--oc-gradient);
  /* margin-right: calc(var(--header-logo-size) * 6); */
}

/* .ocui-header-logo:after {
  position: absolute;
  content: 'pen Cooking UI';
  left: var(--header-logo-size);
  top: calc(var(--header-logo-size) / 4);
  white-space: nowrap;
  color: var(--text-default);
  font-size: calc(var(--header-logo-size) * 0.45);
  font-weight: 900;
} */
</style>
