import * as z from 'zod'
import { BaseOCSObjectSchema, OCSAnnotationObjectSchema } from './'

export type OCSRecipeDetailsObject = z.infer<typeof OCSRecipeDetailsObjectSchema>

const ISO8601DurationSchema = z
  .string()
  .regex(/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/i, 'Invalid ISO 8601 duration')

export const OCSRecipeDetailsObjectSchema = BaseOCSObjectSchema.extend({
  yield: z.string().optional(),
  prep_time: ISO8601DurationSchema.optional(),
  cook_time: ISO8601DurationSchema.optional(),
  total_time: ISO8601DurationSchema.optional(),
  annotations: z.array(OCSAnnotationObjectSchema).optional(),
})
