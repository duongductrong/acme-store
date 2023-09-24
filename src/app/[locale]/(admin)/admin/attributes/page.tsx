"use client"

import { Link } from "@/components/router"
import SectionView from "@/components/sections/section-view"
import { Badge } from "@/components/ui/badge"
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
import { Prisma, ProductAttribute, ProductAttributeGroup } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus } from "lucide-react"

export interface AttributeListProps {}

const AttributeList = (props: AttributeListProps) => {
  const t = useToast()
  const confirm = useConfirm()
  const trpcUtils = trpc.useContext()

  const { data, isLoading, isFetching } = trpc.attribute.list.useQuery({
    includes: {
      groups: true,
    },
    paginationType: "offset",
    page: 1,
    pageSize: 9999,
  })

  const attributes = data?.items || []

  const { mutate: permanentlyDeleteAttribute } = trpc.attribute.permanentlyDelete.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Deleted a attribute successfully",
      })

      // Invalidate queries
      trpcUtils.attribute.list.invalidate()
    },
    onError() {
      t.toast({
        title: "Error",
        description: "Has an error when delete a attribute",
        variant: "destructive",
      })
    },
  })

  const handleDeleteAttribute = (id: string) => {
    return confirm().then((result) => {
      if (result) {
        permanentlyDeleteAttribute(id)
      }
    })
  }

  const columns: ColumnDef<
    ProductAttribute & {
      groups: Prisma.ProductAttributesOnGroupsInclude<any>[]
    }
  >[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell({ row: { original: attribute } }) {
        const url = ADMIN_URL.ATTRIBUTE.EDIT.replace(/{id}/, attribute.id.toString())
        return (
          <Link href={url} className="hover:underline underline-offset-2 font-semibold">
            {attribute.name}
          </Link>
        )
      },
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "sortOrder",
      header: "Sort Order",
    },
    {
      accessorKey: "groups",
      header: "Groups",
      cell: ({ row: { original } }) => {
        return (
          <div className="flex gap-2">
            {original.groups.map((relatedBetweenAttrGroup) => {
              const productAttrGroup =
                relatedBetweenAttrGroup.productAttributeGroup as ProductAttributeGroup

              return <Badge key={productAttrGroup.id}>{productAttrGroup.name}</Badge>
            })}
          </div>
        )
      },
    },
    {
      accessorKey: "id",
      header: () => "",
      cell: ({ getValue }) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleDeleteAttribute(getValue<string>())}>
              Delete attribute
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <SectionView
      title="Attributes"
      whereTopRight={
        <>
          <Button asChild>
            <Link href={ADMIN_URL.ATTRIBUTE.NEW}>
              <Plus className="w-4 h-4 mr-2" />
              New attribute
            </Link>
          </Button>
        </>
      }
    >
      <SuspenseDataTable
        columns={columns}
        data={attributes ?? []}
        loading={isLoading || isFetching}
      />
    </SectionView>
  )
}

export default AttributeList
