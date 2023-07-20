import { CSCCity, CSCCountry, CSCState } from "@/lib/csc/types"
import { useEffect, useState } from "react"
import { getCitiesByCountry, getCountries, getStatesByCountry } from "."
import { sortBy } from "lodash"

export const useCountries = () => {
  const [countries, setCountries] = useState<CSCCountry[]>([])

  useEffect(() => {
    getCountries().then((_countries) => setCountries(sortBy(_countries, (data) => data.name)))
  }, [])

  return countries
}

export const useCitiesByCountry = (country?: string) => {
  const [cities, setCities] = useState<CSCCity[]>([])

  useEffect(() => {
    if (country) {
      getCitiesByCountry(country).then((cities) => setCities(cities))
    }
  }, [country])

  return cities
}

export const useStatesByCountry = (country?: string) => {
  const [states, setStates] = useState<CSCState[]>([])

  useEffect(() => {
    if (country) {
      getStatesByCountry(country).then((states) =>
        setStates(sortBy(states, (data) => data.name))
      )
    }
  }, [country])

  return states
}
