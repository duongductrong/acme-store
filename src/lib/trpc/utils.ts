import { TRPCClientErrorLike } from "@trpc/client"
import { InputQueryFilterSchemaType } from "./schemas"

export const trpcTransformFieldErrors = (
  error: TRPCClientErrorLike<any> | null
) => {
  const fieldErrors = error?.data?.zodError?.fieldErrors
  const errors = Object.keys(fieldErrors ?? {}).reduce(
    (commonFieldErrors, fieldError) => {
      commonFieldErrors[fieldError] =
        fieldErrors?.[fieldError]?.[0] ?? "Unknown error"

      return commonFieldErrors
    },
    {} as { [k: string]: string }
  )

  return errors
}

export const trpcHandleQueryFilterPagination = (
  input?: InputQueryFilterSchemaType
) => {
  switch (input?.paginationType) {
    case "cursor-based":
      return {
        limit: Number(input.limit || 10) + 2,
        cursor: undefined,
      }
    case "offset":
      return {
        skip: (Number(input.page) - 1) * Number(input.pageSize),
        limit: Number(input.pageSize),
      }
    default:
      return null
  }
}

export interface TrpcOutputWithOffsetPagination {
  type: "offset"
  page?: number
  pageSize?: number
  totalRecords?: number
}

export interface TrpcOutputWithCursorBasedPagination {
  type: "cursor-based"
  nextCursor: unknown
  previousCursor: unknown
}

export const trpcOutputQueryWithPagination = <T extends unknown>(
  output: T,
  pagination:
    | TrpcOutputWithOffsetPagination
    | TrpcOutputWithCursorBasedPagination
) => {
  switch (pagination.type) {
    case "offset":
      return {
        items: output,
        pagination: {
          page: pagination.page,
          pageSize: pagination.pageSize,
          totalRecords: pagination.totalRecords,
        },
      }
    case "cursor-based":
      return {
        items: output,
        pagination: {
          nextCursor: null,
          previousCursor: null,
        },
      }
  }
}
