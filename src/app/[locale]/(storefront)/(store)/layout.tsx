import { ReactNode } from "react"

export interface StoreLayoutProps extends CommonLayoutProps {
  storeheader: ReactNode
  storefooter: ReactNode
}

const StoreLayout = ({
  storeheader,
  storefooter,
  children,
}: StoreLayoutProps) => {
  return (
    <>
      {storeheader}
      {children}
      {storefooter}
    </>
  )
}

export default StoreLayout
