import StoreHeaderCart from "./store-header-cart"

export interface StoreHeaderActionsProps {}

const StoreHeaderActions = (props: StoreHeaderActionsProps) => {
  return (
    <div className="flex gap-base ml-auto">
      <StoreHeaderCart />
    </div>
  )
}

export default StoreHeaderActions
