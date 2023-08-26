import React from "react"

export type AsComponentGenericType = React.ElementType

export type AsComponentOrIntrinsicElement<T extends React.ElementType = React.ElementType> =
  | T
  | keyof JSX.IntrinsicElements

export type AsProps<T extends React.ElementType, TData = unknown> = {
  as?: AsComponentOrIntrinsicElement<T>
} & TData

export type AsComponentProps<T extends React.ElementType = "div", ComponentProps> = ComponentProps &
  Omit<React.ComponentPropsWithoutRef<T>, "as">
