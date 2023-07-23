"use client"

import { useTRPCTransformerFieldErrorsWithRHF } from "@/app/(trpc)/lib/trpc/hooks"
import SectionDetail from "@/components/sections/section-detail"
import SectionPaper from "@/components/sections/section-paper"
import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"
import FormField from "@/components/ui/form/form-field"
import { ADMIN_URL } from "@/constant/urls"
import { CollectionSchemaType, collectionSchema } from "@/schemas/collection"
import { zodResolver } from "@hookform/resolvers/zod"
import { TRPCClientErrorLike } from "@trpc/client"
import { useForm } from "react-hook-form"

export interface CollectionFormProps {
  title: string
  error: TRPCClientErrorLike<any> | null
  defaultValues?: Partial<CollectionSchemaType>
  onSubmit: (values: CollectionSchemaType) => void
}

const CollectionForm = ({
  title,
  error,
  defaultValues,
  onSubmit,
}: CollectionFormProps) => {
  const methods = useForm<CollectionSchemaType>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
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
          backTo={ADMIN_URL.COLLECTION.LIST}
          whereTopRight={
            <>
              <Button type="submit">Save</Button>
            </>
          }
        >
          <SectionPaper title="General">
            <div className="grid grid-cols-1 gap-base">
              <FormField
                label="Name"
                name="name"
                placeholder="Name"
                variant="TEXT"
              />

              <FormField
                label="Slug"
                name="slug"
                fromName="name"
                placeholder="Slug"
                variant="UID"
              />

              <FormField
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
