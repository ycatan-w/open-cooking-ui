export class Media {
  constructor(
    readonly type: string,
    readonly url: string,
    readonly caption: string | null,
    readonly attribution: string | null,
  ) {}
}
