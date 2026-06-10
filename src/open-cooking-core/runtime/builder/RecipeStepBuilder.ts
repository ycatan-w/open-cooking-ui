import { RecipeStep, Reference, Technique, type Annotation, type Media } from '../objects'
import type { BuilderInterface } from './BuilderInterface'
import type { BuilderWithAnnotationInterface } from './BuilderWithAnnotationInterface'
import type { BuilderWithMediaInterface } from './BuilderWithMediaInterface'

export class RecipeStepBuilder
  implements BuilderInterface<RecipeStep>, BuilderWithAnnotationInterface, BuilderWithMediaInterface
{
  private id!: string
  private name!: string
  private stepNumber!: number
  private instruction!: string
  private duration!: number
  private techniques: (Technique | Reference<Technique>)[] = []
  private subSteps: RecipeStep[] = []
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
  withStepNumber(stepNumber: number) {
    this.stepNumber = stepNumber
    return this
  }
  withInstruction(instruction: string) {
    this.instruction = instruction
    return this
  }
  withDuration(duration: number) {
    this.duration = duration
    return this
  }
  addTechniques(technique: Technique | Reference<Technique>) {
    this.techniques.push(technique)
    return this
  }
  addSubStep(subStep: RecipeStep) {
    this.subSteps.push(subStep)
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

  build(): RecipeStep {
    return new RecipeStep(
      this.id,
      this.name,
      this.stepNumber,
      this.instruction,
      this.duration,
      this.techniques,
      this.subSteps,
      this.annotations,
      this.media,
    )
  }
}
