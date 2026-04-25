const ICONS = [
  {
    id: 'feed',
    active: true,
    label: 'Feed',
    path: 'M3 6h12M3 10h12M3 14h8',
  },
  {
    id: 'portfolio',
    active: false,
    label: 'Portfolio',
    path: 'M3 3h5v5H3zM10 3h5v5h-5zM3 10h5v5H3zM10 10h5v5h-5z',
  },
  {
    id: 'analytics',
    active: false,
    label: 'Analytics',
    path: 'M3 15l4-6 4 3 4-8',
  },
  {
    id: 'settings',
    active: false,
    label: 'Configuración',
    path: 'M9 9m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M9 2v1M9 16v1M2 9h1M16 9h1',
  },
]

export default function Sidebar() {
  return (
    <aside className="flex w-[77px] shrink-0 flex-col items-center gap-1 border-r border-[#E5E7EB] bg-white py-4">
      {ICONS.map((icon) => (
        <button
          key={icon.id}
          type="button"
          title={icon.label}
          aria-label={icon.label}
          aria-current={icon.active ? 'page' : undefined}
          className={[
            'flex h-11 w-11 flex-col items-center justify-center rounded-xl transition-colors',
            icon.active
              ? 'bg-[#121212] text-white'
              : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#121212]',
          ].join(' ')}
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d={icon.path} />
          </svg>
        </button>
      ))}
    </aside>
  )
}
