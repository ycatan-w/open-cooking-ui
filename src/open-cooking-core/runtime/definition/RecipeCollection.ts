import type { Recipe } from '../objects'
import { AbstractCollection } from './'

export class RecipeCollection extends AbstractCollection<Recipe> {
  findByTag(tag: string): Recipe[] {
    const recipes: Recipe[] = []
    for (const [_, recipe] of this.items.entries()) {
      if (tag in recipe.tags || []) {
        recipes.push(recipe)
      }
    }
    return recipes
  }

  findByCategory(category: string): Recipe[] {
    const recipes: Recipe[] = []
    for (const [_, recipe] of this.items.entries()) {
      if (category in recipe.category || []) {
        recipes.push(recipe)
      }
    }
    return recipes
  }

  findByName(name: string): Recipe[] {
    const recipes: Recipe[] = []
    for (const [_, recipe] of this.items.entries()) {
      const regExp = new RegExp(`.*${name}.*`, 'i')
      if (recipe.name.match(regExp) || []) {
        recipes.push(recipe)
      }
    }
    return recipes
  }
}
