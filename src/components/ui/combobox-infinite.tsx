/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Check, ChevronsUpDown, Loader } from "lucide-react"

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
import { UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from "@trpc/react-query/shared"
import { CommandLoading } from "cmdk"
import { FC, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { useDebounce } from "react-use"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"
import { ComboboxOption } from "./combobox"

export interface ComboboxInfiniteProps {
  value?: any
  isMulti?: boolean
  notFound?: string
  defaultValue?: any
  placeholder?: string

  className?: string
  contentClassName?: string

  searchMenuContent?: string
  closeMenuOnSelect?: boolean

  mapValueBy: string
  mapLabelBy: string

  limit?: number

  hasError?: boolean

  onChange?: (value: string | string[] | null) => void
  useInfiniteQuery: (
    input: Omit<any, "cursor">,
    opts?: UseTRPCInfiniteQueryOptions<any, any, any, any>
  ) => UseTRPCInfiniteQueryResult<any, any>
}

export const ComboboxInfinite = forwardRef<HTMLButtonElement, ComboboxInfiniteProps>(
  (
    {
      notFound,
      onChange,
      placeholder,
      value: _value,
      searchMenuContent,
      isMulti = false,
      closeMenuOnSelect = true,
      className,
      contentClassName,

      mapLabelBy,
      mapValueBy,
      limit,

      hasError,

      useInfiniteQuery,
    },
    ref
  ) => {
    const comboboxTriggerRef = useRef<HTMLButtonElement>(null)

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string[]>(() =>
      typeof _value === "string" ? [_value] : _value || []
    )
    const [internalSearch, setInternalSearch] = useState("")
    const [publicSearch, setPublicSearch] = useState(internalSearch)

    const [comboboxContentWidth, setComboboxContentWidth] = useState(0)

    const queryResults = useInfiniteQuery?.(
      { limit: limit ?? 10, search: publicSearch, paginationType: "cursor-based" },
      {
        getNextPageParam: (lastPage) => lastPage?.pagination?.nextCursor,
        getPreviousPageParam: (lastPage) => lastPage?.pagination?.previousCursor,
      }
    )

    const options =
      queryResults?.data?.pages
        .flat()
        .map((pageItem) => {
          const items = pageItem?.items as any[]
          const option = items?.map<ComboboxOption>((item) => ({
            label: item[mapLabelBy],
            value: item[mapValueBy],
          }))

          return option
        })
        .flat() ?? []

    const objectOptions = useMemo(() => {
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

    useEffect(() => {
      if (onChange) {
        onChange(isMulti ? value : value?.[0])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(value)])

    useEffect(() => {
      if (comboboxTriggerRef.current) {
        setComboboxContentWidth(comboboxTriggerRef.current.getBoundingClientRect().width)
      }
    }, [comboboxTriggerRef])

    useImperativeHandle(ref, () => comboboxTriggerRef.current as HTMLButtonElement)

    useDebounce(
      () => {
        setPublicSearch(internalSearch)
      },
      300,
      [internalSearch]
    )

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

    const Row: FC<ListChildComponentProps<any>> = ({ index, style }) => {
      const option = options?.[index]
      if (!option) return <></>

      return (
        <CommandItem
          style={style}
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
      )
    }

    const itemSize = 34
    const itemListSize = options.length < 10 ? options.length * itemSize : 300
    const itemCount = !queryResults?.hasNextPage ? options.length ?? 0 : options.length + 1
    const isItemLoaded = (index: number) =>
      !queryResults?.hasNextPage || index < Number(options?.length)
    const loadMoreItems = () => queryResults?.fetchNextPage()

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              className,
              "w-full !gap-2 flex-wrap font-normal",
              "focus:border-primary focus:ring-4 focus:ring-primary/10",
              "focus-within:border-primary focus:ring-4 focus:ring-primary/10",
              "focus:bg-transparent hover:bg-transparent",
              hasError ? "border-destructive focus:ring-destructive/10" : ""
            )}
            ref={comboboxTriggerRef}
          >
            {Placeholder}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(contentClassName, "w-full p-0")}
          style={{ width: comboboxContentWidth }}
        >
          <Command shouldFilter={false}>
            <CommandInput
              value={internalSearch}
              onValueChange={setInternalSearch}
              placeholder={searchMenuContent ?? "Search..."}
            />
            {queryResults?.isLoading ? (
              <CommandLoading>
                <Loader className="w-4 h-4 mx-auto my-8 animate-spin" />
              </CommandLoading>
            ) : null}
            <CommandEmpty>{notFound ? notFound : "No option found."}</CommandEmpty>
            <CommandGroup>
              <InfiniteLoader
                itemCount={itemCount}
                minimumBatchSize={1}
                threshold={1}
                isItemLoaded={isItemLoaded}
                loadMoreItems={loadMoreItems as any}
              >
                {({ ref, onItemsRendered }) => {
                  return (
                    <FixedSizeList
                      ref={ref}
                      width="100%"
                      overscanCount={1}
                      height={itemListSize}
                      itemCount={itemCount}
                      itemSize={itemSize}
                      onItemsRendered={onItemsRendered}
                    >
                      {Row as any}
                    </FixedSizeList>
                  )
                }}
              </InfiniteLoader>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

ComboboxInfinite.displayName = "ComboboxInfinite"
