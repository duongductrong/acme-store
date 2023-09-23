import SectionView from "@/components/sections/section-view"
import { SuspenseDataTable } from "@/components/ui/data-table"

export interface OrderListProps {}

const OrderList = (props: OrderListProps) => {
  return (
    <SectionView title="Customers">
      <SuspenseDataTable columns={[]} data={[]} />
    </SectionView>
  )
}

export default OrderList
