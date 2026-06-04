import { RecipeDetailsBuilder } from '../builder'
import type { Annotation } from './'

export class RecipeDetails {
  constructor(
    readonly quantity: string,
    readonly prepTime: number,
    readonly cookTime: number,
    readonly totalTime: number,
    readonly annotations: Annotation[],
  ) {}

  static builder() {
    return new RecipeDetailsBuilder()
  }
}
