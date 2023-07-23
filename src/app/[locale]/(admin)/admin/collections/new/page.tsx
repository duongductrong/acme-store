"use client"

import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
import { useRouter } from "next/navigation"
import CollectionForm from "../_components/collection-form"

export interface NewCollectionProps {}

const NewCollection = (props: NewCollectionProps) => {
  const t = useToast()
  const router = useRouter()
  const trpcUtils = trpc.useContext()

  const { mutate: collectionMutate, error: errorCreateCollection } = trpc.collection.create.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Created new collection",
      })

      // Invalidate queries
      trpcUtils.collection.list.invalidate()

      router.push(ADMIN_URL.COLLECTION.LIST)
    },
    onError() {
      t.toast({
        title: "Error",
        description: "Has an error when creating a collection",
        variant: "destructive",
      })
    },
  })

  return (
    <CollectionForm
      title="Create new collection"
      error={errorCreateCollection}
      onSubmit={(values) => collectionMutate(values)}
    />
  )
}

export default NewCollection
