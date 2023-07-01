"use client"

import SectionDetail from "@/components/sections/section-detail"
import SectionPaper from "@/components/sections/section-paper"
import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"
import FormUnified from "@/components/ui/form/form-unified"
import { ADMIN_URL } from "@/constant/urls"
import { CollectionSchemaType, collectionSchema } from "@/schemas/collection"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export interface CollectionFormProps {
  defaultValues?: Partial<CollectionSchemaType>
  onSubmit: (values: CollectionSchemaType) => void
}

const CollectionForm = ({ defaultValues, onSubmit }: CollectionFormProps) => {
  const methods = useForm<CollectionSchemaType>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      ...defaultValues,
    },
  })

  const handleSubmit = methods.handleSubmit(onSubmit)

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit}>
        <SectionDetail
          title="Create new collection"
          backTo={ADMIN_URL.COLLECTION.LIST}
          whereTopRight={
            <>
              <Button type="submit">Save</Button>
            </>
          }
        >
          <SectionPaper title="General">
            <div className="grid grid-cols-1 gap-4">
              <FormUnified
                label="Name"
                name="name"
                placeholder="Name"
                variant="TEXT_INPUT"
              />

              <FormUnified
                label="Code"
                name="code"
                placeholder="Code"
                variant="TEXT_INPUT"
              />

              <FormUnified
                label="Description"
                name="description"
                placeholder="Description"
                variant="TEXTAREA"
              />
            </div>
          </SectionPaper>
        </SectionDetail>
      </form>
    </Form>
  )
}

export default CollectionForm
