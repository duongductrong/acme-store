"use client"

import clsx from "clsx"
import { forwardRef } from "react"
import { Input, InputProps } from "../../input"

import { ChevronDown, ChevronUp } from "lucide-react"
import "./form-number.scss"
import isNil from "lodash/isNil"

export interface FormNumberProps extends InputProps {
  toFixed: number
}

const FormNumber = forwardRef<HTMLInputElement, FormNumberProps>(
  ({ toFixed, ...props }, ref) => {
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
        const fixedValueIf =
          newValue % 1 === 0 ? newValue : newValue.toFixed(toFixed || 1)
        onChange(fixedValueIf as any)
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
        const fixedValueIf =
          newValue % 1 === 0 ? newValue : newValue.toFixed(toFixed || 1)
        onChange(fixedValueIf as any)
      }
    }

    return (
      <div className="relative overflow-hidden">
        <Input
          {...props}
          ref={ref}
          type="number"
          className={clsx(props.className, "form-number")}
        />
        <div
          className={clsx(
            "w-8",
            "flex flex-col items-center justify-center",
            "absolute top-1/2 transform -translate-y-1/2 right-0 h-full"
          )}
        >
          <span
            role="button"
            className={clsx(
              "w-full flex items-center justify-center flex-1",
              "border border-b-0 border-solid border-neutral-200 dark:border-neutral-800",
              "rounded-tr-[7px] cursor-pointer"
            )}
            onClick={handleUp}
          >
            <ChevronUp className="w-3 h-3" />
          </span>
          <span
            role="button"
            className={clsx(
              "w-full flex items-center justify-center flex-1",
              "border border-solid border-neutral-200 dark:border-neutral-800",
              "rounded-br-[7px] cursor-pointer"
            )}
            onClick={handleDown}
          >
            <ChevronDown className="w-3 h-3" />
          </span>
        </div>
      </div>
    )
  }
)

FormNumber.displayName = "FormNumber"

export default FormNumber
