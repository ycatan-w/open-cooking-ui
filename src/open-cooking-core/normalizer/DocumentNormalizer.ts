import type { OCSDocument } from '../schema'
import { Path } from '../utils'
import { durationNormalizer, enumNormalizer, stringNormalizer, type NormalizerRule } from './rules'

export class DocumentNormalizer {
  readonly rules: NormalizerRule[] = [stringNormalizer, enumNormalizer, durationNormalizer]

  normalize(document: OCSDocument): OCSDocument {
    return this.walk(new Path([]), document) as OCSDocument
  }

  private walk(path: Path, value: unknown): unknown {
    // arrays
    if (Array.isArray(value)) {
      return value.map((item, index) => this.walk(path.child(index), item))
    }

    // objects
    if (this.isObject(value)) {
      const output: Record<string, unknown> = {}

      for (const [key, child] of Object.entries(value)) {
        output[key] = this.walk(path.child(key), child)
      }

      return output
    }

    // value
    return this.applyRules(path, value)
  }

  private applyRules(path: Path, value: unknown): unknown {
    let current = value

    for (const rule of this.rules) {
      if (rule.supports(path, current)) {
        current = rule.normalize(current)
      }
    }

    return current
  }

  private isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  }
}

export const documentNormalizer = new DocumentNormalizer()
