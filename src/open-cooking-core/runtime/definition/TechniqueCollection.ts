import type { Technique } from '../objects'
import { AbstractCollection } from './'

export class TechniqueCollection extends AbstractCollection<Technique> {
  findByCategory(category: string): Technique[] {
    const techniques: Technique[] = []
    for (const [id, technique] of this.items.entries()) {
      if (category === technique.category) {
        techniques.push(technique)
      }
    }
    return techniques
  }
}
