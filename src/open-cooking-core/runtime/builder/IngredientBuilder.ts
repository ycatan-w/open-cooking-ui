import { Ingredient, type Annotation, type Media, type Recipe, type Reference } from '../objects'
import type {
  BuilderInterface,
  BuilderWithAnnotationInterface,
  BuilderWithMediaInterface,
} from './'

export class IngredientBuilder
  implements BuilderInterface<Ingredient>, BuilderWithAnnotationInterface, BuilderWithMediaInterface
{
  private id: string | null = null
  private name!: string
  private category!: string
  private quantity!: number
  private unit!: string
  private annotations: Annotation[] = []
  private media: Media[] = []
  private recipeRef: Reference<Recipe> | null = null

  withId(id: string) {
    this.id = id
    return this
  }
  withName(name: string) {
    this.name = name
    return this
  }
  withCategory(category: string) {
    this.category = category
    return this
  }
  withQuantity(quantity: number) {
    this.quantity = quantity
    return this
  }
  withUnit(unit: string) {
    this.unit = unit
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
  withRecipeReference(ref: Reference<Recipe>) {
    this.recipeRef = ref
    return this
  }
  build(): Ingredient {
    return new Ingredient(
      this.id,
      this.name,
      this.category,
      this.quantity,
      this.unit,
      this.annotations,
      this.media,
      this.recipeRef,
    )
  }
}
