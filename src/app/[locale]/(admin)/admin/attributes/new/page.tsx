"use client"

import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc/trpc-client"
import { useRouter } from "next/navigation"
import AttributeForm from "../components/attribute-form"

export interface NewAttributeProps {}

function NewAttribute({ ...props }: NewAttributeProps) {
  const t = useToast()
  const router = useRouter()
  const trpcUtils = trpc.useContext()

  const { mutate: createAttribute } = trpc.attribute.create.useMutation({
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
      onSubmit={(values) => createAttribute(values)}
    />
  )
}

export default NewAttribute
