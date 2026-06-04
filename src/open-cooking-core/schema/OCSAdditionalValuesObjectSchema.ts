import * as z from 'zod'
import { BaseOCSObjectSchema } from './'

export type OCSAdditionalValuesObject = z.infer<typeof OCSAdditionalValuesObjectSchema>

export const OCSAdditionalValuesObjectSchema = BaseOCSObjectSchema.extend({
  recipeCategories: z.array(z.string()).optional(),
  recipeDifficulties: z.array(z.string()).optional(),
  ingredientCategories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  units: z.array(z.string()).optional(),
  techniqueCategories: z.array(z.string()).optional(),
  equipmentCategories: z.array(z.string()).optional(),
  annotationTypes: z.array(z.string()).optional(),
  mediaTypes: z.array(z.string()).optional(),
})
