import { Button, ButtonProps } from "@/components/ui/button"
import clsx from "clsx"
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
        className={clsx(
          className,
          "w-full justify-start border-r-2 rounded-r-none px-2",
          {
            "border-transparent text-neutral-700": !active,
            "border-neutral-950 font-bold": active,
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
