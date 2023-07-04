import SSPanel, {
  SSPanelContent,
  SSPanelGroup,
  SSPanelGroupContent,
  SSPanelGroupItem,
  SSPanelGroupLegend,
  SSPanelSidebar,
  SSPanelTitle,
} from "@/components/sections/ss-panel"
import ProductList from "../../products/page"
import Link from "@/components/navigations/link"

export interface SettingStoreProps {}

export interface SettingItem {
  id: string
  title: string
  path?: string
  children?: SettingItem[]
}

const SettingStore = (props: SettingStoreProps) => {
  const settingItems: SettingItem[] = [
    {
      id: "global",
      title: "Global",
      children: [
        {
          id: "overview",
          title: "Overview",
          path: "/",
        },
        {
          id: "api-tokens",
          title: "API Tokens",
          path: "/",
        },
        {
          id: "media-library",
          title: "Media Library",
          path: "/",
        },
        {
          id: "webhooks",
          title: "Webhooks",
          path: "/",
        },
      ],
    },
    {
      id: "admin-panel",
      title: "Roles & Permissions",
      children: [
        {
          id: "roles",
          title: "Roles",
          path: "/",
        },
      ],
    },
    {
      id: "admin-panel",
      title: "Email",
      children: [
        {
          id: "configuration",
          title: "Configuration",
          path: "/",
        },
        {
          id: "email-template",
          title: "Email templates",
          path: "/",
        },
      ],
    },
  ]

  return (
    <SSPanel className="min-h-[calc(100vh-64px-64px)]">
      <SSPanelSidebar>
        <SSPanelTitle>Settings</SSPanelTitle>

        <SSPanelGroup>
          {settingItems.map((item) => {
            return (
              <SSPanelGroupContent key={item.id}>
                <SSPanelGroupLegend>{item.title}</SSPanelGroupLegend>
                {(item?.children ?? []).map((subItem) => {
                  const isActive = subItem.id === "overview"

                  return (
                    <Link key={subItem.id} href={subItem.path ?? "#"}>
                      <SSPanelGroupItem active={isActive}>
                        {subItem.title}
                      </SSPanelGroupItem>
                    </Link>
                  )
                })}
              </SSPanelGroupContent>
            )
          })}
        </SSPanelGroup>
      </SSPanelSidebar>
      <SSPanelContent>
        <ProductList />
      </SSPanelContent>
    </SSPanel>
  )
}

export default SettingStore
