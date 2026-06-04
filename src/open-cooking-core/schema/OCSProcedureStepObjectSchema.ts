import * as z from 'zod'
import {
  BaseOCSObjectSchema,
  OCSAnnotationObjectSchema,
  OCSMediaObjectSchema,
  OCSReferenceObjectSchema,
  OCSTechniqueObjectSchema,
} from './'

export type OCSProcedureStepObject = z.infer<typeof OCSProcedureStepObjectSchema>

export const ISO8601DurationSchema = z
  .string()
  .regex(/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/i, 'Invalid ISO 8601 duration')

export const OCSProcedureStepObjectSchema = BaseOCSObjectSchema.extend({
  step_number: z.number().int().optional(),
  name: z.string().optional(),
  instruction: z.string(),
  duration: ISO8601DurationSchema.optional(),
  techniques: z.array(z.union([OCSTechniqueObjectSchema, OCSReferenceObjectSchema])).optional(),
  annotations: z.array(OCSAnnotationObjectSchema).optional(),
  media: z.array(OCSMediaObjectSchema).optional(),
  $ref: z.string().optional(),
})
