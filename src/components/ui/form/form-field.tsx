"use client"

import { cn } from "@/lib/utils"
import { CheckboxProps } from "@radix-ui/react-checkbox"
import get from "lodash/get"
import dynamic from "next/dynamic"
import { HTMLInputTypeAttribute, forwardRef } from "react"
import { InputProps } from "../input"
import { TextareaProps } from "../textarea"
import { FormRadioGroupProps } from "./components/form-radio-group"
import { FormSelectProps } from "./components/form-select"
import { FormSelectInfiniteProps } from "./components/form-select-infinite"
import { FormUIDProps } from "./components/form-uid"
import { FORM_UNIFIED_VARIANT } from "./constants"
import FormControl from "./form-control"
import FormDescription from "./form-description"
import FormFieldInternal from "./form-field-internal"
import FormItem from "./form-item"
import FormLabel from "./form-label"
import FormMessage from "./form-message"

const FormInput = dynamic(() => import("./components/form-input"), {
  ssr: true,
})

const FormTextarea = dynamic(() => import("./components/form-textarea"), {
  ssr: true,
})

const FormCheckbox = dynamic(() => import("./components/form-checkbox"), {
  ssr: true,
})

const RadioGroup = dynamic(() => import("./components/form-radio-group"), {
  ssr: true,
})

const FormSelect = dynamic(() => import("./components/form-select"), {
  ssr: true,
})

const FormSelectInfinite = dynamic(
  () => import("./components/form-select-infinite"),
  {
    ssr: true,
  }
)

const FormUID = dynamic(() => import("./components/form-uid"), { ssr: true })

const FormNumber = dynamic(() => import("./components/form-number"), {
  ssr: true,
})

export interface FormFieldTextVariantProps
  extends InputProps,
    React.RefAttributes<HTMLInputElement> {
  variant: "TEXT"
}

export interface FormFieldTextareaVariantProps
  extends TextareaProps,
    React.RefAttributes<HTMLTextAreaElement> {
  variant: "TEXTAREA"
}

export interface FormFieldCheckboxVariantProps extends CheckboxProps {
  variant: "CHECKBOX"
}

export interface FormFieldRadioGroupVariantProps extends FormRadioGroupProps {
  variant: "RADIO_GROUP"
}

export interface FormFieldSelectVariantProps extends FormSelectProps {
  variant: "SELECT"
}

export interface FormFieldUIDVariantProps extends FormUIDProps {
  variant: "UID"
}

export interface FormFieldSelectInfiniteVariantProps
  extends FormSelectInfiniteProps {
  variant: "SELECT_INFINITE"
}

export interface FormFieldNumberVariantProps
  extends Omit<FormFieldTextVariantProps, "variant"> {
  variant: "NUMBER"
}

export type FormFieldVariantBaseProps =
  | FormFieldTextVariantProps
  | FormFieldTextareaVariantProps
  | FormFieldCheckboxVariantProps
  | FormFieldRadioGroupVariantProps
  | FormFieldSelectVariantProps
  | FormFieldUIDVariantProps
  | FormFieldSelectInfiniteVariantProps
  | FormFieldNumberVariantProps

export interface FormFieldStandardBaseProps {
  type?: HTMLInputTypeAttribute
  name: string
  id?: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean

  wrapperClassName?: string
  className?: string
}

const FORM_UNIFIED_VARIANT_LOADER = {
  [FORM_UNIFIED_VARIANT.TEXT]: FormInput,
  [FORM_UNIFIED_VARIANT.TEXTAREA]: FormTextarea,
  [FORM_UNIFIED_VARIANT.CHECKBOX]: FormCheckbox,
  [FORM_UNIFIED_VARIANT.RADIO_GROUP]: RadioGroup,
  [FORM_UNIFIED_VARIANT.SELECT]: FormSelect,
  [FORM_UNIFIED_VARIANT.UID]: FormUID,
  [FORM_UNIFIED_VARIANT.NUMBER]: FormNumber,
  [FORM_UNIFIED_VARIANT.SELECT_INFINITE]: FormSelectInfinite,
}

const FormField = forwardRef<
  HTMLDivElement,
  FormFieldStandardBaseProps & FormFieldVariantBaseProps
>(
  (
    {
      name,
      variant,
      description,
      label,
      wrapperClassName,
      className,
      ...baseProps
    },
    ref
  ) => {
    const InputComp = FORM_UNIFIED_VARIANT_LOADER[variant] as any

    return (
      <FormFieldInternal
        name={name}
        render={({ field, formState: { errors } }) => {
          const _error = get(errors, name)
          const shouldHorizontalShowing = variant === "CHECKBOX"

          return (
            <FormItem
              className={cn(
                wrapperClassName,
                shouldHorizontalShowing
                  ? "space-y-0 flex items-center gap-2"
                  : ""
              )}
              ref={ref}
            >
              {label ? (
                <FormLabel
                  className={cn(
                    "block",
                    shouldHorizontalShowing ? "order-2" : ""
                  )}
                >
                  {label}
                </FormLabel>
              ) : null}
              <FormControl>
                <InputComp
                  {...field}
                  {...baseProps}
                  className={cn(
                    className,
                    shouldHorizontalShowing ? "order-1" : ""
                  )}
                />
              </FormControl>

              {_error?.message ? null : description ? (
                <FormDescription />
              ) : null}

              {_error && _error.message ? <FormMessage /> : null}
            </FormItem>
          )
        }}
      />
    )
  }
)

FormField.displayName = "FormField"

export default FormField
