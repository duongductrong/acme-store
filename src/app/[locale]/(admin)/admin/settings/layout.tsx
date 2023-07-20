import Link from "@/components/navigations/link"
import SSPanel, {
  SSPanelContent,
  SSPanelGroup,
  SSPanelGroupContent,
  SSPanelGroupItem,
  SSPanelGroupLegend,
  SSPanelSidebar,
  SSPanelTitle,
} from "@/components/sections/ss-panel"
import { ReactNode } from "react"
import { SETTING_ITEMS_SIDEBAR } from "./constant"

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
