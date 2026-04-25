import type { Startup } from '../types/index'
import ConvictionScore from './ConvictionScore'
import TrendBadge from './TrendBadge'

interface Props {
  startup: Startup
  selected: boolean
  onClick: () => void
}

export default function StartupCard({ startup: s, selected, onClick }: Props) {
  return (
    <div
      role="row"
      aria-selected={selected}
      onClick={onClick}
      className={[
        'flex h-[53px] cursor-pointer items-center border-b border-[#ededed] transition-colors',
        selected ? 'bg-[#f5f5f5]' : 'bg-white hover:bg-[#fafafa]',
      ].join(' ')}
    >
      {/* Name */}
      <div className="flex w-[212px] shrink-0 items-center px-5">
        <span className="truncate text-sm font-medium text-[#121212]">{s.name}</span>
      </div>

      {/* Stage */}
      <div className="w-[116px] shrink-0 px-5">
        <span className="text-sm text-[#121212]">{s.stage}</span>
      </div>

      {/* Country */}
      <div className="w-[87px] shrink-0 px-5">
        <span className="text-sm text-[#121212]">{s.country}</span>
      </div>

      {/* Sector — first tag + overflow count */}
      <div className="w-[174px] shrink-0 flex items-center gap-1 px-5">
        <span className="inline-block rounded-full bg-[#f8f8f8] px-2 py-0.5 text-xs font-medium tracking-[0.15px] text-[#444]">
          {s.sector[0]}
        </span>
        {s.sector.length > 1 && (
          <span className="text-xs text-[#999]">+{s.sector.length - 1}</span>
        )}
      </div>

      {/* Conviction Score */}
      <div className="w-[251px] shrink-0 px-5">
        <ConvictionScore score={s.convictionScore} />
      </div>

      {/* Trend */}
      <div className="w-[125px] shrink-0 px-5">
        <TrendBadge trend={s.trend} />
      </div>
    </div>
  )
}
