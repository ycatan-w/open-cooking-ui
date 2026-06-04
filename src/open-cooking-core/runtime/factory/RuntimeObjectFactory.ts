import type { OCSAnnotationObject, OCSMediaObject } from '../../schema'
import type { BuilderWithAnnotationInterface, BuilderWithMediaInterface } from '../builder'
import { Annotation, Media } from '../objects'

export abstract class RuntimeObjectFactory {
  protected static buildAnnotations(
    builder: BuilderWithAnnotationInterface,
    annotations?: OCSAnnotationObject[],
  ) {
    ;(annotations || []).forEach((annotation) =>
      builder.addAnnotation(new Annotation(annotation.type || 'note', annotation.text)),
    )
  }
  protected static buildMedias(builder: BuilderWithMediaInterface, medias?: OCSMediaObject[]) {
    ;(medias || []).forEach((m) =>
      builder.addMedia(new Media(m.type, m.url, m.caption || '', m.attribution || '')),
    )
  }
}
