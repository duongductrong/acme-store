import { VariantProps, cva } from "class-variance-authority"
import {
  Children,
  ComponentPropsWithoutRef,
  HTMLAttributes,
  ReactElement,
  cloneElement,
  forwardRef,
  useMemo,
} from "react"
import GalleryItem from "./gallery-item"
import { useGallery } from "./use-gallery"

export const galleryListVariants = cva("flex gap-4 flex-wrap", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },

    align: {
      left: "items-center justify-start",
      center: "items-center justify-center",
      right: "items-center justify-end",
      top: "items-center justify-start",
      bottom: "items-center justify-end",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    align: "center",
  },
})

export interface GalleryListProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof galleryListVariants> {}

const GalleryList = forwardRef<HTMLDivElement, GalleryListProps>(
  ({ className, orientation, align, children, ...props }, ref) => {
    const { itemIndex, setItemIndex } = useGallery()

    const items = useMemo(
      () =>
        Children.map(children, (_children, index) => {
          const galleryItemElement = _children as ReactElement<
            ComponentPropsWithoutRef<typeof GalleryItem>
          >

          return cloneElement(galleryItemElement, {
            onClick: () => setItemIndex(index),
            active: itemIndex === index,
          })
        }),
      [children, itemIndex, setItemIndex]
    )

    return (
      <div
        {...props}
        ref={ref}
        className={galleryListVariants({ className, orientation, align })}
      >
        {items}
      </div>
    )
  }
)

GalleryList.displayName = "GalleryList"

export default GalleryList
