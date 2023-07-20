import { CSCCity, CSCCountry, CSCState } from "@/lib/csc/types"

export const COUNTRY_STATE_CITY_API_KEY =
  "NkFVSDBBSnAyOVJPMEM1eHI1c3lqbHZUM1Z6Y0pJSlJpNEQ3dUExdw=="

export const generateCSCCommonHeader = () => {
  var headers = new Headers()
  headers.append("X-CSCAPI-KEY", COUNTRY_STATE_CITY_API_KEY)

  return headers
}

export const getBaseURL = () => {
  return "https://api.countrystatecity.in/v1"
}

export const getCountries: () => Promise<CSCCountry[]> = () => {
  const headers = generateCSCCommonHeader()

  return fetch(`${getBaseURL()}/countries`, {
    headers,
    method: "GET",
    redirect: "follow",
    next: { revalidate: 60 },
  }).then((response) => response.json())
}

export const getCitiesByCountry: (countryIOS2: string) => Promise<CSCCity[]> = (
  countryIOS2
) => {
  const headers = generateCSCCommonHeader()

  return fetch(`${getBaseURL()}/countries/${countryIOS2}/cities`, {
    method: "GET",
    headers: headers,
    redirect: "follow",
    next: { revalidate: 60 },
  }).then((response) => response.json())
}

export const getStatesByCountry: (
  countryIOS2: string
) => Promise<CSCState[]> = (countryIOS2) => {
  var headers = generateCSCCommonHeader()

  return fetch(`${getBaseURL()}/countries/${countryIOS2}/states`, {
    method: "GET",
    headers: headers,
    redirect: "follow",
    next: { revalidate: 60 },
  }).then((response) => response.json())
}
