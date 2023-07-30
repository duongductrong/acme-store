"use client"

import Form, { FormField } from "@/components/ui/form"
import { useForm } from "react-hook-form"

export interface StoreHeaderSearchProps {}

const StoreHeaderSearch = (props: StoreHeaderSearchProps) => {
  const methods = useForm()
  return (
    <Form {...methods}>
      <form className="ml-auto">
        <FormField
          variant="TEXT"
          name="search"
          placeholder="Search for products..."
          className="bg-transparent min-w-[300px]"
        />
      </form>
    </Form>
  )
}

export default StoreHeaderSearch
