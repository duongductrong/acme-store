import { Button } from "@/components/ui/button"
import { ComboboxOption } from "@/components/ui/combobox"
import Form from "@/components/ui/form"
import FormField from "@/components/ui/form/form-field"
import FormLabel from "@/components/ui/form/form-label"
import { useToast } from "@/components/ui/use-toast"
import trpc from "@/lib/trpc-client"
import {
  AttributeGroupSchemaType,
  attributeGroupSchema,
} from "@/schemas/attribute-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"

export interface AttributeGroupProps {}

const AttributeGroup = (props: AttributeGroupProps) => {
  const t = useToast()
  const trpcUtils = trpc.useContext()

  const { data: attributeGroups } = trpc.attributeGroup.list.useQuery()
  const { mutate: createAttrGroup } = trpc.attributeGroup.create.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Created new group successfully",
      })

      trpcUtils.attributeGroup.invalidate()
    },
  })

  const internalMethods = useForm<AttributeGroupSchemaType>({
    resolver: zodResolver(attributeGroupSchema),
  })

  const transformAttrGroupOptions = attributeGroups?.map<ComboboxOption>(
    (attrGroup) => ({ label: attrGroup.name, value: attrGroup.id })
  )

  const handleCreateAttrGroup = internalMethods.handleSubmit((values) => {
    createAttrGroup(values)
  })

  return (
    <div>
      <FormLabel className="mb-2 block uppercase">Attribute group</FormLabel>
      <p className="text-sm mb-base">Select groups the attribute belongs to</p>
      <div className="grid grid-cols-2 gap-base">
        <FormField
          name="groupIds"
          variant="SELECT"
          placeholder="Select groups"
          options={transformAttrGroupOptions ?? []}
          isMulti
        />

        <Form {...internalMethods}>
          <div className="flex gap-1">
            <FormField
              variant="TEXT"
              name="name"
              placeholder="Add new group"
              wrapperClassName="w-full"
            />
            <Button
              type="button"
              onClick={handleCreateAttrGroup}
              variant="secondary"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AttributeGroup
