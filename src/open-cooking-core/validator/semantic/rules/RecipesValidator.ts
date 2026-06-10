import type { Context } from '../../../'
import type { Path } from '../../../utils'
import type { OCSRecipeObject } from '../../../schema'
import { SemanticValidationProcess } from '../../../process'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import {
  annotationsValidator,
  equipmentValidator,
  ingredientsValidator,
  mediasValidator,
  recipeDetailsValidator,
  referencesValidator,
  sourceValidator,
  stepsValidator,
  type ValidatorInterface,
} from './'

export class RecipesValidator implements ValidatorInterface<OCSRecipeObject> {
  readonly RECIPE_ENUMS = [
    'appetizer',
    'hors-doeuvre',
    'snack	Informal',
    'breakfast',
    'brunch',
    'lunch',
    'dinner',
    'main-course',
    'side-dish',
    'soup',
    'salad',
    'sauce',
    'condiment',
    'spread',
    'dip',
    'bread',
    'pastry',
    'dessert',
    'beverage',
    'alcoholic-drink',
    'non-alcoholic-drink',
    'preserve',
    'marinade',
    'spice-blend',
    'street-food',
    'festive',
  ]
  readonly DIFFICULTY_ENUMS = ['easy', 'medium', 'hard']
  additionalEnums: string[] = []
  additionalDifficultyEnums: string[] = []

  validate(path: Path, document: OCSRecipeObject, context: Context): void {
    if (document.name?.length === 0) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.warning({
          code: SemanticDiagnosticCode.SEMANTIC_EMPTY_TEXT,
          message: 'Recipe name should not be empty.',
        }),
      )
    }

    for (const category of document.category || []) {
      if (!this.additionalEnums.concat(this.RECIPE_ENUMS).includes(category)) {
        context.diagnosticsCollector.collect(
          SemanticValidationProcess.error({
            code: SemanticDiagnosticCode.SEMANTIC_INVALID_ENUM,
            message: `"${category}" is not a valid recipe category.`,
          }),
        )
      }
    }

    if (
      document.difficulty?.value &&
      !this.additionalDifficultyEnums
        .concat(this.DIFFICULTY_ENUMS)
        .includes(document.difficulty?.value)
    ) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_INVALID_ENUM,
          message: `"${document.difficulty?.value}" is not a valid difficulty level.`,
        }),
      )
    }

    recipeDetailsValidator.validate(path.child('details'), document.details || {}, context)
    const ingredientPath = path.child('ingredients')
    for (const [index, ingredient] of document.ingredients.entries()) {
      ingredientsValidator.validate(ingredientPath.child(index), ingredient, context)
    }
    const equipmentPath = path.child('equipment')
    for (const [index, equipment] of (document.equipment || []).entries()) {
      equipmentValidator.validate(equipmentPath.child(index), equipment, context)
    }
    const stepsPath = path.child('equipment')
    for (const [index, step] of document.steps.entries()) {
      stepsValidator.validate(stepsPath.child(index), step, context)
    }
    if (document.source !== undefined) {
      sourceValidator.validate(path.child('source'), document.source, context)
    }

    const annotationsPath = path.child('annotations')
    for (const annotation of document.annotations || []) {
      annotationsValidator.validate(annotationsPath, annotation, context)
    }

    const mediaPath = path.child('media')
    for (const media of document.media || []) {
      mediasValidator.validate(mediaPath, media, context)
    }
    referencesValidator.registerRefs(path)
  }
}
export const recipesValidator = new RecipesValidator()
