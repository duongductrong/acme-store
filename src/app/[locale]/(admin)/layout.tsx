import { generateGrantsListFromPolicies } from "@/components/gates/lib/accesscontrol"
import { authOptions } from "@/lib/next-auth"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import AdminMainBar from "./_components/admin-main-bar"
import AdminNavigationBar from "./_components/admin-navigation-bar"
import AdminSidebar from "./_components/admin-sidebar"
import AdminProvider from "./_providers/admin-provider"

export const revalidate = false

export interface AdminLayoutProps extends CommonLayoutProps {}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const currentSession = await getServerSession(authOptions)
  const currentUserRole = await prisma.roleBased.findFirst({
    where: { id: currentSession?.user.roleId },
  })

  return (
    <AdminProvider
      session={currentSession}
      role={currentUserRole?.id as string}
      grants={generateGrantsListFromPolicies(currentUserRole?.policies, currentUserRole?.id as string)}
    >
      <div className="flex">
        <AdminSidebar
          user={{
            role: currentUserRole?.id as string,
            policies: currentUserRole?.policies,
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
