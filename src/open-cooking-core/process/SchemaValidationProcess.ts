import type { Context } from '../Context'
import { DiagnosticCategory, SchemaDiagnosticCode } from '../diagnostics'
import { OCSDocumentSchema, type OCSDocument } from '../schema'
import type { OpenCookingProcessJob, ParsedDocument } from '../types'
import { AbstractProcess } from './'

export class SchemaValidationProcess extends AbstractProcess {
  protected static category = DiagnosticCategory.SCHEMA
  constructor() {
    super('schema-validation')
  }
  async execute(job: OpenCookingProcessJob<ParsedDocument, OCSDocument>, context: Context) {
    const input = job.input
    if (input === undefined) {
      job.status = 'fail'
      context.diagnosticsCollector.collect(
        SchemaValidationProcess.error({
          code: SchemaDiagnosticCode.SCHEMA_UNDEFINED_DOCUMENT,
          message: 'undefined',
        }),
      )
      return
    }

    const result = OCSDocumentSchema.safeParse(input)
    if (!result.success) {
      context.diagnosticsCollector.collect(
        SchemaValidationProcess.error({
          code: SchemaDiagnosticCode.SCHEMA_INVALID_DOCUMENT,
          message: 'invalid',
          extra: result.error,
        }),
      )
      job.status = 'fail'
      return
    }
    job.status = 'complete'
    job.output = result.data
  }
}
