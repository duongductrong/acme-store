export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
export const UNIQUE_IDENTIFIED = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const GROUP_VARIANT_VALUE_REGEX =
  /\[{id}([^\]]+)\]\[{attributeId}([^\]]+)\]\[{code}([^\]]+)\]\[{name}([^\]]+)\]/
