import * as React from "react"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
  wrapperRef?: React.ForwardedRef<HTMLDivElement>
  wrapperId?: string
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, wrapperClassName, wrapperStyle, wrapperRef, wrapperId, ...props }, ref) => (
    <div
      id={wrapperId}
      ref={wrapperRef}
      style={wrapperStyle}
      className={cn("w-full overflow-auto", wrapperClassName)}
    >
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm border-collapse", className)}
        {...props}
      />
    </div>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("[&_tr]:border-b [&_tr]:text-xs", className)}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-primary font-medium text-primary-foreground", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

export const tableRowVariants = cva("border-b transition-colors hover:bg-muted/50 ", {
  variants: {
    enableSelectedStyle: {
      true: "data-[state=selected]:bg-muted",
    },
  },
  defaultVariants: {
    enableSelectedStyle: true,
  },
})

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & VariantProps<typeof tableRowVariants>
>(({ className, enableSelectedStyle, ...props }, ref) => (
  <tr ref={ref} className={cn(tableRowVariants({ enableSelectedStyle, className }))} {...props} />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
))
TableCaption.displayName = "TableCaption"

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
