import type { Context } from '../../../'
import type { Path } from '../../../utils'
import type { OCSTechniqueObject } from '../../../schema'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import { SemanticValidationProcess } from '../../../process'
import {
  annotationsValidator,
  mediasValidator,
  referencesValidator,
  type ValidatorInterface,
} from './'

export class TechniquesValidator implements ValidatorInterface<OCSTechniqueObject> {
  readonly TECHNIQUE_ENUMS = [
    'preparation',
    'knife-skill',
    'mixing',
    'emulsification',
    'heat',
    'frying',
    'roasting',
    'grilling',
    'steaming',
    'boiling',
    'baking',
    'fermentation',
    'preservation',
    'plating',
    'sauce',
    'pastry',
  ]
  additionalEnums: string[] = []
  validate(path: Path, document: OCSTechniqueObject, context: Context): void {
    if (document.name && document.$ref) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_REFERENCE_INVALID_FORMAT,
          message: 'Technique cannot define both "name" and "$ref".',
        }),
      )
    }

    if (document.$ref) {
      referencesValidator.collectTechniqueRefs(
        `${path.toReference().replace(/\/techniques\/\d+/, '')}`,
        document,
        context,
      )
    }

    if (document.name?.length === 0) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.warning({
          code: SemanticDiagnosticCode.SEMANTIC_EMPTY_TEXT,
          message: 'Technique name should not be empty.',
        }),
      )
    }

    if (
      document.category &&
      !this.additionalEnums.concat(this.TECHNIQUE_ENUMS).includes(document.category)
    ) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_INVALID_ENUM,
          message: `"${document.category}" is not a valid technique category.`,
        }),
      )
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

export const techniquesValidator = new TechniquesValidator()
