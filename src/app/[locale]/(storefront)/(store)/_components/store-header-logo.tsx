import { Link } from "@/components/assistant-router"
import { Button } from "@/components/ui/button"
import { STORE_FRONT_URL } from "@/constant/urls"
import { cn } from "@/lib/utils"

export interface StoreHeaderLogoProps {}

const StoreHeaderLogo = (props: StoreHeaderLogoProps) => {
  return (
    <Link
      {...props}
      href={STORE_FRONT_URL.HOME}
      className="block font-bold text-base leading-6 uppercase"
    >
      <Button variant="secondary" size="storeIcon" className="rounded-xl mr-4">
        A
      </Button>
      Acme Store
    </Link>
  )
}

export default StoreHeaderLogo
