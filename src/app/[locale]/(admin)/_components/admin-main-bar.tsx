import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

export interface AdminMainBarProps extends HTMLAttributes<HTMLElement> {}

const AdminMainBar = ({ className, children, ...props }: AdminMainBarProps) => {
  return (
    <main {...props} className={cn("w-full ml-[250px] min-h-[calc(100vh-64px)]", className)}>
      {children}
    </main>
  )
}

export default AdminMainBar
