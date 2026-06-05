<script setup lang="ts">
import { watch, onUnmounted } from 'vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

watch(
  () => props.open,
  (open) => {
    if (open) {
      document.addEventListener('keydown', onKeydown)
    } else {
      document.removeEventListener('keydown', onKeydown)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer-overlay">
      <div v-if="open" class="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs" @click="emit('close')" />
    </Transition>

    <Transition name="drawer">
      <div v-if="open" class="drawer fixed bottom-0 left-0 right-0 z-50">
        <div class="drawer-content bg-surface border-default">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-content {
  max-height: 80vh;

  overflow: auto;

  border-top-width: 1px;

  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

/* Overlay */

.drawer-overlay-enter-active,
.drawer-overlay-leave-active {
  transition: opacity .2s;
}

.drawer-overlay-enter-from,
.drawer-overlay-leave-to {
  opacity: 0;
}

/* Drawer */

.drawer-enter-active,
.drawer-leave-active {
  transition: transform .25s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(100%);
}
</style>