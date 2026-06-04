import { Technique, type Annotation, type Media } from '../objects'
import type {
  BuilderInterface,
  BuilderWithAnnotationInterface,
  BuilderWithMediaInterface,
} from './'

export class TechniqueBuilder
  implements BuilderInterface<Technique>, BuilderWithAnnotationInterface, BuilderWithMediaInterface
{
  private id: string | null = null
  private name!: string
  private category!: string
  private summary!: string
  private description!: string
  private related: string[] = []
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
  withCategory(category: string) {
    this.category = category
    return this
  }
  withSummary(summary: string) {
    this.summary = summary
    return this
  }
  withDescription(description: string) {
    this.description = description
    return this
  }
  addRelated(use: string) {
    this.related.push(use)
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
  build(): Technique {
    return new Technique(
      this.id,
      this.name,
      this.category,
      this.summary,
      this.description,
      this.related,
      this.annotations,
      this.media,
    )
  }
}
