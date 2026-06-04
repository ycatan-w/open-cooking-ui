import type { OpenCookingDefinition } from './definition/OpenCookingDefinition'

export class RuntimeContext {
  static RuntimeRefId = {
    recipe: (id: string) => `#/recipes/${id}`,
    ingredient: (id: string) => `#/ingredients/${id}`,
    equipment: (id: string) => `#/equipment/${id}`,
    technique: (id: string) => `#/techniques/${id}`,
  }
  constructor(readonly definition: OpenCookingDefinition) {}
}
