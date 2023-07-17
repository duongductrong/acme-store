import AdminMainBar from "./_components/admin-main-bar"
import AdminNavigationBar from "./_components/admin-navigation-bar"
import AdminSidebar from "./_components/admin-sidebar"

export const revalidate = false

export interface AdminLayoutProps extends CommonLayoutProps {}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminMainBar>
        <AdminNavigationBar />
        <div className="px-6 py-8">{children}</div>
      </AdminMainBar>
    </div>
  )
}

export default AdminLayout
