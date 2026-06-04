import * as z from 'zod'
import {
  BaseOCSObjectSchema,
  OCSIngredientObjectSchema,
  OCSReferenceObjectSchema,
  OCSEquipmentObjectSchema,
  OCSAnnotationObjectSchema,
  OCSMediaObjectSchema,
  OCSRecipeDetailsObjectSchema,
  OCSDifficultyObjectSchema,
  OCSProcedureStepObjectSchema,
  OCSSourceObjectSchema,
} from './'

export type OCSRecipeObject = z.infer<typeof OCSRecipeObjectSchema>

export const OCSRecipeObjectSchema = BaseOCSObjectSchema.extend({
  name: z.string(),
  version: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => v?.toString()),
  category: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  summary: z.string().optional(),
  details: OCSRecipeDetailsObjectSchema.optional(),
  difficulty: OCSDifficultyObjectSchema.optional(),
  ingredients: z.array(z.union([OCSIngredientObjectSchema, OCSReferenceObjectSchema])),
  equipment: z.array(z.union([OCSEquipmentObjectSchema, OCSReferenceObjectSchema])).optional(),
  steps: z.array(OCSProcedureStepObjectSchema),
  source: OCSSourceObjectSchema.optional(),
  annotations: z.array(OCSAnnotationObjectSchema).optional(),
  media: z.array(OCSMediaObjectSchema).optional(),
}).superRefine((data, ctx) => {
  if (data.ingredients.length === 0) {
    ctx.addIssue({
      code: 'custom',
      path: ['ingredients'],
      message: 'Recipe must contain at least one ingredient',
    })
  }

  if (data.steps.length === 0) {
    ctx.addIssue({
      code: 'custom',
      path: ['steps'],
      message: 'Recipe must contain at least one step',
    })
  }
})
