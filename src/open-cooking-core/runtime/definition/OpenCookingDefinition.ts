import type { Equipment, Ingredient, Metadata, Recipe, Technique } from '../objects'
import {
  EquipmentCollection,
  IngredientCollection,
  RecipeCollection,
  TechniqueCollection,
} from './'

export class OpenCookingDefinition {
  // context.registry.categories.recipes.reset()
  // context.registry.categories.ingredients.reset()
  // context.registry.categories.equipment.reset()
  // context.registry.categories.techniques.reset()
  // context.registry.difficulties.reset()
  readonly techniques: TechniqueCollection = new TechniqueCollection()
  readonly equipment: EquipmentCollection = new EquipmentCollection()
  readonly ingredients: IngredientCollection = new IngredientCollection()
  readonly recipes: RecipeCollection = new RecipeCollection()

  constructor(readonly metadata: Metadata) {}

  findRecipe(id: string): Recipe | undefined {
    return this.recipes.get(id)
  }
  findRecipeByName(name: string) {
    this.recipes.findByTag
  }

  findIngredient(id: string): Ingredient | undefined {
    return this.ingredients.get(id)
  }

  findEquipment(id: string): Equipment | undefined {
    return this.equipment.get(id)
  }

  findTechnique(id: string): Technique | undefined {
    return this.techniques.get(id)
  }
}
