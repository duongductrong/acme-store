import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { defaultFormatter } from "@trpc/server/dist/error/formatter"
import { useEffect } from "react"

const AutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus()
  }, [editor])

  return null
}
export default AutoFocusPlugin
