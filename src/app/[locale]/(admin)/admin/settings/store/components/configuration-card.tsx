import { Link } from "@/components/router"
import Text from "@/components/typography/text"
import { cn } from "@/lib/utils"
import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from "react"

export interface ConfigurationCardProps {
  icon: ForwardRefExoticComponent<SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement>>
  name: string
  description: string

  to?: string
}

const ConfigurationCard = ({ name, description, icon: Icon, to }: ConfigurationCardProps) => {
  return (
    <div
      className={cn(
        "relative",
        "bg-white dark:bg-neutral-900/50 w-full h-fit rounded-lg border border-zinc-200 dark:border-zinc-800 p-base",
        "flex items-center gap-base cursor-pointer"
      )}
    >
      <div className="bg-primary/10 min-w-[45px] w-[45px] h-[45px] rounded-full flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex flex-col gap-1">
        <Text className="text-base" weight="semibold">
          {name}
        </Text>
        <Text size="sm" weight="normal" className="text-zinc-500">
          {description}
        </Text>
      </div>
      {to ? <Link href={to} className="absolute top-0 left-0 w-full h-full" /> : null}
    </div>
  )
}

export default ConfigurationCard
