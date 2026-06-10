import type { Diagnostic } from './Diagnostic'
import { DiagnosticSeverity, type DiagnosticCategory } from './types'

export class DiagnosticCollector {
  private items: Diagnostic<DiagnosticCategory>[] = []
  reset() {
    this.items = []
  }
  get() {
    return this.items
  }
  collect(diagnostic: Diagnostic<DiagnosticCategory>) {
    this.items.push(diagnostic)
  }
  hasError(): boolean {
    return -1 !== this.items.findIndex((d) => [DiagnosticSeverity.ERROR].includes(d.severity))
  }
  hasFatal(): boolean {
    return -1 !== this.items.findIndex((d) => [DiagnosticSeverity.FATAL].includes(d.severity))
  }
  hasWarning(): boolean {
    return -1 !== this.items.findIndex((d) => [DiagnosticSeverity.WARNING].includes(d.severity))
  }
}
