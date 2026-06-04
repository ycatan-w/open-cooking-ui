import type { Path } from './'

export class PathPattern {
  constructor(readonly tokens: string[]) {}

  match(path: Path): boolean {
    if (path.tokens.length !== this.tokens.length) {
      return false
    }

    for (let i = 0; i < this.tokens.length; i++) {
      const expected = this.tokens[i]
      const actual = path.tokens[i]

      if (expected === '*') {
        continue
      }

      if (expected !== actual) {
        return false
      }
    }

    return true
  }
}
