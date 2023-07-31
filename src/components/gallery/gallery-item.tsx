import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import Image from "next/image"
import { HTMLAttributes, forwardRef } from "react"

export const galleryItemVariants = cva(
  "group border-2  hover:border-primary relative overflow-hidden rounded-lg",
  {
    variants: {
      active: {
        true: "border-primary",
        false: "border-secondary",
      },
    },
    defaultVariants: {},
  }
)

export interface GalleryItemProps
  extends Pick<HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof galleryItemVariants> {
  alt: string
  src: string
}

const GalleryItem = forwardRef<HTMLDivElement, GalleryItemProps>(
  ({ src, alt, active, onClick }, ref) => {
    return (
      <div
        role="button"
        ref={ref}
        className={cn(galleryItemVariants({ active, className: "" }))}
        onClick={onClick}
      >
        <Image
          width={150}
          height={150}
          className="transform group-hover:scale-110 w-[80px] h-[80px] object-cover transition-all duration-300"
          alt={alt}
          src={src}
        />
      </div>
    )
  }
)

GalleryItem.displayName = "GalleryItem"

export default GalleryItem
