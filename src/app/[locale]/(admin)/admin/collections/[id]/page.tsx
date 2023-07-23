"use client"

import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import CollectionForm from "../_components/collection-form"

export interface EditCollectionProps {
  params: { id: string }
}

const EditCollection = ({ params: { id } }: EditCollectionProps) => {
  const t = useToast()
  const trpcUtils = trpc.useContext()
  const router = useRouter()

  const { data: collection, error } = trpc.collection.detail.useQuery(id)
  const { mutate: updateCollectionMutate, error: errorUpdateCollection } = trpc.collection.update.useMutation(
    {
      onSuccess() {
        t.toast({
          title: "Success",
          description: "Updated collection successfully",
        })

        // Invalidate queries
        trpcUtils.collection.list.invalidate()
        trpcUtils.collection.detail.invalidate()

        router.push(ADMIN_URL.COLLECTION.LIST)
      },
      onError() {
        t.toast({
          title: "Error",
          description: "Has an error when updating collection",
          variant: "destructive",
        })
      },
    }
  )

  if (!collection) return <Loader2 className="w-4 h-4 animate-spin" />
  if (error) return "Error"

  return (
    <CollectionForm
      title="Edit a collection"
      error={errorUpdateCollection}
      defaultValues={collection}
      onSubmit={(values) => updateCollectionMutate(values)}
    />
  )
}

export default EditCollection
