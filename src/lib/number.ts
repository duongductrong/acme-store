export const decimalNumber = (val: number | string) => {
  return new Intl.NumberFormat().format(Number(val || 0))
}

export const safeParseNumber = (intValueOrNot: number | string | undefined, toValue: number) => {
  return Number.isNaN(Number(intValueOrNot)) ? toValue : Number(intValueOrNot)
}
