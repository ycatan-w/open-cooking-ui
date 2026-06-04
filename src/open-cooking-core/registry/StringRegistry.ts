export class StringRegistry {
  private entries = new Map<string, Set<string>>()

  add(from: string, id: string) {
    if (!this.entries.has(from)) {
      this.entries.set(from, new Set())
    }

    this.entries.get(from)!.add(id)
  }

  get(id: string) {
    return this.entries.get(id) || null
  }

  has(id: string) {
    return this.entries.has(id)
  }

  values() {
    return [...this.entries.values()]
  }

  reset() {
    this.entries.clear()
  }
}
