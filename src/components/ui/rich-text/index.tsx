import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import { EditorProvider, EditorProviderProps } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import RichTextMenubar from "./components/rich-text-menu-bar"

import "./rich-text.scss"

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({}), // types: [ListItem.name]
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

export interface RichTextProps extends Omit<EditorProviderProps, "children"> {}

export const RichText = ({ ...props }: RichTextProps) => {
  return (
    <EditorProvider {...props} slotBefore={<RichTextMenubar />} extensions={extensions}>
      <div className="w-full"></div>
    </EditorProvider>
  )
}
