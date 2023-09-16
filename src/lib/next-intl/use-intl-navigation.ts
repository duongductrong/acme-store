"use client"

import { i18nConfig } from "@/i18n"
import { useLocale } from "next-intl"

export const useIntlNavigation = () => {
  const locale = useLocale()

  const createLink = (link: string) => {
    // without /[locale]
    if (locale === i18nConfig.defaultLocale) {
      return link
    }

    // with /[locale]
    return `/${locale}${link}`
  }

  return { createLink, locale }
}
