"use client"

import SectionView from "@/components/sections/section-view"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import trpc from "@/lib/trpc-client"
import { Product, ProductVisibility, Status } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus } from "lucide-react"

export interface ProductListProps {}

const data: Product[] = [
  {
    id: "m5gr84i9",
    status: Status.Enabled,
    content: "",
    createdAt: new Date(),
    description: "",
    media: [],
    metadataId: "",
    price: 1999999,
    productName: "Proudct am",
    quantity: 10,
    SKU: "xjjXNBi2323",
    slug: "proudct-am",
    stockAvailability: true,
    thumbnail: "",
    updatedAt: new Date(),
    visibility: ProductVisibility.Visible,
  },
]

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Product>[] = [
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
    id: "productName",
    accessorKey: "productName",
    header: () => "Product Name",
    cell: ({ getValue }) => getValue(),
  },
  {
    id: "price",
    accessorKey: "price",
    header: () => "Price",
    cell: ({ getValue }) => {
      return getValue()
    },
  },
  {
    id: "sku",
    accessorKey: "SKU",
    header: () => "SKU",
    cell: ({ getValue }) => {
      return getValue()
    },
  },
  {
    id: "quantity",
    accessorKey: "quantity",
    header: () => "Quantity",
    cell: ({ getValue }) => {
      return getValue()
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: () => "Status",
    cell: ({ getValue }) => {
      return getValue()
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const ProductList = (props: ProductListProps) => {
  const { data: products } = trpc.product.list.useQuery()
  console.log(products)

  return (
    <SectionView
      title="Products"
      whereTopRight={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Product
        </Button>
      }
    >
      <DataTable
        columns={columns}
        data={data}
        searchable
        searchPlaceholder="Search product name..."
      />
    </SectionView>
  )
}

export default ProductList
