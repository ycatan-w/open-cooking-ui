import type { OCSDocument } from '../../schema'
import type { Context } from '../../Context'

export class DurationResolver {
  resolve(document: OCSDocument, context: Context) {
    for (const recipe of Object.values(document.recipes || {})) {
      if (recipe.details?.cook_time) {
        const cookDuration = this.parseDuration(recipe.details?.cook_time || '')
        recipe.details.__cookTimeSecond = cookDuration?.seconds
      }
      if (recipe.details?.prep_time) {
        const prepDuration = this.parseDuration(recipe.details?.prep_time || '')
        recipe.details.__prepTimeSecond = prepDuration?.seconds
      }
      if (recipe.details?.total_time) {
        const totalDuration = this.parseDuration(recipe.details?.total_time || '')
        recipe.details.__totalTimeSecond = totalDuration?.seconds
      }
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

export const durationResolver = new DurationResolver()
