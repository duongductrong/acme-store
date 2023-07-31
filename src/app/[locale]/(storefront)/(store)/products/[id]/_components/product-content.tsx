import Chip from "@/components/ui/chip"
import Form from "@/components/ui/form"
import Typography from "@/components/ui/typography"
import { useForm } from "react-hook-form"
import ProductActions from "./product-actions"
import ProductAttributes from "./product-attributes"

export interface ProductContentProps {}

const ProductContent = (props: ProductContentProps) => {
  const methods = useForm({})

  const handleSubmitAddToCart = methods.handleSubmit(() => {})

  return (
    <Form {...methods}>
      <div className="col-span-4">
        <Typography variant="h1" className="mb-4" asChild>
          <h2>Acme Circles T-Shirt</h2>
        </Typography>
        <Chip className="text-sm">$12.00 USD</Chip>
        <div className="w-full border-b bg-zinc-800 my-8"></div>

        <form onSubmit={handleSubmitAddToCart}>
          <ProductAttributes />
          <ProductActions />
        </form>
      </div>
    </Form>
  )
}

export default ProductContent
