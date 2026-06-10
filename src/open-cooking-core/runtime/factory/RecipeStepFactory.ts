import type { OCSProcedureStepObject, OCSTechniqueObject } from '@/open-cooking-core/schema'
import { RuntimeObjectFactory, TechniqueFactory } from './'
import type { RuntimeContext } from '../'
import { RecipeStep } from '../objects'

export class RecipeStepFactory extends RuntimeObjectFactory {
  static createWithId(
    id: string,
    source: OCSProcedureStepObject & {
      __durationSecond: number
    },
    context: RuntimeContext,
  ) {
    return RecipeStepFactory.createCommonBuilder(source, context).withId(id).build()
  }

  static create(
    source: OCSProcedureStepObject & {
      __durationSecond: number
    },
    context: RuntimeContext,
  ) {
    return RecipeStepFactory.createCommonBuilder(source, context).build()
  }

  private static createCommonBuilder(
    source: OCSProcedureStepObject & {
      __durationSecond: number
    },
    context: RuntimeContext,
  ) {
    const builder = RecipeStep.builder()
      .withName(source.name || '')
      .withStepNumber(source.step_number || 0)
      .withDuration(source.__durationSecond || 0)
      .withInstruction(source.instruction)
    ;(source.techniques || []).forEach((t) => {
      builder.addTechniques(
        RecipeStepFactory.isTechniqueReference(t)
          ? TechniqueFactory.createReference(t, context)
          : TechniqueFactory.createInline(t, context),
      )
    })
    ;(source.subSteps || []).forEach((s) => {
      builder.addSubStep(
        RecipeStepFactory.create(
          s as OCSProcedureStepObject & {
            __durationSecond: number
          },
          context,
        ),
      )
    })
    RuntimeObjectFactory.buildAnnotations(builder, source.annotations)
    RuntimeObjectFactory.buildMedias(builder, source.media)
    return builder
  }

  private static isTechniqueReference(
    tecnique: OCSTechniqueObject,
  ): tecnique is Required<Pick<OCSTechniqueObject, '$ref'>> {
    return tecnique.$ref !== undefined
  }
}
