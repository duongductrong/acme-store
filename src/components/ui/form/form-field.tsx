"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { CheckboxProps } from "@radix-ui/react-checkbox"
import get from "lodash/get"
import { Asterisk } from "lucide-react"
import dynamic from "next/dynamic"
import { HTMLInputTypeAttribute, forwardRef } from "react"
import { InputProps } from "../input"
import { TextareaProps } from "../textarea"
import { FormNumberProps } from "./components/form-number"
import { FormRadioGroupProps } from "./components/form-radio-group"
import { FormRichTextProps } from "./components/form-rich-text"
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
  loading: () => <Skeleton className="h-[40px] w-full" />,
})

const FormTextarea = dynamic(() => import("./components/form-textarea"), {
  ssr: true,
  loading: () => <Skeleton className="h-[150px] w-full" />,
})

const FormCheckbox = dynamic(() => import("./components/form-checkbox"), {
  ssr: true,
  loading: () => <Skeleton className="h-[40px] w-full" />,
})

const RadioGroup = dynamic(() => import("./components/form-radio-group"), {
  ssr: true,
})

const FormSelect = dynamic(() => import("./components/form-select"), {
  ssr: true,
  loading: () => <Skeleton className="h-[40px] w-full" />,
})

const FormSelectInfinite = dynamic(() => import("./components/form-select-infinite"), {
  ssr: true,
  loading: () => <Skeleton className="h-[40px] w-full" />,
})

const FormUID = dynamic(() => import("./components/form-uid"), {
  ssr: true,
  loading: () => <Skeleton className="h-[40px] w-full" />,
})

const FormNumber = dynamic(() => import("./components/form-number"), {
  ssr: true,
  loading: () => <Skeleton className="h-[40px] w-full" />,
})

const FormRichText = dynamic(() => import("./components/form-rich-text"), {
  ssr: true,
  loading: () => <Skeleton className="h-[200px] w-full" />,
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

export interface FormFieldSelectInfiniteVariantProps extends FormSelectInfiniteProps {
  variant: "SELECT_INFINITE"
}

export interface FormFieldNumberVariantProps
  extends Omit<FormFieldTextVariantProps, "variant">,
    FormNumberProps {
  variant: "NUMBER"
}

export interface FormFieldRichTextVariantProps extends FormRichTextProps {
  variant: "RICH_TEXT"
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
  | FormFieldRichTextVariantProps

export interface FormFieldStandardBaseProps {
  type?: HTMLInputTypeAttribute
  name: string
  id?: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  required?: boolean

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
  [FORM_UNIFIED_VARIANT.RICH_TEXT]: FormRichText,
}

const FormField = forwardRef<
  HTMLDivElement,
  FormFieldStandardBaseProps & FormFieldVariantBaseProps
>(({ name, variant, description, label, wrapperClassName, className, ...baseProps }, ref) => {
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
              shouldHorizontalShowing ? "space-y-0 flex items-center gap-2" : ""
            )}
            ref={ref}
          >
            {label ? (
              <FormLabel
                className={cn("flex items-center", shouldHorizontalShowing ? "order-2" : "")}
              >
                {label}
                {baseProps?.required ? <Asterisk className="w-3 h-3 ml-1" /> : ""}
              </FormLabel>
            ) : null}
            <FormControl>
              <InputComp
                {...field}
                {...baseProps}
                hasError={!!_error?.message}
                className={cn(
                  className,
                  _error?.message ? "!border-destructive" : null,
                  shouldHorizontalShowing ? "order-1" : ""
                )}
              />
            </FormControl>

            {_error?.message ? null : description ? <FormDescription /> : null}

            {_error && _error.message ? <FormMessage /> : null}
          </FormItem>
        )
      }}
    />
  )
})

FormField.displayName = "FormField"

export default FormField
