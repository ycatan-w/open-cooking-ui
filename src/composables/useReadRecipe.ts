import type { Recipe } from '@/open-cooking-core/runtime/objects'
import { useOpenCookingManager } from './useOpenCookingManager'

const { recipes, currentRecipe } = useOpenCookingManager()

export function useReadRecipe() {
  return {}
}
