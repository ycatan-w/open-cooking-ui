import type { Context } from '../../../'
import type { Path } from '../../../utils'
import type { OCSMediaObject } from '../../../schema'
import { SemanticValidationProcess } from '../../../process'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import type { ValidatorInterface } from './'

export class MediasValidator implements ValidatorInterface<OCSMediaObject> {
  readonly MEDIA_ENUMS = ['image', 'video', 'audio', 'document', 'link']
  additionalEnums: string[] = []

  validate(path: Path, document: OCSMediaObject, context: Context): void {
    if (document.type && !this.additionalEnums.concat(this.MEDIA_ENUMS).includes(document.type)) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_INVALID_ENUM,
          message: `"${document.type}" is not a valid media type.`,
        }),
      )
    }

    if (document.url.length === 0) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_EMPTY_TEXT,
          message: 'Media URL should not be empty.',
        }),
      )
    }
  }
}
export const mediasValidator = new MediasValidator()
