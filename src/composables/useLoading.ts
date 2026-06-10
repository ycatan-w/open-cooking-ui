import BrandView from '@/components/loaders/BrandView.vue'
import BrandView2 from '@/components/loaders/BrandView2.vue'
import CometView from '@/components/loaders/CometView.vue'
import ProgressView from '@/components/loaders/ProgressView.vue'
import StepperVerticalView from '@/components/loaders/StepperVerticalView.vue'
import { ref, shallowRef, watch } from 'vue'
import type { RouteLocationNormalizedLoadedGeneric, Router } from 'vue-router'
import { useOpenCookingManager } from './useOpenCookingManager'
import type { FileDescriptor } from '@/open-cooking-manager/FileLoader'
import { useDocumentStore } from '@/stores/document.store'
import { RoutingService } from '@/services/RoutingService'

const { manager, currentRecipe } = useOpenCookingManager()
const loaders = {
  // stepper: StepperVerticalView,
  comet: CometView,
  brand: BrandView,
  brand2: BrandView2,
  progress: ProgressView,
}
type LOADERS_NAME = keyof typeof loaders
function getRandomLoader() {
  const index = Math.floor(Math.random() * Object.keys(loaders).length)
  return (Object.keys(loaders)[index] || 'brand2') as LOADERS_NAME
}
const randLoader = ref<LOADERS_NAME>(getRandomLoader())
const currentLoader = shallowRef<any>(loaders[randLoader.value])
watch(randLoader, () => {
  currentLoader.value = loaders[randLoader.value]
})

export function useLoading(
  options: { router?: Router; route?: RouteLocationNormalizedLoadedGeneric } = {},
) {
  return {
    loaderName: randLoader,
    loaderView: currentLoader,
    loadUrlSpec: async (spec: FileDescriptor) => {
      if (options.router == undefined) {
        return
      }
      randLoader.value = getRandomLoader()
      await manager.loadUrl(spec)
      const documentStore = useDocumentStore()
      if (documentStore.recipeId.value && manager.loadedSpecIsValid()) {
        currentRecipe.value = manager.loadedSpec.value?.data?.findRecipe(
          documentStore.recipeId.value,
        )
        if (options.route?.path !== '/explore') {
          options.router.push(`${RoutingService.recipe(documentStore.recipeId.value || '')}`)
        }
      } else {
        options.router.push('/')
      }
    },
  }
}
