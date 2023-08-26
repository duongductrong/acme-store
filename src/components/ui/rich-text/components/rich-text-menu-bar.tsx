import { Button } from "@/components/ui/button"
import { useCurrentEditor } from "@tiptap/react"
import { Bold, Code, Italic, Redo, Strikethrough, Undo } from "lucide-react"
import { ScrollArea } from "../../scroll-area"
import RichTextMenuBarFormat from "./rich-text-menu-bar-format"

export interface RichTextMenubarProps {}

const RichTextMenubar = (props: RichTextMenubarProps) => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <ScrollArea orientation="horizontal">
      <div className="flex items-center gap-1 border border-zin-200 dark:border-zin-800 rounded-md p-1">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="w-4 h-4" />
        </Button>

        <RichTextMenuBarFormat />

        <Button
          variant={editor.isActive("bold") ? "secondary" : "ghost"}
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant={editor.isActive("italic") ? "secondary" : "ghost"}
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant={editor.isActive("strike") ? "secondary" : "ghost"}
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Button
          variant={editor.isActive("code") ? "secondary" : "ghost"}
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          <Code className="w-4 h-4" />
        </Button>
        {/* <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          clear marks
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          clear nodes
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          paragraph
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          bullet list
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          ordered list
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <Code2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <Quote className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          horizontal rule
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          hard break
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""}
        >
          purple
        </Button> */}
      </div>
    </ScrollArea>
  )
}

export default RichTextMenubar
