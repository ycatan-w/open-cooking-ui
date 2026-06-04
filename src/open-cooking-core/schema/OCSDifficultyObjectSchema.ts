import * as z from 'zod'
import { BaseOCSObjectSchema } from './'

export type OCSDifficultyObject = z.infer<typeof OCSDifficultyObjectSchema>

export const OCSDifficultyObjectSchema = BaseOCSObjectSchema.extend({
  value: z.string(),
  rationale: z.string().optional(),
})
