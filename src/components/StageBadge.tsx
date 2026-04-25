import type { Stage } from '../types/index'

const STAGE_STYLES: Record<Stage, { bg: string; text: string }> = {
  'Pre-seed':  { bg: '#FEF3C7', text: '#92400E' },
  'Seed':      { bg: '#DBEAFE', text: '#1E40AF' },
  'Series A':  { bg: '#EDE9FE', text: '#5B21B6' },
  'Series B+': { bg: '#FCE7F3', text: '#9D174D' },
}

export default function StageBadge({ stage }: { stage: Stage }) {
  const style = STAGE_STYLES[stage]
  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {stage}
    </span>
  )
}
