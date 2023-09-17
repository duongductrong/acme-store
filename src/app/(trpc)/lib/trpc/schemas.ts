import { z } from "zod"

export const inputCursorBasedPaginationSchema = z.object({
  paginationType: z.literal("cursor-based"),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.any().nullish(),
})

export const inputOffsetPaginationSchema = z.object({
  paginationType: z.literal("offset"),
  page: z.number().default(1).nullish(),
  pageSize: z.number().default(1).nullish(),

  // Don't use it for offset pagination
  // but we need it for useInfiniteQuery working
  cursor: z.any().nullish(),
})

export const unionPaginationSchema = z.discriminatedUnion("paginationType", [
  inputCursorBasedPaginationSchema,
  inputOffsetPaginationSchema,
])

export const inputQueryFilterSchema = z.intersection(
  unionPaginationSchema,
  z.object({
    search: z.string().nullish(),
    sorting: z.array(z.object({ id: z.string(), desc: z.boolean() })).nullish(),
  })
)

export type InputQueryFilterSchemaType = z.infer<typeof inputQueryFilterSchema>

export const outputQueryFilterResultsSchema = z.object({
  items: z.array(z.any().nullish().optional()),
  nextCursor: z.string().or(z.number()).nullish(),
  prevCursor: z.string().or(z.number()).nullish(),

  nextPage: z.number().nullish(),
  prevPage: z.number().nullish(),
  totalRecords: z.number().nullish(),
})

export type OutputQueryFilterResultsSchemaType = z.infer<typeof outputQueryFilterResultsSchema>
