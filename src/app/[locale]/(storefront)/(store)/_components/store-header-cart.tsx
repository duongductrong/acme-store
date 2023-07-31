"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
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
        <Button variant="outline" size="sm">
          <ShoppingBag className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="h-screen">
        <SheetHeader>
          <SheetTitle>My cart</SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
        </SheetHeader>
        <div className="grid gap-4 py-4"></div>
        <SheetFooter>
          <SheetClose className="w-full" asChild>
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
