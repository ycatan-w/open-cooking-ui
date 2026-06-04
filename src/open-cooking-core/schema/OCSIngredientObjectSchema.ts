import * as z from 'zod'
import {
  BaseOCSObjectSchema,
  OCSReferenceObjectSchema,
  OCSAnnotationObjectSchema,
  OCSMediaObjectSchema,
} from './'

export type OCSIngredientObject = z.infer<typeof OCSIngredientObjectSchema>

export const OCSIngredientObjectSchema = BaseOCSObjectSchema.extend({
  name: z.string().optional(),
  category: z.string().optional(),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  recipe: OCSReferenceObjectSchema.optional(),
  annotations: z.array(OCSAnnotationObjectSchema).optional(),
  media: z.array(OCSMediaObjectSchema).optional(),
  $ref: z.string().optional(),
}).superRefine((data, ctx) => {
  const hasName = !!data.name
  const hasRecipe = !!data.recipe
  const hasRef = !!data.$ref

  if (!hasName && !hasRecipe && !hasRef) {
    ctx.addIssue({
      code: 'custom',
      message: 'Ingredient requires at least one of: name, recipe, or $ref',
    })
  }

  if (hasRecipe && hasRef) {
    ctx.addIssue({
      code: 'custom',
      message: 'Ingredient cannot use both recipe and $ref',
    })
  }
})
