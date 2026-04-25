// Matches Figma node 7:255 — table-row skeleton, columns mirror StartupCard
export default function StartupCardSkeleton() {
  return (
    <div
      role="row"
      aria-busy="true"
      className="flex h-[53px] items-center border-b border-[#ededed] bg-white"
    >
      {/* Name */}
      <div className="flex w-[212px] shrink-0 items-center px-5">
        <div className="skeleton-pulse h-2.5 w-28 rounded" />
      </div>
      {/* Stage */}
      <div className="w-[116px] shrink-0 px-5">
        <div className="skeleton-pulse h-2.5 w-16 rounded" />
      </div>
      {/* Country */}
      <div className="w-[87px] shrink-0 px-5">
        <div className="skeleton-pulse h-2.5 w-8 rounded" />
      </div>
      {/* Sector */}
      <div className="w-[174px] shrink-0 px-5">
        <div className="skeleton-pulse h-5 w-20 rounded-full" />
      </div>
      {/* Score */}
      <div className="w-[251px] shrink-0 px-5 flex items-center gap-2">
        <div className="skeleton-pulse h-1.5 w-20 rounded-full" />
        <div className="skeleton-pulse h-2.5 w-6 rounded" />
      </div>
      {/* Trend */}
      <div className="w-[125px] shrink-0 px-5">
        <div className="skeleton-pulse h-5 w-16 rounded-full" />
      </div>
    </div>
  )
}
