export class Metadata {
  constructor(
    readonly version: string,
    readonly title: string,
    readonly description: string | null,
    readonly author: string | null,
  ) {}
}
