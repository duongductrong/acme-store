type ChainKeyPath<T> = T extends object
  ? {
      [K in keyof T]: K | `${K}${ChainKeyPath<T[K]> extends "" ? "" : "."}${ChainKeyPath<T[K]>}`
    }[keyof T]
  : ""
