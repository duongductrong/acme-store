import { useRef } from "react"
import { useIntersection } from "react-use"

export const useDimensions = <TRef extends HTMLElement>() => {
  const ref = useRef<TRef>(null)

  const insertionElement = useIntersection(ref, { threshold: 0.2 })

  return { ref, dimensions: insertionElement?.boundingClientRect }
}
