import { EquipmentBuilder } from '../builder'
import type { Annotation, Media } from './'

export class Equipment {
  constructor(
    readonly id: string | null,
    readonly name: string,
    readonly category: string,
    readonly description: string,
    readonly uses: string[],
    readonly annotations: Annotation[],
    readonly media: Media[],
  ) {}

  static builder() {
    return new EquipmentBuilder()
  }
}
