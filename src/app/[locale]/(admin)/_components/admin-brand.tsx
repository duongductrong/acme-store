"use client"

import Text from "@/components/typography/text"
import { cn } from "@/lib/utils"

export interface AdminBrandProps {
  className?: string
}

export default function AdminBrand({ className }: AdminBrandProps) {
  return <h1 className={cn("text-2xl font-bold -tracking-tighter text-white", className)}>ACME.</h1>
}
