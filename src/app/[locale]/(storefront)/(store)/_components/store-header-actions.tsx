import { Button } from "@/components/ui/button"
import Chip from "@/components/ui/chip"
import { ShoppingBag } from "lucide-react"

export interface StoreHeaderActionsProps {}

const StoreHeaderActions = (props: StoreHeaderActionsProps) => {
  return (
    <div className="flex gap-base ml-auto">
      <Button variant="outline">
        <ShoppingBag className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default StoreHeaderActions
