import { ReactNode } from "react"

export interface ProductDetailLayoutProps extends CommonLayoutProps {
  related: ReactNode
}

const ProductDetailLayout = ({
  children,
  related,
}: ProductDetailLayoutProps) => {
  return (
    <div className="flex flex-col gap-y-8 max-w-screen-2xl mx-auto">
      {children}
      {related}
    </div>
  )
}

export default ProductDetailLayout
