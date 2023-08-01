"use client"

import CartProductCard from "@/components/carts/cart-product-card"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingBag } from "lucide-react"

export interface StoreHeaderCartProps {}

const StoreHeaderCart = (props: StoreHeaderCartProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-10">
          <ShoppingBag className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-screen">
        <SheetHeader>
          <SheetTitle>My cart</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <CartProductCard />
          <CartProductCard />
          <CartProductCard />
          <CartProductCard />
          <CartProductCard />
        </div>
        <SheetFooter className="mt-auto">
          <SheetClose className="w-full mt-auto" asChild>
            <Button type="submit" rounded="full">
              Proceed to Checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default StoreHeaderCart
