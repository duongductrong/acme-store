import { ScrollArea } from "@/components/ui/scroll-area"
import { $isCodeNode, CODE_LANGUAGE_MAP } from "@lexical/code"
import { $isListNode, ListNode } from "@lexical/list"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $isHeadingNode } from "@lexical/rich-text"
import { $isParentElementRTL } from "@lexical/selection"
import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from "@lexical/utils"
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  NodeKey,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { useCallback, useEffect, useState } from "react"
import LexicalToolbarBlockFormat, {
  BLOCK_TYPE_TO_BLOCK_NAME,
  BlockType,
} from "./lexical-toolbar-block-format"
import LexicalToolbarCaseSensitive from "./lexical-toolbar-case-sensitive"
import LexicalToolbarFormatAlign from "./lexical-toolbar-format-align"
import LexicalToolbarFormatText from "./lexical-toolbar-format-text"
import LexicalToolbarDivider from "./lexical-toolbar-divider"
import LexicalToolbarSpecializedNode from "./lexical-toolbar-specialized-node"

export interface LexicalToolbarProps {}

const LexicalToolbar = (props: LexicalToolbarProps) => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null)
  const [fontSize, setFontSize] = useState<string>("15px")
  const [fontColor, setFontColor] = useState<string>("#000")
  const [bgColor, setBgColor] = useState<string>("#fff")
  const [fontFamily, setFontFamily] = useState<string>("Arial")
  const [isLink, setIsLink] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isSubscript, setIsSubscript] = useState(false)
  const [isSuperscript, setIsSuperscript] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [isRTL, setIsRTL] = useState(false)
  const [codeLanguage, setCodeLanguage] = useState<string>("")
  const [isEditable, setIsEditable] = useState(() => editor.isEditable())
  const [blockType, setBlockType] = useState<keyof typeof BLOCK_TYPE_TO_BLOCK_NAME>("paragraph")

  const $handleUpdateToolbar = useCallback(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent()
              return parent !== null && $isRootOrShadowRoot(parent)
            })

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow()
      }

      const elementKey = element.getKey()
      const elementDOM = activeEditor.getElementByKey(elementKey)

      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderline(selection.hasFormat("underline"))
      setIsStrikethrough(selection.hasFormat("strikethrough"))
      setIsSubscript(selection.hasFormat("subscript"))
      setIsSuperscript(selection.hasFormat("superscript"))
      setIsCode(selection.hasFormat("code"))
      setIsRTL($isParentElementRTL(selection))

      // Update list, code and heading
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey)

        // Update list
        console.log("$isListNode(element)", $isListNode(element))
        if ($isListNode(element)) {
          console.log("call me")
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)
          const type = parentList ? parentList.getListType() : element.getListType()
          setBlockType(type)
        } else {
          // Update block-type (heading, quote, etc..)
          const type = $isHeadingNode(element) ? element.getTag() : element.getType()
          if (type in BLOCK_TYPE_TO_BLOCK_NAME) {
            setBlockType(type as BlockType)
          }

          // Update codeblock
          if ($isCodeNode(element)) {
            const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP
            setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : "")
            return
          }
        }
      }
    }
  }, [activeEditor])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $handleUpdateToolbar()
        setActiveEditor(newEditor)
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, $handleUpdateToolbar])

  useEffect(() => {
    return mergeRegister(
      // editor.registerEditableListener(() => {
      //   setIsEditable(editable)
      // }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $handleUpdateToolbar()
        })
      })
    )
  }, [activeEditor, editor, $handleUpdateToolbar])

  return (
    <ScrollArea orientation="horizontal">
      <header className="px-3 py-2 border-b border-zin-200 dark:border-zin-800 flex gap-1">
        <LexicalToolbarBlockFormat
          enableBlockTypes={{
            paragraph: true,
            h1: true,
            h2: true,
            h3: true,
            h4: true,
            h5: true,
            h6: true,
            code: true,
            bullet: true,
            check: true,
            number: true,
            quote: true,
          }}
          blockType={blockType}
          editor={editor}
        />

        <LexicalToolbarDivider />

        <LexicalToolbarFormatText variant="bold" active={isBold} editor={activeEditor} />
        <LexicalToolbarFormatText variant="italic" active={isItalic} editor={activeEditor} />
        <LexicalToolbarFormatText variant="underline" active={isUnderline} editor={activeEditor} />
        <LexicalToolbarFormatText variant="code" active={isCode} editor={activeEditor} />

        <LexicalToolbarCaseSensitive
          actives={{ isStrikethrough, isSubscript, isSuperscript }}
          editor={activeEditor}
        />

        <LexicalToolbarDivider />

        <LexicalToolbarSpecializedNode variant="image" editor={activeEditor} />

        <LexicalToolbarFormatAlign editor={editor} />
      </header>
    </ScrollArea>
  )
}

export default LexicalToolbar
