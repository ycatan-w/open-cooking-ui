import * as z from 'zod'

export const BaseOCSObjectSchema = z.object({}).catchall(z.unknown())
