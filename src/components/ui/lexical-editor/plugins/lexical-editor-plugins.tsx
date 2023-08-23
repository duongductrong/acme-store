import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { EditorState } from "lexical"
import AutoFocusPlugin from "./auto-focus-plugin"
import ImagePlugin from "./image-plugin"
// import { TreeViewPlugin } from "./tree-view-plugin"
// import { TRANSFORMERS } from "@lexical/markdown"
// import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"

export interface LexicalEditorPluginsProps {
  onChange: (editorState: EditorState) => void
}
const LexicalEditorPlugins = ({ onChange }: LexicalEditorPluginsProps) => {
  return (
    <>
      <OnChangePlugin onChange={onChange} />
      <ListPlugin />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <CheckListPlugin />
      <ImagePlugin />
      {/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
      {/* <TreeViewPlugin /> */}
    </>
  )
}

export default LexicalEditorPlugins
