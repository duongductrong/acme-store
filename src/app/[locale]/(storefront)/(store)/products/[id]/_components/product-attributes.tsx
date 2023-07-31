import { FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Fragment } from "react"

export interface ProductAttributesProps {}

const ProductAttributes = (props: ProductAttributesProps) => {
  return (
    <Fragment>
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
    </Fragment>
  )
}

export default ProductAttributes
