import * as z from 'zod'
import { BaseOCSObjectSchema } from './'

export type OCSMediaObject = z.infer<typeof OCSMediaObjectSchema>

export const OCSMediaObjectSchema = BaseOCSObjectSchema.extend({
  type: z.string(),
  url: z.url(),
  caption: z.string().optional(),
  attribution: z.string().optional(),
})
