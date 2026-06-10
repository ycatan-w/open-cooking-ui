import type { Context } from '../../../'
import type { Path } from '../../../utils'
import type { OCSEquipmentObject } from '../../../schema'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import { SemanticValidationProcess } from '../../../process'
import {
  type ValidatorInterface,
  mediasValidator,
  annotationsValidator,
  referencesValidator,
} from './'

export class EquipmentValidator implements ValidatorInterface<OCSEquipmentObject> {
  static readonly EQUIPEMENT_ENUMS = [
    'cutting',
    'mixing',
    'cooking',
    'baking',
    'measuring',
    'serving',
    'storage',
    'preparation',
    'electrical',
    'cookware',
    'utensil',
  ]
  additionalEnums: string[] = []

  validate(path: Path, document: OCSEquipmentObject, context: Context): void {
    if (document.name && document.$ref) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_REFERENCE_INVALID_FORMAT,
          message: 'Equipment cannot define both "name" and "$ref".',
        }),
      )
    }

    if (document.$ref) {
      referencesValidator.collectEquipmentRef(
        `${path.toReference().replace(/\/equipment\/\d+/, '')}`,
        document,
        context,
      )
    }

    if (
      document.category &&
      !this.additionalEnums.concat(EquipmentValidator.EQUIPEMENT_ENUMS).includes(document.category)
    ) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_INVALID_ENUM,
          message: `"${document.category}" is not a valid equipment category.`,
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

export const equipmentValidator = new EquipmentValidator()
