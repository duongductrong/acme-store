import { Link } from "@/components/router"
import { Button } from "@/components/ui/button"
import { STORE_FRONT_URL } from "@/constant/urls"

export interface StoreHeaderLogoProps {}

const StoreHeaderLogo = (props: StoreHeaderLogoProps) => {
  return (
    <Link
      {...props}
      href={STORE_FRONT_URL.HOME}
      className="block font-bold text-base leading-6 uppercase"
    >
      <Button
        variant="secondary"
        size="default"
        className="rounded-xl w-10 h-10 mr-4 bg-black border border-secondary"
      >
        A
      </Button>
      Acme Store
    </Link>
  )
}

export default StoreHeaderLogo
