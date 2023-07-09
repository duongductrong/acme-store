"use client"

import { CheckboxProps } from "@radix-ui/react-checkbox"
import clsx from "clsx"
import get from "lodash/get"
import dynamic from "next/dynamic"
import { HTMLInputTypeAttribute, forwardRef } from "react"
import { InputProps } from "../input"
import { TextareaProps } from "../textarea"
import { FormRadioGroupProps } from "./components/form-radio-group"
import { FormSelectProps } from "./components/form-select"
import { FormUIDProps } from "./components/form-uid"
import { FORM_UNIFIED_VARIANT } from "./constants"
import FormControl from "./form-control"
import FormDescription from "./form-description"
import FormFieldInternal from "./form-field-internal"
import FormItem from "./form-item"
import FormLabel from "./form-label"
import FormMessage from "./form-message"
import { FormFieldVariantTypes } from "./types"

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

const FormUID = dynamic(() => import("./components/form-uid"), { ssr: true })

const FormNumber = dynamic(() => import("./components/form-number"), { ssr: true })

type ExtendTextInputProps = Omit<
  InputProps & React.RefAttributes<HTMLInputElement>,
  "type" | "id" | "placeholder" | "disabled" | "name"
>

type ExtendTextareaProps = Omit<
  TextareaProps & React.RefAttributes<HTMLTextAreaElement>,
  keyof InputProps | "placeholder" | "disabled" | "name" | "type" | "id"
>

type ExtendCheckboxProps = CheckboxProps

type ExtendRadioGroupProps = FormRadioGroupProps

type ExtendSelectProps = FormSelectProps

type ExtendUIDProps = FormUIDProps

export interface FormFieldProps {
  variant: keyof FormFieldVariantTypes
  type?: HTMLInputTypeAttribute
  name: string
  id?: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean

  wrapperClassName?: string
  className?: string

  fieldProps?:
    | ExtendTextInputProps
    | ExtendTextareaProps
    | ExtendCheckboxProps
    | ExtendRadioGroupProps
    | ExtendSelectProps
    | ExtendUIDProps

  textInputProps?: ExtendTextInputProps
  textareaProps?: ExtendTextareaProps
  checkboxProps?: ExtendCheckboxProps
  radioGroupProps?: ExtendRadioGroupProps
  selectProps?: ExtendSelectProps
  uidProps?: ExtendUIDProps
}

const FORM_UNIFIED_VARIANT_LOADER = {
  [FORM_UNIFIED_VARIANT.TEXT]: FormInput,
  [FORM_UNIFIED_VARIANT.TEXTAREA]: FormTextarea,
  [FORM_UNIFIED_VARIANT.CHECKBOX]: FormCheckbox,
  [FORM_UNIFIED_VARIANT.RADIO_GROUP]: RadioGroup,
  [FORM_UNIFIED_VARIANT.SELECT]: FormSelect,
  [FORM_UNIFIED_VARIANT.UID]: FormUID,
  [FORM_UNIFIED_VARIANT.NUMBER]: FormNumber
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      name,
      variant,
      description,
      label,
      wrapperClassName,
      className,
      textInputProps,
      textareaProps,
      checkboxProps,
      radioGroupProps,
      selectProps,
      uidProps,
      fieldProps,
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

          return (
            <FormItem className={wrapperClassName} ref={ref}>
              {label ? <FormLabel className="mb-1">{label}</FormLabel> : null}
              <FormControl>
                <InputComp
                  {...field}
                  {...baseProps}
                  {...textInputProps}
                  {...textareaProps}
                  {...checkboxProps}
                  {...radioGroupProps}
                  {...selectProps}
                  {...uidProps}
                  {...fieldProps}
                  className={clsx(className, textInputProps?.className)}
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
