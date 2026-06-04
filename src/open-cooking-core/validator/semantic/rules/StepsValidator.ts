import type { Context } from '../../../'
import type { Path } from '../../../utils'
import type { OCSProcedureStepObject } from '../../../schema'
import { SemanticValidationProcess } from '../../../process'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import { annotationsValidator, mediasValidator, type ValidatorInterface } from './'

export class StepsValidator implements ValidatorInterface<OCSProcedureStepObject> {
  validate(path: Path, document: OCSProcedureStepObject, context: Context): void {
    if (document.instruction.length === 0) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.warning({
          code: SemanticDiagnosticCode.SEMANTIC_EMPTY_TEXT,
          message: 'Step name is empty',
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
  }
}

export const stepsValidator = new StepsValidator()
