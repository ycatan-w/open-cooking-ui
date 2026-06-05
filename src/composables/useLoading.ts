import BrandView from '@/components/loaders/BrandView.vue'
import BrandView2 from '@/components/loaders/BrandView2.vue'
import CometView from '@/components/loaders/CometView.vue'
import ProgressView from '@/components/loaders/ProgressView.vue'
import StepperVerticalView from '@/components/loaders/StepperVerticalView.vue'
import { ref, shallowRef, watch } from 'vue'
import type { Router } from 'vue-router'
import { useOpenCookingManager } from './useOpenCookingManager'

const { manager } = useOpenCookingManager()
const loaders = {
  stepper: StepperVerticalView,
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

export function useLoading(options: { router?: Router } = {}) {
  return {
    loaderName: randLoader,
    loaderView: currentLoader,
    loadUrlSpec: (url: string) => {
      if (options.router == undefined) {
        return
      }
      randLoader.value = getRandomLoader()
      console.log(randLoader.value)
      manager.loadUrl(url)
      options.router.push('/loading')
    },
  }
}
