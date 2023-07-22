"use client"

import trpc from "@/lib/trpc-client"
import RoleForm from "../_components/role-form"
import { ADMIN_URL } from "@/constant/urls"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export interface NewRoleProps {}

const NewRole = (props: NewRoleProps) => {
  const router = useRouter()
  const t = useToast()
  const trpcUtils = trpc.useContext()

  const {
    mutate: createRole,
    error,
    isLoading,
  } = trpc.role.create.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Create new role successfully",
      })

      router.push(ADMIN_URL.SETTING.ROLE.LIST)

      // Invalidate queries
      trpcUtils.role.list.invalidate()
    },
    onError() {
      t.toast({
        title: "Error",
        description: "Has an error when creating a role",
        variant: "destructive",
      })
    },
  })

  return (
    <RoleForm
      title="Create new role"
      error={error}
      onSubmit={(values) => {
        if (isLoading) return
        createRole(values)
      }}
    />
  )
}

export default NewRole
