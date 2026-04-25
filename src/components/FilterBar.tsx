import { useRef, useState, useEffect } from 'react'
import type { FilterState } from '../types/index'
import { STAGE_OPTIONS, SECTOR_OPTIONS, COUNTRY_OPTIONS } from '../api/mock'

interface MultiSelectProps {
  label: string
  options: string[]
  value: string[]
  onChange: (val: string[]) => void
}

function MultiSelect({ label, options, value, onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggle = (opt: string) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])

  const clear = (e: React.MouseEvent) => { e.stopPropagation(); onChange([]) }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={[
          'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors',
          value.length > 0
            ? 'border-[#439AFF] bg-[#EFF6FF] text-[#439AFF]'
            : 'border-[#E5E7EB] bg-white text-[#374151] hover:bg-gray-50',
        ].join(' ')}
      >
        <span>{label}</span>
        {value.length > 0 && (
          <>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#439AFF] text-[10px] text-white">
              {value.length}
            </span>
            <span role="button" aria-label={`Clear ${label}`} onClick={clear} className="text-[#439AFF] hover:text-[#1d7fe0]">×</span>
          </>
        )}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full z-20 mt-1 min-w-[160px] rounded-xl border border-[#E5E7EB] bg-white p-1.5 shadow-lg">
          {options.map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-[#374151] hover:bg-[#F3F4F6]">
              <input type="checkbox" checked={value.includes(opt)} onChange={() => toggle(opt)} className="accent-[#439AFF]" />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

interface Props {
  filters: FilterState
  onChange: (f: FilterState) => void
  total: number
  filtered: number
}

export default function FilterBar({ filters, onChange, total, filtered }: Props) {
  const set = <K extends keyof FilterState>(key: K, val: FilterState[K]) =>
    onChange({ ...filters, [key]: val })

  const hasActiveFilters =
    filters.stages.length > 0 ||
    filters.sectors.length > 0 ||
    filters.countries.length > 0 ||
    filters.search.trim() !== ''

  return (
    <div className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2">
      <MultiSelect label="Stage"   options={STAGE_OPTIONS}   value={filters.stages}    onChange={(v) => set('stages', v as FilterState['stages'])} />
      <MultiSelect label="Sector"  options={SECTOR_OPTIONS}  value={filters.sectors}   onChange={(v) => set('sectors', v as FilterState['sectors'])} />
      <MultiSelect label="País"    options={COUNTRY_OPTIONS} value={filters.countries} onChange={(v) => set('countries', v as FilterState['countries'])} />

      <div className="mx-1 h-5 w-px bg-[#E5E7EB]" />

      {/* Search */}
      <div className="relative ml-auto">
        <svg className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder="Search startup..."
          value={filters.search}
          onChange={(e) => set('search', e.target.value)}
          className="w-44 rounded-lg border border-[#E5E7EB] bg-white py-1.5 pl-8 pr-3 text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#439AFF]"
        />
      </div>

      <span className="ml-1 shrink-0 text-xs text-[#6B7280]">{filtered}/{total}</span>
      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => onChange({ stages: [], sectors: [], countries: [], search: '' })}
          className="shrink-0 text-xs text-[#6B7280] underline hover:text-[#121212]"
        >
          Clear
        </button>
      )}
    </div>
  )
}
