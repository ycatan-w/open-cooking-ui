import { Annotation } from '../objects'
import type { BuilderInterface } from './'

export class AnnotationBuilder implements BuilderInterface<Annotation> {
  private type!: string
  private text!: string

  withType(type: string) {
    this.type = type

    return this
  }
  withText(text: string) {
    this.text = text

    return this
  }
  build(): Annotation {
    return new Annotation(this.type, this.text)
  }
}
