import type { Context } from '../Context'
import { DiagnosticCategory, SchemaDiagnosticCode } from '../diagnostics'
import { OCSDocumentSchema, type OCSDocument } from '../schema'
import type { OpenCookingProcessJob, ParsedDocument } from '../types'
import { AbstractProcess } from './'
import * as z from 'zod'

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
          message: 'No document was provided for schema validation.',
        }),
      )
      return
    }

    const result = OCSDocumentSchema.safeParse(input)
    if (!result.success) {
      context.diagnosticsCollector.collect(
        SchemaValidationProcess.error({
          code: SchemaDiagnosticCode.SCHEMA_INVALID_DOCUMENT,
          message: 'The document does not conform to the OCS schema.',
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
