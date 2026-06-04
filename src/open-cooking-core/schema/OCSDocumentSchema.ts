import * as z from 'zod'
import {
  BaseOCSObjectSchema,
  OCSInformationObjectSchema,
  OCSAdditionalValuesObjectSchema,
  OCSIngredientObjectSchema,
  OCSTechniqueObjectSchema,
  OCSEquipmentObjectSchema,
  OCSRecipeObjectSchema,
} from './'

export type OCSDocument = z.infer<typeof OCSDocumentSchema>

export const OCSDocumentSchema = BaseOCSObjectSchema.extend({
  openCooking: z.string(),
  info: OCSInformationObjectSchema,
  additionalValues: OCSAdditionalValuesObjectSchema.optional(),
  ingredients: z.record(z.string(), OCSIngredientObjectSchema).optional(),
  techniques: z.record(z.string(), OCSTechniqueObjectSchema).optional(),
  equipment: z.record(z.string(), OCSEquipmentObjectSchema).optional(),
  recipes: z.record(z.string(), OCSRecipeObjectSchema),
})
  .superRefine((data, ctx) => {
    if (Object.keys(data.recipes).length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['recipes'],
        message: 'Document must contain at least one recipe',
      })
    }
  })
  .catchall(z.unknown())
