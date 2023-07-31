import Image from "next/image"
import { useGallery } from "./use-gallery"

export interface GallerySlideshowProps {}

function GallerySlideshow({}: GallerySlideshowProps) {
  const { itemIndex, items } = useGallery()

  return (
    <div className="relative">
      <Image
        width={700}
        height={700}
        src={items[itemIndex].src}
        alt="Example"
        className="mx-auto max-w-[500px]"
      />
    </div>
  )
}

export default GallerySlideshow
