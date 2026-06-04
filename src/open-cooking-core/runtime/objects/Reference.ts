export class Reference<T extends object, O extends object = {}> {
  constructor(
    readonly id: string,
    private readonly resolver: (id: string) => T | undefined,
    readonly overlay?: Partial<O>,
  ) {}

  resolve(): T | undefined {
    const target = this.resolver(this.id)

    if (!target) {
      return undefined
    }

    if (!this.overlay) {
      return target
    }

    return new Proxy(target, {
      get: (obj, prop) => {
        if (prop in this.overlay!) {
          return this.overlay![prop as keyof O]
        }

        return obj[prop as keyof T]
      },
    })
  }
}
