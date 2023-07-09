import SectionDetail from "@/components/sections/section-detail"
import SectionPaper from "@/components/sections/section-paper"
import Form from "@/components/ui/form"
import FormField from "@/components/ui/form/form-field"
import { Separator } from "@/components/ui/separator"
import { ADMIN_URL } from "@/constant/urls"
import { AttributeSchemaType, attributeSchema } from "@/schemas/attribute"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductAttributeType } from "@prisma/client"
import { useForm, useWatch } from "react-hook-form"
import AttributeOptions from "../attribute-options"
import { Button } from "@/components/ui/button"
import AttributeGroup from "../attribute-group"

export interface AttributeFormProps {
  title: string
  defaultValues?: Partial<AttributeSchemaType>
  onSubmit: (values: AttributeSchemaType) => void
}

const AttributeForm = ({
  title,
  defaultValues,
  onSubmit,
}: AttributeFormProps) => {
  console.log({ defaultValues })
  const methods = useForm<AttributeSchemaType>({
    resolver: zodResolver(attributeSchema),
    defaultValues: defaultValues,
  })

  const watchType = useWatch({
    control: methods.control,
    name: "type",
  })

  const isShowAttributeOptions = [
    ProductAttributeType.Multiselect,
    ProductAttributeType.Select,
  ].includes(watchType as any)

  const transformTypes = Object.values(ProductAttributeType).map((value) => ({
    label: value,
    value: value,
  }))

  const handleSubmit = methods.handleSubmit(onSubmit)

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
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <SectionPaper title="General">
                <div className="flex flex-col gap-4">
                  <FormField
                    label="Name"
                    name="name"
                    variant="TEXT"
                    placeholder="Name"
                  />
                  <FormField
                    label="Attribute code"
                    name="code"
                    variant="TEXT"
                    placeholder="Attribute code"
                  />
                  <FormField
                    label="Type"
                    name="type"
                    variant="RADIO_GROUP"
                    radioGroupProps={{
                      items: transformTypes,
                    }}
                  />
                </div>

                {isShowAttributeOptions && <Separator className="my-4" />}
                {isShowAttributeOptions && <AttributeOptions />}

                <Separator className="my-4" />
                <AttributeGroup />
              </SectionPaper>
            </div>
            <div className="col-span-4">
              <SectionPaper title="Setting">
                <FormField
                  name="isRequired"
                  variant="RADIO_GROUP"
                  radioGroupProps={{
                    label: "Is Required?",
                    items: [
                      {
                        label: "Not required",
                        value: false,
                      },
                      {
                        label: "Required",
                        value: true,
                      },
                    ],
                  }}
                />
                <Separator className="my-4" />
                <FormField
                  name="isFilterable"
                  variant="RADIO_GROUP"
                  radioGroupProps={{
                    label: "Is Filterable?",
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
                <FormField
                  name="isShowToCustomer"
                  variant="RADIO_GROUP"
                  radioGroupProps={{
                    label: "Show to customer?",
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
                <FormField
                  type="number"
                  name="sortOrder"
                  variant="TEXT"
                  placeholder="Sort order"
                  textInputProps={{ min: 0 }}
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
