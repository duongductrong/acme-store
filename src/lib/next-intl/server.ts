import { dictionaries, i18nConfig } from "@/i18n"
import { RichTranslationValuesPlain } from "next-intl"
import { getTranslator as getTranslatorNextIntl } from "next-intl/server"

type GetTranslatorNextIntlParameters = Parameters<typeof getTranslatorNextIntl>
type GetTranslatorNextIntlResult = ReturnType<Awaited<typeof getTranslatorNextIntl>>

type GetTranslatorNextIntlResultNative = Awaited<GetTranslatorNextIntlResult>
type GetTranslatorNextIntlResultRaw<T> = (key: T) => any
type GetTranslatorNextIntlResultRich<T> = (
  key: T,
  values?: RichTranslationValuesPlain | undefined,
  formats?: any
) => string

type GenericGetTranslatorNextIntlResult<
  TRaw = unknown,
  TRich = unknown
> = GetTranslatorNextIntlResultNative &
  GetTranslatorNextIntlResultRaw<TRaw> &
  GetTranslatorNextIntlResultRich<TRich>

export const getInferLocaleType = (locale: string) => locale as keyof typeof dictionaries

export const getTranslator = async (...args: GetTranslatorNextIntlParameters) => {
  const [locale] = args

  const _locale = getInferLocaleType(locale as string)

  const dictionaryDetails = await (await dictionaries[_locale]).default

  return (await getTranslatorNextIntl(...args)) as GenericGetTranslatorNextIntlResult<
    ChainKeyPath<typeof dictionaryDetails>,
    ChainKeyPath<typeof dictionaryDetails>
  >
}

export const createIntlLink = (locale: keyof typeof dictionaries, link: string) => {
  if (locale === i18nConfig.defaultLocale) {
    return link
  }

  const _link = link.replace(/^\//, "")

  return `/${locale}/${_link}`
}
