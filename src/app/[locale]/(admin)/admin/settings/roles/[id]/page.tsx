"use client"

import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
import { RoleSchemaType } from "@/schemas/role"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import RoleForm from "../_components/role-form"

export interface EditRoleProps {
  params: { id: string }
}

const EditRole = ({ params: { id } }: EditRoleProps) => {
  const router = useRouter()
  const t = useToast()
  const trpcUtils = trpc.useContext()

  const { data: role } = trpc.role.detail.useQuery({ id })

  const { mutate: updateRole, error } = trpc.role.update.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Create update role successfully",
      })

      router.push(ADMIN_URL.SETTING.ROLE.LIST)

      // Invalidate queries
      trpcUtils.role.list.invalidate()
      trpcUtils.role.detail.invalidate()
    },
    onError() {
      t.toast({
        title: "Error",
        description: "Has an error when updating a role",
        variant: "destructive",
      })
    },
  })

  if (!role) return <Loader className="w-4 h-4 animate-spin" />

  return (
    <RoleForm
      title={`Edit a role: ${role.name}`}
      error={error}
      defaultValues={role as RoleSchemaType}
      onSubmit={(values) => {
        updateRole(values)
      }}
    />
  )
}

export default EditRole
