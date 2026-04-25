import { useState, useMemo, useEffect, useRef } from 'react'
import { useStartups } from './hooks/useStartups'
import type { Startup } from './types/index'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import StartupCard from './components/StartupCard'
import StartupCardSkeleton from './components/StartupCardSkeleton'
import DetailPanel from './components/DetailPanel'
import DetailPanelSkeleton from './components/DetailPanelSkeleton'
import TrendBadge from './components/TrendBadge'

// ── Types ──────────────────────────────────────────────────────────────────
type SortKey = 'name' | 'stage' | 'country' | 'sector' | 'convictionScore' | 'trend'
type SortDir = 'asc' | 'desc'
type ViewMode = 'list' | 'grid'

type ColFilters = {
  search: string
  stages: string[]
  countries: string[]
  sectors: string[]
  trends: string[]
}

const DEFAULT_COL: ColFilters = { search: '', stages: [], countries: [], sectors: [], trends: [] }

const STAGE_OPTS   = ['Pre-seed', 'Seed', 'Series A', 'Series B+']
const COUNTRY_OPTS = ['AR', 'BR', 'CL', 'CO', 'MX', 'PE']
const SECTOR_OPTS  = ['AgriTech', 'B2B SaaS', 'ClimaTech', 'Consumer', 'EdTech', 'FinTech', 'HealthTech', 'LogiTech', 'Marketplace', 'PropTech']
const TREND_OPTS   = ['up', 'down', 'neutral']
const TREND_LABELS: Record<string, string> = { up: 'Up', down: 'Down', neutral: 'Neutral' }

const ROWS_PER_PAGE = 10

// ── Filterable column header ───────────────────────────────────────────────
function FilterColHeader({
  label,
  filterType,
  options,
  optionLabel,
  filterValue,
  searchValue,
  onSearch,
  onFilterChange,
  sortKey,
  current,
  dir,
  onSort,
  width,
  isOpen,
  onToggle,
}: {
  label: string
  filterType: 'search' | 'multiselect' | 'sort-only'
  options?: string[]
  optionLabel?: (v: string) => string
  filterValue?: string[]
  searchValue?: string
  onSearch?: (v: string) => void
  onFilterChange?: (v: string[]) => void
  sortKey: SortKey
  current: SortKey
  dir: SortDir
  onSort: (k: SortKey) => void
  width: string
  isOpen: boolean
  onToggle: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const active    = current === sortKey
  const hasFilter = filterType === 'search'
    ? !!searchValue?.trim()
    : (filterValue?.length ?? 0) > 0

  useEffect(() => {
    if (!isOpen) return
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onToggle()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, onToggle])

  const toggleOpt = (opt: string) => {
    if (!onFilterChange || !filterValue) return
    onFilterChange(
      filterValue.includes(opt) ? filterValue.filter((v) => v !== opt) : [...filterValue, opt],
    )
  }

  return (
    <div ref={ref} className={`relative flex ${width} shrink-0 items-center`}>
      {/* Label — clickable for filter open (except sort-only) */}
      <button
        type="button"
        onClick={filterType !== 'sort-only' ? onToggle : () => onSort(sortKey)}
        className={`flex flex-1 cursor-pointer items-center gap-1.5 px-5 text-xs font-medium transition-colors ${
          active || hasFilter ? 'text-[#121212]' : 'text-[#999] hover:text-[#666]'
        }`}
      >
        {label}
        {hasFilter && filterType === 'multiselect' && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#439AFF] text-[9px] font-bold text-white">
            {filterValue?.length}
          </span>
        )}
        {hasFilter && filterType === 'search' && (
          <span className="h-1.5 w-1.5 rounded-full bg-[#439AFF]" />
        )}
        {filterType !== 'sort-only' && (
          <svg
            width="10" height="10" viewBox="0 0 10 10" fill="none"
            className={`ml-auto shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Sort arrow (always visible for sort-only, right side for others) */}
      {filterType !== 'sort-only' ? (
        <button
          type="button"
          onClick={() => onSort(sortKey)}
          title="Sort"
          className={`mr-3 shrink-0 transition-colors ${active ? 'text-[#121212]' : 'text-[#d0d0d0] hover:text-[#999]'}`}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            {active && dir === 'asc'  ? <path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> :
             active && dir === 'desc' ? <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> : (
              <>
                <path d="M2 4l4-2 4 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                <path d="M2 8l4 2 4-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </>
            )}
          </svg>
        </button>
      ) : (
        /* sort-only header — full button is the sort trigger */
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mr-3 shrink-0">
          {active && dir === 'asc'  ? <path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> :
           active && dir === 'desc' ? <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> : (
            <>
              <path d="M2 4l4-2 4 2" stroke={active ? 'currentColor' : '#999'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              <path d="M2 8l4 2 4-2" stroke={active ? 'currentColor' : '#999'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
            </>
          )}
        </svg>
      )}

      {/* Dropdown */}
      {isOpen && filterType !== 'sort-only' && (
        <div className="absolute top-full left-0 z-30 mt-1 min-w-[180px] rounded-xl border border-[#ededed] bg-white p-2 shadow-lg">
          {filterType === 'search' ? (
            <div className="relative">
              <svg className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 8L10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search by name…"
                value={searchValue ?? ''}
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full rounded-lg border border-[#E5E7EB] py-1.5 pl-7 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#439AFF]"
              />
            </div>
          ) : (
            <div className="flex max-h-48 flex-col gap-0.5 overflow-y-auto">
              {options?.map((opt) => (
                <label key={opt} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-[#374151] hover:bg-[#F3F4F6]">
                  <input
                    type="checkbox"
                    checked={filterValue?.includes(opt) ?? false}
                    onChange={() => toggleOpt(opt)}
                    className="accent-[#439AFF]"
                  />
                  {optionLabel ? optionLabel(opt) : opt}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Pills row ──────────────────────────────────────────────────────────────
function PillsRow({ col, onChange }: { col: ColFilters; onChange: (f: ColFilters) => void }) {
  type Pill = { group: keyof ColFilters; value: string; label: string }
  const pills: Pill[] = [
    ...(col.search ? [{ group: 'search' as const, value: col.search, label: `"${col.search}"` }] : []),
    ...col.stages.map((v) => ({ group: 'stages' as const, value: v, label: v })),
    ...col.countries.map((v) => ({ group: 'countries' as const, value: v, label: v })),
    ...col.sectors.map((v) => ({ group: 'sectors' as const, value: v, label: v })),
    ...col.trends.map((v) => ({ group: 'trends' as const, value: v, label: TREND_LABELS[v] ?? v })),
  ]

  if (pills.length === 0) return null

  const remove = (pill: Pill) => {
    if (pill.group === 'search') {
      onChange({ ...col, search: '' })
    } else {
      onChange({ ...col, [pill.group]: (col[pill.group] as string[]).filter((v) => v !== pill.value) })
    }
  }

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-1.5 border-b border-[#ededed] px-4 py-2">
      {pills.map((pill) => (
        <span
          key={`${pill.group}-${pill.value}`}
          className="flex items-center gap-1 rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-medium text-[#439AFF]"
        >
          {pill.label}
          <button
            type="button"
            onClick={() => remove(pill)}
            className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[#439AFF] transition-colors hover:bg-[#439AFF] hover:text-white"
          >
            ×
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={() => onChange(DEFAULT_COL)}
        className="text-xs text-[#999] underline hover:text-[#121212]"
      >
        Clear all
      </button>
    </div>
  )
}

// ── Pagination ─────────────────────────────────────────────────────────────
function Pagination({ total, page, perPage, onChange }: { total: number; page: number; perPage: number; onChange: (p: number) => void }) {
  const pages = Math.ceil(total / perPage)
  const from  = (page - 1) * perPage + 1
  const to    = Math.min(page * perPage, total)
  return (
    <div className="flex items-center justify-between border-t border-[#ededed] px-5 py-3">
      <span className="text-xs text-[#999]">{from}–{to} of {total}</span>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onChange(page - 1)} disabled={page === 1}
          className="flex h-7 w-7 items-center justify-center rounded border border-[#ededed] text-[#666] disabled:opacity-30">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        {Array.from({ length: pages }).map((_, i) => (
          <button key={i} type="button" onClick={() => onChange(i + 1)}
            className={`flex h-7 w-7 items-center justify-center rounded border text-xs transition-colors ${
              page === i + 1 ? 'border-[#121212] bg-[#121212] font-medium text-white' : 'border-[#ededed] text-[#666] hover:bg-[#f5f5f5]'
            }`}>
            {i + 1}
          </button>
        ))}
        <button type="button" onClick={() => onChange(page + 1)} disabled={page === pages}
          className="flex h-7 w-7 items-center justify-center rounded border border-[#ededed] text-[#666] disabled:opacity-30">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  )
}

// ── Greeting ───────────────────────────────────────────────────────────────
function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 18) return 'Good Afternoon'
  return 'Good Evening'
}
function todayLabel() {
  return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// ── Grid card ──────────────────────────────────────────────────────────────
function GridCard({ startup: s, selected, onClick }: { startup: Startup; selected: boolean; onClick: () => void }) {
  const r    = 32
  const circ = 2 * Math.PI * r
  const arc  = circ * (s.convictionScore / 100)
  return (
    <div role="button" onClick={onClick}
      className={['flex flex-col gap-3 rounded-2xl border p-4 cursor-pointer transition-colors',
        selected ? 'border-[#121212] bg-white shadow-sm' : 'border-[#ededed] bg-white hover:border-[#c8c8c8]',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold leading-snug text-[#121212]">{s.name}</p>
          <p className="mt-0.5 text-xs text-[#999]">{s.country} · {s.stage}</p>
        </div>
        <TrendBadge trend={s.trend} />
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="self-start rounded-full bg-[#f8f8f8] px-2.5 py-0.5 text-xs font-medium text-[#444]">{s.sector[0]}</span>
          {s.sector.length > 1 && <span className="text-xs text-[#999]">+{s.sector.length - 1} more</span>}
        </div>
        <div className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center">
          <svg width="76" height="76" viewBox="0 0 76 76" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="38" cy="38" r={r} fill="none" stroke="#ededed" strokeWidth="6" />
            <circle cx="38" cy="38" r={r} fill="none" stroke="#439AFF" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ - arc}
              style={{ '--ring-start': circ, '--ring-end': circ - arc, animation: 'ring-draw 400ms ease-out both' } as React.CSSProperties}
            />
          </svg>
          <span className="absolute text-[17px] font-bold text-[#121212]">{s.convictionScore}</span>
        </div>
      </div>
    </div>
  )
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const { data: startups = [], isLoading, isError } = useStartups()

  const [col, setCol]                = useState<ColFilters>(DEFAULT_COL)
  const [selectedId, setSelectedId]  = useState<string | null>(null)
  const [sortKey, setSortKey]        = useState<SortKey>('convictionScore')
  const [sortDir, setSortDir]        = useState<SortDir>('desc')
  const [page, setPage]              = useState(1)
  const [viewMode, setViewMode]      = useState<ViewMode>('list')
  const [openFilter, setOpenFilter]  = useState<string | null>(null)

  useEffect(() => {
    if (startups.length > 0 && selectedId === null) setSelectedId(startups[0].id)
  }, [startups, selectedId])

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir(key === 'convictionScore' ? 'desc' : 'asc') }
    setPage(1)
  }

  const handleCol = (f: ColFilters) => { setCol(f); setPage(1) }

  const toggleOpen = (key: string) =>
    setOpenFilter((prev) => (prev === key ? null : key))

  const filtered = useMemo(() => {
    let list = [...startups]

    if (col.search.trim()) {
      const q = col.search.toLowerCase()
      list = list.filter((s) => s.name.toLowerCase().includes(q))
    }
    if (col.stages.length > 0)    list = list.filter((s) => col.stages.includes(s.stage as string))
    if (col.countries.length > 0) list = list.filter((s) => col.countries.includes(s.country as string))
    if (col.sectors.length > 0)   list = list.filter((s) => col.sectors.some((sec) => (s.sector as string[]).includes(sec)))
    if (col.trends.length > 0)    list = list.filter((s) => col.trends.includes(s.trend as string))

    list.sort((a, b) => {
      let va: string | number = sortKey === 'sector'
        ? (a.sector[0] ?? '')
        : (a[sortKey as keyof Startup] as string | number)
      let vb: string | number = sortKey === 'sector'
        ? (b.sector[0] ?? '')
        : (b[sortKey as keyof Startup] as string | number)
      if (typeof va === 'string') va = va.toLowerCase()
      if (typeof vb === 'string') vb = vb.toLowerCase()
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return list
  }, [startups, col, sortKey, sortDir])

  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)
  const selected  = startups.find((s) => s.id === selectedId) ?? null
  const handleSelect = (s: Startup) => setSelectedId((prev) => (prev === s.id ? null : s.id))

  const colHeaderProps = { current: sortKey, dir: sortDir, onSort: handleSort }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f8f8f8]">
      <Navbar
        search={col.search}
        onSearch={(v) => handleCol({ ...col, search: v })}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex flex-1 flex-col gap-4 overflow-hidden p-6">
          <div>
            <h1 className="text-2xl font-bold text-[#121212]">{greeting()}, Alex</h1>
            <p className="mt-1 text-base text-[#666]">Today, {todayLabel()}</p>
          </div>

          <div className="flex flex-1 gap-4 overflow-hidden">
            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-[#ededed] bg-white">

              {/* Card header */}
              <div className="flex shrink-0 items-center justify-between border-b border-[#ededed] px-5 py-3">
                <span className="text-sm font-semibold text-[#121212]">Startups feed</span>
                <div className="flex items-center gap-1 rounded-lg border border-[#ededed] p-0.5">
                  <button type="button" title="List" onClick={() => setViewMode('list')}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors ${viewMode === 'list' ? 'bg-[#121212] text-white' : 'text-[#666] hover:bg-[#f5f5f5]'}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M2 7h10M2 10.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    List
                  </button>
                  <button type="button" title="Grid" onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors ${viewMode === 'grid' ? 'bg-[#121212] text-white' : 'text-[#666] hover:bg-[#f5f5f5]'}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                      <rect x="8"   y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                      <rect x="1.5" y="8"   width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                      <rect x="8"   y="8"   width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                    Grid
                  </button>
                </div>
              </div>

              {/* Active filter pills */}
              {!isLoading && <PillsRow col={col} onChange={handleCol} />}

              {/* Column headers (list view only) */}
              {viewMode === 'list' && (
                <div className="flex shrink-0 items-center border-b border-[#ededed] py-2">
                  <FilterColHeader label="Name" filterType="search"
                    searchValue={col.search} onSearch={(v) => handleCol({ ...col, search: v })}
                    sortKey="name" {...colHeaderProps} width="w-[212px]"
                    isOpen={openFilter === 'name'} onToggle={() => toggleOpen('name')} />

                  <FilterColHeader label="Stage" filterType="multiselect"
                    options={STAGE_OPTS} filterValue={col.stages}
                    onFilterChange={(v) => handleCol({ ...col, stages: v })}
                    sortKey="stage" {...colHeaderProps} width="w-[116px]"
                    isOpen={openFilter === 'stage'} onToggle={() => toggleOpen('stage')} />

                  <FilterColHeader label="Country" filterType="multiselect"
                    options={COUNTRY_OPTS} filterValue={col.countries}
                    onFilterChange={(v) => handleCol({ ...col, countries: v })}
                    sortKey="country" {...colHeaderProps} width="w-[87px]"
                    isOpen={openFilter === 'country'} onToggle={() => toggleOpen('country')} />

                  <FilterColHeader label="Sector" filterType="multiselect"
                    options={SECTOR_OPTS} filterValue={col.sectors}
                    onFilterChange={(v) => handleCol({ ...col, sectors: v })}
                    sortKey="sector" {...colHeaderProps} width="w-[174px]"
                    isOpen={openFilter === 'sector'} onToggle={() => toggleOpen('sector')} />

                  <FilterColHeader label="Conviction Score" filterType="sort-only"
                    sortKey="convictionScore" {...colHeaderProps} width="w-[251px]"
                    isOpen={false} onToggle={() => {}} />

                  <FilterColHeader label="Trend" filterType="multiselect"
                    options={TREND_OPTS} optionLabel={(v) => TREND_LABELS[v] ?? v}
                    filterValue={col.trends}
                    onFilterChange={(v) => handleCol({ ...col, trends: v })}
                    sortKey="trend" {...colHeaderProps} width="w-[125px]"
                    isOpen={openFilter === 'trend'} onToggle={() => toggleOpen('trend')} />
                </div>
              )}

              {/* Rows / Grid */}
              <div className={`flex-1 overflow-y-auto scrollbar-thin ${viewMode === 'grid' ? 'p-4' : ''}`}>
                {isLoading && viewMode === 'list' && Array.from({ length: 8 }).map((_, i) => <StartupCardSkeleton key={i} />)}
                {isLoading && viewMode === 'grid' && (
                  <div className="grid grid-cols-4 gap-3">
                    {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-[130px] animate-pulse rounded-xl bg-[#f3f4f6]" />)}
                  </div>
                )}
                {isError && <div className="flex h-32 items-center justify-center text-sm text-[#999]">Error loading data. Please try again.</div>}
                {!isLoading && !isError && filtered.length === 0 && (
                  <div className="flex h-32 flex-col items-center justify-center gap-1 text-sm text-[#999]">
                    <span>No results found</span>
                    <button type="button" onClick={() => handleCol(DEFAULT_COL)} className="text-xs text-[#439aff] underline">Clear filters</button>
                  </div>
                )}
                {!isLoading && !isError && viewMode === 'list' && paginated.map((s) => (
                  <StartupCard key={s.id} startup={s} selected={s.id === selectedId} onClick={() => handleSelect(s)} />
                ))}
                {!isLoading && !isError && viewMode === 'grid' && (
                  <div className="grid grid-cols-4 gap-3">
                    {paginated.map((s) => (
                      <GridCard key={s.id} startup={s} selected={s.id === selectedId} onClick={() => handleSelect(s)} />
                    ))}
                  </div>
                )}
              </div>

              {!isLoading && filtered.length > 0 && (
                <Pagination total={filtered.length} page={page} perPage={ROWS_PER_PAGE} onChange={setPage} />
              )}
            </div>

            {isLoading && <DetailPanelSkeleton />}
            {!isLoading && selected && <DetailPanel startup={selected} />}
          </div>
        </main>
      </div>
    </div>
  )
}
