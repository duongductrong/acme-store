import { forwardRef } from "react"
import { Combobox, ComboboxProps } from "../../combobox"

export interface FormSelectProps extends ComboboxProps {}

const FormSelect = forwardRef<HTMLButtonElement, FormSelectProps>(
  (props, ref) => {
    return <Combobox {...props} ref={ref} />
  }
)

FormSelect.displayName = "FormSelect"

export default FormSelect
