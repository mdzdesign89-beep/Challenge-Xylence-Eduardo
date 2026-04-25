// Matches Figma node 22:219 — 272×810px detail panel skeleton
export default function DetailPanelSkeleton() {
  return (
    <aside
      aria-busy="true"
      aria-label="Cargando detalles"
      className="flex h-full w-[272px] shrink-0 flex-col rounded-3xl border border-[#E0E0E0] bg-white overflow-hidden"
    >
      {/* Avatar + name + badge + amount */}
      <div className="flex flex-col items-center px-4 pb-4 pt-6">
        <div className="skeleton-pulse h-20 w-20 rounded-full" />
        <div className="skeleton-pulse mt-3 h-3.5 w-28 rounded" />
        <div className="skeleton-pulse mt-1.5 h-5 w-20 rounded-full" />
        <div className="skeleton-pulse mt-3 h-10 w-14 rounded-lg" />
      </div>

      <hr className="border-[#EDEDED]" />

      {/* Signal rows × 4 */}
      <div className="px-4 py-3">
        <div className="skeleton-pulse mb-3 h-2.5 w-24 rounded" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 py-[11px]">
            <div className="skeleton-pulse h-2.5 w-10 rounded" />
            <div className="skeleton-pulse h-1.5 flex-1 rounded-full" />
            <div className="skeleton-pulse h-2.5 w-6 rounded" />
          </div>
        ))}
      </div>

      <hr className="border-[#EDEDED]" />

      {/* Description lines */}
      <div className="px-4 py-3">
        <div className="skeleton-pulse mb-2 h-2.5 w-20 rounded" />
        <div className="space-y-2">
          <div className="skeleton-pulse h-2 w-full rounded" />
          <div className="skeleton-pulse h-2 w-[85%] rounded" />
          <div className="skeleton-pulse h-2 w-[70%] rounded" />
        </div>
      </div>

      <hr className="border-[#EDEDED]" />

      {/* News items × 2 */}
      <div className="px-4 py-3">
        <div className="skeleton-pulse mb-2 h-2.5 w-14 rounded" />
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-2 py-2">
            <div className="skeleton-pulse h-10 w-10 shrink-0 rounded" />
            <div className="flex flex-col gap-1.5 pt-0.5">
              <div className="skeleton-pulse h-2 w-36 rounded" />
              <div className="skeleton-pulse h-2 w-28 rounded" />
              <div className="skeleton-pulse h-2 w-20 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
