import SectionView from "@/components/sections/section-view"
import { DataTable } from "@/components/ui/data-table"

export interface OrderListProps {}

const OrderList = (props: OrderListProps) => {
  return (
    <SectionView title="Customers">
      <DataTable columns={[]} data={[]} />
    </SectionView>
  )
}

export default OrderList
