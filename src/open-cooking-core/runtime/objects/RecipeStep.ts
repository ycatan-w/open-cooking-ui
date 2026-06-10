import { RecipeStepBuilder } from '../builder'
import type { Annotation, Media, Reference, Technique } from './'

export class RecipeStep {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly stepNumber: number,
    readonly instruction: string,
    readonly duration: number,
    readonly techniques: (Technique | Reference<Technique>)[],
    readonly subSteps: RecipeStep[],
    readonly annotations: Annotation[],
    readonly media: Media[],
  ) {}

  static builder() {
    return new RecipeStepBuilder()
  }
}
