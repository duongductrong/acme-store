export const formatCurrency = (val: number | string, locale: "en-US") => {
  const _currency = {
    "en-US": "USD",
  }?.[locale]

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: _currency ?? "USD",
  }).format(Number(val || 0))
}
