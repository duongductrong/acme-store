import { Link } from "@/components/router"
import Chip from "@/components/ui/chip"
import { formatCurrency } from "@/lib/currency"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { HTMLAttributes } from "react"

export interface ProductCardProps extends HTMLAttributes<HTMLAnchorElement> {
  title: string
  price: number
  thumbnail: string
  href: string

  customStyle?: {
    contentPosition: "top-left" | "bottom-left"
  }
}

const ProductCard = ({
  className,
  title,
  price,
  thumbnail,
  href,
  customStyle = { contentPosition: "bottom-left" },
  ...props
}: ProductCardProps) => {
  return (
    <Link
      {...props}
      role="group"
      href={href}
      className={cn(
        "relative bg-black rounded-lg border border-secondary hover:border-primary",
        "cursor-pointer",
        className
      )}
    >
      <Image
        width={500}
        height={500}
        src={thumbnail}
        alt="Demo vercel store."
        className="w-full"
      />

      <div
        className={cn(
          "absolute rounded-full border border-zinc-800 p-1 flex items-center",
          {
            "left-4 bottom-4": customStyle.contentPosition === "bottom-left",
            "top-4 left-4": customStyle.contentPosition === "top-left",
          }
        )}
      >
        <h2 className="text-xs font-medium mx-2">{title}</h2>
        <Chip>{formatCurrency(price.toFixed(2), "en-US")}</Chip>
      </div>
    </Link>
  )
}

export default ProductCard
