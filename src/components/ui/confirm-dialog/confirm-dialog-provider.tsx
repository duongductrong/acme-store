"use client"

import { ReactNode, createContext, useRef, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../alert-dialog"
import { AlertTriangle } from "lucide-react"

export interface ConfirmDialogState {
  title?: string
  description?: string
  cancelText?: string
  actionText?: string
  isOpen: boolean
}

export interface ConfirmDialogContextType {
  confirm: (data?: Omit<ConfirmDialogState, "isOpen">) => Promise<unknown>
}

export interface ConfirmDialogProviderProps {
  children?: ReactNode
}

export const ConfirmDialogContext = createContext<ConfirmDialogContextType>({
  confirm: () => new Promise((resolve) => resolve(null)),
})

const ConfirmDialogProvider = ({ children }: ConfirmDialogProviderProps) => {
  const [dialog, setDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    title: "Are you absolutely sure?",
    description:
      "This action cannot be undone. This will permanently affect to your data from our servers.",
    cancelText: "Cancel",
    actionText: "Continue",
  })

  const dialogRef = useRef<(confirm: boolean) => void>(() => null)

  const confirm: ConfirmDialogContextType["confirm"] = (data) => {
    return new Promise((resolve) => {
      setDialog((previousConfirmState) => ({ ...previousConfirmState, ...data, isOpen: true }))

      dialogRef.current = (confirm) => {
        setDialog((prevState) => ({ ...prevState, isOpen: false }))
        resolve(confirm)
      }
    })
  }

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}

      <AlertDialog open={dialog.isOpen} onOpenChange={() => dialogRef.current(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialog.title}</AlertDialogTitle>
            <AlertDialogDescription>{dialog.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => dialogRef.current(false)}>
              {dialog.cancelText}
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => dialogRef.current(true)}>
              {dialog.actionText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDialogContext.Provider>
  )
}

export default ConfirmDialogProvider
