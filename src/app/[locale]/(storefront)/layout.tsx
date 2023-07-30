import AssistantRouterProvider from "@/components/assistant-router/providers/assistant-router-provider"
import { Metadata } from "next"

export interface StoreFrontLayoutProps extends CommonLayoutProps {}

export const metadata: Metadata = {
  title: {
    default: "Acme | Acme Storefront",
    template: "%s | Acme Storefront",
  },
}

const StoreFrontLayout = ({ children }: StoreFrontLayoutProps) => {
  return <AssistantRouterProvider>{children}</AssistantRouterProvider>
}

export default StoreFrontLayout
