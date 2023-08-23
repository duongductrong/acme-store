import React from "react"

export interface LexicalToolbarDividerProps {}

const LexicalToolbarDivider = (props: LexicalToolbarDividerProps) => {
  return (
    <div className="w-[1px] min-w-[1px] max-w-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800 mx-1 rounded-md" />
  )
}

export default LexicalToolbarDivider
