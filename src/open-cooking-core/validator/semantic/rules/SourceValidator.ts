import type { Context } from '../../../'
import type { Path } from '../../../utils'
import type { OCSSourceObject } from '../../../schema'
import { SemanticValidationProcess } from '../../../process'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import { annotationsValidator, type ValidatorInterface } from './'

export class SourceValidator implements ValidatorInterface<OCSSourceObject> {
  validate(path: Path, document: OCSSourceObject, context: Context): void {
    if (document.name.length === 0) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.warning({
          code: SemanticDiagnosticCode.SEMANTIC_EMPTY_TEXT,
          message: 'Source name should not be empty.',
        }),
      )
    }
    const annotationsPath = path.child('annotations')
    for (const annotation of document.annotations || []) {
      annotationsValidator.validate(annotationsPath, annotation, context)
    }
  }
}

export const sourceValidator = new SourceValidator()
