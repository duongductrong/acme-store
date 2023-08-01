import StoreHeaderActions from "./store-header-actions"
import StoreHeaderCatalog from "./store-header-catalog"
import StoreHeaderLogo from "./store-header-logo"
import StoreHeaderSearch from "./store-header-search"

export interface StoreHeaderProps {}

const StoreHeader = (props: StoreHeaderProps) => {
  return (
    <div className="py-4 px-6 flex items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <StoreHeaderLogo />
        <StoreHeaderCatalog />
      </div>
      <StoreHeaderSearch />
      <StoreHeaderActions />
    </div>
  )
}

export default StoreHeader
