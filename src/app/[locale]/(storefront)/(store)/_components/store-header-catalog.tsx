import { Link } from "@/components/router"
import { STORE_FRONT_URL } from "@/constant/urls"
import { useMemo } from "react"

export interface StoreHeaderCatalogProps {}

const StoreHeaderCatalog = (props: StoreHeaderCatalogProps) => {
  const catalogs = useMemo(
    () => [
      {
        id: "all",
        link: STORE_FRONT_URL.HOME,
        label: "All",
      },
      {
        id: "shirts",
        link: STORE_FRONT_URL.HOME,
        label: "Shirts",
      },
      {
        id: "stickers",
        link: STORE_FRONT_URL.HOME,
        label: "Stickers",
      },
    ],
    []
  )

  return (
    <div className="flex gap-base">
      {catalogs.map((catalog) => (
        <Link
          key={catalog.id}
          href={STORE_FRONT_URL.HOME}
          className="text-sm text-zinc-600 dark:text-zinc-400"
        >
          {catalog.label}
        </Link>
      ))}
    </div>
  )
}

export default StoreHeaderCatalog
