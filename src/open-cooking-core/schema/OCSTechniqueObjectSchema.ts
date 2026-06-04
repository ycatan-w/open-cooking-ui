import * as z from 'zod'
import { BaseOCSObjectSchema, OCSAnnotationObjectSchema, OCSMediaObjectSchema } from './'

export type OCSTechniqueObject = z.infer<typeof OCSTechniqueObjectSchema>

export const OCSTechniqueObjectSchema = BaseOCSObjectSchema.extend({
  name: z.string().optional(),
  category: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  related: z.array(z.string()).optional(),
  annotations: z.array(OCSAnnotationObjectSchema).optional(),
  media: z.array(OCSMediaObjectSchema).optional(),
  $ref: z.string().optional(),
}).superRefine((data, ctx) => {
  const hasName = !!data.name
  const hasRef = !!data.$ref

  if (!hasName && !hasRef) {
    ctx.addIssue({
      code: 'custom',
      message: 'Technique requires at least one of: name or $ref',
    })
  }
})
