import { SemanticDiagnosticCode } from '../../../diagnostics'
import type { Context } from '../../../'
import type { Path } from '../../../utils'
import { SemanticValidationProcess } from '../../../process'
import type { ValidatorInterface } from './'

export class IdValidator implements ValidatorInterface<string> {
  validate(path: Path, documentName: string, context: Context): void {
    if (documentName.length === 0) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_INVALID_ID,
          message: `invalid id '${documentName}' for ${path.toString()}`,
        }),
      )
    }
  }
}

export const idValidator = new IdValidator()
