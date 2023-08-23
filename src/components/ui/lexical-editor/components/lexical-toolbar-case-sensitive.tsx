import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LexicalEditor } from "lexical"
import { CaseSensitive, ChevronDown } from "lucide-react"
import LexicalToolbarFormatText from "./lexical-toolbar-format-text"

export interface LexicalToolbarCaseSensitiveProps {
  editor: LexicalEditor
  actives: {
    isStrikethrough: boolean
    isSubscript: boolean
    isSuperscript: boolean
  }
}

const LexicalToolbarCaseSensitive = ({
  editor,
  actives: { isStrikethrough, isSubscript, isSuperscript },
}: LexicalToolbarCaseSensitiveProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="whitespace-nowrap" variant="ghost" size="sm" type="button">
          <CaseSensitive className="w-5 h-5" />
          <ChevronDown className="ml-2 w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <LexicalToolbarFormatText
            className="!flex w-full justify-start"
            variant="strikethrough"
            editor={editor}
            active={isStrikethrough}
          >
            Strikethrough
          </LexicalToolbarFormatText>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LexicalToolbarFormatText
            className="!flex w-full justify-start"
            variant="subscript"
            editor={editor}
            active={isSubscript}
          >
            Subscript
          </LexicalToolbarFormatText>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LexicalToolbarFormatText
            className="!flex w-full justify-start"
            variant="superscript"
            editor={editor}
            active={isSuperscript}
          >
            Superscript
          </LexicalToolbarFormatText>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LexicalToolbarCaseSensitive
