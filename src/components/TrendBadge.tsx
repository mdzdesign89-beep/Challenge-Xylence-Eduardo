import type { Trend } from '../types/index'

interface Props {
  trend: Trend
}

const CONFIG: Record<Trend, { bg: string; text: string; label: string }> = {
  up:      { bg: '#e8f5e9', text: '#2e7d32', label: 'Up'      },
  down:    { bg: '#fce4ec', text: '#c62828', label: 'Down'    },
  neutral: { bg: '#fff8e1', text: '#f57f17', label: 'Neutral' },
}

export default function TrendBadge({ trend }: Props) {
  const cfg = CONFIG[trend]
  return (
    <span
      className="inline-block rounded-full px-3 py-0.5 text-xs font-medium"
      style={{ backgroundColor: cfg.bg, color: cfg.text }}
    >
      {cfg.label}
    </span>
  )
}
