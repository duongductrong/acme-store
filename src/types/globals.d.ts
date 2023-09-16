import { ReactNode } from "react"
import { dictionaries } from "../i18n"

declare global {
  interface CommonLayoutProps {
    children: ReactNode
  }
}

// declare global {
//   // Generic page props
//   interface PageProps<
//     TParams extends Record<string, unknown> = {},
//     TSearchParams extends Record<string, unknown> = {}
//   > {
//     params: TParams & { locale: string }
//     searchParams: TSearchParams
//   }

//   interface LayoutProps<TParams extends unknown = {}, TSearchParams extends unknown = {}>
//     extends PageProps<TParams, TSearchParams> {
//     children: ReactNode
//   }

//   interface GenerateMetadataProps<TParams extends unknown = {}, TSearchParams extends unknown = {}>
//     extends PageProps<TParams, TSearchParams> {}
// }

export type ParamsProps<T extends string = ""> = Omit<
  {
    params: Record<T, string> & { locale: keyof typeof dictionaries }
  },
  ""
>

export type SearchParamsProps<T extends string = ""> = Omit<
  {
    searchParams: Record<T, string>
  },
  ""
>

export type LayoutProps<T extends string = ""> = Omit<
  {
    children: ReactNode
  } & Record<T, ReactNode>,
  ""
>

export type ValuesOf<T> = T[keyof T]
