import type { Context } from '../../../'
import type { Path } from '../../../utils'
import type { OCSAnnotationObject } from '../../../schema'
import { SemanticValidationProcess } from '../../../process'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import type { ValidatorInterface } from './'

export class AnnotationsValidator implements ValidatorInterface<OCSAnnotationObject> {
  readonly ANNOTATION_ENUMS: string[] = [
    'tip',
    'warning',
    'correction',
    'variation',
    'substitution',
    'note',
    'issue',
  ]
  additionalEnums: string[] = []
  validate(path: Path, document: OCSAnnotationObject, context: Context): void {
    if (
      document.type &&
      !this.additionalEnums.concat(this.ANNOTATION_ENUMS).includes(document.type)
    ) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_INVALID_ENUM,
          message: `"${document.type}" is not a valid annotation type.`,
        }),
      )
    }

    if (document.text.length === 0) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.warning({
          code: SemanticDiagnosticCode.SEMANTIC_EMPTY_TEXT,
          message: 'Annotation text should not be empty.',
        }),
      )
    }
  }
}

export const annotationsValidator = new AnnotationsValidator()
