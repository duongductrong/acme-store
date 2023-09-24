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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { ListChildComponentProps, areEqual } from "react-window"
import { VList } from "virtua"

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
  onChange?: (value: string | string[] | null | number | number[]) => void
  options: ComboboxOption[]

  className?: string
  contentClassName?: string

  closeMenuOnSelect?: boolean
  exceptItemValues?: string[]
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
      exceptItemValues = [],
    },
    ref
  ) => {
    // Check props.isMulti with defaultValue
    if (isMulti && !Array.isArray(defaultValue)) {
      throw new Error(
        "The combobox with isMulti='true' should received array instead of " + typeof defaultValue
      )
    }

    const comboboxTriggerRef = useRef<HTMLButtonElement>(null)

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<any[]>(() =>
      Array.isArray(_value) ? _value || [] : [_value]
    )
    const [filterOptions, setFilterOptions] = useState(options)
    const [comboboxContentWidth, setComboboxContentWidth] = useState(0)

    const objectOptions = useMemo(() => {
      return options.reduce((optionObjector, option) => {
        optionObjector[option.value] = option
        return optionObjector
      }, {} as { [k: string]: any })
    }, [options])

    // Virtualize
    const itemSize = 34
    const itemListSize = filterOptions.length < 10 ? filterOptions.length * itemSize : 300
    const itemCount = filterOptions.length

    const handleSelectOption = (selectedValue: string) => {
      if (isMulti) {
        const isIncludedCurrentValue = value.includes(selectedValue)

        // Remove existed option
        if (isIncludedCurrentValue) {
          const withoutCurrentValue = value.filter((_value, index) => _value !== selectedValue)

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

    const handleSearchOption = (search: string) => {
      setFilterOptions(() =>
        options.filter(
          (option) =>
            option.label.toLowerCase().includes(search.toLowerCase()) &&
            !exceptItemValues.includes(option?.value)
        )
      )
    }

    useEffect(() => {
      setFilterOptions(options.filter((option) => !exceptItemValues.includes(option?.value)))
    }, [options])

    useEffect(() => {
      if (onChange) {
        onChange(isMulti ? value : value?.[0])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(value)])

    const Placeholder = useMemo(() => {
      if (value.length) {
        if (isMulti) {
          return `${value.length} selected`
        }

        return options.find((option) => value.includes(option.value))?.label
      } else if (placeholder) {
        return <span className="font-normal text-zinc-500">{placeholder}</span>
      }

      return <span className="w-full" />
    }, [value, placeholder, options, isMulti, JSON.stringify(objectOptions)])

    useEffect(() => {
      if (comboboxTriggerRef.current) {
        setComboboxContentWidth(comboboxTriggerRef.current.getBoundingClientRect().width)
      }
    }, [comboboxTriggerRef])

    useImperativeHandle(ref, () => comboboxTriggerRef.current as HTMLButtonElement)

    // eslint-disable-next-line react/display-name
    const Row = memo<ListChildComponentProps>(({ index, style }) => {
      const option = filterOptions.filter((option) => !exceptItemValues.includes(option?.value))?.[
        index
      ]
      if (!option) return <></>

      return (
        <CommandItem
          style={style}
          key={option.value}
          onSelect={() => handleSelectOption(option.value)}
          className="whitespace-nowrap flex gap-2"
        >
          <Check
            className={cn(
              "h-4 min-w-[16px] max-w-[16px] flex-1",
              value?.includes(option.value) ? "opacity-100" : "opacity-0"
            )}
          />
          {option.label}
        </CommandItem>
      )
    }, areEqual)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              className,
              "w-full !gap-2 flex-nowrap font-normal whitespace-nowrap",
              "focus:border-primary focus:ring-4 focus:ring-primary/10",
              "focus-within:border-primary focus:ring-4 focus:ring-primary/10",
              "focus:bg-transparent hover:bg-transparent"
            )}
            ref={comboboxTriggerRef}
          >
            <p
              className="w-full text-ellipsis overflow-hidden text-left"
              style={{ width: comboboxContentWidth }}
            >
              {Placeholder}
            </p>
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(contentClassName, "w-full p-0")}
          style={{ width: comboboxContentWidth }}
        >
          <Command shouldFilter={false}>
            <CommandInput placeholder="Search..." onValueChange={handleSearchOption} />
            <CommandEmpty>{notFound ? notFound : "No option found."}</CommandEmpty>
            <CommandGroup>
              <VList
                style={{
                  height: options.length <= 5 ? options.length * itemSize : 300,
                  maxHeight: 350,
                }}
              >
                {options.map((option) => {
                  const isSelected = value === option.value
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelectOption(option.value)}
                      className="whitespace-nowrap flex gap-2"
                    >
                      <Check
                        className={cn(
                          "h-4 min-w-[16px] max-w-[16px] flex-1",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  )
                })}
              </VList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

Combobox.displayName = "Combobox"
