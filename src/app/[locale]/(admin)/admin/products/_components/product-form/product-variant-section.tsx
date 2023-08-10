import { RouterOutput } from "@/app/(trpc)/app-router"
import SectionPaper from "@/components/sections/section-paper"
import trpc from "@/lib/trpc-client"
import { generateCombinations } from "@/lib/utils"
import { ProductSchemaType } from "@/schemas/product"
import { ProductAttributeOption, ProductVariant } from "@prisma/client"
import { UseTRPCQueryResult } from "@trpc/react-query/shared"
import { ReactNode, createContext, useMemo } from "react"
import { useFormContext, useWatch } from "react-hook-form"

export interface ProductVariantCustom
  extends Omit<ProductVariant, "attributes" | "id" | "productId" | "product"> {
  attributes: ProductAttributeOption[]
}

export interface ProductVariantSectionContextShape {
  variants: ProductVariantCustom[]
  attributeGroup?: UseTRPCQueryResult<
    RouterOutput["attributeGroup"]["detail"],
    any
  >
}

export interface ProductVariantSectionProps {
  children: ReactNode
}

export const ProductVariantSectionContext =
  createContext<ProductVariantSectionContextShape>({ variants: [] })

const ProductVariantSection = ({ children }: ProductVariantSectionProps) => {
  const methods = useFormContext<ProductSchemaType>()

  const attributeGroupId = useWatch({
    control: methods.control,
    name: "attributeGroupId",
  })

  const variants = useWatch({
    control: methods.control,
    name: "variants",
  })

  const attributeGroup = trpc.attributeGroup.detail.useQuery({
    id: attributeGroupId as string,
    includes: {
      attributes: true,
    },
  })

  const flattenAttributeOptionCodes = attributeGroup.data?.attributes.map(
    (attribute) => {
      return attribute.productAttribute.options
    }
  )

  const productVariants = generateCombinations<ProductAttributeOption>(
    (flattenAttributeOptionCodes as any) || []
  ).map((variant): ProductVariantCustom => {
    const currentVariantData = variants.find((prodVariant) => {
      return prodVariant?.attributes?.every((prodVariantAttr) => {
        return variant.find(
          (simulateVariant) => simulateVariant.code === prodVariantAttr.code
        )
      })
    })

    return {
      photo: "NONE",
      SKU: "NONE",
      quantity: 0,
      price: 0.0,
      visible: true,
      stockAvailability: true,
      ...currentVariantData,
      attributes: variant,
    }
  })

  const values = useMemo<ProductVariantSectionContextShape>(
    () => ({ variants: productVariants, attributeGroup: attributeGroup }),
    [productVariants, attributeGroup]
  )

  return (
    <ProductVariantSectionContext.Provider value={values}>
      <SectionPaper
        className="col-span-12 flex flex-col gap-base"
        title="Variants"
      >
        {children}
      </SectionPaper>
    </ProductVariantSectionContext.Provider>
  )
}

export default ProductVariantSection
