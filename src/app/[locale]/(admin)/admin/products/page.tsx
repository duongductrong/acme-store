"use client"

import Gate from "@/components/gates/gate"
import { Link } from "@/components/router"
import SectionView from "@/components/sections/section-view"
import StatusPoint from "@/components/status-point"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useConfirm } from "@/components/ui/confirm-dialog/use-confirm"
import { SuspenseDataTable, useDataTableUtils } from "@/components/ui/data-table"
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
import { decimalNumber, safeParseNumber } from "@/lib/number"
import trpc from "@/lib/trpc-client"
import { Product, Status } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export interface ProductListProps {}

const ProductList = (props: ProductListProps) => {
  const t = useToast()
  const router = useRouter()
  const confirm = useConfirm()
  const trpcUtils = trpc.useContext()

  const { page, pageSize, setPage, setPageSize, sorting, setSorting } = useDataTableUtils({
    page: 1,
    pageSize: 10,
    sorting: [],
  })

  const { data, isLoading: isProductQuerying } = trpc.product.list.useQuery({
    paginationType: "offset",
    page: page,
    pageSize: pageSize,
    sorting: sorting,
  })

  const products = data?.items || []
  const productPagination = data?.pagination

  const { mutate, isLoading: isProductMutating } = trpc.product.permanentlyDelete.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Deleted a product successfully",
      })

      trpcUtils.product.list.invalidate()
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
        <div className="w-[250px]">
          <Link
            href={ADMIN_URL.PRODUCT.EDIT.replace(/{id}/, row.original.id)}
            className="hover:underline underline-offset-2 font-semibold mb-3"
          >
            {getValue<string>()}
          </Link>
          <span className="text-xs block">path:({row.original.slug})</span>
        </div>
      ),
      enableSticky: true,
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
                <Link href={ADMIN_URL.PRODUCT.EDIT.replace(/{id}/g, product.id)}>Edit product</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  confirm().then((isConfirm) => {
                    if (isConfirm) {
                      handlePermanentlyDelete(product.id)
                    }
                  })
                }
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
        <Gate privileges={["create", "create:any", "create:own"]} resource="products">
          <Button asChild>
            <Link href={ADMIN_URL.PRODUCT.NEW}>
              <Plus className="w-4 h-4 mr-2" />
              New Product
            </Link>
          </Button>
        </Gate>
      }
    >
      <SuspenseDataTable
        data={products}
        columns={columns}
        sorting={sorting}
        loading={isProductMutating || isProductQuerying}
        setSorting={setSorting}
        pagination={{
          type: "offset",
          page: safeParseNumber(productPagination?.page, 1),
          pageSize: safeParseNumber(productPagination?.pageSize, 10),
          totalRecords: safeParseNumber(productPagination?.totalRecords, 0),
          setPage,
          setPageSize,
        }}
        enableSorting
      />
    </SectionView>
  )
}

export default ProductList
