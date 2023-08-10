import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useProductVariantSection } from "./use-product-variant-section"

export interface ProductVariantInformationProps {}

const ProductVariantInformation = (props: ProductVariantInformationProps) => {
  const { attributeGroup } = useProductVariantSection()
  return (
    <div className="flex flex-col gap-base">
      {attributeGroup?.data?.attributes.map((attribute) => (
        <div
          key={attribute.productAttributeId}
          className={cn(
            "p-base py-3 border border-zinc-200 dark:border-zinc-800 rounded-lg",
            "flex gap-base"
          )}
        >
          <p className="font-medium w-[100px]">
            {attribute.productAttribute.name}
          </p>

          <div className="flex-1 w-full flex gap-2 flex-wrap">
            {attribute.productAttribute.options.map((option) => (
              <Badge key={option.id} className="cursor-pointer">
                {option.name}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductVariantInformation
