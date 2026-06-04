import * as z from 'zod'
import { BaseOCSObjectSchema } from './'

export type OCSReferenceObject = z.infer<typeof OCSReferenceObjectSchema>

export const OCSReferenceObjectSchema = BaseOCSObjectSchema.extend({
  $ref: z.string(),
})
