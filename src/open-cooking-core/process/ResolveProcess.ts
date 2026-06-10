import type { Context } from '../'
import type { OCSDocument } from '../schema'
import type { OpenCookingProcessJob } from '../types'
import { documentResolver } from '../resolver'
import { AbstractProcess } from './'
import { DiagnosticCategory, ResolverDiagnosticCode } from '../diagnostics'

export class ResolveProcess extends AbstractProcess {
  protected static category = DiagnosticCategory.RESOLVER

  constructor() {
    super('resolver')
  }

  async execute(job: OpenCookingProcessJob<OCSDocument, OCSDocument>, context: Context) {
    const input = job.input
    if (input === undefined) {
      context.diagnosticsCollector.collect(
        ResolveProcess.error({
          code: ResolverDiagnosticCode.RESOLVER_UNDEFINED_DOCUMENT,
          message: 'No document was provided for reference resolution.',
        }),
      )
      job.status = 'fail'
      return
    }
    try {
      documentResolver.resolve(input, context)
      job.status = 'complete'
      job.output = input
    } catch {
      job.status = 'fail'
      context.diagnosticsCollector.collect(
        ResolveProcess.fatal({
          code: ResolverDiagnosticCode.RESOLVER_FAILURE,
          message: 'Failed to resolve document references.',
        }),
      )
    }
  }
}
