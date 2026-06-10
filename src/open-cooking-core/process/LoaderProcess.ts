import { type OpenCookingInput, type LoadedDocument, type OpenCookingProcessJob } from '../types'
import { DiagnosticCategory, LoaderDiagnosticCode } from '../diagnostics'
import type { Context } from '../'
import { AbstractProcess } from './'

export class LoaderProcess extends AbstractProcess {
  protected static category = DiagnosticCategory.LOADER

  constructor() {
    super('loader')
  }

  async execute(job: OpenCookingProcessJob<OpenCookingInput, LoadedDocument>, context: Context) {
    const input = job.input

    if (input === undefined) {
      context.diagnosticsCollector.collect(
        LoaderProcess.error({
          code: LoaderDiagnosticCode.LOADER_UNDEFINED_INPUT,
          message: 'No input source was provided.',
        }),
      )
      job.status = 'fail'
      return
    }

    switch (input.type) {
      case 'url':
        try {
          const response = await fetch(input.content)
          job.status = 'complete'
          job.output = {
            type: 'url',
            source: await response.text(),
          }
        } catch (e) {
          context.diagnosticsCollector.collect(
            LoaderProcess.fatal({
              code: LoaderDiagnosticCode.LOADER_FETCH_FAILURE,
              message: 'Failed to load the specification document.',
            }),
          )
          job.status = 'fail'
        }
        break
      case 'raw':
        job.status = 'complete'
        job.output = {
          type: 'raw',
          source: input.content,
        } as LoadedDocument
        break
      default:
        job.status = 'complete'
        job.output = {
          type: 'object',
          raw: input.content,
        } as LoadedDocument
        break
    }
  }
}
