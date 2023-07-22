"use client"

import { CheckboxProps } from "@radix-ui/react-checkbox"
import { forwardRef } from "react"
import { Checkbox } from "../../checkbox"

export interface FormCheckboxProps extends CheckboxProps {}

const FormCheckbox = forwardRef<HTMLButtonElement, FormCheckboxProps>(
  ({ onChange, checked, value, ...props }, ref) => {
    return (
      <Checkbox
        {...props}
        ref={ref}
        value={value}
        checked={checked}
        onChange={onChange}
        onCheckedChange={(value) => onChange && onChange(value as any)}
      />
    )
  }
)

FormCheckbox.displayName = "FormCheckbox"

export default FormCheckbox
