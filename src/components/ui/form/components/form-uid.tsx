"use client"

import { cn } from "@/lib/utils"
import { Loader, RotateCw } from "lucide-react"
import { forwardRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import slugify from "slugify"
import FormInput, { FormInputProps } from "./form-input"
import get from "lodash/get"

export interface FormUIDProps extends FormInputProps {
  fromName: string
}

const FormUID = forwardRef<HTMLInputElement, FormUIDProps>(
  ({ fromName, ...props }: FormUIDProps, ref) => {
    const methods = useFormContext()

    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerateUID = () => {
      setIsGenerating(true)

      const relatedInputValue =
        get(methods.getValues(), fromName) || props?.value || ""
      const value = slugify(relatedInputValue, {
        lower: true,
        strict: true,
        trim: true,
      }) as any

      if (props.onChange) props.onChange(value)

      setTimeout(() => {
        setIsGenerating(false)
      }, 300)
    }

    return (
      <div className="relative">
        <FormInput {...props} ref={ref} className={cn("pr-8", props.className)} />

        <div
          className={cn(
            "group",
            "absolute top-1/2 right-3 transform -translate-y-1/2",
            "flex gap-2"
          )}
        >
          <p className="text-xs text-zinc-500 invisible group-hover:visible">
            {isGenerating
              ? "Loading.."
              : props?.value
              ? "Regenerate"
              : "Generate"}
          </p>
          {isGenerating ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <RotateCw
              className={cn("w-4 h-4 cursor-pointer", "text-zinc-500")}
              onClick={handleGenerateUID}
            />
          )}
        </div>
      </div>
    )
  }
)

FormUID.displayName = "FormUID"

export default FormUID
