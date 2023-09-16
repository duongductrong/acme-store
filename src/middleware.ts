import createMiddleware from "next-intl/middleware"
import { i18nConfig } from "./i18n"

export default createMiddleware({
  // A list of all locales that are supported
  locales: i18nConfig.locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: i18nConfig.defaultLocale,

  localeDetection: false,
})

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
