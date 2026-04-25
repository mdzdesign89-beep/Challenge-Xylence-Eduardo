// Score bar is always #439AFF — the number communicates the level
interface Props {
  score: number
}

export default function ConvictionScore({ score }: Props) {
  const pct = Math.min(Math.max(score, 0), 100)
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-[#ededed]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#439aff]"
          style={{ width: `${pct}%`, transformOrigin: 'left', animation: 'bar-grow 400ms ease-out both' }}
        />
      </div>
      <span className="w-7 text-left text-xs font-medium text-[#121212]">{score}</span>
    </div>
  )
}
