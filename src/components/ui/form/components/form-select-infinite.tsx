import { forwardRef } from "react"
import {
  ComboboxInfinite,
  ComboboxInfiniteProps,
} from "../../combobox-infinite"

export interface FormSelectInfiniteProps extends ComboboxInfiniteProps {}

const FormSelectInfinite = forwardRef<
  HTMLButtonElement,
  FormSelectInfiniteProps
>((props, ref) => {
  return <ComboboxInfinite {...props} ref={ref} />
})

FormSelectInfinite.displayName = "FormSelectInfinite"

export default FormSelectInfinite
