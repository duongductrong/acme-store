import { Session } from "next-auth"
import { HTMLAttributes, createContext } from "react"
import { GateGrantShape } from "../gate"

export interface GateContextShape {
  role: string
  grants: GateGrantShape[],
  session?: Session | null
}

export const GateContext = createContext<GateContextShape>({
  role: "",
  grants: [],
  session: null,
})

export interface GateProviderProps
  extends Pick<HTMLAttributes<HTMLElement>, "children">,
    Pick<GateContextShape, "session" | "role" | "grants"> {}

const GateProvider = ({ role, session, grants, children }: GateProviderProps) => {
  return (
    <GateContext.Provider value={{ grants, role, session }}>
      {children}
    </GateContext.Provider>
  )
}

export default GateProvider
