import { Config, Context, ProcessFlow } from '.'
import type { OpenCookingInput, OpenCookingOutput, Option } from './types'
import { Event, EventDispatcher } from './event-dispatcher'
import {
  LoaderProcess,
  ParserProcess,
  SchemaValidationProcess,
  NormalizeProcess,
  SemanticValidationProcess,
  ResolveProcess,
  RuntimeProcess,
} from './process'

export type RunOptions = OpenCookingInput & {
  signal?: AbortSignal
}

export class OpenCookingProcessor {
  readonly dispatcher = new EventDispatcher()
  readonly context: Context
  readonly flow = new ProcessFlow()

  constructor(options: Partial<Option> = {}) {
    this.context = new Context(
      new Config({
        extensionPolicy: 'preserve',
        log: 'warning',
        ...options,
      }),
      this.dispatcher,
    )
    this.registerProcesses()
  }

  addListener(type: string, callback: (event: Event<any>) => Promise<void> | void) {
    this.dispatcher.addEventListener(type, callback)
  }

  async run(options: RunOptions): Promise<OpenCookingOutput> {
    const { signal, ...input } = options
    this.context.attachSignal(signal)
    this.context.throwIfAborted()
    this.context.diagnosticsCollector.reset()

    try {
      return await this.flow.run(input, this.context)
    } catch (e) {
      throw ''
    }
  }

  protected registerProcesses() {
    this.flow.register(new LoaderProcess())
    this.flow.register(new ParserProcess())
    this.flow.register(new SchemaValidationProcess())
    this.flow.register(new NormalizeProcess())
    this.flow.register(new SemanticValidationProcess())
    this.flow.register(new ResolveProcess())
    this.flow.register(new RuntimeProcess())
  }
}
