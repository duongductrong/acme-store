"use client"

import DynamicLink from "@/components/navigations/dynamic-link"
import SectionView from "@/components/sections/section-view"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc/trpc-client"
import { Collection } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus } from "lucide-react"

export interface CollectionListProps {}

const CollectionList = (props: CollectionListProps) => {
  const t = useToast()
  const trpcUtils = trpc.useContext()

  const { data: collections } = trpc.collection.list.useQuery()

  const { mutate: deleteCollectionMutate } =
    trpc.collection.permanentlyDelete.useMutation({
      onSuccess() {
        t.toast({
          title: "Success",
          description: "Deleted a collection successfully",
        })

        // Invalidate queries
        trpcUtils.collection.list.invalidate()
      },
      onError() {
        t.toast({
          title: "Error",
          description: "Has an error when delete a collectionO",
          variant: "destructive",
        })
      },
    })

  const columns: ColumnDef<Collection>[] = [
    {
      accessorKey: "name",
      header: () => "Name",
      cell: ({ row: { original: collection } }) => (
        <DynamicLink
          href={ADMIN_URL.COLLECTION.EDIT.replace(
            /{id}/,
            collection.id.toString()
          )}
          className="hover:underline underline-offset-2 font-semibold"
        >
          {collection.name}
        </DynamicLink>
      ),
    },
    {
      accessorKey: "code",
      header: () => "Code",
    },
    {
      accessorKey: "id",
      header: () => "",
      cell: ({ getValue }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  deleteCollectionMutate(getValue<number>())
                }}
              >
                Delete collection
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <SectionView
      title="Collections"
      whereTopRight={
        <>
          <Button asChild>
            <DynamicLink href={ADMIN_URL.COLLECTION.NEW}>
              <Plus className="w-4 h-4 mr-2" />
              New collection
            </DynamicLink>
          </Button>
        </>
      }
    >
      <DataTable
        columns={columns}
        data={collections ?? []}
        searchPlaceholder="Search collections..."
        searchable
      />
    </SectionView>
  )
}

export default CollectionList
