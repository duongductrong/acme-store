import { Button } from "@/components/ui/button"
import FormField from "@/components/ui/form/form-field"
import { Label } from "@/components/ui/label"
import { AttributeSchemaType } from "@/schemas/attribute"
import { Plus } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"

export interface AttributeOptionsProps {}

const AttributeOptions = (props: AttributeOptionsProps) => {
  const methods = useFormContext<AttributeSchemaType>()

  const {
    fields: options,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    name: "options",
    control: methods.control,
  })

  const handleAppendNewOption = () => {
    appendOption({ name: "" })
  }

  const handleRemoveOption = (index: number) => {
    removeOption(index)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="uppercase">Attribute options </Label>
        <Button type="button" variant="link" onClick={handleAppendNewOption}>
          <Plus className="w-4 h-4 mr-2" />
          Add option
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => {
          return (
            <div key={option.id} className="flex items-center w-full gap-base">
              <FormField
                type="hidden"
                variant="TEXT"
                name={`options.${index}.id`}
                value={option.id}
              />
              <FormField
                variant="TEXT"
                name={`options.${index}.name`}
                wrapperClassName="flex-1 max-w-[200px]"
                placeholder="Name"
              />
              <FormField
                variant="UID"
                name={`options.${index}.code`}
                fromName={`options.${index}.name`}
                wrapperClassName="flex-1 max-w-[200px]"
                placeholder="Code"
              />
              <span
                role="button"
                className="flex-1 text-sm text-destructive ml-base"
                onClick={() => handleRemoveOption(index)}
              >
                Remove option
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AttributeOptions
