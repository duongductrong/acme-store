import { STORE_FRONT_URL } from "@/constant/urls"
import { useTranslations } from "next-intl"
import SignUpForm from "./_components/sign-up-form"
import { Metadata } from "next"
import { Link } from "@/components/router"

export interface SignUpProps extends CommonLayoutProps {}

export const metadata: Metadata = {
  title: "Sign up account",
}

const SignUp = () => {
  const t = useTranslations("SIGN_UP")

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{t("TITLE")}</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <SignUpForm redirectTo={STORE_FRONT_URL.AUTH.SIGN_IN} />
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </>
  )
}

export default SignUp
