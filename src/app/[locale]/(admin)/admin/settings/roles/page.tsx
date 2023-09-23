"use client"

import { Link } from "@/components/router"
import SectionView from "@/components/sections/section-view"
import { Button } from "@/components/ui/button"
import { SuspenseDataTable, useDataTableUtils } from "@/components/ui/data-table"
import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
import { Role } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Plus, Trash } from "lucide-react"

export interface RoleListProps {}

const RoleList = (props: RoleListProps) => {
  const t = useToast()
  const trpcUtils = trpc.useContext()

  const { setPage, setPageSize, page, pageSize } = useDataTableUtils({ page: 1, pageSize: 10 })
  const { data, isLoading, isFetching } = trpc.role.list.useQuery({
    paginationType: "offset",
    page,
    pageSize,
  })

  const { mutate: deleteRole } = trpc.role.permanentlyDelete.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Deleted a role successfully",
      })

      trpcUtils.role.list.invalidate()
    },
    onError() {
      t.toast({
        title: "Error",
        description: "Has an error when delete a role",
        variant: "destructive",
      })
    },
  })

  const handleDeleteRole = (id: string) => deleteRole({ id })

  const roles = data?.items || []
  const totalRoles = data?.pagination.totalRecords || 0
  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row: { original }, getValue }) => {
        return (
          <Link
            href={ADMIN_URL.SETTING.ROLE.EDIT.replace("{id}", original.id)}
            className="font-bold"
          >
            {getValue<string>()}
          </Link>
        )
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "id",
      header: "",
      cell: ({ getValue }) => {
        return (
          <div className="flex gap-2">
            <Trash
              className="w-4 h-4 cursor-pointer"
              onClick={() => handleDeleteRole(getValue<string>())}
            />
          </div>
        )
      },
    },
  ]

  return (
    <SectionView
      title="Roles"
      whereTopRight={
        <>
          <Button asChild>
            <Link href={ADMIN_URL.SETTING.ROLE.NEW}>
              <Plus className="w-4 h-4 mr-2" />
              Add role
            </Link>
          </Button>
        </>
      }
    >
      <SuspenseDataTable
        data={roles}
        columns={columns}
        loading={isLoading || isFetching}
        pagination={{
          type: "offset",
          page,
          pageSize,
          setPage,
          setPageSize,
          totalRecords: totalRoles,
        }}
      />
    </SectionView>
  )
}

export default RoleList
