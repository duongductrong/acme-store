"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"
import FormUnified from "@/components/ui/form/form-unified"
import { cn } from "@/lib/utils"
import { z } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const SignUpForm = ({ className, ...props }: SignUpFormProps) => {
  const methods = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email().min(10),
        password: z.string().min(8),
        firstName: z.string(),
        lastName: z.string(),
      })
    ),
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function handleSubmit() {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
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
