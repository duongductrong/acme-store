/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import SectionDetail from "@/components/sections/section-detail"
import SectionPaper from "@/components/sections/section-paper"
import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"
import FormField from "@/components/ui/form/form-field"
import { Separator } from "@/components/ui/separator"
import { ADMIN_URL } from "@/constant/urls"
import { useTRPCTransformerFieldErrorsWithRHF } from "@/lib/trpc/hooks"
import { ProductSchemaType, productSchema } from "@/schemas/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductVisibility, Status } from "@prisma/client"
import { TRPCClientErrorLike } from "@trpc/client"
import { useForm } from "react-hook-form"
import ProductCategoryField from "./product-category-field"
import ProductCollectionField from "./product-collection-field"

export interface ProductFormProps {
  title: string
  error: TRPCClientErrorLike<any> | null
  defaultValues?: Partial<ProductSchemaType>

  onSubmit: (values: ProductSchemaType) => void
}

const ProductForm = ({
  title,
  error,
  defaultValues,
  onSubmit,
}: ProductFormProps) => {
  const methods = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: Status.Enabled,
      visibility: ProductVisibility.Visible,
      stockAvailability: true,
      ...defaultValues,
    },
  })

  useTRPCTransformerFieldErrorsWithRHF(error, methods)

  const handleSubmit = methods.handleSubmit((values) => {
    onSubmit(values)
  })

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit}>
        <SectionDetail
          title={title}
          backTo={ADMIN_URL.PRODUCT.LIST}
          whereTopRight={
            <>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </>
          }
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="flex flex-col gap-4 col-span-8">
              <SectionPaper title="General">
                <div className="grid grid-cols-4 gap-4">
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
                    variant="TEXT"
                    label="SKU"
                    name="SKU"
                    wrapperClassName="col-span-2"
                    placeholder="SKU"
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

                  <FormField
                    variant="TEXTAREA"
                    label="Content"
                    name="content"
                    wrapperClassName="col-span-4"
                    placeholder="Content"
                  />
                </div>
              </SectionPaper>
              <SectionPaper title="Media">Drop image here</SectionPaper>
              <SectionPaper title="Search engine optimize">
                <div className="flex flex-col gap-4">
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
            <div className="flex flex-col gap-4 col-span-4">
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
                  // radioGroupProps={{
                  //   label: "Status",
                  //   items: [
                  //     {
                  //       label: Status.Disabled,
                  //       value: Status.Disabled,
                  //     },
                  //     {
                  //       label: Status.Enabled,
                  //       value: Status.Enabled,
                  //     },
                  //   ],
                  // }}
                />
                <Separator className="my-4" />
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
                  // radioGroupProps={{
                  //   label: "Visibility",
                  //   items: [
                  //     {
                  //       label: ProductVisibility.NotVisible,
                  //       value: ProductVisibility.NotVisible,
                  //     },
                  //     {
                  //       label: ProductVisibility.Visible,
                  //       value: ProductVisibility.Visible,
                  //     },
                  //   ],
                  // }}
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
                  // radioGroupProps={{
                  //   label: "Stock availability",
                  //   items: [
                  //     {
                  //       label: "No",
                  //       value: false,
                  //     },
                  //     {
                  //       label: "Yes",
                  //       value: true,
                  //     },
                  //   ],
                  // }}
                />
                <Separator className="my-4" />
                <FormField
                  variant="NUMBER"
                  label="Quantity"
                  name="quantity"
                  placeholder="Quantity"
                  fieldProps={{ min: 0 }}
                />
              </SectionPaper>
              <SectionPaper title="Thumbnail">
                <FormField
                  name="thumbnail"
                  variant="TEXT"
                  placeholder="Thumbnail"
                />
              </SectionPaper>
            </div>
          </div>
        </SectionDetail>
      </form>
    </Form>
  )
}

export default ProductForm
