"use client"

import { useTRPCTransformerFieldErrorsWithRHF } from "@/app/(trpc)/lib/trpc/hooks"
import SectionDetail from "@/components/sections/section-detail"
import SectionPaper from "@/components/sections/section-paper"
import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"
import FormField from "@/components/ui/form/form-field"
import { ADMIN_URL } from "@/constant/urls"
import { CategorySchemaType, categorySchema } from "@/schemas/category"
import { zodResolver } from "@hookform/resolvers/zod"
import { Status } from "@prisma/client"
import { TRPCClientErrorLike } from "@trpc/client"
import { useForm } from "react-hook-form"

export interface CategoryFormProps {
  title: string
  defaultValues?: Partial<CategorySchemaType>
  error: TRPCClientErrorLike<any> | null

  onSubmit: (values: CategorySchemaType) => void
}

const CategoryForm = ({
  title,
  defaultValues,
  error,
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

  useTRPCTransformerFieldErrorsWithRHF(error, methods)

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
          <div className="grid grid-cols-12 gap-base">
            <div className="col-span-8 flex flex-col gap-base">
              <SectionPaper title="General">
                <div className="flex flex-col gap-base">
                  <FormField
                    label="Name"
                    name="name"
                    variant="TEXT"
                    placeholder="Name"
                  />
                  <FormField
                    variant="UID"
                    label="Slug"
                    name="slug"
                    fromName="name"
                    placeholder="Slug"
                  />
                  <FormField
                    label="Description"
                    name="description"
                    variant="TEXTAREA"
                    placeholder="Description"
                  />
                </div>
              </SectionPaper>

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
            <div className="col-span-4 flex flex-col gap-base">
              <SectionPaper title="Thumbnail">
                <FormField
                  name="thumbnail"
                  variant="TEXT"
                  placeholder="Thumbnail"
                />
              </SectionPaper>

              <SectionPaper title="Product status">
                <FormField
                  name="status"
                  variant="RADIO_GROUP"
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
