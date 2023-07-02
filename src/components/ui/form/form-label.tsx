import { cn } from "@/lib/utils"
import * as LabelPrimitive from "@radix-ui/react-label"
import { forwardRef } from "react"
import { Label } from "../label"
import useFormField from "./hooks/use-form-field"

const FormLabel = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId, name, id } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

export default FormLabel
