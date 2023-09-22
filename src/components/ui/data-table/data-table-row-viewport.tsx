// https://github.com/inokawa/virtua/blob/main/src/react/Viewport.tsx

import { cn } from "@/lib/utils"
import { CSSProperties, ReactElement, ReactNode, UIEvent, forwardRef, useMemo } from "react"
import { Table, TableBody } from "../table"
import { useBaseDataTable } from "./use-base-data-table"

export type ViewportComponentAttributes = Pick<
  React.HTMLAttributes<HTMLElement>,
  "className" | "style" | "id" | "role" | "tabIndex"
> &
  React.AriaAttributes

/**
 * Props of customized scrollable component.
 */
export interface CustomViewportComponentProps {
  /**
   * Renderable item elements.
   */
  children: ReactNode
  /**
   * Attributes that should be passed to the scrollable element.
   */
  attrs: ViewportComponentAttributes
  /**
   * Total height of items. It's undefined if component is not vertically scrollable.
   */
  height: number | undefined
  /**
   * Total width of items. It's undefined if component is not horizontally scrollable.
   */
  width: number | undefined
  /**
   * Currently component is scrolling or not.
   */
  scrolling: boolean
}

export const DataTableRowViewport = forwardRef<any, CustomViewportComponentProps>(
  ({ children, attrs, width, height, scrolling }, ref): ReactElement => {
    const { headerId } = useBaseDataTable()

    const handleHorizontalScroll = (event: UIEvent<HTMLTableElement>) => {
      const { scrollLeft } = event.currentTarget

      const queryEl = document.querySelector(`#${headerId}`)
      if (queryEl) {
        queryEl.scrollTo({ left: scrollLeft })
      }
    }

    return (
      <Table
        {...attrs}
        ref={ref}
        className={cn("table-fixed !overflow-x-auto", attrs.className)}
        onScroll={handleHorizontalScroll}
      >
        <TableBody
          style={useMemo(
            (): CSSProperties => ({
              position: "relative",
              visibility: "hidden",
              width: width ?? "100%",
              height: height ?? "100%",
              pointerEvents: scrolling ? "none" : "auto",
            }),
            [width, height, scrolling]
          )}
          className={cn(
            "[&_tr]:border-b last:[&_tr]:border-b [&_tr]:whitespace-nowrap",
            "table-fixed table w-full sticky z-10"
          )}
        >
          {children}
        </TableBody>
      </Table>
    )
  }
)

DataTableRowViewport.displayName = "DataTableRowViewport"

export type CustomViewportComponent = typeof DataTableRowViewport
