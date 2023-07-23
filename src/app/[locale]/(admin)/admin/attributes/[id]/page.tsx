"use client"

import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
import { AttributeSchemaType } from "@/schemas/attribute"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import AttributeForm from "../_components/attribute-form"

export interface EditAttributeProps {
  params: { id: string }
}

const EditAttribute = ({ params: { id } }: EditAttributeProps) => {
  const t = useToast()
  const router = useRouter()
  const trpcUtils = trpc.useContext()

  const { data: attribute, error } = trpc.attribute.detail.useQuery(id)
  const { mutate: updateAttribute, error: errorUpdateAttribute } = trpc.attribute.update.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Updated category successfully",
      })

      // Invalidate queries
      trpcUtils.attribute.list.invalidate()
      trpcUtils.attribute.detail.invalidate()

      router.push(ADMIN_URL.ATTRIBUTE.LIST)
    },
    onError() {
      t.toast({
        title: "Error",
        description: "Has an error when updating category",
        variant: "destructive",
      })
    },
  })

  if (!attribute) return <Loader2 className="w-4 h-4 animate-spin" />
  if (error) return "Error"

  return (
    <AttributeForm
      title="Edit a attribute"
      error={errorUpdateAttribute}
      defaultValues={attribute as AttributeSchemaType}
      onSubmit={(values) => updateAttribute(values)}
    />
  )
}

export default EditAttribute
