import * as z from 'zod'
import { BaseOCSObjectSchema, OCSAnnotationObjectSchema, OCSMediaObjectSchema } from './'

export type OCSEquipmentObject = z.infer<typeof OCSEquipmentObjectSchema>

export const OCSEquipmentObjectSchema = BaseOCSObjectSchema.extend({
  name: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  uses: z.array(z.string()).optional(),
  annotations: z.array(OCSAnnotationObjectSchema).optional(),
  media: z.array(OCSMediaObjectSchema).optional(),
  $ref: z.string().optional(),
}).superRefine((data, ctx) => {
  const hasName = !!data.name
  const hasRef = !!data.$ref

  if (!hasName && !hasRef) {
    ctx.addIssue({
      code: 'custom',
      message: 'Equipment requires at least one of: name or $ref',
    })
  }
})
