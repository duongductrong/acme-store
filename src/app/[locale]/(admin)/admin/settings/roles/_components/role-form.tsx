"use client"

import { useTRPCTransformerFieldErrorsWithRHF } from "@/app/(trpc)/lib/trpc/hooks"
import SectionDetail from "@/components/sections/section-detail"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Form, { FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { privileges } from "@/constant/access-controls"
import { SITE_RESOURCES } from "@/constant/resources"
import { ADMIN_URL } from "@/constant/urls"
import { RoleSchemaType, roleSchema } from "@/schemas/role"
import { zodResolver } from "@hookform/resolvers/zod"
import { TRPCClientErrorLike } from "@trpc/client"
import { useForm } from "react-hook-form"

export interface RoleFormProps {
  title: string
  error: TRPCClientErrorLike<any> | null
  defaultValues?: Partial<RoleSchemaType>

  onSubmit: (values: RoleSchemaType) => void
}

const RoleForm = ({ title, onSubmit, error, defaultValues }: RoleFormProps) => {
  const methods = useForm<RoleSchemaType>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      ...defaultValues,
    },
  })

  const handleSubmit = methods.handleSubmit((values) => {
    if (onSubmit) onSubmit(values)
  })

  useTRPCTransformerFieldErrorsWithRHF(error, methods)

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit}>
        <SectionDetail
          title={title}
          backTo={ADMIN_URL.SETTING.ROLE.LIST}
          whereTopRight={<Button type="submit">Save</Button>}
        >
          <FormField
            variant="TEXT"
            name="name"
            label="Name"
            placeholder="Name"
            wrapperClassName="mb-4"
          />

          <Label>Permissions</Label>
          <Accordion
            type="single"
            className="w-full mt-2"
            defaultValue={SITE_RESOURCES[0].key}
            collapsible
          >
            {SITE_RESOURCES.map((resource, resourceIndex) => {
              const registeredInputResource = methods.register(
                `privileges.${resourceIndex}.resource`,
                {
                  value: resource.key,
                }
              )

              const registerActionsName = `privileges.${resourceIndex}.actions`
              const registerAttributesName = `privileges.${resourceIndex}.attributes`

              return (
                <AccordionItem
                  variant="filled"
                  key={resource.key}
                  value={resource.key}
                >
                  <input {...registeredInputResource} type="hidden" />
                  <AccordionTrigger>{resource.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <FormField
                        variant="SELECT"
                        label="privileges"
                        options={privileges}
                        name={registerActionsName}
                        placeholder="Select privileges"
                        closeMenuOnSelect={false}
                        isMulti
                      />
                      <FormField
                        variant="TEXT"
                        label="Attributes"
                        name={registerAttributesName}
                        value={"*"}
                        disabled
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </SectionDetail>
      </form>
    </Form>
  )
}

export default RoleForm
