import { RecipeDetails, type Annotation } from '../objects'
import type { BuilderInterface, BuilderWithAnnotationInterface } from './'

export class RecipeDetailsBuilder
  implements BuilderInterface<RecipeDetails>, BuilderWithAnnotationInterface
{
  private quantity!: string
  private prepTime!: number
  private cookTime!: number
  private totalTime!: number
  private annotations: Annotation[] = []

  withQuantity(quantity: string) {
    this.quantity = quantity
    return this
  }
  withPrepTime(prepTime: number) {
    this.prepTime = prepTime
    return this
  }
  withCookTime(cookTime: number) {
    this.cookTime = cookTime
    return this
  }
  withTotalTime(totalTime: number) {
    this.totalTime = totalTime
    return this
  }
  addAnnotation(annotation: Annotation) {
    this.annotations.push(annotation)
    return this
  }
  build(): RecipeDetails {
    return new RecipeDetails(
      this.quantity,
      this.prepTime,
      this.cookTime,
      this.totalTime,
      this.annotations,
    )
  }
}
