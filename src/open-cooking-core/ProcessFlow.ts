import type { Context } from './'
import { Diagnostic, DiagnosticCategory, InternalDiagnosticCode } from './diagnostics'
import { ProcessEvent, ProcessFlowEvent } from './event-dispatcher'
import { OpenCookingCancelledError } from './OpenCookingCancelledError'
import type { AbstractProcess } from './process'
import type { OpenCookingOutput, OpenCookingProcessJob } from './types'

export class ProcessFlow {
  readonly processes: AbstractProcess[] = []

  register(process: AbstractProcess) {
    this.processes.push(process)
  }

  async run(input: unknown, context: Context): Promise<OpenCookingOutput> {
    let current = input

    await context.dispatcher.emit(
      new ProcessFlowEvent('process-flow:start', {
        time: new Date().getTime(),
        processesInfo: this.processes.map((p) => ({
          name: p.name,
        })),
      }),
    )
    const job: OpenCookingProcessJob<any, any> = {
      status: 'new',
      input: current,
      context,
    }
    for (const process of this.processes) {
      job.status = 'new'
      job.input = current
      delete job.output
      try {
        await context.dispatcher.emit(
          new ProcessEvent('process:start', {
            time: new Date().getTime(),
            process: process.name,
            job,
          }),
        )

        job.status = 'in_progress'

        context.throwIfAborted()
        await process.execute(job, context)
        context.throwIfAborted()
        current = job.output
      } catch (e) {
        job.status = 'fail'
        if (e instanceof OpenCookingCancelledError) {
          context.diagnosticsCollector.collect(
            Diagnostic.info({
              category: DiagnosticCategory.INTERNAL,
              code: InternalDiagnosticCode.INTERNAL_PROCESS_ABORTED,
              message: 'Process aborted',
            }),
          )
        } else {
          context.diagnosticsCollector.collect(
            Diagnostic.fatal({
              category: DiagnosticCategory.INTERNAL,
              code: InternalDiagnosticCode.INTERNAL_PROCESS_FAILURE,
              message: 'An unexpected error occurred while executing the processing pipeline.',
            }),
          )
        }
      }

      await context.dispatcher.emit(
        new ProcessEvent('process:end', {
          time: new Date().getTime(),
          process: process.name,
          job,
        }),
      )
      if (!this.jobIsComplete(job)) {
        break
      }
    }

    await context.dispatcher.emit(
      new ProcessFlowEvent('process-flow:end', {
        time: new Date().getTime(),
      }),
    )

    return {
      data: job.status === 'complete' ? job.output : null,
      metadata: {
        format: context.storage.format || null,
      },
      diagnostics: context.diagnosticsCollector,
    }
  }

  private jobIsComplete(job: OpenCookingProcessJob<any, any>) {
    return job.status === 'complete'
  }
}
