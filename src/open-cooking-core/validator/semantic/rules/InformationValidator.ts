import type { Context } from '../../../'
import type { Path } from '../../../utils'
import type { OCSInformationObject } from '../../../schema'
import { SemanticValidationProcess } from '../../../process'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import type { ValidatorInterface } from './'

export class InformationValidator implements ValidatorInterface<OCSInformationObject> {
  validate(path: Path, document: OCSInformationObject, context: Context): void {
    if (document.title.length === 0) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_MISSING_INFORMATION_TITLE,
          message: 'The document title is required.',
        }),
      )
    }
  }
}
export const informationValidator = new InformationValidator()
