import type { Context } from '../Context'
import type { Diagnostic, DiagnosticCategory, DiagnosticCollector } from '../diagnostics'
import type { OpenCookingDefinition } from '../runtime/definition'

export type Option = {
  readonly extensionPolicy: 'preserve' | 'strip' | 'error'
  readonly log: 'info' | 'warning' | 'error' | 'fatal'
}

export type OpenCookingProcessJob<I, O> = {
  context: Context
  status: 'new' | 'in_progress' | 'fail' | 'complete'
  input: I
  output?: O
}

export type OpenCookingInput =
  | {
      readonly type: 'raw' | 'url'
      readonly content: string
    }
  | {
      readonly type: 'object'
      readonly content: object
    }
export type OpenCookingOutput = {
  data: OpenCookingDefinition | null
  metadata?: { format: string | null }
  diagnostics: DiagnosticCollector
}

export type LoadedDocument =
  | {
      readonly type: 'url' | 'raw'
      source: string
    }
  | {
      type: 'object'
      raw: object
    }
export type ParsedDocument = unknown
export type ResolvedReference<T> = {
  $ref: string
  target: T
}
export type LazyReference<T> = {
  $ref: string
  get value(): string
}
