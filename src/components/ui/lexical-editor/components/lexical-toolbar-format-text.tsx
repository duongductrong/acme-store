import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical"
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from "lucide-react"
import { ReactElement, ReactNode, cloneElement } from "react"

export const FORMAT_TEXT_TYPE = {
  bold: "bold",
  code: "code",
  italic: "italic",
  strikethrough: "strikethrough",
  subscript: "subscript",
  superscript: "superscript",
  underline: "underline",
} as const

export const FORMAT_TEXT_TYPE_TO_ICON = {
  [FORMAT_TEXT_TYPE.bold]: Bold,
  [FORMAT_TEXT_TYPE.code]: Code,
  [FORMAT_TEXT_TYPE.italic]: Italic,
  [FORMAT_TEXT_TYPE.strikethrough]: Strikethrough,
  [FORMAT_TEXT_TYPE.subscript]: Subscript,
  [FORMAT_TEXT_TYPE.superscript]: Superscript,
  [FORMAT_TEXT_TYPE.underline]: Underline,
}

export interface LexicalToolbarFormatTextProps {
  variant: keyof typeof FORMAT_TEXT_TYPE
  editor: LexicalEditor
  active?: boolean
  children?: ReactNode
  className?: string
}

const LexicalToolbarFormatText = ({
  variant,
  editor,
  active,
  children,
  className,
}: LexicalToolbarFormatTextProps) => {
  const formatTextCommand = FORMAT_TEXT_TYPE[variant]
  const Icon = FORMAT_TEXT_TYPE_TO_ICON[variant]

  const hasChildren = !!children

  return (
    <Button
      size="sm"
      variant={active ? "secondary" : "ghost"}
      onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatTextCommand)}
      className={cn(className)}
    >
      <Icon className={cn("w-4 h-4", hasChildren ? "mr-2" : null)} />
      {children}
    </Button>
  )
}

export default LexicalToolbarFormatText
