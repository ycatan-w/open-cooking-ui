import type {
  Annotation,
  RecipeDetails,
  Equipment,
  Ingredient,
  Media,
  RecipeStep,
  Reference,
} from './'
import { RecipeBuilder } from '../builder'

export class Recipe {
  constructor(
    readonly id: string | null,
    readonly name: string,
    readonly summary: string,
    readonly version: string,
    readonly category: string[],
    readonly tags: string[],
    readonly details: RecipeDetails,
    readonly difficulty: string,
    readonly difficultyRational: string,
    readonly ingredients: (Ingredient | Reference<Ingredient>)[],
    readonly equipments: (Equipment | Reference<Equipment>)[],
    readonly steps: RecipeStep[],
    readonly sourceName: string,
    readonly sourceUrl: string,
    readonly sourceSummary: string,
    readonly sourceAnnotations: Annotation[],
    readonly annotations: Annotation[],
    readonly media: Media[],
  ) {}

  static builder() {
    return new RecipeBuilder()
  }
}
