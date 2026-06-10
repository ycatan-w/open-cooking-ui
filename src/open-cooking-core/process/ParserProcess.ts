import YAML from 'yaml'
import type { Context } from '../'
import type { LoadedDocument, OpenCookingProcessJob, ParsedDocument } from '../types'
import { DiagnosticCategory, ParserDiagnosticCode } from '../diagnostics'
import { AbstractProcess } from './'

export class ParserProcess extends AbstractProcess {
  protected static category = DiagnosticCategory.PARSER

  constructor() {
    super('parser')
  }
  async execute(job: OpenCookingProcessJob<LoadedDocument, ParsedDocument>, context: Context) {
    const input = job.input
    if (input.type === 'object') {
      job.status = 'complete'
      job.output = input.raw
      return
    }
    if (input.source === undefined) {
      job.status = 'fail'
      context.diagnosticsCollector.collect(
        ParserProcess.error({
          code: ParserDiagnosticCode.PARSER_UNDEFINED_SOURCE,
          message: 'No raw source content was provided for parsing.',
        }),
      )
      return
    }

    try {
      const trimmed = input.source.trim()
      context.storage.format = trimmed.startsWith('{') || trimmed.startsWith('[') ? 'json' : 'yaml'
      job.output = this.parseContent(context.storage.format, trimmed)
      if (typeof job.output === 'string') {
        throw 'Parsed content is string'
      }
      job.status = 'complete'
    } catch {
      job.status = 'fail'

      context.diagnosticsCollector.collect(
        ParserProcess.fatal({
          code: ParserDiagnosticCode.PARSER_INVALID_SYNTAX,
          message: 'Failed to parse the specification document.',
        }),
      )
    }
  }

  private parseContent(format: 'json' | 'yaml', trimmedContent: string): unknown {
    if (format === 'json') {
      return JSON.parse(trimmedContent)
    }
    return YAML.parse(trimmedContent)
  }
}
