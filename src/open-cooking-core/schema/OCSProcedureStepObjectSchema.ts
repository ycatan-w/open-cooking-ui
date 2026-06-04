import * as z from 'zod'
import { BaseOCSObjectSchema, OCSAnnotationObjectSchema, OCSMediaObjectSchema } from './'

export type OCSProcedureStepObject = z.infer<typeof OCSProcedureStepObjectSchema>

export const OCSProcedureStepObjectSchema = BaseOCSObjectSchema.extend({
  step_number: z.number().int().optional(),
  instruction: z.string(),
  annotations: z.array(OCSAnnotationObjectSchema).optional(),
  media: z.array(OCSMediaObjectSchema).optional(),
})
