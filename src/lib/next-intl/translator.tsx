/* eslint-disable react/no-danger-with-children */

"use client"

import { Slot } from "@radix-ui/react-slot"
import { ReactNode } from "react"
import { useTranslations } from "."
import { getTranslator } from "./server"

export interface TranslatorProps {
  text?: Parameters<Awaited<ReturnType<typeof getTranslator>>>["0"]
  html?: Parameters<Awaited<ReturnType<typeof getTranslator>>>["0"]
  values?: Record<string, string | number>
  children?: ReactNode
}

const Translator = ({ text, html, values, children }: TranslatorProps) => {
  const t = useTranslations()

  if (html) {
    let _html: string = t.raw(html) || ""

    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        const regex = new RegExp(`{${key}}`)
        _html = _html.replace(regex, value.toString())
      })
    }

    // Make values working like t.()
    return <Slot dangerouslySetInnerHTML={{ __html: _html }}>{children}</Slot>
  }

  return t(text, values)
}

export default Translator
