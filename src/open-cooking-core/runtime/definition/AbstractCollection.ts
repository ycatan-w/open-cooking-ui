export class AbstractCollection<T> {
  constructor(protected readonly items: Map<string, T> = new Map<string, T>()) {}

  set(id: string, object: T) {
    this.items.set(id, object)
    return this
  }
  get(id: string) {
    return this.find(id)
  }
  find(id: string): T | undefined {
    return this.items.get(id)
  }
  findAll(): Map<string, T> {
    return this.items
  }
}
