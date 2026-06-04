import { DiagnosticCategory, DiagnosticSeverity, type DiagnosticCodeMap } from './types'

export type DiagnosticMethodOption<TCategory extends DiagnosticCategory> = {
  category: TCategory
  code: DiagnosticCodeMap[TCategory]
  message: string
  path?: string
  extra?: unknown
}

export class Diagnostic<TCategory extends DiagnosticCategory> {
  constructor(
    readonly severity: DiagnosticSeverity,
    readonly category: TCategory,
    readonly code: DiagnosticCodeMap[TCategory],
    readonly message: string,
    readonly path?: string,
    readonly extra?: unknown,
  ) {}

  static create<TCategory extends DiagnosticCategory>(
    severity: DiagnosticSeverity,
    option: DiagnosticMethodOption<TCategory>,
  ) {
    return new Diagnostic(
      severity,
      option.category,
      option.code,
      option.message,
      option.path,
      option.extra,
    )
  }

  static info(option: DiagnosticMethodOption<DiagnosticCategory>) {
    return Diagnostic.create(DiagnosticSeverity.INFO, option)
  }
  static warning(option: DiagnosticMethodOption<DiagnosticCategory>) {
    return Diagnostic.create(DiagnosticSeverity.WARNING, option)
  }
  static error(option: DiagnosticMethodOption<DiagnosticCategory>) {
    return Diagnostic.create(DiagnosticSeverity.ERROR, option)
  }
  static fatal(option: DiagnosticMethodOption<DiagnosticCategory>) {
    return Diagnostic.create(DiagnosticSeverity.FATAL, option)
  }
}
