import type { OCSIngredientObject, OCSReferenceObject } from '../../schema'
import { Ingredient, Reference } from '../objects'
import type { IngredientBuilder } from '../builder'
import { RuntimeContext } from '../'
import { RecipeFactory, ReferenceFactory, RuntimeObjectFactory } from './'

export class IngredientFactory extends RuntimeObjectFactory {
  static create(id: string, source: OCSIngredientObject, context: RuntimeContext) {
    return IngredientFactory.createCommonBuilder(source, context)
      .withId(RuntimeContext.RuntimeRefId.ingredient(id))
      .build()
  }
  static createInline(source: OCSIngredientObject, context: RuntimeContext) {
    return IngredientFactory.createCommonBuilder(source, context).build()
  }

  static createReference(source: { $ref: string }, context: RuntimeContext): Reference<Ingredient> {
    return ReferenceFactory.fromRecord(source, context.definition.ingredients)
  }

  private static createCommonBuilder(
    source: OCSIngredientObject,
    context: RuntimeContext,
  ): IngredientBuilder {
    const builder = Ingredient.builder()
      .withCategory(source.category || 'base')
      .withName(source.name || '')
      .withQuantity(source.quantity || 0)
      .withUnit(source.unit || '')
    RuntimeObjectFactory.buildAnnotations(builder, source.annotations)
    RuntimeObjectFactory.buildMedias(builder, source.media)
    if (IngredientFactory.isRecipeReference(source.recipe)) {
      builder.withRecipeReference(RecipeFactory.createReference(source.recipe, context))
    }
    return builder
  }

  private static isRecipeReference(
    recipeRef: OCSReferenceObject | undefined,
  ): recipeRef is OCSReferenceObject {
    return recipeRef?.$ref !== undefined
  }
}
