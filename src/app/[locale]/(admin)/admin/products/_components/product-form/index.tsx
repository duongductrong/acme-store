/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useTRPCTransformerFieldErrorsWithRHF } from "@/app/(trpc)/lib/trpc/hooks"
import Spinner from "@/components/loadings/spinner"
import SectionDetail from "@/components/sections/section-detail"
import SectionPaper from "@/components/sections/section-paper"
import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"
import FormField from "@/components/ui/form/form-field"
import { Separator } from "@/components/ui/separator"
import { ADMIN_URL } from "@/constant/urls"
import { ProductSchemaType, productSchema } from "@/schemas/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductVisibility, Status } from "@prisma/client"
import { TRPCClientErrorLike } from "@trpc/client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import ProductAttributeGroup from "./product-attribute-group"
import ProductCategoryField from "./product-category-field"
import ProductCollectionField from "./product-collection-field"
import ProductVariantInformation from "./product-variant-information"
import ProductVariantSection from "./product-variant-section"
import ProductVariantTable from "./product-variant-table"

export interface ProductFormProps {
  title: string
  error: TRPCClientErrorLike<any> | null
  defaultValues?: Partial<ProductSchemaType>
  loading: boolean

  onSubmit: (values: ProductSchemaType) => void
}

const ProductForm = ({ title, error, defaultValues, loading, onSubmit }: ProductFormProps) => {
  const router = useRouter()

  const methods = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: Status.Enabled,
      visibility: ProductVisibility.Visible,
      stockAvailability: true,
      ...defaultValues,
      variants: defaultValues?.variants?.flatMap((variant) => {
        return {
          ...variant,
          attributes: variant.attributes.reduce(
            (option, variantAttribute, variantAttributeIndex) => {
              const isLastIndex = variantAttributeIndex < variant.attributes.length - 1

              const separateIdSymbol = isLastIndex ? "@" : ""

              option += `[{id}${variantAttribute.id}][{attributeId}${variantAttribute.attributeId}][{code}${variantAttribute.code}][{name}${variantAttribute.name}]${separateIdSymbol}`

              return option
            },
            ""
          ),
        }
      }) as any,
    },
  })

  useTRPCTransformerFieldErrorsWithRHF(error, methods)

  const handleSubmit = methods.handleSubmit((values) => {
    onSubmit(values)
  })

  const handleBackPage = () => router.back()

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit}>
        <SectionDetail
          title={title}
          backTo={ADMIN_URL.PRODUCT.LIST}
          whereTopRight={
            <>
              <Button type="button" variant="secondary" onClick={handleBackPage}>
                Cancel
              </Button>
              <Button type="submit">
                {loading ? <Spinner className="mr-2" /> : null}
                Save
              </Button>
            </>
          }
        >
          <div className="grid grid-cols-12 gap-base">
            <div className="flex flex-col gap-base col-span-8">
              <SectionPaper title="General">
                <div className="grid grid-cols-4 gap-base">
                  <FormField
                    variant="TEXT"
                    label="Name"
                    name="title"
                    wrapperClassName="col-span-4"
                    placeholder="Name"
                  />

                  <FormField
                    variant="UID"
                    label="Slug"
                    name="slug"
                    fromName="title"
                    wrapperClassName="col-span-4"
                    placeholder="Slug"
                  />

                  <FormField
                    variant="NUMBER"
                    label="Price"
                    name="price"
                    wrapperClassName="col-span-2"
                    placeholder="Price"
                    min={0}
                  />

                  <ProductCategoryField />

                  <ProductCollectionField />

                  <FormField
                    variant="TEXTAREA"
                    label="Description"
                    name="description"
                    wrapperClassName="col-span-4"
                    placeholder="Description"
                  />

                  <FormField variant="RICH_TEXT" name="content" wrapperClassName="col-span-4" />

                  {/* <FormField
                    variant="TEXTAREA"
                    label="Content"
                    name="content"
                    wrapperClassName="col-span-4"
                    placeholder="Content"
                  /> */}
                </div>
              </SectionPaper>
              <SectionPaper title="Media">Building....</SectionPaper>
              <SectionPaper title="Search engine optimize">
                <div className="flex flex-col gap-base">
                  <FormField
                    label="Meta Title"
                    name="metadata.metaTitle"
                    variant="TEXT"
                    placeholder="Title"
                  />

                  <FormField
                    label="Meta Keywords"
                    name="metadata.metaKeyword"
                    variant="TEXT"
                    placeholder="Keywords"
                  />

                  <FormField
                    label="Meta Description"
                    name="metadata.metaDescription"
                    variant="TEXTAREA"
                    placeholder="Description"
                  />
                </div>
              </SectionPaper>
            </div>
            <div className="flex flex-col gap-base col-span-4">
              <SectionPaper title="Product status">
                <FormField
                  name="status"
                  label="Status"
                  items={[
                    {
                      label: Status.Disabled,
                      value: Status.Disabled,
                    },
                    {
                      label: Status.Enabled,
                      value: Status.Enabled,
                    },
                  ]}
                  variant="RADIO_GROUP"
                />
                <Separator className="my-base" />
                <FormField
                  variant="RADIO_GROUP"
                  name="visibility"
                  label="Visibility"
                  items={[
                    {
                      label: ProductVisibility.NotVisible,
                      value: ProductVisibility.NotVisible,
                    },
                    {
                      label: ProductVisibility.Visible,
                      value: ProductVisibility.Visible,
                    },
                  ]}
                />
              </SectionPaper>
              <SectionPaper title="Inventory">
                <FormField
                  variant="RADIO_GROUP"
                  name="stockAvailability"
                  label="Stock availability"
                  items={[
                    {
                      label: "No",
                      value: false,
                    },
                    {
                      label: "Yes",
                      value: true,
                    },
                  ]}
                />
                <Separator className="my-base" />
                <FormField
                  variant="NUMBER"
                  label="Quantity"
                  name="quantity"
                  placeholder="Quantity"
                  min={0}
                />
              </SectionPaper>
              <SectionPaper title="Thumbnail">
                <FormField name="thumbnail" variant="TEXT" placeholder="Thumbnail" />
              </SectionPaper>
              <SectionPaper title="Attributes">
                <ProductAttributeGroup />
              </SectionPaper>
            </div>

            <ProductVariantSection>
              <ProductVariantInformation />
              <ProductVariantTable />
            </ProductVariantSection>
          </div>
        </SectionDetail>
      </form>
    </Form>
  )
}

export default ProductForm
