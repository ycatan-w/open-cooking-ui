import type { Annotation, Media } from './'

export class RecipeStep {
  constructor(
    readonly stepNumber: number,
    readonly instruction: string,
    readonly annotations: Annotation[],
    readonly media: Media[],
  ) {}
}
