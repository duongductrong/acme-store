import { createContext } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

type FormFieldInternalContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldInternalContext = createContext<FormFieldInternalContextValue>(
  {} as FormFieldInternalContextValue
);

export default FormFieldInternalContext;
