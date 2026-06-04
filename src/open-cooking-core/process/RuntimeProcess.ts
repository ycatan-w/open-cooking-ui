import type { Context } from '../'
import type { OCSDocument } from '../schema'
import type { OpenCookingProcessJob } from '../types'
import { runtimeDefinitionBuilder } from '../runtime'
import type { OpenCookingDefinition } from '../runtime/definition'
import { AbstractProcess } from './'
import { DiagnosticCategory, RuntimeDiagnosticCode } from '../diagnostics'

export class RuntimeProcess extends AbstractProcess {
  protected static category = DiagnosticCategory.RUNTIME

  constructor() {
    super('runtime')
  }

  async execute(job: OpenCookingProcessJob<OCSDocument, OpenCookingDefinition>, context: Context) {
    if (job.input === undefined) {
      job.status = 'fail'
      context.diagnosticsCollector.collect(
        RuntimeProcess.error({
          code: RuntimeDiagnosticCode.RUNTIME_UNDEFINED_DOCUMENT,
          message: 'undefined',
        }),
      )
      return
    }
    try {
      job.output = runtimeDefinitionBuilder.build(job.input, context)
      job.status = 'complete'
    } catch (e) {
      job.status = 'fail'
      context.diagnosticsCollector.collect(
        RuntimeProcess.fatal({
          code: RuntimeDiagnosticCode.RUNTIME_BUILD_FAILURE,
          message: 'fail',
        }),
      )
    }
  }
}
