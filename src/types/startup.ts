export type Stage = 'Pre-seed' | 'Seed' | 'Series A' | 'Series B'
export type Trend = 'up' | 'down' | 'neutral'

export interface ConvictionSignals {
  team: number      // 0–100
  market: number
  traction: number
  product: number
}

export interface NewsItem {
  id: string
  title: string
  body: string
  source: string
  date: string
}

export type SignalType = 'positive' | 'negative' | 'news'

export interface KeySignal {
  id: string
  text: string
  type: SignalType
}

export interface Startup {
  id: string
  name: string
  logoInitials: string
  logoColor: string
  description: string
  stage: Stage
  sector: string
  country: string
  countryCode: string   // 2-letter ISO, e.g. "MX"
  countryFlag: string
  convictionScore: number
  trend: Trend
  trendValue: string
  signals: ConvictionSignals
  fundingAmount?: string
  foundedYear?: number
  teamSize?: number
  website?: string
  keySignals: KeySignal[]
  newsItems: NewsItem[]
}

export interface FilterState {
  stages: string[]
  sectors: string[]
  countries: string[]
  sortBy: 'score_desc' | 'score_asc' | 'name_asc' | 'trend_up'
  search: string
}

export const DEFAULT_FILTERS: FilterState = {
  stages: [],
  sectors: [],
  countries: [],
  sortBy: 'score_desc',
  search: '',
}
