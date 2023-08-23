import { ImageNode } from "@/components/ui/lexical-editor/plugins/image-plugin/nodes/image-node"
import { CodeNode } from "@lexical/code"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import type { Klass, LexicalNode } from "lexical"

const RegisterNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  QuoteNode,
  CodeNode,
  ListNode,
  ListItemNode,
  ImageNode,
]

export default RegisterNodes
