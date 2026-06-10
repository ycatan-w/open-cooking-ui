import type { Context } from '../Context'
import { DiagnosticCategory, SemanticDiagnosticCode } from '../diagnostics'
import type { OCSDocument } from '../schema'
import type { OpenCookingProcessJob } from '../types'
import { documentValidator } from '../validator/semantic'
import { AbstractProcess } from './'

export class SemanticValidationProcess extends AbstractProcess {
  protected static category = DiagnosticCategory.SEMANTIC
  constructor() {
    super('semantic-validation')
  }

  async execute(job: OpenCookingProcessJob<OCSDocument, OCSDocument>, context: Context) {
    const input = job.input
    if (input === undefined) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_UNDEFINED_DOCUMENT,
          message: 'No document was provided for semantic validation.',
        }),
      )
      job.status = 'fail'
      return
    }
    try {
      documentValidator.validate(input, context)
      if (context.diagnosticsCollector.hasError()) {
        job.status = 'fail'
      } else {
        job.status = 'complete'
        job.output = input
      }
    } catch {
      job.status = 'fail'
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.fatal({
          code: SemanticDiagnosticCode.SEMANTIC_FAILURE,
          message: 'Semantic validation failed due to an unexpected error.',
        }),
      )
    }
  }
}
