import type { Context } from '..'
import type { OCSDocument } from '../schema'
import { Metadata } from './objects'
import { EquipmentFactory, IngredientFactory, RecipeFactory, TechniqueFactory } from './factory'
import { AbstractCollection, OpenCookingDefinition } from './definition'
import { RuntimeContext } from '.'

export class RuntimeDefinitionBuilder {
  build(document: OCSDocument, context: Context): OpenCookingDefinition {
    const definition = new OpenCookingDefinition(this.buildMetadata(document))
    const ctx = new RuntimeContext(definition)
    this.populateDefinition(
      document.equipment || {},
      definition.equipment,
      EquipmentFactory.create,
      ctx,
    )
    this.populateDefinition(
      document.techniques || {},
      definition.techniques,
      TechniqueFactory.create,
      ctx,
    )
    this.populateDefinition(
      document.ingredients || {},
      definition.ingredients,
      IngredientFactory.create,
      ctx,
    )
    this.populateDefinition(document.recipes || {}, definition.recipes, RecipeFactory.create, ctx)

    return definition
  }

  private buildMetadata(document: OCSDocument): Metadata {
    return new Metadata(
      document.openCooking,
      document.info.title,
      document.info.description || null,
      document.info.author || null,
    )
  }

  private populateDefinition<TInput, TOutput extends { id: string | null }>(
    source: Record<string, TInput>,
    target: AbstractCollection<TOutput>,
    factory: (id: string, object: TInput, ctx: RuntimeContext) => TOutput,
    ctx: RuntimeContext,
  ) {
    for (const [id, obj] of Object.entries(source)) {
      const created = factory(id, obj, ctx)

      target.set(created.id ?? id, created)
    }
  }
}

export const runtimeDefinitionBuilder = new RuntimeDefinitionBuilder()
