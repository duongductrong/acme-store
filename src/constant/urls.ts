export const ADMIN_URL = {
  PRODUCT: {
    LIST: "/admin/products",
    NEW: "/admin/products/new",
    EDIT: "/admin/products/{id}",
  },

  CATEGORY: {
    LIST: "/admin/categories",
    NEW: "/admin/categories/new",
    EDIT: "/admin/categories/{id}",
  },

  COLLECTION: {
    LIST: "/admin/collections",
    NEW: "/admin/collections/new",
    EDIT: "/admin/collections/{id}",
  },

  ATTRIBUTE: {
    LIST: "/admin/attributes",
    NEW: "/admin/attributes/new",
    EDIT: "/admin/attributes/{id}",
  },

  ORDER: {
    LIST: "/admin/orders",
  },

  CUSTOMER: {
    LIST: "/admin/customers",
  },

  MEDIA_LIBRARY: {
    LIST: "/admin/media-libraries",
  },

  SETTING: {
    ROLE: {
      LIST: "/admin/settings/roles",
      NEW: "/admin/settings/roles/new",
      EDIT: "/admin/settings/roles/{id}",
    },
    PERMISSION: {
      LIST: "/admin/settings/permissions",
    },
    STORE: {
      INFORMATION: "/admin/settings/store",
    },
  },
}

export const STORE_FRONT_URL = {
  AUTH: {
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
  },

  HOME: "/",

  PRODUCT: {
    LIST: "/products",
    DETAIL: "/products/{id}",
  },
}
