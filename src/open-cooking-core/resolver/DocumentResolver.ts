import type { Context } from '../'
import type { OCSDocument } from '../schema'
import { durationResolver, enumResolver } from './rules'

export class DocumentResolver {
  resolve(document: OCSDocument, context: Context) {
    this.reset(context)
    durationResolver.resolve(document, context)
    enumResolver.resolve(document, context)
  }

  private reset(context: Context) {
    context.registry.categories.recipes.reset()
    context.registry.categories.ingredients.reset()
    context.registry.categories.equipment.reset()
    context.registry.categories.techniques.reset()
    context.registry.difficulties.reset()
  }
}

export const documentResolver = new DocumentResolver()
