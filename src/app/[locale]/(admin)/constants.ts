import { ADMIN_URL } from "@/constant/urls"
import {
  Box,
  Dot,
  Gift,
  Image,
  LucideIcon,
  Package,
  Settings,
  Shapes,
  SquareStack,
  Users2,
  Workflow,
} from "lucide-react"

export interface AdminSidebarGroup {
  type: "group"
  id: string
  title: string
  children?: AdminSidebarItem[]
}

export interface AdminSidebarItem {
  type: "item"
  id: string
  title: string
  link: string
  Icon?: LucideIcon
  children?: AdminSidebarItem[]
}

export type UnionAdminSidebarItem = AdminSidebarItem | AdminSidebarGroup

export const ADMIN_SIDEBARS: UnionAdminSidebarItem[] = [
  {
    type: "group",
    id: "general",
    title: "General",
    children: [
      {
        type: "item",
        id: "products",
        title: "Products",
        link: ADMIN_URL.PRODUCT.LIST,
        Icon: Box,
        children: [
          {
            type: "item",
            title: "New",
            id: "new-item",
            link: ADMIN_URL.PRODUCT.NEW,
            Icon: Dot,
          },
        ],
      },
      {
        type: "item",
        id: "categories",
        title: "Categories",
        link: ADMIN_URL.CATEGORY.LIST,
        Icon: SquareStack,
      },
      {
        type: "item",
        id: "collections",
        title: "Collections",
        link: ADMIN_URL.COLLECTION.LIST,
        Icon: Shapes,
      },
      {
        type: "item",
        id: "attributes",
        title: "Attributes",
        link: ADMIN_URL.ATTRIBUTE.LIST,
        Icon: Workflow,
      },
      {
        type: "item",
        id: "coupons",
        title: "Coupons",
        link: ADMIN_URL.ATTRIBUTE.LIST,
        Icon: Gift,
      },
    ],
  },
  {
    type: "group",
    id: "sale",
    title: "Sale",
    children: [
      {
        type: "item",
        id: "orders",
        title: "Orders",
        link: ADMIN_URL.ORDER.LIST,
        Icon: Package,
      },
    ],
  },
  {
    type: "group",
    id: "customer",
    title: "Customer",
    children: [
      {
        type: "item",
        id: "customers",
        title: "Customers",
        link: ADMIN_URL.CUSTOMER.LIST,
        Icon: Users2,
      },
    ],
  },
  {
    type: "group",
    id: "systems",
    title: "Systems",
    children: [
      {
        type: "item",
        id: "media-library",
        title: "Media Library",
        link: ADMIN_URL.MEDIA_LIBRARY.LIST,
        Icon: Image,
      },
      {
        type: "item",
        id: "settings",
        title: "Settings",
        link: ADMIN_URL.SETTING.STORE.INFORMATION,
        Icon: Settings,
        children: [
          {
            type: "item",
            id: "settings-roles",
            link: ADMIN_URL.SETTING.ROLE.LIST,
            title: "Roles",
            Icon: Dot,
          },
        ],
      },
    ],
  },
]
