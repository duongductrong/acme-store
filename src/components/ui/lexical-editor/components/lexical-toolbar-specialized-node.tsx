import { LexicalEditor } from "lexical"
import { Image } from "lucide-react"
import dynamic from "next/dynamic"

const LexicalToolbarSpecializedImage = dynamic(
  () => import("./lexical-toolbar-specialized-image")
)

export const SPECIALIZED_NODE_VARIANT = {
  image: "image",
} as const

export const SPECIALIZED_NODE_VARIANT_ICON = {
  [SPECIALIZED_NODE_VARIANT.image]: Image,
}

export const SPECIALIZED_NODE = {
  [SPECIALIZED_NODE_VARIANT.image]: LexicalToolbarSpecializedImage,
}

export interface LexicalToolbarSpecializedNodeProps {
  variant: keyof typeof SPECIALIZED_NODE_VARIANT
  editor: LexicalEditor
}

const LexicalToolbarSpecializedNode = ({ variant, editor }: LexicalToolbarSpecializedNodeProps) => {
  const Comp = SPECIALIZED_NODE[variant]

  return <Comp editor={editor} />
}

export default LexicalToolbarSpecializedNode
