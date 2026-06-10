import type { Router } from 'vue-router'

import { useDocumentStore } from '@/stores/document.store'
import { useOpenCookingManager } from '@/composables/useOpenCookingManager'
import { routeIdToRecipeId } from '@/helpers/routing.helper'
import { RoutingService } from '@/services/RoutingService'
const { currentRecipe } = useOpenCookingManager()
import { localStorageService } from '@/services/LocalStorageService'

export function registerGuards(router: Router) {
  router.beforeEach(async (to) => {
    if (to.name === 'playground') {
      return true
    }

    const documentStore = useDocumentStore()
    const { manager } = useOpenCookingManager()
    if (to.params.id) {
      documentStore.recipeId.value = routeIdToRecipeId(to.params.id as string)
      localStorageService.set('recipeId', documentStore.recipeId.value)
      currentRecipe.value = manager.loadedSpec.value?.data?.findRecipe(documentStore.recipeId.value)
    }

    return true
  })
}
