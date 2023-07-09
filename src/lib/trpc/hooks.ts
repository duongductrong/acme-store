/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { TRPCClientErrorLike } from "@trpc/client"
import { stringify } from "querystring"
import { useEffect } from "react"
import { UseFormReturn, useFormContext } from "react-hook-form"
import { trpcTransformFieldErrors } from "./utils"

export function useTRPCTransformerFieldErrorsWithRHF(
  error: TRPCClientErrorLike<any> | null,
  methods?: UseFormReturn<any> | null
) {
  const _methods = methods ? methods : useFormContext()

  const fieldErrors = trpcTransformFieldErrors(error)

  useEffect(() => {
    if (fieldErrors) {
      Object.keys(fieldErrors).map((errorKey) => {
        const message = fieldErrors?.[errorKey as any]
        _methods.setError(errorKey, {
          message: message as string,
        })
      })
    }
  }, [stringify(fieldErrors)])
}
