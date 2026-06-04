import type { Ingredient } from '../objects'
import { AbstractCollection } from './'

export class IngredientCollection extends AbstractCollection<Ingredient> {
  findByCategory(category: string): Ingredient[] {
    const ingredients: Ingredient[] = []
    for (const [id, ingredient] of this.items.entries()) {
      if (category === ingredient.category) {
        ingredients.push(ingredient)
      }
    }
    return ingredients
  }
}
