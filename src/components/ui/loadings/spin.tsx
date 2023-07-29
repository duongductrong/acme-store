import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { SVGAttributes } from "react"

export interface SpinProps extends SVGAttributes<SVGSVGElement> {}

const Spin = ({ className, ...props }: SpinProps) => {
  return <Loader2 {...props} className={cn("w-4 h-4 animate-spin", className)} />
}

export default Spin
