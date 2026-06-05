<script setup lang="ts">
import { watch } from 'vue'
import { useLoading } from '@/composables/useLoading.ts'
import { useRouter } from 'vue-router';
import { useOpenCookingManager } from '@/composables/useOpenCookingManager';

const router = useRouter()
const { manager } = useOpenCookingManager()
const { loaderView } = useLoading();

watch(() => manager.loadedSpec.value, async () => {
  console.log(`manager.loadedSpec`)
  console.log(manager.loadedSpec.value)
  if (manager.loadedSpec.value?.data !== null) {
    await router.push('/view')
  }
})
</script>

<template>
  <div class="p-4 flex h-full flex-col justify-center">
    <component :is="loaderView" />
  </div>
</template>
