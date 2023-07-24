import { useContext } from "react"
import { GateContext } from "../providers/gate-provider"

export const useGate = () => {
  return useContext(GateContext)
}
