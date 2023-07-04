"use client"

import SectionDetail from "@/components/sections/section-detail"
import SectionPaper from "@/components/sections/section-paper"
import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"
import FormUnified from "@/components/ui/form/form-unified"
import { Separator } from "@/components/ui/separator"
import { ADMIN_URL } from "@/constant/urls"
import { ProductSchemaType, productSchema } from "@/schemas/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductVisibility, Status } from "@prisma/client"
import { useForm } from "react-hook-form"
import ProductCategoryField from "../product-category-field"

export interface ProductFormProps {
  title: string
  defaultValues?: Partial<ProductSchemaType>

  onSubmit: (values: ProductSchemaType) => void
}

const ProductForm = ({ title, defaultValues, onSubmit }: ProductFormProps) => {
  const methods = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: Status.Enabled,
      visibility: ProductVisibility.Visible,
      stockAvailability: true,
      ...defaultValues,
    },
  })

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
              <Button variant="secondary">Cancel</Button>
              <Button type="submit">Save</Button>
            </>
          }
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="flex flex-col gap-4 col-span-8">
              <SectionPaper title="General">
                <div className="grid grid-cols-4 gap-4">
                  <FormUnified
                    label="Name"
                    name="productName"
                    variant="TEXT_INPUT"
                    wrapperClassName="col-span-4"
                    placeholder="Name"
                  />

                  <FormUnified
                    label="Slug"
                    name="slug"
                    variant="TEXT_INPUT"
                    wrapperClassName="col-span-4"
                    placeholder="Slug"
                  />

                  <FormUnified
                    label="SKU"
                    name="SKU"
                    variant="TEXT_INPUT"
                    wrapperClassName="col-span-2"
                    placeholder="SKU"
                  />

                  <FormUnified
                    label="Price"
                    name="price"
                    variant="TEXT_INPUT"
                    wrapperClassName="col-span-2"
                    placeholder="Price"
                  />

                  <ProductCategoryField />

                  <FormUnified
                    label="Description"
                    name="description"
                    variant="TEXTAREA"
                    wrapperClassName="col-span-4"
                    placeholder="Description"
                  />

                  <FormUnified
                    label="Content"
                    name="content"
                    variant="TEXTAREA"
                    wrapperClassName="col-span-4"
                    placeholder="Content"
                  />
                </div>
              </SectionPaper>
              <SectionPaper title="Media">Drop image here</SectionPaper>
              <SectionPaper title="Search engine optimize">
                <div className="flex flex-col gap-4">
                  <FormUnified
                    label="Meta Title"
                    name="metadata.metaSeoTitle"
                    variant="TEXT_INPUT"
                    placeholder="Title"
                  />

                  <FormUnified
                    label="Meta Keywords"
                    name="metadata.metaSeoKeyword"
                    variant="TEXT_INPUT"
                    placeholder="Keywords"
                  />

                  <FormUnified
                    label="Meta Description"
                    name="metadata.metaSeoDescription"
                    variant="TEXTAREA"
                    placeholder="Description"
                  />
                </div>
              </SectionPaper>
            </div>
            <div className="flex flex-col gap-4 col-span-4">
              <SectionPaper title="Product status">
                <FormUnified
                  name="status"
                  variant="RADIO_GROUP"
                  radioGroupProps={{
                    label: "Status",
                    items: [
                      {
                        label: Status.Disabled,
                        value: Status.Disabled,
                      },
                      {
                        label: Status.Enabled,
                        value: Status.Enabled,
                      },
                    ],
                  }}
                />
                <Separator className="my-4" />
                <FormUnified
                  name="visibility"
                  variant="RADIO_GROUP"
                  radioGroupProps={{
                    label: "Visibility",
                    items: [
                      {
                        label: ProductVisibility.NotVisible,
                        value: ProductVisibility.NotVisible,
                      },
                      {
                        label: ProductVisibility.Visible,
                        value: ProductVisibility.Visible,
                      },
                    ],
                  }}
                />
              </SectionPaper>
              <SectionPaper title="Inventory">
                <FormUnified
                  name="stockAvailability"
                  variant="RADIO_GROUP"
                  radioGroupProps={{
                    label: "Stock availability",
                    items: [
                      {
                        label: "No",
                        value: false,
                      },
                      {
                        label: "Yes",
                        value: true,
                      },
                    ],
                  }}
                />
                <Separator className="my-4" />
                <FormUnified
                  type="number"
                  label="Quantity"
                  name="quantity"
                  variant="TEXT_INPUT"
                  placeholder="Quantity"
                  textInputProps={{ min: 0 }}
                />
              </SectionPaper>
              <SectionPaper title="Thumbnail">
                <FormUnified
                  name="thumbnail"
                  variant="TEXT_INPUT"
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
