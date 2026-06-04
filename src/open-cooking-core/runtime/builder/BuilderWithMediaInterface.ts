import type { Media } from '../objects'

export interface BuilderWithMediaInterface {
  addMedia: (media: Media) => this
}
