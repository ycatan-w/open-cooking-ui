import type { Config } from './'
import { DiagnosticCollector } from './diagnostics'
import type { EventDispatcher } from './event-dispatcher'
import { OpenCookingCancelledError } from './OpenCookingCancelledError'
import { ReferenceGraph, StringRegistry } from './registry'

export class Context {
  readonly diagnosticsCollector: DiagnosticCollector = new DiagnosticCollector()
  readonly registry = {
    graph: new ReferenceGraph(),
    categories: {
      recipes: new StringRegistry(),
      ingredients: new StringRegistry(),
      equipment: new StringRegistry(),
      techniques: new StringRegistry(),
    },
    difficulties: new StringRegistry(),
  }
  readonly storage: {
    format?: 'yaml' | 'json'
  } = {}
  constructor(
    readonly config: Config,
    readonly dispatcher: EventDispatcher,
  ) {
    this.dispatcher.addContext(this)
  }

  signal!: AbortSignal | undefined
  attachSignal(signal?: AbortSignal) {
    this.signal = signal
  }

  isAborted() {
    return this.signal?.aborted
  }

  throwIfAborted() {
    if (this.signal?.aborted) {
      console.log(`Context.throwIfAborted`)
      throw new OpenCookingCancelledError()
    }
  }

  /**
   * Development helper that introduces an artificial
   * delay to simulate process execution time and test
   * abort handling.
   */
  async sleep(ms: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup()
        resolve()
      }, ms)

      const onAbort = () => {
        clearTimeout(timeout)
        cleanup()
        reject(new OpenCookingCancelledError())
      }

      const cleanup = () => {
        this.signal?.removeEventListener('abort', onAbort)
      }

      this.signal?.addEventListener('abort', onAbort)

      if (this.signal?.aborted) {
        onAbort()
      }
    })
  }
}
