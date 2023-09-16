import { getGrantsFromPrivileges } from "@/components/gates/lib/accesscontrol"
import { STORE_FRONT_URL } from "@/constant/urls"
import { authOptions } from "@/lib/next-auth"
import prisma from "@/lib/prisma"
import { RoleScope } from "@prisma/client"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import AdminMainBar from "./_components/admin-main-bar"
import AdminNavigationBar from "./_components/admin-navigation-bar"
import AdminSidebar from "./_components/admin-sidebar"
import AdminProvider from "./_providers/admin-provider"

export const revalidate = false

export interface AdminLayoutProps extends CommonLayoutProps {}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const currentSession = await getServerSession(authOptions)
  const currentUserRole = await prisma.role.findFirst({
    where: { id: currentSession?.user.roleId },
  })

  const isMissingUserSession = !currentSession
  const isNotInAdminScope = currentUserRole?.scope !== RoleScope.Admin

  if (isMissingUserSession) redirect(STORE_FRONT_URL.AUTH.SIGN_IN)
  if (isNotInAdminScope) return redirect(STORE_FRONT_URL.HOME)

  return (
    <AdminProvider
      session={currentSession}
      role={currentUserRole?.id as string}
      grants={getGrantsFromPrivileges(currentUserRole?.privileges, currentUserRole?.id as string)}
    >
      <div className="flex">
        <AdminSidebar
          user={{
            role: currentUserRole?.id as string,
            privileges: currentUserRole?.privileges,
          }}
        />
        <AdminMainBar>
          <AdminNavigationBar />
          <div className="px-6 py-8">{children}</div>
        </AdminMainBar>
      </div>
    </AdminProvider>
  )
}

export default AdminLayout
