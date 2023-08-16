import { useContext } from "react"
import { ProductVariantSectionContext } from "./product-variant-section"

export const useProductVariantSection = () => {
  const contextStates = useContext(ProductVariantSectionContext)

  const { variantAttributeCombinations } = contextStates

  const variantAttributeOptions = variantAttributeCombinations.flatMap((groupVariant) => {
    return groupVariant.reduce(
      (combinedVariant, variant, groupVariantIndex) => {
        const isLastIndex = groupVariantIndex < groupVariant.length - 1

        const separateIdSymbol = isLastIndex ? "@" : ""
        const separateNameSymbol = isLastIndex ? " / " : ""

        combinedVariant.label += `${variant.name}${separateNameSymbol}`
        combinedVariant.value += `[{id}${variant.id}][{attributeId}${variant.attributeId}][{code}${variant.code}][{name}${variant.name}]${separateIdSymbol}`

        return combinedVariant
      },
      {
        label: "",
        value: "",
      }
    )
  })

  return { ...contextStates, variantAttributeOptions }
}
