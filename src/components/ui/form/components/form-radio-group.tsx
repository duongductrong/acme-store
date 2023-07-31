"use client"

import Chip, { ChipProps } from "@/components/ui/chip"
import useFormField from "@/components/ui/form/hooks/use-form-field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RadioGroupProps } from "@radix-ui/react-radio-group"
import { forwardRef } from "react"

export interface FormRadioGroupItem {
  label: string
  value: any
  disabled?: boolean
}

export interface FormRadioGroupDefaultVariant {
  variant: "default"
}

export interface FormRadioGroupChipVariant {
  variant: "chip"
  size?: ChipProps["size"]
}

export type FormRadioGroupCustomStyle =
  | FormRadioGroupDefaultVariant
  | FormRadioGroupChipVariant

export interface FormRadioGroupProps extends Omit<RadioGroupProps, "onChange"> {
  customStyle?: FormRadioGroupCustomStyle
  items: FormRadioGroupItem[]
  onChange?: (value: string) => void
}

const FormRadioGroup = forwardRef<HTMLDivElement, FormRadioGroupProps>(
  (
    {
      items,
      onChange,
      className,
      customStyle = { variant: "default" },
      ...props
    }: FormRadioGroupProps,
    ref
  ) => {
    const { formItemId } = useFormField()

    const isChipVariantStyle = customStyle.variant === "chip"

    return (
      <RadioGroup {...props} ref={ref} onValueChange={onChange}>
        {items.map((item) => {
          const slugifyLabel = item.label
          const inputId = `${formItemId}-${slugifyLabel}`

          return (
            <div key={item.value} className="flex items-center gap-2">
              <RadioGroupItem
                id={inputId}
                key={item.value}
                value={item.value}
                className={isChipVariantStyle ? "hidden" : undefined}
                disabled={item?.disabled}
              />
              <Label htmlFor={inputId}>
                {isChipVariantStyle ? (
                  <Chip
                    variant="outline"
                    size={customStyle.size}
                    active={item.value === props.value}
                    disabled={item?.disabled}
                  >
                    {item.label}
                  </Chip>
                ) : (
                  item.label
                )}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    )
  }
)

FormRadioGroup.displayName = "FormRadioGroup"

export default FormRadioGroup
