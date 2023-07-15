"use client"

import { cn } from "@/lib/utils"
import { RadioGroupProps } from "@radix-ui/react-radio-group"
import { forwardRef } from "react"
import { Label } from "../../label"
import { RadioGroup, RadioGroupItem } from "../../radio-group"
import useFormField from "../hooks/use-form-field"

export interface FormRadioGroupItem {
  label: string
  value: any
}

export interface FormRadioGroupProps extends Omit<RadioGroupProps, "onChange"> {
  items: FormRadioGroupItem[]
  onChange?: (value: string) => void
}

const FormRadioGroup = forwardRef<HTMLDivElement, FormRadioGroupProps>(
  ({ items, onChange, className, ...props }: FormRadioGroupProps, ref) => {
    const { formItemId } = useFormField()

    return (
      <RadioGroup
        {...props}
        ref={ref}
        onValueChange={onChange}
        className={cn("space-y-2")}
      >
        {items.map((item) => {
          const slugifyLabel = item.label
          const inputId = `${formItemId}-${slugifyLabel}`
          return (
            <div key={item.value} className="flex items-center space-x-2">
              <RadioGroupItem
                id={inputId}
                key={item.value}
                value={item.value}
              />
              <Label htmlFor={inputId}>{item.label}</Label>
            </div>
          )
        })}
      </RadioGroup>
    )
  }
)

FormRadioGroup.displayName = "FormRadioGroup"

export default FormRadioGroup
