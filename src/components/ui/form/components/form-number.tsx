"use client"

import { forwardRef } from "react"
import { Input, InputProps } from "../../input"

import { cn } from "@/lib/utils"
import isNil from "lodash/isNil"
import { ChevronDown, ChevronUp } from "lucide-react"
import "./form-number.scss"

export interface FormNumberProps extends InputProps {
  toFixed?: number
}

const FormNumber = forwardRef<HTMLInputElement, FormNumberProps>(
  ({ toFixed = 0, hasError, ...props }, ref) => {
    const { onChange, step = 1, value = 0, min, max } = props
    const handleUp = () => {
      if (onChange) {
        const newValue = !isNil(max)
          ? // less than equal max or equal max
            Number(value) + Number(step) <= Number(max)
            ? Number(value) + Number(step)
            : Number(max)
          : // continue minus value
            Number(value) + Number(step)
        const fixedValue = Number(newValue.toFixed(toFixed || 0))
        onChange(fixedValue as any)
      }
    }

    const handleDown = () => {
      if (onChange) {
        const newValue = !isNil(min)
          ? // greater than equal min or equal min
            Number(value) - Number(step) >= Number(min)
            ? Number(value) - Number(step)
            : Number(min)
          : // continue minus value
            Number(value) - Number(step)
        const fixedValue = Number(newValue.toFixed(toFixed || 0))
        onChange(fixedValue as any)
      }
    }

    return (
      <div className="relative group">
        <Input
          {...props}
          ref={ref}
          type="number"
          className={cn(props.className, "form-number")}
          hasError={hasError}
        />
        <div
          className={cn(
            "w-8",
            "flex flex-col items-center justify-center",
            "absolute top-1/2 transform -translate-y-1/2 right-[1px] h-[calc(100%-2px)]"
          )}
        >
          <button
            type="button"
            className={cn(
              "w-full flex items-center justify-center flex-1",
              "border border-t-0 border-b-0 border-r-0 border-solid border-input",
              "rounded-tr-[7px] cursor-pointer",
              "hover:bg-accent",
              hasError
                ? "border-destructive group-focus-within:border-destructive"
                : "group-focus-within:border-primary"
            )}
            onClick={handleUp}
          >
            <ChevronUp className="w-3 h-3 hover:text-primary" />
          </button>
          <button
            type="button"
            className={cn(
              "w-full flex items-center justify-center flex-1",
              "border border-solid border-b-0 border-r-0 border-input",
              "rounded-br-[7px] cursor-pointer",
              "hover:bg-accent",
              hasError
                ? "border-destructive group-focus-within:border-destructive"
                : "group-focus-within:border-primary"
            )}
            onClick={handleDown}
          >
            <ChevronDown className="w-3 h-3 hover:text-primary" />
          </button>
        </div>
      </div>
    )
  }
)

FormNumber.displayName = "FormNumber"

export default FormNumber
