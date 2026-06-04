import * as z from 'zod'
import { BaseOCSObjectSchema, OCSAnnotationObjectSchema } from './'

export type OCSSourceObject = z.infer<typeof OCSSourceObjectSchema>

export const OCSSourceObjectSchema = BaseOCSObjectSchema.extend({
  name: z.string(),
  summary: z.string().optional(),
  url: z.string().url().optional(),
  annotations: z.array(OCSAnnotationObjectSchema).optional(),
})
