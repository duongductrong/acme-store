import { ReactNode } from "react"

export interface SettingLayoutProps {
  children: ReactNode
}

const SettingLayout = ({ children }: SettingLayoutProps) => {
  return (
    // <SSPanel className="min-h-[calc(100vh-64px-64px)]">
    //   <SSPanelSidebar>
    //     <SSPanelTitle>Settings</SSPanelTitle>

    //     <SSPanelGroup>
    //       {SETTING_ITEMS_SIDEBAR.map((item) => {
    //         return (
    //           <SSPanelGroupContent key={item.id}>
    //             <SSPanelGroupLegend>{item.title}</SSPanelGroupLegend>
    //             {(item?.children ?? []).map((subItem) => {
    //               return (
    //                 <Link key={subItem.id} href={subItem.path ?? "#"}>
    //                   <SSPanelGroupItem active={false}>
    //                     {subItem.title}
    //                   </SSPanelGroupItem>
    //                 </Link>
    //               )
    //             })}
    //           </SSPanelGroupContent>
    //         )
    //       })}
    //     </SSPanelGroup>
    //   </SSPanelSidebar>
    //   <SSPanelContent>{children}</SSPanelContent>
    // </SSPanel>
    children
  )
}

export default SettingLayout
