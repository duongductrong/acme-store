import { useContext } from "react"
import { GalleryRootContext } from "./gallery-root"

export const useGallery = () => {
  const context = useContext(GalleryRootContext)

  return context
}
