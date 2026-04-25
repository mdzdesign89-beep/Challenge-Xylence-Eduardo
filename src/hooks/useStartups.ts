import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { fetchStartups } from '../api/mock'
import type { FilterState, Startup } from '../types/index'

export function useStartups() {
  return useQuery({
    queryKey: ['startups'],
    queryFn: () => fetchStartups(),
  })
}

export function useFilteredStartups(startups: Startup[] = [], filters: FilterState) {
  return useMemo(() => {
    let result = [...startups]

    if (filters.stages.length > 0) {
      result = result.filter((s) => filters.stages.includes(s.stage))
    }
    if (filters.sectors.length > 0) {
      result = result.filter((s) => filters.sectors.some((sec) => s.sector.includes(sec)))
    }
    if (filters.countries.length > 0) {
      result = result.filter((s) => filters.countries.includes(s.country))
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.sector.some((sec) => sec.toLowerCase().includes(q)) ||
          s.country.toLowerCase().includes(q),
      )
    }

    return result
  }, [startups, filters])
}
