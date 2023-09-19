"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"
import {
  DayPickerProps as BaseDayPickerProps,
  DayPickerRangeProps as BaseDayPickerRangeProps,
  DayPickerSingleProps as BaseDayPickerSingleProps,
  DateRange,
  DayPickerProps,
} from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"

export type DatePickerProps = DayPickerProps & {
  placeholder?: string
  value?: Date | string | { from: Date | string; to?: Date | string } | undefined

  onChange?: (value: Date | DateRange) => void
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ mode = "single", placeholder = "Select a date", value, onChange, ...props }, ref) => {
    if (mode === "multiple") throw new Error("Not implement yet. use 'single' or 'range' instead.")

    const [date, setDate] = React.useState<Date | DateRange | undefined>(
      generateDefaultValue(value)
    )

    const dateRangeProps: BaseDayPickerRangeProps = {
      mode: "range",
      defaultMonth: (date as DateRange).from,
      selected: date as DateRange,
      onSelect: setDate as React.Dispatch<React.SetStateAction<DateRange | undefined>>,
      numberOfMonths: 2,
    }
    const dateSingleProps: BaseDayPickerSingleProps = {
      mode: "single",
      selected: date as Date,
      onSelect: setDate as React.Dispatch<React.SetStateAction<Date | undefined>>,
    }

    const calendarProps =
      mode === "single" ? dateSingleProps : mode === "range" ? dateRangeProps : {}

    const content =
      mode === "single"
        ? generateContentDaySingle(date as Date, placeholder)
        : generateContentDayRange(date as DateRange, placeholder)

    React.useEffect(() => {
      if (onChange && date) {
        onChange(date)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {content}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar {...(props as any)} {...calendarProps} mode={mode} initialFocus />
        </PopoverContent>
      </Popover>
    )
  }
)

DatePicker.displayName = "DatePicker"

const generateDefaultValue = (value: DatePickerProps["value"]) => {
  const format = "DD/MM/YYYY HH:mm:ss"
  if (!value) return undefined
  if (value instanceof Date) return value

  if (typeof value === "string") {
    return dayjs(value, format).toDate()
  } else {
    return {
      from: typeof value.from === "string" ? dayjs(value.from, format).toDate() : value.from,
      to: typeof value.to === "string" ? dayjs(value.to, format).toDate() : value.to,
    } as DateRange
  }
}

const generateContentDaySingle = (date: Date | undefined, placeholder: string) => {
  return date ? format(date as Date, "PPP") : <span>{placeholder}</span>
}

const generateContentDayRange = (date: DateRange | undefined, placeholder: string) => {
  return date?.from ? (
    date.to ? (
      <>
        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
      </>
    ) : (
      format(date.from, "LLL dd, y")
    )
  ) : (
    <span>{placeholder}</span>
  )
}
