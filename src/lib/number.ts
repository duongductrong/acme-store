export const decimalNumber = (val: number | string) => {
  return new Intl.NumberFormat().format(Number(val || 0))
}
