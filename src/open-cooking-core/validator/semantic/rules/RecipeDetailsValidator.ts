import type { Context } from '../../../'
import type { Path } from '../../../utils'
import type { OCSRecipeDetailsObject } from '../../../schema'
import { SemanticValidationProcess } from '../../../process'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import type { ValidatorInterface } from './'

export class RecipeDetailsValidator implements ValidatorInterface<OCSRecipeDetailsObject> {
  validate(path: Path, document: OCSRecipeDetailsObject, context: Context): void {
    const cookDuration = this.parseDuration(document?.cook_time || '')
    const prepDuration = this.parseDuration(document?.prep_time || '')
    const totalDuration = this.parseDuration(document?.total_time || '')

    if (totalDuration === undefined) {
      return
    }
    const totalSeconds = (cookDuration?.totalSeconds || 0) + (prepDuration?.totalSeconds || 0)
    if (totalSeconds !== totalDuration.totalSeconds) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_INVALID_DURATION,
          message: "cook and prep duration doesn't match the total duration",
        }),
      )
    }
  }

  private parseDuration(value: string) {
    if (value.length < 1) {
      return
    }
    const regex = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/

    const match = value.match(regex)

    if (!match) {
      throw new Error('Invalid duration')
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
export const recipeDetailsValidator = new RecipeDetailsValidator()
