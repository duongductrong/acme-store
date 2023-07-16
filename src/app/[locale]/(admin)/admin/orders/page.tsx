"use client"

import SectionView from "@/components/sections/section-view"
import { DataTable } from "@/components/ui/data-table/data-table"
import trpc from "@/lib/trpc/trpc-client"
import { Order } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export interface OrderListProps {}

const OrderList = (props: OrderListProps) => {
  const { data: orders = [] } = trpc.order.list.useQuery()

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
    },
    {
      accessorKey: "customerNote",
      header: "Customer note",
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
    },
    {
      accessorKey: "shipmentStatus",
      header: "Shipment Status",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "orderTotalAmount",
      header: "Total",
    },
  ]

  return (
    <SectionView title="Orders">
      <DataTable columns={[]} data={orders} />
    </SectionView>
  )
}

export default OrderList
