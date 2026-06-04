import type { AbstractCollection } from '../definition'
import { Reference } from '../objects'
type ReferenceSource = {
  $ref: string
}
export class ReferenceFactory {
  static fromRecord<TObject extends object, TSource extends ReferenceSource>(
    source: TSource,
    registry: AbstractCollection<TObject>,
  ): Reference<TObject, Omit<TSource, '$ref'>> {
    const { $ref, ...overlay } = source

    return new Reference<TObject, Omit<TSource, '$ref'>>($ref, (id) => registry.get(id), overlay)
  }
}
