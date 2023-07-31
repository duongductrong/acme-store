import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type Props = {}

const ProductActions = (props: Props) => {
  return (
    <Button className="rounded-full w-full mt-8 py-8">
      <Plus className="w-6 h-6 mr-auto" />
      <span className="mr-auto text-base uppercase">Add to cart</span>
    </Button>
  )
}

export default ProductActions
