import { getRequestConfig } from "next-intl/server"

export const i18nConfig = {
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localeDetection: false,
} as const

export const dictionaries = {
  en: import("./dictionaries/en"),
  vi: import("./dictionaries/vi"),
} as const

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./dictionaries/${locale}.ts`)).default,
}))
