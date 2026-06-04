import { RecipeStepBuilder } from '../builder'
import type { Annotation, Media, Reference, Technique } from './'

export class RecipeStep {
  constructor(
    readonly name: string,
    readonly stepNumber: number,
    readonly instruction: string,
    readonly duration: number,
    readonly techniques: (Technique | Reference<Technique>)[],
    readonly annotations: Annotation[],
    readonly media: Media[],
  ) {}

  static builder() {
    return new RecipeStepBuilder()
  }
}
