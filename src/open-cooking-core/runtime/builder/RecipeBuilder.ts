import {
  Recipe,
  type Annotation,
  type Equipment,
  type Ingredient,
  type Media,
  type RecipeDetails,
  type RecipeStep,
  type Reference,
} from '../objects'
import type {
  BuilderInterface,
  BuilderWithAnnotationInterface,
  BuilderWithMediaInterface,
} from './'

export class RecipeBuilder
  implements BuilderInterface<Recipe>, BuilderWithAnnotationInterface, BuilderWithMediaInterface
{
  private id: string | null = null
  private name!: string
  private summary!: string
  private version!: string
  private category: string[] = []
  private tags: string[] = []
  private details!: RecipeDetails
  private difficulty!: string
  private difficultyRational!: string
  private ingredients: (Ingredient | Reference<Ingredient>)[] = []
  private equipments: (Equipment | Reference<Equipment>)[] = []
  private steps: RecipeStep[] = []
  private sourceName!: string
  private sourceUrl!: string
  private sourceSummary!: string
  private sourceAnnotations: Annotation[] = []
  private annotations: Annotation[] = []
  private media: Media[] = []
  withId(id: string) {
    this.id = id
    return this
  }
  withName(name: string) {
    this.name = name
    return this
  }
  withSummary(summary: string) {
    this.summary = summary
    return this
  }
  withVersion(version: string) {
    this.version = version
    return this
  }
  addCategory(category: string) {
    this.category.push(category)
    return this
  }
  withRecipeDetails(details: RecipeDetails) {
    this.details = details
    return this
  }
  withDifficulty(difficulty: string) {
    this.difficulty = difficulty
    return this
  }
  withDifficultyRational(rational: string) {
    this.difficultyRational = rational
    return this
  }
  withSourceName(sourceName: string) {
    this.sourceName = sourceName
    return this
  }
  withSourceUrl(sourceUrl: string) {
    this.sourceUrl = sourceUrl
    return this
  }
  withSourceSummary(sourceSummary: string) {
    this.sourceSummary = sourceSummary
    return this
  }
  addSourceAnnotation(annotation: Annotation) {
    this.sourceAnnotations.push(annotation)
    return this
  }
  addTag(tag: string) {
    this.tags.push(tag)
    return this
  }
  addIngredient(ingredient: Ingredient | Reference<Ingredient>) {
    this.ingredients.push(ingredient)
    return this
  }
  addEquipment(equipment: Equipment | Reference<Equipment>) {
    this.equipments.push(equipment)
    return this
  }
  addStep(step: RecipeStep) {
    this.steps.push(step)
    return this
  }
  addAnnotation(annotation: Annotation) {
    this.annotations.push(annotation)
    return this
  }
  addMedia(media: Media) {
    this.media.push(media)
    return this
  }
  build(): Recipe {
    return new Recipe(
      this.id,
      this.name,
      this.summary,
      this.version,
      this.category,
      this.tags,
      this.details,
      this.difficulty,
      this.difficultyRational,
      this.ingredients,
      this.equipments,
      this.steps,
      this.sourceName,
      this.sourceUrl,
      this.sourceSummary,
      this.annotations,
      this.media,
    )
  }
}
