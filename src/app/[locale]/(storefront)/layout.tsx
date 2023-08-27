import RouterProvider from "@/components/router/providers/router-provider"
import { Metadata } from "next"

export interface StoreFrontLayoutProps extends CommonLayoutProps {}

export const metadata: Metadata = {
  title: {
    default: "Acme | Acme Storefront",
    template: "%s | Acme Storefront",
  },
}

const StoreFrontLayout = ({ children }: StoreFrontLayoutProps) => {
  return <RouterProvider>{children}</RouterProvider>
}

export default StoreFrontLayout
