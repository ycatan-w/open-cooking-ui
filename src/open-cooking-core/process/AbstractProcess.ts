import type { OpenCookingProcessJob } from '../types'
import type { Context } from '../'
import { Diagnostic, DiagnosticCategory, type DiagnosticMethodOption } from '../diagnostics'

export abstract class AbstractProcess {
  constructor(readonly name: string) {}
  protected static category: DiagnosticCategory

  abstract execute(job: OpenCookingProcessJob<any, any>, context: Context): Promise<void>

  // diagnostic helper
  static info(option: Omit<DiagnosticMethodOption<any>, 'category'>) {
    return Diagnostic.info({
      category: this.category,
      ...option,
    })
  }
  static warning(option: Omit<DiagnosticMethodOption<any>, 'category'>) {
    return Diagnostic.warning({
      category: this.category,
      ...option,
    })
  }
  static error(option: Omit<DiagnosticMethodOption<any>, 'category'>) {
    return Diagnostic.error({
      category: this.category,
      ...option,
    })
  }
  static fatal(option: Omit<DiagnosticMethodOption<any>, 'category'>) {
    return Diagnostic.fatal({
      category: this.category,
      ...option,
    })
  }
}
