import dynamic from "next/dynamic"
import { Skeleton } from "../skeleton"

export const FormInput = dynamic(() => import("./components/form-input"), {
  ssr: true,
  loading: () => <Skeleton className="h-[40px] w-full" />,
})

export const FormTextarea = dynamic(() => import("./components/form-textarea"), {
  ssr: true,
  loading: () => <Skeleton className="h-[150px] w-full" />,
})

export const FormCheckbox = dynamic(() => import("./components/form-checkbox"), {
  ssr: true,
  loading: () => <Skeleton className="h-[40px] w-full" />,
})

export const RadioGroup = dynamic(() => import("./components/form-radio-group"), {
  ssr: true,
})

export const FormSelect = dynamic(() => import("./components/form-select"), {
  ssr: true,
  loading: () => <Skeleton className="h-[40px] w-full" />,
})

export const FormSelectInfinite = dynamic(() => import("./components/form-select-infinite"), {
  ssr: true,
  loading: () => <Skeleton className="h-[40px] w-full" />,
})

export const FormUID = dynamic(() => import("./components/form-uid"), {
  ssr: true,
  loading: () => <Skeleton className="h-[40px] w-full" />,
})

export const FormNumber = dynamic(() => import("./components/form-number"), {
  ssr: true,
  loading: () => <Skeleton className="h-[40px] w-full" />,
})

export const FormRichText = dynamic(() => import("./components/form-rich-text"), {
  ssr: true,
  loading: () => <Skeleton className="h-[200px] w-full" />,
})

export const FormDatePicker = dynamic(() => import("./components/form-datepicker"), {
  ssr: true,
  loading: () => <Skeleton className="h-[40px] w-full" />,
})
