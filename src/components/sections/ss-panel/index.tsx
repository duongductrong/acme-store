import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { HTMLAttributes, forwardRef } from "react"

const SSPanelContent = dynamic(() => import("./components/ss-panel-content"), {
  ssr: true,
})
const SSPanelGroup = dynamic(() => import("./components/ss-panel-group"), {
  ssr: true,
})
const SSPanelGroupContent = dynamic(
  () => import("./components/ss-panel-group-content"),
  { ssr: true }
)
const SSPanelGroupItem = dynamic(
  () => import("./components/ss-panel-group-item"),
  { ssr: true }
)
const SSPanelGroupLegend = dynamic(
  () => import("./components/ss-panel-group-legend"),
  { ssr: true }
)
const SSPanelSidebar = dynamic(() => import("./components/ss-panel-sidebar"), {
  ssr: true,
})
const SSPanelTitle = dynamic(() => import("./components/ss-panel-title"), {
  ssr: true,
})

export interface SSPanelProps extends HTMLAttributes<HTMLDivElement> {}

export interface SSPanelItem {
  id: string
  title: string
  children?: SSPanelItem[]
}

const SSPanel = forwardRef<HTMLDivElement, SSPanelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={cn(className, "flex gap-6")}>
        {children}
      </div>
    )
  }
)

SSPanel.displayName = "SSPanel"

export {
  SSPanelContent,
  SSPanelGroup,
  SSPanelGroupContent,
  SSPanelGroupItem,
  SSPanelGroupLegend,
  SSPanelSidebar,
  SSPanelTitle
}

export default SSPanel
