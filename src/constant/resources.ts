import { ADMIN_URL } from "./urls"

export const RESOURCE_KEYS = {
  PRODUCT: "products",
  CATEGORY: "categories",
  COLLECTION: "collections",
  ATTRIBUTE: "attributes",
  ATTRIBUTE_GROUP: "attribute-groups",
  ORDER: "orders",
  CUSTOMER: "customers",
  MEDIA_LIBRARY: "media-library",
  SETTING: "settings",
  ROLE: "roles",
}

export const SITE_RESOURCES = [
  {
    key: RESOURCE_KEYS.PRODUCT,
    title: "Product",
    paths: {
      [ADMIN_URL.PRODUCT.LIST]: {
        privileges: {
          "read:any": "readAny",
          "read:own": "readOwn",
        },
      },
      [ADMIN_URL.PRODUCT.NEW]: {
        privileges: {
          "create:any": "createAny",
          "create:own": "createOwn",
        },
      },
      [ADMIN_URL.PRODUCT.EDIT]: {
        privileges: {
          "update:any": "updateAny",
          "update:own": "updateOwn",
        },
      },
    },
    privileges: {
      "read:any": "readAny",
      "create:any": "createAny",
      "update:any": "updateAny",
      "delete:any": "deleteAny",
      "read:own": "readOwn",
      "create:own": "createOwn",
      "update:own": "updateOwn",
      "delete:own": "deleteOwn",
    },
  },
  {
    key: RESOURCE_KEYS.CATEGORY,
    title: "Category",
    paths: {
      [ADMIN_URL.CATEGORY.LIST]: {
        privileges: {
          "read:any": "readAny",
          "read:own": "readOwn",
        },
      },
      [ADMIN_URL.CATEGORY.NEW]: {
        privileges: {
          "create:any": "createAny",
          "create:own": "createOwn",
        },
      },
      [ADMIN_URL.CATEGORY.EDIT]: {
        privileges: {
          "update:any": "updateAny",
          "update:own": "updateOwn",
        },
      },
    },
    privileges: {
      "read:any": "readAny",
      "create:any": "createAny",
      "update:any": "updateAny",
      "delete:any": "deleteAny",
      "read:own": "readOwn",
      "create:own": "createOwn",
      "update:own": "updateOwn",
      "delete:own": "deleteOwn",
    },
  },
  {
    key: RESOURCE_KEYS.COLLECTION,
    title: "Collection",
    paths: {
      [ADMIN_URL.COLLECTION.LIST]: {
        privileges: {
          "read:any": "readAny",
          "read:own": "readOwn",
        },
      },
      [ADMIN_URL.COLLECTION.NEW]: {
        privileges: {
          "create:any": "createAny",
          "create:own": "createOwn",
        },
      },
      [ADMIN_URL.COLLECTION.EDIT]: {
        privileges: {
          "update:any": "updateAny",
          "update:own": "updateOwn",
        },
      },
    },
    privileges: {
      "read:any": "readAny",
      "create:any": "createAny",
      "update:any": "updateAny",
      "delete:any": "deleteAny",
      "read:own": "readOwn",
      "create:own": "createOwn",
      "update:own": "updateOwn",
      "delete:own": "deleteOwn",
    },
  },
  {
    key: RESOURCE_KEYS.CUSTOMER,
    title: "Customer",
    paths: {
      [ADMIN_URL.CUSTOMER.LIST]: {
        privileges: {
          "read:any": "readAny",
          "read:own": "readOwn",
        },
      },
    },
    privileges: {
      "read:any": "readAny",
      "create:any": "createAny",
      "update:any": "updateAny",
      "delete:any": "deleteAny",
      "read:own": "readOwn",
      "create:own": "createOwn",
      "update:own": "updateOwn",
      "delete:own": "deleteOwn",
    },
  },
  {
    key: RESOURCE_KEYS.MEDIA_LIBRARY,
    title: "Media Library",
    paths: {},
    privileges: {
      "read:any": "readAny",
      "create:any": "createAny",
      "update:any": "updateAny",
      "delete:any": "deleteAny",
      "read:own": "readOwn",
      "create:own": "createOwn",
      "update:own": "updateOwn",
      "delete:own": "deleteOwn",
    },
  },
  {
    key: RESOURCE_KEYS.ORDER,
    title: "Order",
    paths: {
      [ADMIN_URL.ORDER.LIST]: {
        privileges: {
          "read:any": "readAny",
          "read:own": "readOwn",
        },
      },
    },
    privileges: {
      "read:any": "readAny",
      "create:any": "createAny",
      "update:any": "updateAny",
      "delete:any": "deleteAny",
      "read:own": "readOwn",
      "create:own": "createOwn",
      "update:own": "updateOwn",
      "delete:own": "deleteOwn",
    },
  },
  {
    key: RESOURCE_KEYS.ATTRIBUTE,
    title: "Attribute",
    paths: {
      [ADMIN_URL.ATTRIBUTE.LIST]: {
        privileges: {
          "read:any": "readAny",
          "read:own": "readOwn",
        },
      },
      [ADMIN_URL.ATTRIBUTE.NEW]: {
        privileges: {
          "create:any": "createAny",
          "create:own": "createOwn",
        },
      },
      [ADMIN_URL.ATTRIBUTE.EDIT]: {
        privileges: {
          "update:any": "updateAny",
          "update:own": "updateOwn",
        },
      },
    },
    privileges: {
      "read:any": "readAny",
      "create:any": "createAny",
      "update:any": "updateAny",
      "delete:any": "deleteAny",
      "read:own": "readOwn",
      "create:own": "createOwn",
      "update:own": "updateOwn",
      "delete:own": "deleteOwn",
    },
  },
  {
    key: RESOURCE_KEYS.ATTRIBUTE_GROUP,
    title: "Attribute Group",
    paths: {
      [ADMIN_URL.ATTRIBUTE.LIST]: {
        privileges: {
          "read:any": "readAny",
          "read:own": "readOwn",
        },
      },
      [ADMIN_URL.ATTRIBUTE.NEW]: {
        privileges: {
          "create:any": "createAny",
          "create:own": "createOwn",
        },
      },
      [ADMIN_URL.ATTRIBUTE.EDIT]: {
        privileges: {
          "update:any": "updateAny",
          "update:own": "updateOwn",
        },
      },
    },
    privileges: {
      "read:any": "readAny",
      "create:any": "createAny",
      "update:any": "updateAny",
      "delete:any": "deleteAny",
      "read:own": "readOwn",
      "create:own": "createOwn",
      "update:own": "updateOwn",
      "delete:own": "deleteOwn",
    },
  },
  {
    key: RESOURCE_KEYS.SETTING,
    title: "Setting",
    paths: {
      [ADMIN_URL.SETTING.STORE.INFORMATION]: {
        privileges: {
          "read:any": "readAny",
          "read:own": "readOwn",
        },
      },
      [ADMIN_URL.SETTING.ROLE.LIST]: {
        privileges: {
          "read:any": "readAny",
          "read:own": "readOwn",
        },
      },
      [ADMIN_URL.SETTING.ROLE.NEW]: {
        privileges: {
          "create:any": "createAny",
          "create:own": "createOwn",
        },
      },
      [ADMIN_URL.SETTING.ROLE.EDIT]: {
        privileges: {
          "update:any": "updateAny",
          "update:own": "updateOwn",
        },
      },
    },
    privileges: {
      "read:any": "readAny",
      "create:any": "createAny",
      "update:any": "updateAny",
      "delete:any": "deleteAny",
      "read:own": "readOwn",
      "create:own": "createOwn",
      "update:own": "updateOwn",
      "delete:own": "deleteOwn",
    },
  },
  {
    key: RESOURCE_KEYS.ROLE,
    title: "Role",
    paths: {
      [ADMIN_URL.SETTING.ROLE.LIST]: {
        privileges: {
          "read:any": "readAny",
          "read:own": "readOwn",
        },
      },
      [ADMIN_URL.SETTING.ROLE.NEW]: {
        privileges: {
          "create:any": "createAny",
          "create:own": "createOwn",
        },
      },
      [ADMIN_URL.SETTING.ROLE.EDIT]: {
        privileges: {
          "update:any": "updateAny",
          "update:own": "updateOwn",
        },
      },
    },
    privileges: {
      "read:any": "readAny",
      "create:any": "createAny",
      "update:any": "updateAny",
      "delete:any": "deleteAny",
      "read:own": "readOwn",
      "create:own": "createOwn",
      "update:own": "updateOwn",
      "delete:own": "deleteOwn",
    },
  },
]
