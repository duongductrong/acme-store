"use client"

import Link from "@/components/navigations/link"
import SectionView from "@/components/sections/section-view"
import StatusPoint from "@/components/status-point"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import { formatCurrency } from "@/lib/currency"
import { decimalNumber } from "@/lib/number"
import trpc from "@/lib/trpc/trpc-client"
import { Product, Status } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export interface ProductListProps {}

const ProductList = (props: ProductListProps) => {
  const t = useToast()
  const router = useRouter()
  const trpcUitls = trpc.useContext()
  const { data: products, isLoading: isProductQuerying } =
    trpc.product.list.useQuery()
  const { mutate, isLoading: isProductMutating } =
    trpc.product.permanentlyDelete.useMutation({
      onSuccess() {
        t.toast({
          title: "Success",
          description: "Deleted a product successfully",
        })

        trpcUitls.product.list.invalidate()
      },
      onError() {
        t.toast({
          title: "Error",
          description: "Has an error when delete a product",
          variant: "destructive",
        })
      },
    })

  const handlePermanentlyDelete = (id: string) => mutate(id)

  const columns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "title",
      accessorKey: "title",
      header: () => "Product Name",
      cell: ({ getValue, row }) => (
        <>
          <Link
            href={ADMIN_URL.PRODUCT.EDIT.replace(/{id}/, row.original.id)}
            className="hover:underline underline-offset-2 font-semibold mb-3"
          >
            {getValue<string>()}
          </Link>
          <span className="text-xs block">path:({row.original.SKU})</span>
        </>
      ),
    },
    {
      id: "price",
      accessorKey: "price",
      header: () => "Price",
      cell: ({ getValue }) => {
        return formatCurrency(getValue<number>(), "en-US")
      },
    },
    {
      id: "sku",
      accessorKey: "SKU",
      header: () => "SKU",
      cell: ({ getValue }) => {
        return getValue<string>().toUpperCase()
      },
    },
    {
      id: "quantity",
      accessorKey: "quantity",
      header: () => "Quantity",
      cell: ({ getValue }) => {
        return decimalNumber(getValue<number>())
      },
    },
    {
      id: "status",
      accessorKey: "status",
      header: () => "Status",
      cell: ({ getValue }) => {
        return <StatusPoint variant={getValue<Status>()} />
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link
                  href={ADMIN_URL.PRODUCT.EDIT.replace(/{id}/g, product.id)}
                >
                  Edit product
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePermanentlyDelete(product.id)}
              >
                Delete product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <SectionView
      title="Products"
      whereTopRight={
        <Button asChild>
          <Link href={ADMIN_URL.PRODUCT.NEW}>
            <Plus className="w-4 h-4 mr-2" />
            New Product
          </Link>
        </Button>
      }
    >
      <DataTable
        columns={columns}
        data={products ?? []}
        searchable
        searchPlaceholder="Search product name..."
        loading={isProductMutating || isProductQuerying}
        onCreateNewEntry={() => router.push(ADMIN_URL.PRODUCT.NEW)}
      />
    </SectionView>
  )
}

export default ProductList
