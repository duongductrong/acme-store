"use client"

import { forwardRef } from "react"
import { Textarea, TextareaProps } from "../../textarea"

export interface FormTextareaProps extends TextareaProps {}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (props, ref) => <Textarea {...props} ref={ref} />
)

FormTextarea.displayName = "FormTextarea"

export default FormTextarea
