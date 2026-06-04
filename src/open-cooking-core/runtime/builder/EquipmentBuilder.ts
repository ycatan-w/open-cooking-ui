import { Equipment, type Annotation, type Media } from '../objects'
import type {
  BuilderInterface,
  BuilderWithAnnotationInterface,
  BuilderWithMediaInterface,
} from './'
import type {} from './'

export class EquipmentBuilder
  implements BuilderInterface<Equipment>, BuilderWithAnnotationInterface, BuilderWithMediaInterface
{
  private id: string | null = null
  private name!: string
  private category!: string
  private description!: string
  private uses: string[] = []
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
  withDescription(description: string) {
    this.description = description
    return this
  }
  addUse(use: string) {
    this.uses.push(use)
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
  build(): Equipment {
    return new Equipment(
      this.id,
      this.name,
      this.category,
      this.description,
      this.uses,
      this.annotations,
      this.media,
    )
  }
}
