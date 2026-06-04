import * as z from 'zod'
import { BaseOCSObjectSchema } from './'

export type OCSInformationObject = z.infer<typeof OCSInformationObjectSchema>

export const OCSInformationObjectSchema = BaseOCSObjectSchema.extend({
  title: z.string(),
  description: z.string().optional(),
  author: z.string().optional(),
})
