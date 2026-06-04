import { IngredientBuilder } from '../builder'
import type { Annotation, Media, Recipe, Reference } from './'

export class Ingredient {
  constructor(
    readonly id: string | null,
    readonly name: string,
    readonly category: string,
    readonly quantity: number,
    readonly unit: string,
    readonly annotations: Annotation[],
    readonly media: Media[],
    readonly recipeRef: Reference<Recipe> | null,
  ) {}

  static builder() {
    return new IngredientBuilder()
  }
}
