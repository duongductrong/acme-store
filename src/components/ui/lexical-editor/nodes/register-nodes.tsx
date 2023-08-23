import { ImageNode } from "@/components/ui/lexical-editor/plugins/image-plugin/nodes/image-node"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import type { Klass, LexicalNode } from "lexical"

const RegisterNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  ImageNode,
  CodeNode,
  CodeHighlightNode,
]

export default RegisterNodes
