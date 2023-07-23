"use client"

import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
import { useRouter } from "next/navigation"
import CategoryForm from "../_components/category-form"

export interface NewCategoryProps {}

function NewCategory({}: NewCategoryProps) {
  const router = useRouter()
  const t = useToast()
  const trpcUtils = trpc.useContext()

  const { mutate: categoryMutate, error } = trpc.category.create.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Create new category successfully",
      })

      router.push(ADMIN_URL.CATEGORY.LIST)

      // Invalidate queries
      trpcUtils.category.list.invalidate()
    },
    onError() {
      t.toast({
        title: "Error",
        description: "Has an error when create new category",
        variant: "destructive",
      })
    },
  })

  return (
    <CategoryForm
      title="Create a category"
      error={error}
      onSubmit={(values) => categoryMutate(values)}
    />
  )
}

export default NewCategory
