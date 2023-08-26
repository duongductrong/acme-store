import { InputProps } from "@/components/ui/input"
import { RichText } from "@/components/ui/rich-text"
import { EditorProviderProps } from "@tiptap/react"
import { ChangeEvent } from "react"

export interface FormRichTextProps extends InputProps {}

const FormRichText = ({ value, onBlur, onChange }: FormRichTextProps) => {
  const handleUpdateContents: EditorProviderProps["onUpdate"] = ({ editor }) => {
    onChange && onChange(editor.getHTML() as unknown as ChangeEvent<HTMLInputElement>)
  }

  return (
    <RichText
      content={value as string}
      onBlur={({ event }) => onBlur && onBlur(event as any)}
      onUpdate={handleUpdateContents}
    />
  )
}

export default FormRichText
