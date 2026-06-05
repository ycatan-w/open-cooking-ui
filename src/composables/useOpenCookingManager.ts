import type { Recipe } from '@/open-cooking-core/runtime/objects'
import { getOpenCookingManager } from '@/open-cooking-manager'
import { ref, watch } from 'vue'

type Metadata = {
  version: string
  format: string
  title: string
  description: string
  author: string
}

const manager = getOpenCookingManager()
const recipes = ref(manager.loadedSpec.value?.data?.recipes.findAll())
const ingredients = ref(manager.loadedSpec.value?.data?.ingredients.findAll())
const techniques = ref(manager.loadedSpec.value?.data?.techniques.findAll())
const equipment = ref(manager.loadedSpec.value?.data?.equipment.findAll())
const metadata = ref<Metadata>({
  version: '',
  format: '',
  title: '',
  description: '',
  author: '',
})
const currentRecipe = ref<Recipe>()
const setCurrentRecipe = (recipeId: string | null) => {
  if (recipeId === null) {
    return
  }
  currentRecipe.value = recipes.value?.get(recipeId) as Recipe
}

watch(
  () => manager.loadedSpec.value,
  () => {
    recipes.value = manager.loadedSpec.value?.data?.recipes.findAll()
  },
)
watch(
  () => manager.loadedSpec.value,
  () => {
    recipes.value = manager.loadedSpec.value?.data?.recipes.findAll()
    ingredients.value = manager.loadedSpec.value?.data?.ingredients.findAll()
    techniques.value = manager.loadedSpec.value?.data?.techniques.findAll()
    equipment.value = manager.loadedSpec.value?.data?.equipment.findAll()
    metadata.value = {
      version: manager.loadedSpec.value?.data?.metadata.version || '',
      format: manager.loadedSpec.value?.metadata?.format || '',
      title: manager.loadedSpec.value?.data?.metadata.title || '',
      description: manager.loadedSpec.value?.data?.metadata.description || '',
      author: manager.loadedSpec.value?.data?.metadata.author || '',
    }
    const it = recipes.value?.keys()
    if (it !== undefined) {
      setCurrentRecipe(it.next().value as string)
    }
  },
)
export function useOpenCookingManager() {
  return {
    manager,
    recipes,
    ingredients,
    techniques,
    equipment,
    metadata,
    currentRecipe,
    actions: {
      setCurrentRecipe,
    },
  }
}
