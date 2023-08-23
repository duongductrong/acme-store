import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list"
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  DEPRECATED_$isGridSelection,
  LexicalEditor,
} from "lexical"
import {
  Check,
  ChevronDown,
  Code,
  Hash,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  LucideIcon,
  Quote,
  Text,
} from "lucide-react"

import { $createCodeNode } from "@lexical/code"
import { $createHeadingNode, $createQuoteNode, HeadingTagType } from "@lexical/rich-text"
import { $setBlocksType } from "@lexical/selection"

export type BlockType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "number"
  | "paragraph"
  | "quote"
  | "bullet"
  | "check"
  | "code"

export const BLOCK_TYPE_TO_BLOCK_NAME = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
} as Record<BlockType, string>

export const BLOCK_TYPE_TO_ICON = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  number: Hash,
  paragraph: Text,
  quote: Quote,
  bullet: List,
  check: Check,
  code: Code,
} as Record<BlockType, LucideIcon>

export interface LexicalToolbarBlockFormatProps {
  blockType: keyof typeof BLOCK_TYPE_TO_BLOCK_NAME
  editor: LexicalEditor
  enableBlockTypes: Partial<Record<BlockType, true>>
}

const LexicalToolbarBlockFormat = ({
  editor,
  blockType,
  enableBlockTypes = {
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
    number: true,
    paragraph: true,
    quote: true,
    bullet: true,
    check: true,
    code: true,
  },
}: LexicalToolbarBlockFormatProps) => {
  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize))
      }
    })
  }

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection()

        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode())
          } else {
            const textContent = selection.getTextContent()
            const codeNode = $createCodeNode()
            selection.insertNodes([codeNode])
            selection = $getSelection()
            if ($isRangeSelection(selection)) selection.insertRawText(textContent)
          }
        }
      })
    }
  }

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
  }

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      console.log("not me")
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatCheckList = () => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode())
        }
      })
    }
  }

  const handleEvents = {
    h1: () => formatHeading("h1"),
    h2: () => formatHeading("h2"),
    h3: () => formatHeading("h3"),
    h4: () => formatHeading("h4"),
    h5: () => formatHeading("h5"),
    h6: () => formatHeading("h6"),
    paragraph: formatParagraph,
    check: formatCheckList,
    bullet: formatBulletList,
    number: formatNumberedList,
    quote: formatQuote,
    code: formatCode,
  } as Record<BlockType, any>

  const CurrentBlockIcon = BLOCK_TYPE_TO_ICON[blockType]
  const blockFormatKeys = Object.keys(enableBlockTypes)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost" className="whitespace-nowrap" type="button">
          <CurrentBlockIcon className="w-4 h-4 mr-2" />
          {BLOCK_TYPE_TO_BLOCK_NAME[blockType]}
          <ChevronDown className="ml-2 w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {blockFormatKeys.map((blockType) => {
          const Icon = BLOCK_TYPE_TO_ICON?.[blockType as BlockType]
          const blockName = BLOCK_TYPE_TO_BLOCK_NAME[blockType as BlockType]
          const handleEvent = handleEvents[blockType as BlockType]

          return (
            <DropdownMenuItem key={`blockType-${blockType}`} onClick={handleEvent}>
              {" "}
              <Icon className="mr-2 w-4 h-4" /> {blockName}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LexicalToolbarBlockFormat
