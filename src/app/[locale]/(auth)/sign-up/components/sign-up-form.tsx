"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"
import FormUnified from "@/components/ui/form/form-unified"
import { useToast } from "@/components/ui/use-toast"
import { STORE_FRONT_URL } from "@/constant/urls"
import trpc from "@/lib/trpc/trpc-client"
import { cn } from "@/lib/utils"
import { SignUpSchemaType, signUpSchema } from "@/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

interface SignUpFormProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  redirectTo: string
}

const SignUpForm = ({ className, ...props }: SignUpFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const t = useTranslations("SIGN_UP")

  const { mutate: createUser, isLoading: loading } =
    trpc.auth.signUp.useMutation({
      onSuccess() {
        toast({
          title: "Success",
          description: "Sign up new account successfully",
        })

        router.push(STORE_FRONT_URL.AUTH.SIGN_IN)
      },
      onError() {
        toast({
          title: "Error",
          description: "There is an error when signing up for an account.",
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
            <div className="grid gap-2 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormUnified
                  id="firstName"
                  label="First Name"
                  type="text"
                  name="firstName"
                  variant="TEXT_INPUT"
                  placeholder="Enter first name."
                  textInputProps={{
                    autoCapitalize: "none",
                    autoComplete: "email",
                    autoCorrect: "off",
                  }}
                  disabled={loading}
                />
                <FormUnified
                  id="lastName"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  variant="TEXT_INPUT"
                  placeholder="Enter last name."
                  textInputProps={{
                    autoCapitalize: "none",
                    autoComplete: "email",
                    autoCorrect: "off",
                  }}
                  disabled={loading}
                />
              </div>
              <FormUnified
                id="email"
                label="Email"
                type="email"
                name="email"
                variant="TEXT_INPUT"
                placeholder="name@example.com"
                textInputProps={{
                  autoCapitalize: "none",
                  autoComplete: "email",
                  autoCorrect: "off",
                }}
                disabled={loading}
              />
              <FormUnified
                id="password"
                label="Password"
                type="password"
                name="password"
                variant="TEXT_INPUT"
                placeholder="Enter your password"
                textInputProps={{
                  autoCapitalize: "none",
                  autoComplete: "email",
                  autoCorrect: "off",
                }}
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
