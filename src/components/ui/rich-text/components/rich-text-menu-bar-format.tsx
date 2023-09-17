import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Heading from "@tiptap/extension-heading"
import { useCurrentEditor } from "@tiptap/react"
import {
  CaseSensitive,
  ChevronsUpDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6
} from "lucide-react"

export interface RichTextMenuBarFormatProps {}

const RichTextMenuBarFormat = (props: RichTextMenuBarFormatProps) => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  const textContent = editor.isActive(Heading.name, { level: 1 })
    ? "Heading 1"
    : editor.isActive(Heading.name, { level: 2 })
    ? "Heading 2"
    : editor.isActive(Heading.name, { level: 3 })
    ? "Heading 3"
    : editor.isActive(Heading.name, { level: 4 })
    ? "Heading 4"
    : editor.isActive(Heading.name, { level: 5 })
    ? "Heading 5"
    : editor.isActive(Heading.name, { level: 6 })
    ? "Heading 6"
    : "Paragraph"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {textContent} <ChevronsUpDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 className="w-5 h-5 mr-2" /> Heading 1
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="w-5 h-5 mr-2" /> Heading 2
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="w-5 h-5 mr-2" /> Heading 3
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
          <Heading4 className="w-5 h-5 mr-2" /> Heading 4
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
          <Heading5 className="w-5 h-5 mr-2" /> Heading 5
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}>
          <Heading6 className="w-5 h-5 mr-2" /> Heading 6
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
          <CaseSensitive className="w-5 h-5 mr-2" /> Paragraph
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RichTextMenuBarFormat
