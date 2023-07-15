import { z } from "zod"

export const infiniteLoaderSchema = z.object({
  search: z.string().nullish(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.any().nullish(),
})

export const outputInfiniteLoaderSchema = z.object({
  items: z.array(z.any().nullish().optional()),
  nextCursor: z.string().or(z.number()).nullish(),
})
