"use client"

import SectionDetail from "@/components/sections/section-detail"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Form, { FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { SITE_RESOURCES } from "@/constant/resources"
import { ADMIN_URL } from "@/constant/urls"
import { useForm } from "react-hook-form"

export interface NewRoleProps {}

const NewRole = (props: NewRoleProps) => {
  const methods = useForm()
  return (
    <SectionDetail title="Create new role" backTo={ADMIN_URL.SETTING.ROLE.LIST}>
      <Form {...methods}>
        <FormField
          variant="TEXT"
          name="name"
          label="Name"
          placeholder="Name"
          wrapperClassName="mb-4"
        />

        <Label>Permissions</Label>
        <Accordion type="single" collapsible className="w-full mt-2">
          {SITE_RESOURCES.map((resource) => (
            <AccordionItem
              key={resource.key}
              variant="filled"
              value={resource.key}
            >
              <AccordionTrigger>{resource.title}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <FormField label="read:any" variant="CHECKBOX" name="1" />
                  <FormField label="create:any" variant="CHECKBOX" name="1" />
                  <FormField label="update:any" variant="CHECKBOX" name="1" />
                  <FormField label="delete:any" variant="CHECKBOX" name="1" />
                  <FormField label="read:owner" variant="CHECKBOX" name="1" />
                  <FormField label="create:owner" variant="CHECKBOX" name="1" />
                  <FormField label="update:owner" variant="CHECKBOX" name="1" />
                  <FormField label="delete:owner" variant="CHECKBOX" name="1" />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Form>
    </SectionDetail>
  )
}

export default NewRole
