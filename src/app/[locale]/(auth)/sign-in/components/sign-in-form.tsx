"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"
import FormField from "@/components/ui/form/form-field"
import { useToast } from "@/components/ui/use-toast"
import { STORE_FRONT_URL } from "@/constant/urls"
import { cn } from "@/lib/utils"
import { SignInSchemaType, signInSchema } from "@/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const SignInForm = ({ className, ...props }: SignInFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "123Qweasd",
    },
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const handleSubmit = methods.handleSubmit(async (values) => {
    setIsLoading(true)

    signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((response) => {
        if (response?.error) {
          methods.setError("email", {
            message: "The credentials is invalid",
          })
          methods.setFocus("email")

          toast({
            title: "Error",
            description: "The credentials is invalid",
            variant: "destructive",
          })
          return
        }

        router.push(STORE_FRONT_URL.HOME)
      })
      .catch((error) => {
        methods.setError("email", {
          message: "The credentials is invalid",
        })
        methods.setFocus("email")
      })
      .finally(() => {
        setIsLoading(false)
      })
  })

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...methods}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-2 mb-base">
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
              Sign in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignInForm
