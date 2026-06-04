import type { Equipment } from '../objects'
import { AbstractCollection } from './'

export class EquipmentCollection extends AbstractCollection<Equipment> {
  findByCategory(category: string): Equipment[] {
    const equipment: Equipment[] = []
    for (const [id, item] of this.items.entries()) {
      if (category === item.category) {
        equipment.push(item)
      }
    }
    return equipment
  }
}
