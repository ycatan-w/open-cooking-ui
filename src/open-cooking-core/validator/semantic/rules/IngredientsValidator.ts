import type { Context } from '../../../'
import type { Path } from '../../../utils'
import type { OCSIngredientObject } from '../../../schema'
import { SemanticValidationProcess } from '../../../process'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import {
  type ValidatorInterface,
  annotationsValidator,
  mediasValidator,
  referencesValidator,
} from './'

export class IngredientsValidator implements ValidatorInterface<OCSIngredientObject> {
  static readonly UNIT_ENUMS = [
    'mg',
    'g',
    'kg',
    'oz',
    'lb',
    'ml',
    'cl',
    'l',
    'tsp',
    'tbsp',
    'fl-oz',
    'cup',
    'pt',
    'qt',
    'gal',
    'unit',
    'slice',
    'piece',
    'clove',
    'bunch',
    'pinch',
    'dash',
    'handful',
    'to-taste',
  ]
  static readonly INGREDIENT_ENUMS = [
    'base',
    'batter',
    'dough',
    'filling',
    'garnish',
    'topping',
    'sauce',
    'seasoning',
    'spice',
    'herb',
    'marinade',
    'stock',
    'broth',
    'protein',
    'vegetable	',
    'fruit',
    'dairy',
    'sweetener',
    'fat',
    'binder',
  ]

  additionalUnitEnums: string[] = []
  additionalEnums: string[] = []
  validate(path: Path, document: OCSIngredientObject, context: Context): void {
    if (document.recipe?.$ref && document.$ref) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_REFERENCE_INVALID_FORMAT,
          message: 'recipe and reference cannot be used at the same time',
        }),
      )
    }
    referencesValidator.collectIngredientRefs(
      `#/${path.toReference().replace(/\/ingredients\/\d+/, '')}`,
      document,
      context,
    )

    referencesValidator.collectIngredientRecipeRef(
      `#/${path.toReference().replace(/\/ingredients\/\d+/, '')}`,
      document,
      context,
    )

    if (document.name?.length === 0) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.warning({
          code: SemanticDiagnosticCode.SEMANTIC_EMPTY_TEXT,
          message: 'Ingredient name is empty',
        }),
      )
    }

    if (
      document.category &&
      !this.additionalEnums
        .concat(IngredientsValidator.INGREDIENT_ENUMS)
        .includes(document.category)
    ) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_INVALID_ENUM,
          message: `${document.category || ''} invalid ingredient category`,
        }),
      )
    }
    if (document.unit) {
      if (
        !this.additionalUnitEnums.concat(IngredientsValidator.UNIT_ENUMS).includes(document.unit)
      ) {
        context.diagnosticsCollector.collect(
          SemanticValidationProcess.error({
            code: SemanticDiagnosticCode.SEMANTIC_INVALID_ENUM,
            message: `${document.unit || ''} invalid ingredient unit`,
          }),
        )
      }
      if (!document.quantity || document.quantity < 0) {
        context.diagnosticsCollector.collect(
          SemanticValidationProcess.error({
            code: SemanticDiagnosticCode.SEMANTIC_INVALID_QUANTITY,
            message: 'Invalid quantity value',
          }),
        )
      }
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
export const ingredientsValidator = new IngredientsValidator()
