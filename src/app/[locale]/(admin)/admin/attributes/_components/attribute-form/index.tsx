import SectionDetail from "@/components/sections/section-detail"
import SectionPaper from "@/components/sections/section-paper"
import Form from "@/components/ui/form"
import FormField from "@/components/ui/form/form-field"
import { Separator } from "@/components/ui/separator"
import { ADMIN_URL } from "@/constant/urls"
import { AttributeSchemaType, attributeSchema } from "@/schemas/attribute"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import AttributeOptions from "../attribute-options"
import { Button } from "@/components/ui/button"
import AttributeGroup from "../attribute-group"
import { TRPCClientErrorLike } from "@trpc/client"
import { useTRPCTransformerFieldErrorsWithRHF } from "@/app/(trpc)/lib/trpc/hooks"

export interface AttributeFormProps {
  title: string
  error: TRPCClientErrorLike<any> | null
  defaultValues?: Partial<AttributeSchemaType>
  onSubmit: (values: AttributeSchemaType) => void
}

const AttributeForm = ({ title, error, defaultValues, onSubmit }: AttributeFormProps) => {
  const methods = useForm<AttributeSchemaType>({
    resolver: zodResolver(attributeSchema),
    defaultValues: defaultValues,
  })

  const handleSubmit = methods.handleSubmit(onSubmit)

  useTRPCTransformerFieldErrorsWithRHF(error, methods)

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit}>
        <SectionDetail
          title={title}
          backTo={ADMIN_URL.ATTRIBUTE.LIST}
          whereTopRight={
            <>
              <Button type="submit">Save</Button>
            </>
          }
        >
          <div className="grid grid-cols-12 gap-base">
            <div className="col-span-8">
              <SectionPaper title="General">
                <div className="flex flex-col gap-base">
                  <FormField label="Name" name="name" variant="TEXT" placeholder="Name" />
                  <FormField
                    label="Attribute code"
                    name="code"
                    fromName="name"
                    variant="UID"
                    placeholder="Attribute code"
                  />
                </div>

                <Separator className="my-base" />
                <AttributeOptions />

                <Separator className="my-base" />
                <AttributeGroup />
              </SectionPaper>
            </div>
            <div className="col-span-4">
              <SectionPaper title="Setting">
                <FormField
                  name="isRequired"
                  variant="RADIO_GROUP"
                  label="Is Required?"
                  items={[
                    {
                      label: "Not required",
                      value: false,
                    },
                    {
                      label: "Required",
                      value: true,
                    },
                  ]}
                />
                <Separator className="my-base" />
                <FormField
                  name="isFilterable"
                  variant="RADIO_GROUP"
                  label="Is Filterable?"
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
                  name="isShowToCustomer"
                  variant="RADIO_GROUP"
                  label="Show to customer?"
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
                  type="number"
                  name="sortOrder"
                  variant="TEXT"
                  placeholder="Sort order"
                  min={0}
                />
              </SectionPaper>
            </div>
            <div></div>
          </div>
        </SectionDetail>
      </form>
    </Form>
  )
}

export default AttributeForm
