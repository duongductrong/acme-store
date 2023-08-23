import { EditorState } from "lexical"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { cva } from "class-variance-authority"
import LexicalToolbar from "./components/lexical-toolbar"
import RegisterNodes from "./nodes/register-nodes"
import LexicalEditorPlugins from "./plugins/lexical-editor-plugins"
import lexicalEditorTheme from "./themes/lexical-editor-theme"

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: unknown) {
  console.error(error)
}

export const lexicalEditorVariants = cva(
  cn(
    "lexical-editor",
    "relative",
    "border border-zinc-200 dark:border-zinc-800",
    "rounded-md",
    "ring-offset-background",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  ),
  {
    variants: {},
    defaultVariants: {},
  }
)

export interface LexicalEditorProps {
  className?: string
  placeholder?: string
}

const LexicalEditor = ({ className, placeholder }: LexicalEditorProps) => {
  const initialConfig = {
    namespace: "MyEditor",
    nodes: RegisterNodes,
    theme: lexicalEditorTheme,
    onError,
  }

  const [editorState, setEditorState] = useState<EditorState>()

  function onChange(editorState: EditorState) {
    setEditorState(editorState)
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={cn(lexicalEditorVariants({ className }))}>
        <LexicalToolbar />
        <div className="editor-shell relative px-3 py-2">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="w-full h-full focus:outline-none min-h-[200px]" />
            }
            placeholder={
              <div className="text-sm absolute top-2 left-3 pointer-events-none text-neutral-500">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>

      <LexicalEditorPlugins onChange={onChange} />
    </LexicalComposer>
  )
}

export default LexicalEditor
