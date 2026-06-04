import type { OCSTechniqueObject } from '../../schema'
import { Reference, Technique } from '../objects'
import type { TechniqueBuilder } from '../builder'
import { RuntimeContext } from '../'
import { RuntimeObjectFactory, ReferenceFactory } from './'

export class TechniqueFactory extends RuntimeObjectFactory {
  static create(id: string, source: OCSTechniqueObject, context: RuntimeContext): Technique {
    return TechniqueFactory.createCommonBuilder(source)
      .withId(RuntimeContext.RuntimeRefId.technique(id))
      .build()
  }

  static createInline(source: OCSTechniqueObject, context: RuntimeContext): Technique {
    return TechniqueFactory.createCommonBuilder(source).build()
  }

  static createReference(source: { $ref: string }, context: RuntimeContext): Reference<Technique> {
    return ReferenceFactory.fromRecord(source, context.definition.techniques)
  }

  private static createCommonBuilder(source: OCSTechniqueObject): TechniqueBuilder {
    const builder = Technique.builder()
      .withName(source.name || '')
      .withSummary(source.summary || '')
      .withDescription(source.description || '')
      .withCategory(source.category || 'preparation')
    ;(source.related || []).forEach((u) => builder.addRelated(u))
    RuntimeObjectFactory.buildAnnotations(builder, source.annotations)
    RuntimeObjectFactory.buildMedias(builder, source.media)

    return builder
  }
}
