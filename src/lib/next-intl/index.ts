import { useTranslations as useNextIntlTranslations } from "next-intl"
import { getTranslator } from "./server"

export const useTranslations = () =>
  useNextIntlTranslations() as unknown as Awaited<ReturnType<typeof getTranslator>>
