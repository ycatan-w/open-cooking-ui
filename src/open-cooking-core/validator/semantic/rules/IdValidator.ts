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
          message: `"${documentName}" is not a valid identifier for ${path.toString()}.`,
        }),
      )
    }
  }
}

export const idValidator = new IdValidator()
