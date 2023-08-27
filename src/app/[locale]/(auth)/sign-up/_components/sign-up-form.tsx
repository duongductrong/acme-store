"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"
import FormField from "@/components/ui/form/form-field"
import { useToast } from "@/components/ui/use-toast"
import { STORE_FRONT_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
import { cn } from "@/lib/utils"
import { SignUpSchemaType, signUpSchema } from "@/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

interface SignUpFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  redirectTo: string
}

const SignUpForm = ({ className, ...props }: SignUpFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const t = useTranslations("SIGN_UP")

  const { mutate: createUser, isLoading: loading } = trpc.auth.signUp.useMutation({
    onSuccess() {
      toast({
        title: "Success",
        description: "Sign up new account successfully",
      })

      router.push(STORE_FRONT_URL.AUTH.SIGN_IN)
    },
    onError(error) {
      console.log("error", error.message)
      toast({
        title: "Error",
        description: error.message || "There is an error when signing up for an account.",
        variant: "destructive",
      })
    },
  })

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  })

  const handleSubmit = methods.handleSubmit((values) => createUser(values))

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...methods}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-2 mb-base">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-base">
                <FormField
                  id="firstName"
                  label="First Name"
                  type="text"
                  name="firstName"
                  variant="TEXT"
                  placeholder="Enter first name."
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={loading}
                />
                <FormField
                  id="lastName"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  variant="TEXT"
                  placeholder="Enter last name."
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={loading}
                />
              </div>
              <FormField
                id="email"
                label="Email"
                type="email"
                name="email"
                variant="TEXT"
                placeholder="name@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={loading}
              />
              <FormField
                id="password"
                label="Password"
                type="password"
                name="password"
                variant="TEXT"
                placeholder="Enter your password"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={loading}
              />
            </div>
            <Button disabled={loading}>
              {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
              Sign up an account
            </Button>
          </div>
        </form>
      </Form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        Github
      </Button> */}
    </div>
  )
}

export default SignUpForm
