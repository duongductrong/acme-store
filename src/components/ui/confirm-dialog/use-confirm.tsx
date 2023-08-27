import { useContext } from "react"
import { ConfirmDialogContext } from "./confirm-dialog-provider"

export const useConfirm = () => {
  const { confirm } = useContext(ConfirmDialogContext)

  return confirm
}
