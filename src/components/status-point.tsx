import { Status } from "@prisma/client"
import { VariantProps, cva } from "class-variance-authority"
import React, { HTMLAttributes, forwardRef } from "react"

export const statusPointVariants = cva("w-4 h-4 rounded-full", {
  variants: {
    variant: {
      [Status.Enabled]: "bg-green-500/80",
      [Status.Disabled]: "bg-destructive/80",
    },
  },
  defaultVariants: {},
})

export interface StatusPointProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusPointVariants> {}

const StatusPoint = forwardRef<HTMLDivElement, StatusPointProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={statusPointVariants({ variant, className })}
      />
    )
  }
)

StatusPoint.displayName = "StatusPoint"

export default StatusPoint
