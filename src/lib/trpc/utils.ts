import { TRPCClientErrorLike } from "@trpc/client"

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
