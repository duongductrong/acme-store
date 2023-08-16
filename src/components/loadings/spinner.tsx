import { cn } from "@/lib/utils"
import { Loader, LucideProps } from "lucide-react"
import { PropsWithoutRef } from "react"

export interface SpinnerProps extends PropsWithoutRef<LucideProps> {}

const Spinner = ({ className, ...props }: SpinnerProps) => {
  return <Loader {...props} className={cn("w-4 h-4 animate-spin", className)} />
}

export default Spinner
