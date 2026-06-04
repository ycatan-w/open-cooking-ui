import type { Context } from '../Context'
import { documentNormalizer } from '../normalizer'
import type { OCSDocument } from '../schema'
import type { OpenCookingProcessJob } from '../types'
import { AbstractProcess } from './'
import { DiagnosticCategory, NormalizerDiagnosticCode } from '../diagnostics'

export class NormalizeProcess extends AbstractProcess {
  protected static category = DiagnosticCategory.NORMALIZER
  constructor() {
    super('normalizer')
  }

  async execute(job: OpenCookingProcessJob<OCSDocument, OCSDocument>, context: Context) {
    const input = job.input
    if (input === undefined) {
      context.diagnosticsCollector.collect(
        NormalizeProcess.error({
          code: NormalizerDiagnosticCode.NORMALIZER_UNDEFINED_DOCUMENT,
          message: 'Document is not defined',
        }),
      )
      job.status = 'fail'
      return
    }
    try {
      job.output = documentNormalizer.normalize(input)
      job.status = 'complete'
    } catch {
      job.status = 'fail'
      context.diagnosticsCollector.collect(
        NormalizeProcess.fatal({
          code: NormalizerDiagnosticCode.NORMALIZER_FAILURE,
          message: 'fail',
        }),
      )
    }
  }
}
