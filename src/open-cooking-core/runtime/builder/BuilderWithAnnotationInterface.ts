import type { Annotation } from '../objects'

export interface BuilderWithAnnotationInterface {
  addAnnotation: (annotation: Annotation) => this
}
