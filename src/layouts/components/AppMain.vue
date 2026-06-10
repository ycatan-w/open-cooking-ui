<script setup lang="ts">
import LoadingView from '@/components/LoadingView.vue';
import { useOpenCookingManager } from '@/composables/useOpenCookingManager'
import { onMounted, ref } from 'vue'
import { useDocumentStore } from '@/stores/document.store'
import { useRoute, useRouter } from 'vue-router';
import { useLoading } from '@/composables/useLoading';

const { manager } = useOpenCookingManager()
const router = useRouter()
const route = useRoute()
const ready = ref(false)

onMounted(async () => {

  const documentStore = useDocumentStore()
  const { loadUrlSpec } = useLoading({ router, route })

  if (!manager.loadedSpec.value) {
    manager.init()
    const spec = documentStore.spec.value ?? manager.specs[0] ?? null
    if (spec) {
      loadUrlSpec(spec)
    }
  }

  ready.value = true
})
</script>

<template>
  <main class="ocui-main">
    <LoadingView v-if="!manager.loadedSpecIsValid()" />
    <RouterView v-else />
  </main>
</template>

<style lang="css" scoped>
.ocui-main {
  grid-area: main;
  overflow: auto;
  padding: 1rem;
  background: var(--oc-main-bg);
}
</style>
