import Typography from "@/components/ui/typography"
import { formatCurrency } from "@/lib/currency"
import Image from "next/image"

export interface CartProductCardProps {}

const CartProductCard = (props: CartProductCardProps) => {
  return (
    <div className="flex gap-4">
      <Image
        src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbaby-cap-black.png%3Fv%3D1690002570&w=1200&q=75"
        width={200}
        height={200}
        alt="Thumbnail"
        className="w-[60px] h-[60px] rounded-lg border border-secondary"
      />

      <div className="flex flex-col gap-2">
        <Typography variant="p" className="font-semibold">
          Acme bug
        </Typography>
        <p className="text-zinc-500 text-sm">White / 7 - 9 Inch</p>
      </div>

      <div className="ml-auto">
        <Typography variant="p" className="text-sm font-semibold">
          {formatCurrency(45.0, "en-US")}
        </Typography>
        <button>Icon</button>
      </div>
    </div>
  )
}

export default CartProductCard
