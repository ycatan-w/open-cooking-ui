import * as z from 'zod'
import { BaseOCSObjectSchema, ISO8601DurationSchema, OCSAnnotationObjectSchema } from './'

export type OCSRecipeDetailsObject = z.infer<typeof OCSRecipeDetailsObjectSchema>

export const OCSRecipeDetailsObjectSchema = BaseOCSObjectSchema.extend({
  yield: z.string().optional(),
  prep_time: ISO8601DurationSchema.optional(),
  cook_time: ISO8601DurationSchema.optional(),
  total_time: ISO8601DurationSchema.optional(),
  annotations: z.array(OCSAnnotationObjectSchema).optional(),
})
