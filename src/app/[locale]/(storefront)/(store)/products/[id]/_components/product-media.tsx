import GalleryItem from "@/components/gallery/gallery-item"
import GalleryList from "@/components/gallery/gallery-list"
import GalleryRoot from "@/components/gallery/gallery-root"
import GallerySlideshow from "@/components/gallery/gallery-slideshow"

export interface ProductMediaProps {}

const ProductMedia = (props: ProductMediaProps) => {
  return (
    <GalleryRoot className="col-span-8" defaultValue={0}>
      <GallerySlideshow />
      <GalleryList orientation="horizontal" align="center">
        <GalleryItem
          alt="1"
          src={
            "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbaby-cap-black.png%3Fv%3D1690002570&w=1200&q=75"
          }
        />
        <GalleryItem
          alt="1"
          src={
            "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fhat-1.png%3Fv%3D1690002833&w=1200&q=75"
          }
        />
        <GalleryItem
          alt="1"
          src={
            "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=1080&q=75"
          }
        />
      </GalleryList>
    </GalleryRoot>
  )
}

export default ProductMedia
