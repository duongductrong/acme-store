"use client"

import { forwardRef } from "react"
import { Input, InputProps } from "../../input"

export interface FormInputProps extends InputProps {}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => (
  <Input {...props} ref={ref} />
))

FormInput.displayName = "FormInput"

export default FormInput
