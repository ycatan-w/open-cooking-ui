import type {
  OCSIngredientObject,
  OCSRecipeDetailsObject,
  OCSRecipeObject,
  OCSReferenceObject,
} from '../../schema'
import { Annotation, Recipe, Reference } from '../objects'
import { RuntimeContext } from '../'
import { RecipeDetailsFactory, IngredientFactory, RuntimeObjectFactory, ReferenceFactory } from './'

export class RecipeFactory extends RuntimeObjectFactory {
  static create(id: string, source: OCSRecipeObject, context: RuntimeContext) {
    return RecipeFactory.createCommonBuilder(source, context)
      .withId(RuntimeContext.RuntimeRefId.recipe(id))
      .build()
  }

  static createReference(source: { $ref: string }, context: RuntimeContext): Reference<Recipe> {
    return ReferenceFactory.fromRecord(source, context.definition.recipes)
  }

  private static createCommonBuilder(source: OCSRecipeObject, context: RuntimeContext) {
    const builder = Recipe.builder()
      .withName(source.name)
      .withVersion(source.version || '')
      .withDifficulty(source.difficulty?.value || 'medium')
      .withDifficultyRational(source.difficulty?.rationale || '')
      .withSourceName(source.source?.name || '')
      .withSourceSummary(source.source?.summary || '')
      .withSourceUrl(source.source?.url || '')
    ;(source.category || []).forEach((c) => builder.addCategory(c))
    if (RecipeFactory.isRecipeDetails(source.details)) {
      builder.withRecipeDetails(RecipeDetailsFactory.create(source.details, context))
    }
    ;(source.source?.annotations || []).forEach((annotation) =>
      builder.addSourceAnnotation(new Annotation(annotation.type || 'note', annotation.text)),
    )
    RuntimeObjectFactory.buildAnnotations(builder, source.annotations)
    RuntimeObjectFactory.buildMedias(builder, source.media)

    for (const i of source.ingredients) {
      builder.addIngredient(
        RecipeFactory.isIngredientReference(i)
          ? IngredientFactory.createReference(i, context)
          : IngredientFactory.createInline(i, context),
      )
    }

    return builder
  }

  private static isIngredientReference(
    ingredient: OCSIngredientObject,
  ): ingredient is Required<Pick<OCSIngredientObject, '$ref'>> {
    return ingredient.$ref !== undefined
  }

  private static isRecipeDetails(
    details: OCSRecipeDetailsObject | undefined,
  ): details is OCSRecipeDetailsObject & {
    __cookTimeSecond: number
    __prepTimeSecond: number
    __totalTimeSecond: number
  } {
    return details !== undefined
  }
}
