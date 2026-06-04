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
          message: 'invalid OCS version',
        }),
      )
    }

    if (Object.keys(document.recipes).length === 0) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_MISSING_RECIPES,
          message: 'No recipe was defined',
        }),
      )
    }
  }
}

export const rootValidator = new RootValidator()
