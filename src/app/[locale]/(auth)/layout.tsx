"use client"

import { Link } from "@/components/router"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Command } from "lucide-react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { SIGN_IN_URL, SIGN_UP_URL } from "./urls"

export interface AuthLayoutProps extends CommonLayoutProps {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const t = useTranslations("PAGE_INFO")
  const pathname = usePathname()

  const ctaContents = {
    [SIGN_IN_URL]: {
      title: "Sign up",
      url: SIGN_UP_URL,
    },
    [SIGN_UP_URL]: {
      title: "Sign in",
      url: SIGN_IN_URL,
    },
  }

  const currentCtaContent = ctaContents[pathname as keyof typeof ctaContents]

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href={currentCtaContent?.url}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          {currentCtaContent?.title}
        </Link>
        <div className="relative h-full hidden lg:flex flex-col bg-muted p-10 text-white dark:border-r">
          <div className="absolute inset-0 bg-zinc-800" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Command className="mr-2 h-6 w-6" /> {t("TITLE")}
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and helped me deliver
                stunning designs to my clients faster than ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
