import { ADMIN_URL } from "@/constant/urls"
import {
  Box,
  Gift,
  Package,
  Shapes,
  SquareStack,
  Users2,
  Workflow,
} from "lucide-react"

export const ADMIN_SIDEBARS = [
  {
    type: "group",
    id: "catalog",
    title: "Catalog",
    children: [
      {
        type: "item",
        id: "products",
        title: "Products",
        link: ADMIN_URL.PRODUCT.LIST,
        Icon: Box,
      },
      {
        type: "item",
        id: "categories",
        title: "Categories",
        Icon: SquareStack,
      },
      {
        type: "item",
        id: "collections",
        title: "Collections",
        Icon: Shapes,
      },
      {
        type: "item",
        id: "attributes",
        title: "Attributes",
        Icon: Workflow,
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
        Icon: Users2,
      },
    ],
  },
  {
    type: "group",
    id: "promotion",
    title: "Promotion",
    children: [
      {
        type: "item",
        id: "coupons",
        title: "Coupons",
        Icon: Gift,
      },
    ],
  },
]
