"use client"

import trpc from "@/lib/trpc/trpc-client"
import { Loader2 } from "lucide-react"
import CategoryForm from "../templates/category-form"
import { useToast } from "@/components/ui/use-toast"

export interface EditCategoryProps {
  params: { id: string }
}

export const revalidate = 0
export const dynamic = "force-dynamic"

const EditCategory = ({ params: { id } }: EditCategoryProps) => {
  const t = useToast()
  const trpcUtils = trpc.useContext()

  const { data: category, error } = trpc.category.detail.useQuery(id)
  const { mutate: categoryMutate } = trpc.category.update.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Updated category successfully",
      })

      // Invalidate queries
      trpcUtils.category.list.invalidate()
      trpcUtils.category.detail.invalidate()
    },
    onError() {
      t.toast({
        title: "Error",
        description: "Has an error when updating category",
        variant: "destructive",
      })
    },
  })

  if (!category) return <Loader2 className="w-4 h-4 animate-spin" />
  if (error) return "Error"

  return (
    <CategoryForm
      title="Edit a category"
      defaultValues={category}
      onSubmit={(values) => categoryMutate(values)}
    />
  )
}

export default EditCategory
