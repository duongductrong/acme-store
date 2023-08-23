import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FORMAT_ELEMENT_COMMAND, LexicalEditor } from "lexical"
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react"

export const FORMAT_ALIGN_TYPE = {
  leftAlign: "leftAlign",
  rightAlign: "rightAlign",
  centerAlign: "centerAlign",
  justifyAlign: "justifyAlign",
} as const

export const FORMAT_ALIGN_TYPE_TO_TEXT = {
  [FORMAT_ALIGN_TYPE.leftAlign]: "Left Align",
  [FORMAT_ALIGN_TYPE.rightAlign]: "Right Align",
  [FORMAT_ALIGN_TYPE.centerAlign]: "Center Align",
  [FORMAT_ALIGN_TYPE.justifyAlign]: "Justify Align",
}

export const FORMAT_ALIGN_TYPE_TO_ICON = {
  [FORMAT_ALIGN_TYPE.leftAlign]: AlignLeft,
  [FORMAT_ALIGN_TYPE.rightAlign]: AlignRight,
  [FORMAT_ALIGN_TYPE.centerAlign]: AlignCenter,
  [FORMAT_ALIGN_TYPE.justifyAlign]: AlignJustify,
}

export const FORMAT_ALIGN_TYPE_COMMAND = {
  [FORMAT_ALIGN_TYPE.leftAlign]: "left",
  [FORMAT_ALIGN_TYPE.rightAlign]: "right",
  [FORMAT_ALIGN_TYPE.centerAlign]: "center",
  [FORMAT_ALIGN_TYPE.justifyAlign]: "justify",
}

export interface LexicalToolbarFormatAlignProps {
  editor: LexicalEditor
}

const LexicalToolbarFormatAlign = ({ editor }: LexicalToolbarFormatAlignProps) => {
  const mapEvents = {
    leftAlign: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left"),
    rightAlign: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right"),
    centerAlign: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center"),
    justifyAlign: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify"),
  } as Record<keyof typeof FORMAT_ALIGN_TYPE, any>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost" className="whitespace-nowrap" type="button">
          <AlignLeft className="w-4 h-4 mr-2" />
          Align
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(FORMAT_ALIGN_TYPE).map(([_, formatAlignType]) => {
          const Icon = FORMAT_ALIGN_TYPE_TO_ICON?.[formatAlignType]
          const handleEvent = mapEvents[formatAlignType]
          return (
            <DropdownMenuItem key={`formatAlign-${formatAlignType}`} onClick={handleEvent}>
              {Icon ? <Icon className="w-4 h-4 mr-2" /> : null}
              {FORMAT_ALIGN_TYPE_TO_TEXT[formatAlignType]}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LexicalToolbarFormatAlign
