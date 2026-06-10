import type { Context } from '../../../'
import type { Path } from '../../../utils'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import type { OCSDocument } from '../../../schema'
import { SemanticValidationProcess } from '../../../process'
import type { ValidatorInterface } from './'

export class RootValidator implements ValidatorInterface<OCSDocument> {
  validate(path: Path, document: OCSDocument, context: Context): void {
    if (document.openCooking !== '1.0.0') {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_INVALID_DOCUMENT_VERSION,
          message: 'The document uses an unsupported OCS version.',
        }),
      )
    }

    if (Object.keys(document.recipes).length === 0) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_MISSING_RECIPES,
          message: 'At least one recipe must be defined in the specification.',
        }),
      )
    }
  }
}

export const rootValidator = new RootValidator()
