import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Dot } from "lucide-react"
import { forwardRef } from "react"

export interface SSPanelGroupItemProps extends ButtonProps {
  active?: boolean
}

const SSPanelGroupItem = forwardRef<HTMLButtonElement, SSPanelGroupItemProps>(
  ({ active, className, children, ...props }, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        className={cn(
          className,
          "w-full justify-start border-r-2 rounded-r-none px-2",
          {
            "border-transparent text-neutral-700 dark:text-neutral-300":
              !active,
            "border-neutral-950 dark:border-neutral-50 font-bold": active,
          }
        )}
        variant="ghost"
      >
        <Dot className="w-4 h-4 mr-2" /> {children}
      </Button>
    )
  }
)

SSPanelGroupItem.displayName = "SSPanelGroupItem"

export default SSPanelGroupItem
