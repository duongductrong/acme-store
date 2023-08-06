"use client"

import { Button } from "@/components/ui/button"
import { DataTable, DataTableProps } from "@/components/ui/data-table"
import { FormField } from "@/components/ui/form"
import trpc from "@/lib/trpc-client"
import { generateCombinations } from "@/lib/utils"

import { ProductSchemaType } from "@/schemas/product"
import { ProductAttributeOption, ProductVariant } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { isNil, omitBy } from "lodash"
import { useMemo } from "react"
import { useFormContext, useWatch } from "react-hook-form"

export interface ProductVariantTableProps {}

export interface ProductVariantCustom
  extends Omit<ProductVariant, "attributes" | "id" | "productId" | "product"> {
  attributes: ProductAttributeOption[]
}

const ProductVariantTable = (props: ProductVariantTableProps) => {
  const methods = useFormContext<ProductSchemaType>()

  const attributeGroupId = useWatch({
    control: methods.control,
    name: "attributeGroupId",
  })

  const variants = useWatch({
    control: methods.control,
    name: "variants",
  })

  const defaultRowSelection = variants.reduce(
    (pVariants, pVariant, index) =>
      omitBy(
        {
          ...pVariants,
          [index]: pVariant.visible || undefined,
        },
        isNil
      ),
    {} as Record<string, boolean>
  )

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
      return prodVariant.attributes.every((prodVariantAttr) => {
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

  const columns: ColumnDef<ProductVariantCustom>[] = useMemo(
    () => [
      {
        accessorKey: "photo",
        header: () => "Photo",
        cell: () => (
          <div className="w-[35px] h-[35px] rounded-lg bg-neutral-500"></div>
        ),
      },
      {
        accessorKey: "attributes",
        header: () => "Variant",
        cell: ({ row: { index, original } }) => {
          return (
            <div className="w-[200px] flex items-center gap-2 font-medium">
              {original.attributes
                .map((attribute) => attribute.name)
                .join(" / ")}

              {original.attributes.map((attribute, attrIndex) => {
                return (
                  <div className="hidden" key={attribute.id}>
                    <input
                      type="hidden"
                      {...methods.register(
                        `variants.${index}.attributes.${attrIndex}.id`,
                        {
                          value: attribute.id,
                        }
                      )}
                    />
                    <input
                      type="hidden"
                      {...methods.register(
                        `variants.${index}.attributes.${attrIndex}.attributeId`,
                        {
                          value: attribute.attributeId,
                        }
                      )}
                    />
                  </div>
                )
              })}
            </div>
          )
        },
      },
      {
        accessorKey: "SKU",
        cell: ({ row: { index } }) => (
          <FormField
            name={`variants.${index}.SKU`}
            variant="TEXT"
            placeholder="SKU"
          />
        ),
      },
      {
        accessorKey: "price",
        cell: ({ row: { index } }) => (
          <FormField
            name={`variants.${index}.price`}
            variant="NUMBER"
            placeholder="$0.00"
            step="0.01"
            min={0}
            defaultValue="0.00"
            toFixed={2}
          />
        ),
      },
      {
        accessorKey: "quantity",
        header: () => "Quantity",
        cell: ({ row: { index } }) => (
          <FormField
            name={`variants.${index}.quantity`}
            variant="NUMBER"
            placeholder="0"
          />
        ),
      },
      {
        accessorKey: "stockAvailability",
        header: () => "Stock Availability",
        cell: ({ row: { index } }) => (
          <FormField
            name={`variants.${index}.stockAvailability`}
            variant="CHECKBOX"
            defaultChecked
          />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [attributeGroupId]
  )

  const handleRowVisible: DataTableProps["onRowSelection"] = (rowSelected) => {
    productVariants.map((variant, index) => {
      methods.setValue(
        `variants.${index}.visible`,
        !!rowSelected?.[index.toString()]
      )
    })
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={productVariants}
        enableCreateNewEntry={false}
        defaultRowSelection={defaultRowSelection}
        onRowSelection={handleRowVisible}
        enableRowSelection
      />
    </div>
  )
}

export default ProductVariantTable
