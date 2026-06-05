<script setup lang="ts">
import type { Media } from '@/open-cooking-core/runtime/objects';

defineModel<Media[]>('media');
</script>

<template>
  <div class="space-y-2 list-hover">
    <ul class="list list-hover">
      <li v-for="m in media" class="list-item">
        <a :href="m.url" target="_blank" class="
        flex items-center gap-4
        rounded-lg
        border border-soft
        px-4 py-3
        transition-colors
        text-default
        ">
          <div class="
        flex h-10 w-10
        items-center justify-center
        rounded-md
        bg-brand-purple
        text-sm font-semibold
        uppercase
      ">
            {{ m.type.slice(0, 1).toUpperCase() }}
          </div>

          <div class="min-w-0 flex-1">
            <div class="text-sm heading-subtle heading-tight heading-underline capitalize">
              {{ m.type }}
            </div>
            <div class="font-medium truncate text-muted">
              {{ m.caption || m.url }}
            </div>

          </div>

          <div class="text-muted">
            ↗
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
