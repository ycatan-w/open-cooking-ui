import type { OCSDocument } from '@/open-cooking-core/schema'
import type { Context } from '../..'

export class EnumResolver {
  resolve(document: OCSDocument, context: Context) {
    this.resolveRecipeEnums(document, context)
    this.resolveIngredientEnums(document, context)
    this.resolveEquipmentEnums(document, context)
    this.resolveTechniqueEnums(document, context)
  }

  private resolveRecipeEnums(document: OCSDocument, context: Context) {
    for (const [recipeId, recipe] of Object.entries(document.recipes || {})) {
      for (const category of recipe.category || []) {
        context.registry.categories.recipes.add(category, `#/recipe/${recipeId}`)
      }
      if (recipe.difficulty?.value !== undefined) {
        context.registry.difficulties.add(recipe.difficulty.value, `#/recipe/${recipeId}`)
      }
    }
  }

  private resolveIngredientEnums(document: OCSDocument, context: Context) {
    for (const [ingredientId, ingredient] of Object.entries(document.ingredients || {})) {
      if (!ingredient.category) {
        continue
      }

      context.registry.categories.ingredients.add(ingredient.category, `#/recipe/${ingredientId}`)
    }
  }

  private resolveEquipmentEnums(document: OCSDocument, context: Context) {
    for (const [equipmentId, equipment] of Object.entries(document.equipment || {})) {
      if (!equipment.category) {
        continue
      }

      context.registry.categories.equipment.add(equipment.category, `#/equipment/${equipmentId}`)
    }
  }

  private resolveTechniqueEnums(document: OCSDocument, context: Context) {
    for (const [techniqueId, technique] of Object.entries(document.techniques || {})) {
      if (!technique.category) {
        continue
      }

      context.registry.categories.techniques.add(technique.category, `#/technique/${techniqueId}`)
    }
  }
}

export const enumResolver = new EnumResolver()
