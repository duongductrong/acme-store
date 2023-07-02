/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import clsx from "clsx"
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"

export interface ComboboxOption<TValue = any> {
  label: string
  value: TValue
}

export interface ComboboxProps {
  value?: any
  isMulti?: boolean
  notFound?: string
  defaultValue?: any
  placeholder?: string
  onChange?: (value: string | string[] | null) => void
  options: ComboboxOption[]

  className?: string
  contentClassName?: string

  closeMenuOnSelect?: boolean
}

export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      notFound,
      onChange,
      placeholder,
      value: _value,
      isMulti = false,
      defaultValue = [],
      closeMenuOnSelect = true,
      className,
      contentClassName,
    },
    ref
  ) => {
    // Check props.isMulti with defaultValue
    if (isMulti && !Array.isArray(defaultValue)) {
      throw new Error(
        "The combobox with isMulti='true' should received array instead of " +
          typeof defaultValue
      )
    }

    const comboboxTriggerRef = useRef<HTMLButtonElement>(null)

    console.log(defaultValue, _value)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string[]>(() => {
      return _value || []
    })
    const [comboboxContentWidth, setComboboxContentWidth] = useState(0)

    const collectionOptions = useMemo(() => {
      return options.reduce((optionObjector, option) => {
        optionObjector[option.value] = option
        return optionObjector
      }, {} as { [k: string]: any })
    }, [options])

    const handleSelectOption = (selectedValue: string) => {
      if (isMulti) {
        const isIncludedCurrentValue = value.includes(selectedValue)

        // Remove existed option
        if (isIncludedCurrentValue) {
          const withoutCurrentValue = value.filter(
            (_value, index) => _value !== selectedValue
          )

          setValue(withoutCurrentValue)
        }
        // Add option
        else {
          setValue((currentValues) => currentValues.concat(selectedValue))
        }
      } else {
        // Add option for Combobox with isMulti=false
        setValue([selectedValue])
      }

      if (closeMenuOnSelect) setOpen(false)
    }

    useEffect(() => {
      if (onChange) {
        onChange(isMulti ? value : value?.[0])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(value)])

    const renderPlaceholderOrValue = useMemo(() => {
      if (value.length) {
        if (isMulti) {
          // Display with badges
          // return value.map((key) => {
          //   return <Badge key={key}>{collectionOptions?.[key]?.label}</Badge>
          // })

          return `${value.length} selected`
        }

        return options.find((option) => value.includes(option.value))?.label
      } else if (placeholder) {
        return <span className="font-normal">{placeholder}</span>
      }

      return <span className="w-full" />
    }, [
      value,
      placeholder,
      options,
      isMulti,
      JSON.stringify(collectionOptions),
    ])

    useEffect(() => {
      if (comboboxTriggerRef.current) {
        setComboboxContentWidth(
          comboboxTriggerRef.current.getBoundingClientRect().width
        )
      }
    }, [comboboxTriggerRef])

    useImperativeHandle(
      ref,
      () => comboboxTriggerRef.current as HTMLButtonElement
    )

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={clsx(className, "w-full !gap-2 flex-wrap font-normal")}
            ref={comboboxTriggerRef}
          >
            {renderPlaceholderOrValue}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={clsx(contentClassName, "w-full p-0")}
          style={{ width: comboboxContentWidth }}
        >
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>
              {notFound ? notFound : "No option found."}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelectOption(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

Combobox.displayName = "Combobox"