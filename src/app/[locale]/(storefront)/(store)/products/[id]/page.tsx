"use client"

import { Button } from "@/components/ui/button"
import Chip from "@/components/ui/chip"
import Form, { FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import Typography from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"

export interface ProductDetailProps {}

const ProductDetail = (props: ProductDetailProps) => {
  const methods = useForm()
  const commonThumbnailExample2 =
    "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=1080&q=75"

  return (
    <div
      className={cn(
        "p-12",
        "min-h-[85vh]",
        "bg-black rounded-lg border border-secondary",
        "grid grid-cols-12 gap-base"
      )}
    >
      <Image
        width={700}
        height={700}
        src={commonThumbnailExample2}
        alt="Example"
        className="col-span-8 max-w-[500px] mx-auto"
      />
      <div className="col-span-4">
        <Typography variant="h1" className="mb-4" asChild>
          <h2>Acme Circles T-Shirt</h2>
        </Typography>
        <Chip className="text-sm">$12.00 USD</Chip>
        <div className="w-full border-b bg-zinc-800 my-8"></div>
        <Form {...methods}>
          <div className="mb-8">
            <Label className="w-full mb-4 block uppercase">Color</Label>
            <FormField
              name="color"
              variant="RADIO_GROUP"
              customStyle={{ variant: "chip" }}
              items={[
                {
                  label: "Green",
                  value: "1",
                  disabled: true,
                },
                {
                  label: "Red",
                  value: "2",
                },
              ]}
              orientation="horizontal"
            />
          </div>

          <div>
            <Label className="w-full mb-4 block uppercase">Size</Label>
            <FormField
              name="size"
              variant="RADIO_GROUP"
              customStyle={{ variant: "chip" }}
              items={[
                {
                  label: "XS",
                  value: "xs",
                },
                {
                  label: "SM",
                  value: "sm",
                },
                {
                  label: "Base",
                  value: "base",
                },
                {
                  label: "XL",
                  value: "xl",
                },
                {
                  label: "XXL",
                  value: "xxl",
                },
              ]}
              orientation="horizontal"
            />
          </div>
        </Form>

        <Button className="rounded-full w-full mt-8 py-8">
          <Plus className="w-6 h-6 mr-auto" />
          <span className="mr-auto text-base uppercase">Add to cart</span>
        </Button>
      </div>
    </div>
  )
}

export default ProductDetail
