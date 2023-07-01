"use client"

import SectionDetail from "@/components/sections/section-detail"
import SectionPaper from "@/components/sections/section-paper"
import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"
import FormUnified from "@/components/ui/form/form-unified"
import { ADMIN_URL } from "@/constant/urls"
import { CategorySchemaType, categorySchema } from "@/schemas/category"
import { zodResolver } from "@hookform/resolvers/zod"
import { Status } from "@prisma/client"
import { useForm } from "react-hook-form"

export interface CategoryFormProps {
  title: string
  defaultValues?: Partial<CategorySchemaType>

  onSubmit: (values: CategorySchemaType) => void
}

const CategoryForm = ({
  title,
  defaultValues,
  onSubmit,
}: CategoryFormProps) => {
  const methods = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      status: Status.Enabled,
      ...defaultValues,
    },
  })

  const handleSubmit = methods.handleSubmit(onSubmit)

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit}>
        <SectionDetail
          title={title}
          backTo={ADMIN_URL.CATEGORY.LIST}
          whereTopRight={
            <>
              <Button type="submit">Save</Button>
            </>
          }
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 flex flex-col gap-4">
              <SectionPaper title="General">
                <div className="flex flex-col gap-4">
                  <FormUnified
                    label="Name"
                    name="name"
                    variant="TEXT_INPUT"
                    placeholder="Name"
                  />
                  <FormUnified
                    label="Description"
                    name="description"
                    variant="TEXTAREA"
                    placeholder="Description"
                  />
                </div>
              </SectionPaper>

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
            <div className="col-span-4 flex flex-col gap-4">
              <SectionPaper title="Thumbnail">
                <FormUnified
                  name="thumbnail"
                  variant="TEXT_INPUT"
                  placeholder="Thumbnail"
                />
              </SectionPaper>

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
              </SectionPaper>
            </div>
          </div>
        </SectionDetail>
      </form>
    </Form>
  )
}

export default CategoryForm
