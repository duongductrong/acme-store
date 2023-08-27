// Role-based access control (rbac)

// let grantsObject = {
//   admin: {
//     video: {
//       "create:any": ["*", "!views"],
//       "read:any": ["*"],
//       "update:any": ["*", "!views"],
//       "delete:any": ["*"],
//     },
//   },
//   user: {
//     video: {
//       "create:own": ["*", "!rating", "!views"],
//       "read:own": ["*"],
//       "update:own": ["*", "!rating", "!views"],
//       "delete:own": ["*"],
//     },
//   },
// }

export const privilegeType = {
  READ_ANY: "read:any",
  READ_OWN: "read:own",

  CREATE_ANY: "create:any",
  CREATE_OWN: "create:own",

  UPDATE_ANY: "update:any",
  UPDATE_OWN: "update:own",

  DELETE_ANY: "delete:any",
  DELETE_OWN: "delete:own",
} as const

export const privileges = [
  {
    label: privilegeType.READ_ANY,
    value: privilegeType.READ_ANY,
  },
  {
    label: privilegeType.CREATE_ANY,
    value: privilegeType.CREATE_ANY,
  },
  {
    label: privilegeType.UPDATE_ANY,
    value: privilegeType.UPDATE_ANY,
  },
  {
    label: privilegeType.DELETE_ANY,
    value: privilegeType.DELETE_ANY,
  },
  {
    label: privilegeType.READ_OWN,
    value: privilegeType.READ_OWN,
  },
  {
    label: privilegeType.CREATE_OWN,
    value: privilegeType.CREATE_OWN,
  },
  {
    label: privilegeType.UPDATE_OWN,
    value: privilegeType.UPDATE_OWN,
  },
  {
    label: privilegeType.DELETE_OWN,
    value: privilegeType.DELETE_OWN,
  },
]
