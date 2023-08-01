import React, { HTMLAttributes } from "react"

export interface PreferredHTMLProps extends HTMLAttributes<HTMLElement> {}

const PreferredHTML = (props: PreferredHTMLProps) => {
  return <html {...props} suppressHydrationWarning />
}

export default PreferredHTML
