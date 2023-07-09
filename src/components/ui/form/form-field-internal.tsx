import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form"
import FormFieldInternalContext from "./context/form-field-internal-context"

const FormFieldInternal = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldInternalContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldInternalContext.Provider>
  )
}

export default FormFieldInternal
