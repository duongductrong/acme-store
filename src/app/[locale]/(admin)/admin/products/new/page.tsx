"use client"

import SectionDetail from "@/components/sections/section-detail"
import SectionPaper from "@/components/sections/section-paper"
import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"
import FormUnified from "@/components/ui/form/form-unified"
import { Separator } from "@/components/ui/separator"
import trpc from "@/lib/trpc-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductVisibility, Status } from "@prisma/client"
import { useForm } from "react-hook-form"
import { productSchema } from "./schema"

export interface NewProductProps {}

const NewProduct = (props: NewProductProps) => {
  const { mutate: productMutate } = trpc.product.create.useMutation()
  const methods = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: Status.Enabled,
      visibility: ProductVisibility.Visible,
      stockAvailability: "yes",
    },
  })

  const handleSubmit = methods.handleSubmit((values) => {
    productMutate(values)
  })

  console.log("values", methods.watch())
  console.log("errors", methods.formState.errors)

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit}>
        <SectionDetail
          title="Create A New Product"
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

                  <FormUnified
                    label="Category"
                    name="categoryId"
                    variant="TEXT_INPUT"
                    wrapperClassName="col-span-4"
                    placeholder="Category"
                  />

                  <FormUnified
                    label="Description"
                    name="description"
                    variant="TEXTAREA"
                    wrapperClassName="col-span-4"
                    placeholder="Description"
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
                        value: "no",
                      },
                      {
                        label: "Yes",
                        value: "yes",
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
            </div>
          </div>
        </SectionDetail>
      </form>
    </Form>
  )
}

export default NewProduct
