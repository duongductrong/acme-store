"use client"

import trpc from "@/lib/trpc-client"
import { Loader2 } from "lucide-react"
import CategoryForm from "../_components/category-form"
import { useToast } from "@/components/ui/use-toast"
import { CategorySchemaType } from "@/schemas/category"

export interface EditCategoryProps {
  params: { id: string }
}

const EditCategory = ({ params: { id } }: EditCategoryProps) => {
  const t = useToast()
  const trpcUtils = trpc.useContext()

  const { data: category, error } = trpc.category.detail.useQuery({
    id,
    includes: {
      metadata: true,
    },
  })
  const { mutate: categoryMutate, error: throwCategoryError } = trpc.category.update.useMutation({
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
      error={throwCategoryError}
      title="Edit a category"
      defaultValues={category as any as CategorySchemaType}
      onSubmit={(values) => categoryMutate(values)}
    />
  )
}

export default EditCategory
