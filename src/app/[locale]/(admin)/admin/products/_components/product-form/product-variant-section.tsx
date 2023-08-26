import { RouterOutput } from "@/app/(trpc)/app-router"
import SectionPaper from "@/components/sections/section-paper"
import { Button } from "@/components/ui/button"
import trpc from "@/lib/trpc-client"
import { generateCombinations } from "@/lib/utils"
import { ProductSchemaType } from "@/schemas/product"
import { ProductAttributeOption, ProductVariant } from "@prisma/client"
import { UseTRPCQueryResult } from "@trpc/react-query/shared"
import { Plus } from "lucide-react"
import { ReactNode, createContext, useMemo } from "react"
import { UseFieldArrayReturn, useFieldArray, useFormContext, useWatch } from "react-hook-form"

export interface ProductVariantCustom
  extends Omit<ProductVariant, "attributes" | "id" | "productId" | "product"> {
  attributes: ProductAttributeOption[]
}

export interface ProductVariantSectionContextShape {
  variants: ProductVariantCustom[]
  variantAttributeCombinations: ReturnType<typeof generateCombinations<ProductAttributeOption>>

  attributeGroup?: UseTRPCQueryResult<RouterOutput["attributeGroup"]["detail"], any>

  sharedFieldControls: {
    variants: UseFieldArrayReturn<ProductSchemaType, "variants", "fid"> | null
  }
}

export interface ProductVariantSectionProps {
  children: ReactNode
}

export const ProductVariantSectionContext = createContext<ProductVariantSectionContextShape>({
  variants: [],
  variantAttributeCombinations: [],

  sharedFieldControls: {
    variants: null,
  },
})

const ProductVariantSection = ({ children }: ProductVariantSectionProps) => {
  const methods = useFormContext<ProductSchemaType>()

  const attributeGroupId = useWatch({
    control: methods.control,
    name: "attributeGroupId",
  })

  const attributeGroup = trpc.attributeGroup.detail.useQuery({
    id: attributeGroupId as string,
    includes: {
      attributes: true,
    },
  })

  const flattenAttributeOptionCodes = attributeGroup.data?.attributes.map((attribute) => {
    return attribute.productAttribute.options
  })

  const variantAttributeCombinations = generateCombinations<ProductAttributeOption>(
    (flattenAttributeOptionCodes as any) || []
  )

  const productVariantsFieldControl = useFieldArray({
    name: "variants",
    control: methods.control,
    keyName: "fid",
  })

  const values = useMemo<ProductVariantSectionContextShape>(
    () => ({
      attributeGroup,
      variantAttributeCombinations,
      variants: productVariantsFieldControl.fields as ProductVariantCustom[],

      sharedFieldControls: {
        variants: productVariantsFieldControl,
      },
    }),
    [attributeGroup, variantAttributeCombinations, productVariantsFieldControl]
  )

  const handleAppendProductVariant = () => {
    const currentVariants = methods.getValues().variants

    methods.setValue(
      "variants",
      currentVariants.concat({
        photo: "",
        visible: true,
        attributes: [],
        price: 0.0,
        quantity: 0,
        SKU: "NOPE",
        stockAvailability: true,
      })
    )
  }

  return (
    <ProductVariantSectionContext.Provider value={values}>
      <SectionPaper
        className="col-span-12"
        title="Variants"
        headerActions={
          <Button variant="outline" type="button" onClick={handleAppendProductVariant}>
            <Plus className="w-4 h-4 mr-2" />
            Add variant
          </Button>
        }
      >
        {children}
      </SectionPaper>
    </ProductVariantSectionContext.Provider>
  )
}

export default ProductVariantSection
