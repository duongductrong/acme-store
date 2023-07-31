"use client"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import {
  Children,
  ComponentPropsWithoutRef,
  Dispatch,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react"
import GalleryItem from "./gallery-item"
import GalleryList from "./gallery-list"

export const galleryRootVariants = cva("", {
  variants: {},
  defaultVariants: {},
})

export interface GalleryItem {
  src: string
}

export interface GalleryRootContextShape {
  itemIndex: number
  setItemIndex: Dispatch<SetStateAction<number>>
  items: GalleryItem[]
}

export const GalleryRootContext = createContext<GalleryRootContextShape>({
  itemIndex: -1,
  setItemIndex: () => null,
  items: [],
})

export interface GalleryRootProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof galleryRootVariants> {
  defaultValue?: number
}

const GalleryRoot = ({
  className,
  children,
  defaultValue = 0,
  ...props
}: GalleryRootProps) => {
  const list = findGalleryListElement(children)
  const items = findGalleryItemReturnMedia(list.props.children)

  const [activeItemIndex, setActiveItemIndex] = useState<number>(defaultValue)

  const memoizedValues = useMemo<GalleryRootContextShape>(
    () => ({
      items: items,
      itemIndex: activeItemIndex,
      setItemIndex: setActiveItemIndex,
    }),
    [items, activeItemIndex, setActiveItemIndex]
  )

  return (
    <GalleryRootContext.Provider value={memoizedValues}>
      <div {...props} className={cn(className)}>
        {children}
      </div>
    </GalleryRootContext.Provider>
  )
}

const findGalleryItemReturnMedia = (children: ReactNode) =>
  Children.toArray(children).map<GalleryItem>((galleryItem) => {
    const _galleryItem = galleryItem as ReactElement<
      ComponentPropsWithoutRef<typeof GalleryItem>
    >

    return {
      src: _galleryItem.props.src,
    }
  })

export const findGalleryListElement = (childrenList: ReactNode) =>
  Children.toArray(childrenList).find((_children) => {
    const childrenEl = _children as ReactElement

    return childrenEl.type === GalleryList
  }) as ReactElement<ComponentPropsWithoutRef<typeof GalleryList>>

export default GalleryRoot
