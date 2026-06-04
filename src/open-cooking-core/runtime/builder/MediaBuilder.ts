import { Media } from '../objects'
import type { BuilderInterface } from './'

export class MediaBuilder implements BuilderInterface<Media> {
  private type!: string
  private url!: string
  private caption!: string | null
  private attribution!: string | null

  withType(type: string) {
    this.type = type

    return this
  }
  withUrl(url: string) {
    this.url = url

    return this
  }
  withCaption(caption: string) {
    this.caption = caption

    return this
  }
  withAttribution(attribution: string) {
    this.attribution = attribution

    return this
  }
  build(): Media {
    return new Media(this.type, this.url, this.caption, this.attribution)
  }
}
