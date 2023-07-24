import { RESOURCE_KEYS } from "@/constant/resources"
import { ADMIN_URL } from "@/constant/urls"
import { Query } from "accesscontrol"
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
  privilege: {
    resource: string
    actions: (keyof Query)[]
  }
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
        privilege: {
          actions: ["read", "readAny", "readOwn"],
          resource: RESOURCE_KEYS.PRODUCT,
        },
        children: [
          {
            type: "item",
            title: "New",
            id: "new-item",
            link: ADMIN_URL.PRODUCT.NEW,
            Icon: Dot,
            privilege: {
              actions: ["create", "createAny", "createOwn"],
              resource: RESOURCE_KEYS.PRODUCT,
            },
          },
        ],
      },
      {
        type: "item",
        id: "categories",
        title: "Categories",
        link: ADMIN_URL.CATEGORY.LIST,
        Icon: SquareStack,
        privilege: {
          actions: ["read", "readAny", "readOwn"],
          resource: RESOURCE_KEYS.CATEGORY,
        },
      },
      {
        type: "item",
        id: "collections",
        title: "Collections",
        link: ADMIN_URL.COLLECTION.LIST,
        Icon: Shapes,
        privilege: {
          actions: ["read", "readAny", "readOwn"],
          resource: RESOURCE_KEYS.COLLECTION,
        },
      },
      {
        type: "item",
        id: "attributes",
        title: "Attributes",
        link: ADMIN_URL.ATTRIBUTE.LIST,
        Icon: Workflow,
        privilege: {
          actions: ["read", "readAny", "readOwn"],
          resource: RESOURCE_KEYS.ATTRIBUTE,
        },
      },
      {
        type: "item",
        id: "coupons",
        title: "Coupons",
        link: ADMIN_URL.ATTRIBUTE.LIST,
        Icon: Gift,
        privilege: {
          actions: ["read", "readAny", "readOwn"],
          resource: RESOURCE_KEYS.ATTRIBUTE,
        },
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
        privilege: {
          actions: ["read", "readAny", "readOwn"],
          resource: RESOURCE_KEYS.ORDER,
        },
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
        privilege: {
          actions: ["read", "readAny", "readOwn"],
          resource: RESOURCE_KEYS.CUSTOMER,
        },
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
        privilege: {
          actions: ["read", "readAny", "readOwn"],
          resource: RESOURCE_KEYS.MEDIA_LIBRARY,
        },
      },
      {
        type: "item",
        id: "settings",
        title: "Settings",
        link: ADMIN_URL.SETTING.STORE.INFORMATION,
        Icon: Settings,
        privilege: {
          actions: ["read", "readAny", "readOwn"],
          resource: RESOURCE_KEYS.SETTING,
        },
        children: [
          {
            type: "item",
            id: "settings-roles",
            link: ADMIN_URL.SETTING.ROLE.LIST,
            title: "Roles",
            Icon: Dot,
            privilege: {
              actions: ["read", "readAny", "readOwn"],
              resource: RESOURCE_KEYS.ROLE,
            },
          },
        ],
      },
    ],
  },
]
