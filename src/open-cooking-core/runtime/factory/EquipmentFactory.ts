import type { OCSEquipmentObject } from '../../schema'
import type { EquipmentBuilder } from '../builder'
import { Equipment, Reference } from '../objects'
import { RuntimeContext } from '../'
import { ReferenceFactory, RuntimeObjectFactory } from './'

export class EquipmentFactory extends RuntimeObjectFactory {
  static create(id: string, source: OCSEquipmentObject, context: RuntimeContext): Equipment {
    return EquipmentFactory.createCommonBuilder(source)
      .withId(RuntimeContext.RuntimeRefId.equipment(id))
      .build()
  }

  static createInline(source: OCSEquipmentObject, context: RuntimeContext): Equipment {
    return EquipmentFactory.createCommonBuilder(source).build()
  }

  static createReference(source: { $ref: string }, context: RuntimeContext): Reference<Equipment> {
    return ReferenceFactory.fromRecord(source, context.definition.equipment)
  }

  private static createCommonBuilder(source: OCSEquipmentObject): EquipmentBuilder {
    const builder = Equipment.builder()
      .withName(source.name || '')
      .withCategory(source.category || '')
      .withDescription(source.description || '')
    ;(source.uses || []).forEach((u) => builder.addUse(u))
    EquipmentFactory.buildAnnotations(builder, source.annotations)
    EquipmentFactory.buildMedias(builder, source.media)
    return builder
  }
}
