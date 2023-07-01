"use client"

import { CheckboxProps } from "@radix-ui/react-checkbox"
import { forwardRef } from "react"
import { Checkbox } from "../../checkbox"

export interface FormCheckboxProps extends CheckboxProps {}

const FormCheckbox = forwardRef<HTMLButtonElement, FormCheckboxProps>(
  (props, ref) => <Checkbox {...props} ref={ref} />
)

FormCheckbox.displayName = "FormCheckbox"

export default FormCheckbox
