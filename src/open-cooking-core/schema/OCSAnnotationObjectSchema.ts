import * as z from 'zod'
import { BaseOCSObjectSchema } from './'

export type OCSAnnotationObject = z.infer<typeof OCSAnnotationObjectSchema>

export const OCSAnnotationObjectSchema = BaseOCSObjectSchema.extend({
  type: z.string().optional(),
  text: z.string(),
})
