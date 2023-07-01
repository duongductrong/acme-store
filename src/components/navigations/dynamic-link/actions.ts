"use server"

import { cookies } from "next/headers"

export const revalidateByCookie = () => {
  const time = new Date().getTime()

  cookies().set("revalidate_path", time.toString())

  return { revalidated: true, now: time }
}
