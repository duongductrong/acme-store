import { useContext } from "react"
import { ProductVariantSectionContext } from "./product-variant-section"

export const useProductVariantSection = () => {
  return useContext(ProductVariantSectionContext)
}
