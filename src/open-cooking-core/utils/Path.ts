export class Path {
  constructor(readonly tokens: string[]) {}

  child(token: string | number) {
    return new Path([...this.tokens, String(token)])
  }

  toReference() {
    return `#/${[...this.tokens].join('/')}`
  }

  toString() {
    return this.tokens.join('.')
  }
}
