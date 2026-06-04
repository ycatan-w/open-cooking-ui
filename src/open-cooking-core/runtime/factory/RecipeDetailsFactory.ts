import type { OCSRecipeDetailsObject } from '../../schema'
import { RecipeDetails } from '../objects'
import type { RuntimeContext } from '../'
import { RuntimeObjectFactory } from './'

export class RecipeDetailsFactory extends RuntimeObjectFactory {
  static create(
    source: OCSRecipeDetailsObject & {
      __cookTimeSecond: number
      __prepTimeSecond: number
      __totalTimeSecond: number
    },
    context: RuntimeContext,
  ) {
    const builder = RecipeDetails.builder()
      .withCookTime(source.__cookTimeSecond)
      .withPrepTime(source.__prepTimeSecond)
      .withQuantity(source.yield || '0')
      .withTotalTime(source.__totalTimeSecond)
    RuntimeObjectFactory.buildAnnotations(builder, source.annotations)

    return builder.build()
  }
}
