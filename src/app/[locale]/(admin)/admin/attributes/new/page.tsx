"use client"

import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
import { useRouter } from "next/navigation"
import AttributeForm from "../_components/attribute-form"

export interface NewAttributeProps {}

function NewAttribute({ ...props }: NewAttributeProps) {
  const t = useToast()
  const router = useRouter()
  const trpcUtils = trpc.useContext()

  const { mutate: createAttribute, error: errorCreateAttribute } = trpc.attribute.create.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Create new attribute successfully",
      })

      router.push(ADMIN_URL.ATTRIBUTE.LIST)

      // Invalidate queries
      trpcUtils.attribute.list.invalidate()
    },
    onError() {
      t.toast({
        title: "Error",
        description: "Has an error when creating new attribute",
        variant: "destructive",
      })
    },
  })

  return (
    <AttributeForm
      title="Create new attribute"
      error={errorCreateAttribute}
      onSubmit={(values) => createAttribute(values)}
    />
  )
}

export default NewAttribute
