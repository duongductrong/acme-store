"use client"

import GateProvider, {
  GateProviderProps,
} from "@/components/gates/providers/gate-provider"

export interface AdminProviderProps extends GateProviderProps {}

const AdminProvider = ({
  session,
  role,
  grants,
  children,
}: AdminProviderProps) => {
  return (
    <GateProvider grants={grants} session={session} role={role}>
      {children}
    </GateProvider>
  )
}

export default AdminProvider
