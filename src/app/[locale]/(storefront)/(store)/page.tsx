import ProductCard from "@/components/cards/product-card"
import { STORE_FRONT_URL } from "@/constant/urls"

type Props = {}

const Page = (props: Props) => {
  const commonThumbnailExample =
    "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=1080&q=75"
  const commonThumbnailExample2 =
    "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=1080&q=75"

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-12 grid-rows-2 gap-base h-screen mb-8">
        <ProductCard
          title="Acme Drawstring Bag"
          href={STORE_FRONT_URL.PRODUCT.DETAIL.replace("{id}", "example")}
          thumbnail={commonThumbnailExample}
          className="col-span-8 row-span-2"
          price={12.0}
          customStyle={{ contentPosition: "top-left" }}
        />
        <ProductCard
          title="Acme Drawstring Bag"
          href={STORE_FRONT_URL.PRODUCT.DETAIL.replace("{id}", "example")}
          thumbnail={commonThumbnailExample2}
          className="col-span-4"
          price={12.0}
        />
        <ProductCard
          title="Acme Drawstring Bag"
          href={STORE_FRONT_URL.PRODUCT.DETAIL.replace("{id}", "example")}
          thumbnail={commonThumbnailExample}
          className="col-span-4"
          price={12.0}
        />
      </div>

      <div className="grid grid-cols-12 gap-base">
        <ProductCard
          title="Acme Drawstring Bag"
          href={STORE_FRONT_URL.PRODUCT.DETAIL.replace("{id}", "example")}
          thumbnail={commonThumbnailExample2}
          className="col-span-3"
          price={12.0}
        />
        <ProductCard
          title="Acme Drawstring Bag"
          href={STORE_FRONT_URL.PRODUCT.DETAIL.replace("{id}", "example")}
          thumbnail={commonThumbnailExample}
          className="col-span-3"
          price={12.0}
        />
        <ProductCard
          title="Acme Drawstring Bag"
          href={STORE_FRONT_URL.PRODUCT.DETAIL.replace("{id}", "example")}
          thumbnail={commonThumbnailExample}
          className="col-span-3"
          price={12.0}
        />
        <ProductCard
          title="Acme Drawstring Bag"
          href={STORE_FRONT_URL.PRODUCT.DETAIL.replace("{id}", "example")}
          thumbnail={commonThumbnailExample2}
          className="col-span-3"
          price={12.0}
        />
      </div>
    </div>
  )
}

export default Page
