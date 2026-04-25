interface Props {
  search: string
  onSearch: (v: string) => void
}

export default function Navbar({ search, onSearch }: Props) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-[#ededed] bg-white px-5">
      {/* Left: hamburger + logo */}
      <div className="flex items-center gap-3">
        <button type="button" aria-label="Menu" className="text-[#121212]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <span className="text-[17px] font-bold tracking-tight text-[#121212]">Xylence</span>
      </div>

      {/* Center: search */}
      <div className="mx-auto flex w-full max-w-[420px] items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#999]">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search startups, sectors..."
          className="flex-1 bg-transparent text-sm text-[#121212] placeholder-[#999] outline-none"
        />
      </div>

      {/* Right: bell + avatar */}
      <div className="flex items-center gap-3">
        <button type="button" aria-label="Notificaciones" className="relative text-[#555]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2a5.5 5.5 0 0 0-5.5 5.5v2.75L3 12.5h14l-1.5-2.25V7.5A5.5 5.5 0 0 0 10 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M8.25 15.5a1.75 1.75 0 0 0 3.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#121212] text-xs font-bold text-white">
          A
        </div>
      </div>
    </header>
  )
}
