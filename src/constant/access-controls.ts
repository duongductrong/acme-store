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

export const policies = [
  {
    label: "read:any",
    value: "read:any",
  },
  {
    label: "create:any",
    value: "create:any",
  },
  {
    label: "update:any",
    value: "update:any",
  },
  {
    label: "delete:any",
    value: "delete:any",
  },
  {
    label: "read:own",
    value: "read:own",
  },
  {
    label: "create:own",
    value: "create:own",
  },
  {
    label: "update:own",
    value: "update:own",
  },
  {
    label: "delete:own",
    value: "delete:own",
  },
]
