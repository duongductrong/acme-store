// import React from "react"

// declare module "react" {
//   function forwardRef<T, P = {}>(
//     render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
//   ): (props: P & React.RefAttributes<T>) => React.ReactNode | null
// }

// export type AsComponentGenericType = React.ElementType

// export type AsComponentOrIntrinsicElement<T extends React.ElementType = React.ElementType> =
//   | T
//   | keyof JSX.IntrinsicElements

// export type AsProps<T extends React.ElementType, TData = unknown> = {
//   as?: AsComponentOrIntrinsicElement<T>
// } & TData

// export type AsComponentProps<T extends React.ElementType = "div", ComponentProps> = ComponentProps &
//   Omit<React.ComponentPropsWithoutRef<T>, "as">
