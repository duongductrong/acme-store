"use client"

import { RadioGroupProps } from "@radix-ui/react-radio-group"
import { forwardRef } from "react"
import { Label } from "../../label"
import { RadioGroup, RadioGroupItem } from "../../radio-group"
import FormLabel from "../form-label"

export interface FormRadioGroupItem {
  label: string
  value: any
}

export interface FormRadioGroupProps extends Omit<RadioGroupProps, "onChange"> {
  label?: string
  items: FormRadioGroupItem[]
  onChange?: (value: string) => void
}

const FormRadioGroup = forwardRef<HTMLDivElement, FormRadioGroupProps>(
  ({ items, label, onChange, ...props }: FormRadioGroupProps, ref) => {
    return (
      <RadioGroup
        {...props}
        onValueChange={onChange}
        ref={ref}
        className="space-y-2"
      >
        {label ? <FormLabel>{label}</FormLabel> : null}
        {items.map((item) => (
          <div key={item.value} className="flex items-center space-x-2">
            <RadioGroupItem
              id={item.value}
              key={item.value}
              value={item.value}
            />
            <Label htmlFor={item.value}>{item.label}</Label>
          </div>
        ))}
      </RadioGroup>
    )
  }
)

FormRadioGroup.displayName = "FormRadioGroup"

export default FormRadioGroup
