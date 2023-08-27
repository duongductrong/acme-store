import AuthProvider from "@/components/auth-provider/auth-provider"
import TrpcProvider from "@/components/trpc-provider"
import ConfirmDialogProvider from "@/components/ui/confirm-dialog/confirm-dialog-provider"
import PreferredBody from "@/components/ui/theme/preferred-body"
import PreferredHTML from "@/components/ui/theme/preferred-html"
import PreferredThemeProvider from "@/components/ui/theme/preferred-theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { NextIntlClientProvider, createTranslator } from "next-intl"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { ReactNode } from "react"
import "../globals.css"

export interface RootLayoutProps {
  children: ReactNode
  params: { locale: string }
}

const inter = Inter({ subsets: ["latin"] })

export async function getDirectories(locale: string) {
  try {
    return (await import(`../../../directories/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

// export async function generateStaticParams() {
//   return Object.values(LOCALES).map((locale) => ({ locale }))
// }

export async function generateMetadata({ params: { locale } }: RootLayoutProps): Promise<Metadata> {
  const messages = await getDirectories(locale)

  // You can use the core (non-React) APIs when you have to use next-intl
  // outside of components. Potentially this will be simplified in the future
  // (see https://next-intl-docs.vercel.app/docs/next-13/server-components).
  const t = createTranslator({ locale, messages })

  return {
    title: {
      default: t("PAGE_INFO.TITLE"),
      template: "%s | Acme",
    },
    description: "Acme",
    keywords: "Acme",
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    openGraph: {
      type: "website",
      title: "Acme",
      description: "Acme",
      countryName: "VietNam",
      emails: ["duongductrong06@gmail.com"],
      siteName: "Acme",
      url: "/",
      locale: "vi",
    },
  }
}

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const directories = await getDirectories(locale)

  return (
    <PreferredHTML lang={locale}>
      <PreferredBody
        ifRegexMatch={"^(/admin/)(.+)"}
        then={{ className: "bg-body" }}
        otherwise={{ className: "storefront" }}
        className={cn(inter.className)}
      >
        <PreferredThemeProvider>
          <TrpcProvider>
            <NextIntlClientProvider locale={locale} messages={directories}>
              <ConfirmDialogProvider>
                <AuthProvider>{children}</AuthProvider>
              </ConfirmDialogProvider>
              <Toaster />
            </NextIntlClientProvider>
          </TrpcProvider>
        </PreferredThemeProvider>
      </PreferredBody>
    </PreferredHTML>
  )
}
