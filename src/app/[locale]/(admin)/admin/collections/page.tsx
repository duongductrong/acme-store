"use client"

import { Link } from "@/components/router"
import SectionView from "@/components/sections/section-view"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/components/ui/confirm-dialog/use-confirm"
import { SuspenseDataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
import { Collection } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export interface CollectionListProps {}

const CollectionList = (props: CollectionListProps) => {
  const t = useToast()
  const router = useRouter()
  const confirm = useConfirm()
  const trpcUtils = trpc.useContext()

  const { data, isLoading, isFetching } = trpc.collection.list.useQuery({
    paginationType: "offset",
    page: 1,
    pageSize: 9999,
  })
  const collections = data?.items || []

  const { mutate: deleteCollectionMutate } = trpc.collection.permanentlyDelete.useMutation({
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

  const handleDeleteCollection = (id: string) => {
    confirm().then((isConfirmed) => {
      if (isConfirmed) {
        deleteCollectionMutate(id)
      }
    })
  }

  const columns: ColumnDef<Collection>[] = [
    {
      accessorKey: "name",
      header: () => "Name",
      cell: ({ row: { original: collection } }) => (
        <Link
          href={ADMIN_URL.COLLECTION.EDIT.replace(/{id}/, collection.id.toString())}
          className="hover:underline underline-offset-2 font-semibold"
        >
          {collection.name}
        </Link>
      ),
    },
    {
      accessorKey: "slug",
      header: () => "Slug",
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
                  handleDeleteCollection(getValue<string>())
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
            <Link href={ADMIN_URL.COLLECTION.NEW}>
              <Plus className="w-4 h-4 mr-2" />
              New collection
            </Link>
          </Button>
        </>
      }
    >
      <SuspenseDataTable
        columns={columns}
        data={collections}
        loading={isLoading || isFetching}
        onCreateNewEntry={() => router.push(ADMIN_URL.COLLECTION.NEW)}
      />
    </SectionView>
  )
}

export default CollectionList
