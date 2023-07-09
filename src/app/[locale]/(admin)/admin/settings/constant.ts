import { ADMIN_URL } from "@/constant/urls"

export interface SettingSidebarItem {
  id: string
  title: string
  path?: string
  children?: SettingSidebarItem[]
}

export const SETTING_ITEMS_SIDEBAR: SettingSidebarItem[] = [
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
        path: ADMIN_URL.SETTING.ROLE.LIST,
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
