import type { Context } from '../../../'
import type { Path } from '../../../utils'
import type { OCSProcedureStepObject, OCSTechniqueObject } from '../../../schema'
import { SemanticValidationProcess } from '../../../process'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import {
  annotationsValidator,
  mediasValidator,
  techniquesValidator,
  type ValidatorInterface,
} from './'

export class StepsValidator implements ValidatorInterface<OCSProcedureStepObject> {
  validate(path: Path, document: OCSProcedureStepObject, context: Context): void {
    if (document.instruction.length === 0) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.warning({
          code: SemanticDiagnosticCode.SEMANTIC_EMPTY_TEXT,
          message: 'Step name is empty',
        }),
      )
    }
    this.parseDuration(document?.duration || '', context)

    const techniquesPath = path.child('techniques')
    for (const [index, technique] of (document.techniques || []).entries()) {
      techniquesValidator.validate(techniquesPath.child(index), technique, context)
    }

    const annotationsPath = path.child('annotations')
    for (const annotation of document.annotations || []) {
      annotationsValidator.validate(annotationsPath, annotation, context)
    }

    const mediaPath = path.child('media')
    for (const media of document.media || []) {
      mediasValidator.validate(mediaPath, media, context)
    }
  }

  private parseDuration(value: string, context: Context) {
    if (value.length < 1) {
      return
    }
    const regex = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/
    const match = value.match(regex)

    if (!match) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_INVALID_DURATION,
          message: 'Invalid duration format',
        }),
      )
      return
    }

    const [, days, hours, minutes, seconds] = match
    const parsed = {
      days: Number(days ?? 0),
      hours: Number(hours ?? 0),
      minutes: Number(minutes ?? 0),
      seconds: Number(seconds ?? 0),
    }
    const totalSeconds =
      parsed.days * 86400 + parsed.hours * 3600 + parsed.minutes * 60 + parsed.seconds

    return {
      raw: value,
      ...parsed,
      totalSeconds,
      totalMinutes: totalSeconds / 60,
    }
  }
}

export const stepsValidator = new StepsValidator()
