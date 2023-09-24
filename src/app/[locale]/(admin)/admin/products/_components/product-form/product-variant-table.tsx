/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Button } from "@/components/ui/button"
import { DataTableProps, SuspenseDataTable } from "@/components/ui/data-table"
import { FormField } from "@/components/ui/form"
import { ProductSchemaType } from "@/schemas/product"
import { ColumnDef } from "@tanstack/react-table"
import { isNil, omitBy } from "lodash"
import { X } from "lucide-react"
import { useMemo } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { ProductVariantCustom } from "./product-variant-section"
import { useProductVariantSection } from "./use-product-variant-section"

export interface ProductVariantTableProps {}

const ProductVariantTable = (props: ProductVariantTableProps) => {
  const methods = useFormContext<ProductSchemaType>()

  const {
    variants: productVariants,
    variantAttributeOptions,
    variantAttributeCombinations,

    sharedFieldControls: { variants: fieldControlVariants },
  } = useProductVariantSection()

  const attributeGroupId = useWatch({
    control: methods.control,
    name: "attributeGroupId",
  })

  const variants = useWatch({
    control: methods.control,
    name: "variants",
  })

  const variantAttributesSelected = variants?.map(
    ({ attributes }) => attributes as unknown as string
  )

  const defaultRowSelection = variants?.reduce(
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

  const handleRowVisible: DataTableProps["onRowSelection"] = (rowSelected) => {
    productVariants.map((variant, index) => {
      const currentVariantItem = fieldControlVariants?.fields[index]
      if (currentVariantItem) {
        fieldControlVariants?.update(index, {
          ...currentVariantItem,
          visible: !!rowSelected?.[index.toString()],
        })
      }
    })
  }

  const columns = useMemo<ColumnDef<ProductVariantCustom>[]>(
    () => [
      {
        accessorKey: "photo",
        header: () => "Photo",
        cell: () => <div className="w-[35px] h-[35px] rounded-lg bg-neutral-500"></div>,
        size: 50,
      },
      {
        accessorKey: "attributes",
        header: () => "Variant",
        cell: ({ row: { index } }) => {
          return (
            <div className="w-[220px] flex items-center gap-2 font-medium">
              <FormField
                variant="SELECT"
                wrapperClassName="w-full"
                placeholder="Select variant"
                name={`variants.${index}.attributes`}
                options={variantAttributeOptions}
                exceptItemValues={variantAttributesSelected}
              />
            </div>
          )
        },
        size: 300,
      },
      {
        accessorKey: "SKU",
        cell: ({ row: { index } }) => (
          <FormField name={`variants.${index}.SKU`} variant="TEXT" placeholder="SKU" />
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
          <FormField name={`variants.${index}.quantity`} variant="NUMBER" placeholder="0" />
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
      {
        accessorKey: "id",
        header: () => "Actions",
        cell: ({
          cell: {
            row: { index },
          },
        }) => {
          return (
            <>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => fieldControlVariants?.remove(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          )
        },
      },
    ],
    [
      attributeGroupId,
      variantAttributesSelected?.join("@"),
      JSON.stringify(variantAttributeCombinations),
      JSON.stringify(productVariants),
    ]
  )

  return (
    <SuspenseDataTable
      columns={columns}
      data={productVariants}
      enableCreateNewEntry={false}
      defaultRowSelection={defaultRowSelection}
      onRowSelection={handleRowVisible}
      className="mt-4"
      pagination={{
        type: "self",
        page: 1,
        pageSize: 999,
      }}
      enableRowSelection
    />
  )
}

export default ProductVariantTable
