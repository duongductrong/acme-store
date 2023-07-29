import { useContext } from "react"
import { AssistantRouterContext } from "../providers/assistant-router-provider"

export const useAssistantRouter = () => {
  return useContext(AssistantRouterContext)
}
