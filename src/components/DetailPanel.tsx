import type { Startup, ConvictionSignalType, NewsItem } from '../types/index'

const SIGNAL_LABEL: Record<ConvictionSignalType, string> = {
  team:     'Team',
  market:   'Market',
  traction: 'Traction',
  product:  'Product',
}

function SignalBar({ type, label, weight }: { type: ConvictionSignalType; label: string; weight: number }) {
  const score = Math.round(Math.min(weight, 1) * 100)
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#121212]">{SIGNAL_LABEL[type]}</span>
        <span className="text-xs font-semibold text-[#121212]">{score}</span>
      </div>
      <div className="relative h-[5px] overflow-hidden rounded-full bg-[#ededed]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#439aff]"
          style={{ width: `${score}%`, transformOrigin: 'left', animation: 'bar-grow 400ms ease-out both' }}
        />
      </div>
      <p className="text-[11px] leading-[15px] text-[#666]">{label}</p>
    </div>
  )
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="flex gap-2.5">
      <div className="h-[60px] w-[72px] shrink-0 rounded-lg bg-[#e8e8e8]" />
      <div className="flex flex-col gap-0.5">
        <p className="text-[12px] font-semibold leading-[16px] text-[#121212]">{item.title}</p>
        <p className="text-[11px] leading-[15px] text-[#666]">{item.summary}</p>
        <p className="mt-0.5 text-[10px] text-[#999]">{item.date}</p>
      </div>
    </div>
  )
}

function formatFunding(amount: number): string {
  if (amount >= 1_000_000) return `USD ${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000)    return `USD ${(amount / 1_000).toFixed(0)}K`
  return `USD ${amount}`
}

interface Props {
  startup: Startup
}

export default function DetailPanel({ startup: s }: Props) {
  const avgWeight = s.signals.length > 0
    ? s.signals.reduce((sum, sig) => sum + sig.weight, 0) / s.signals.length
    : 0

  return (
    <aside className="flex h-full w-[272px] shrink-0 flex-col gap-5 overflow-y-auto rounded-3xl border border-[#e0e0e0] bg-white px-[17px] py-[25px] scrollbar-thin">

      {/* Avatar + name + sector tags */}
      <div className="flex flex-col items-center gap-0">
        <div className="h-20 w-20 rounded-[40px] bg-[#d9d9d9]" />
        <div className="mt-[12px] w-full text-center text-[18px] font-bold leading-snug text-[#121212]">
          {s.name}
        </div>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {s.sector.map((sec) => (
            <span
              key={sec}
              className="rounded-full bg-[#f8f8f8] px-2 py-0.5 text-xs font-medium text-[#444]"
            >
              {sec}
            </span>
          ))}
        </div>
      </div>

      {/* Score + signal bars */}
      <div className="border-b border-[#ededed] pb-5">
        <div className="text-center text-[42px] font-bold leading-none text-[#121212]">
          {s.convictionScore}
        </div>
        <div className="mt-[6px] text-center text-[13px] text-[#999]">Conviction Score</div>

        {s.signals.length > 0 && (
          <div className="mt-[18px] flex flex-col gap-3">
            {s.signals.map((sig) => (
              <SignalBar key={sig.type} type={sig.type} label={sig.label} weight={sig.weight} />
            ))}
          </div>
        )}

        {s.signals.length > 0 && (
          <div className="mt-3 flex items-center justify-between border-t border-[#ededed] pt-2">
            <span className="text-xs text-[#999]">Avg. signal weight</span>
            <span className="text-xs font-semibold text-[#121212]">
              {Math.round(avgWeight * 100)}
            </span>
          </div>
        )}
      </div>

      {/* Funding + year */}
      <div className="border-b border-[#ededed] pb-5">
        <p className="text-[14px] font-bold tracking-[0.15px] text-[#121212]">Funding</p>
        <p className="mt-1 text-[14px] tracking-[0.15px] text-[#121212]">
          {s.fundingAmount != null ? formatFunding(s.fundingAmount) : '—'}
        </p>
        <p className="mt-1 text-[13px] text-[#999]">Founded {s.foundedYear}</p>
      </div>

      {/* Description */}
      <div className="border-b border-[#ededed] pb-5">
        <p className="text-[14px] font-bold tracking-[0.15px] text-[#121212]">Description</p>
        <p className="mt-1 text-[14px] leading-[21px] tracking-[0.15px] text-[#121212]">
          {s.description}
        </p>
      </div>

      {/* Pitch deck */}
      {s.pitchDeck && (
        <div className="border-b border-[#ededed] pb-5">
          <p className="text-[14px] font-bold tracking-[0.15px] text-[#121212]">Pitch Deck</p>
          <a
            href={s.pitchDeck.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-[14px] tracking-[0.15px] text-[#1055c9] hover:underline"
          >
            View deck · {s.pitchDeck.slideCount} slides
          </a>
          <p className="mt-0.5 text-[12px] text-[#999]">Updated {s.pitchDeck.updatedAt}</p>
        </div>
      )}

      {/* Website */}
      {s.website && (
        <div className="border-b border-[#ededed] pb-5">
          <p className="text-[14px] font-bold tracking-[0.15px] text-[#121212]">Website</p>
          <a
            href={`https://${s.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-[14px] tracking-[0.15px] text-[#1055c9] hover:underline"
          >
            {s.website}
          </a>
        </div>
      )}

      {/* News */}
      {s.newsItems && s.newsItems.length > 0 && (
        <div>
          <p className="text-[14px] font-bold tracking-[0.15px] text-[#121212]">News</p>
          <div className="mt-3 flex flex-col gap-3">
            {s.newsItems.map((item, i) => (
              <NewsCard key={i} item={item} />
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
