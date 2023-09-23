"use client"

import { Link } from "@/components/router"
import SectionView from "@/components/sections/section-view"
import StatusPoint from "@/components/status-point"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/components/ui/confirm-dialog/use-confirm"
import { SuspenseDataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
import { Category, Status } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export interface CategoryListProps {}

function CategoryList({}: CategoryListProps) {
  const t = useToast()
  const router = useRouter()
  const confirm = useConfirm()
  const trpcUtils = trpc.useContext()

  const { data, isLoading, isFetching } = trpc.category.list.useQuery({
    paginationType: "offset",
    page: 1,
    pageSize: 9999,
  })
  const categories = data?.items || []

  const { mutate } = trpc.category.permanentlyDelete.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Deleted a category successfully",
      })

      // Invalidate queries
      trpcUtils.category.list.invalidate()
    },
    onError() {
      t.toast({
        title: "Error",
        description: "Has an error when delete a category",
        variant: "destructive",
      })
    },
  })

  const handleDeleteCategory = (id: string) => {
    confirm().then((isConfirmed) => {
      if (isConfirmed) {
        mutate(id)
      }
    })
  }

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: () => "Name",
      cell: ({ getValue, row: { original: category } }) => (
        <Link
          href={ADMIN_URL.CATEGORY.EDIT.replace(/{id}/, category.id)}
          className="hover:underline underline-offset-2 font-semibold"
        >
          {getValue<string>()}
        </Link>
      ),
    },
    {
      accessorKey: "description",
      header: () => "Description",
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: ({ getValue }) => {
        return <StatusPoint variant={getValue<Status>()} />
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row: { original: category } }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleDeleteCategory(category.id)}>
                Delete category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <SectionView
      title="Categories"
      whereTopRight={
        <>
          <Button asChild>
            <Link href={ADMIN_URL.CATEGORY.NEW}>
              <Plus className="w-4 h-4 mr-2" />
              New category
            </Link>
          </Button>
        </>
      }
    >
      <SuspenseDataTable
        columns={columns}
        data={categories ?? []}
        loading={isLoading || isFetching}
        onCreateNewEntry={() => router.push(ADMIN_URL.CATEGORY.NEW)}
      />
    </SectionView>
  )
}

export default CategoryList
