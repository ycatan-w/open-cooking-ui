import { TechniqueBuilder } from '../builder'
import type { Annotation, Media } from './'

export class Technique {
  constructor(
    readonly id: string | null,
    readonly name: string,
    readonly category: string,
    readonly summary: string,
    readonly description: string,
    readonly related: string[],
    readonly annotations: Annotation[],
    readonly media: Media[],
  ) {}

  static builder() {
    return new TechniqueBuilder()
  }
}
