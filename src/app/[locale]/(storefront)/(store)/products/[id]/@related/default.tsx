import ProductCard from "@/components/cards/product-card"
import Typography from "@/components/ui/typography"
import { STORE_FRONT_URL } from "@/constant/urls"

export interface RelatedProductProps {}

const RelatedProduct = (props: RelatedProductProps) => {
  const commonThumbnailExample2 =
    "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=1080&q=75"

  return (
    <div className="grid grid-cols-4 gap-4">
      <Typography variant="h2" className="col-span-4">
        Related Products
      </Typography>

      <ProductCard
        title="Acme Drawstring Bag"
        href={STORE_FRONT_URL.PRODUCT.DETAIL.replace("{id}", "example1")}
        thumbnail={commonThumbnailExample2}
        className="col-span-1"
        price={12.0}
      />
      <ProductCard
        title="Acme Drawstring Bag"
        href={STORE_FRONT_URL.PRODUCT.DETAIL.replace("{id}", "example2")}
        thumbnail={commonThumbnailExample2}
        className="col-span-1"
        price={12.0}
      />
      <ProductCard
        title="Acme Drawstring Bag"
        href={STORE_FRONT_URL.PRODUCT.DETAIL.replace("{id}", "example3")}
        thumbnail={commonThumbnailExample2}
        className="col-span-1"
        price={12.0}
      />
      <ProductCard
        title="Acme Drawstring Bag"
        href={STORE_FRONT_URL.PRODUCT.DETAIL.replace("{id}", "example4")}
        thumbnail={commonThumbnailExample2}
        className="col-span-1"
        price={12.0}
      />
    </div>
  )
}

export default RelatedProduct
