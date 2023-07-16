import React from "react"
import SignInForm from "./_components/sign-in-form"

export interface SignInProps {}

export const metadata = {
  title: "Login",
}

const SignIn = (props: SignInProps) => {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Enter your account to sign-in to the system
        </p>
      </div>
      <SignInForm />
    </>
  )
}

export default SignIn
