export abstract class Event<T> {
  constructor(
    readonly type: string,
    readonly context: T | null = null,
  ) {}
}
