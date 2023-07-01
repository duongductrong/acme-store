"use client"

import dynamic from "next/dynamic"
import {
  HTMLInputTypeAttribute,
  forwardRef
} from "react"
import { InputProps } from "../input"
import { Label } from "../label"
import { FORM_UNIFIED_VARIANT } from "./constants"
import FormControl from "./form-control"
import FormDescription from "./form-description"
import FormField from "./form-field"
import FormItem from "./form-item"
import FormMessage from "./form-message"
import { FormUnifiedVariantTypes } from "./types"

const DynamicTextInput = dynamic(() => import("../input"), { ssr: true })

export interface FormUnifiedProps {
  name: string
  variant: keyof FormUnifiedVariantTypes
  type?: HTMLInputTypeAttribute
  id?: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean

  textInputProps?: Omit<
    InputProps & React.RefAttributes<HTMLInputElement>,
    "type" | "id" | "placeholder" | "disabled" | "name"
  >
}

const FORM_UNIFIED_VARIANT_LOADER = {
  [FORM_UNIFIED_VARIANT.TEXT_INPUT]: DynamicTextInput,
}

const FormUnified = forwardRef<HTMLDivElement, FormUnifiedProps>(
  (
    { name, variant, description, textInputProps, label, ...baseProps },
    ref
  ) => {
    const InputComp = FORM_UNIFIED_VARIANT_LOADER[variant]

    return (
      <FormItem ref={ref}>
        <FormControl>
          <FormField
            name={name}
            render={({ field, formState: { errors } }) => {
              const _error = errors?.[name]

              return (
                <>
                  {label ? <Label className="mb-2">{label}</Label> : null}

                  <InputComp {...field} {...baseProps} {...textInputProps} />

                  {_error?.message ? null : description ? (
                    <FormDescription />
                  ) : null}

                  {_error && _error.message ? <FormMessage /> : null}
                </>
              )
            }}
          />
        </FormControl>
      </FormItem>
    )
  }
)

FormUnified.displayName = "FormUnified"

export default FormUnified
