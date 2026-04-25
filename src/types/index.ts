export type Stage = "Pre-seed" | "Seed" | "Series A" | "Series B+";

export type Country = "MX" | "BR" | "CO" | "AR" | "CL" | "PE";

export type Trend = "up" | "down" | "neutral";

export type Sector =
  | "FinTech"
  | "AgriTech"
  | "HealthTech"
  | "PropTech"
  | "EdTech"
  | "ClimaTech"
  | "LogiTech"
  | "B2B SaaS"
  | "Marketplace"
  | "Consumer";

export type ConvictionSignalType = "team" | "market" | "traction" | "product";

export interface ConvictionSignal {
  type: ConvictionSignalType;
  label: string;
  weight: number;
}

export interface PitchDeck {
  url: string;
  updatedAt: string;
  slideCount: number;
}

export interface NewsItem {
  title: string;
  summary: string;
  date: string;
}

export interface Startup {
  id: string;
  name: string;
  stage: Stage;
  sector: Sector[];
  country: Country;
  convictionScore: number;
  trend: Trend;
  fundingAmount?: number;
  foundedYear: number;
  description: string;
  signals: ConvictionSignal[];
  pitchDeck?: PitchDeck;
  website?: string;
  newsItems?: NewsItem[];
}

export interface StartupFilters {
  stages?: Stage[];
  sectors?: Sector[];
  countries?: Country[];
  search?: string;
  sortBy?: "convictionScore" | "fundingAmount" | "foundedYear";
  sortOrder?: "asc" | "desc";
}

// ── UI filter state ────────────────────────────────────────────────────────
export interface FilterState {
  stages: Stage[];
  sectors: Sector[];
  countries: Country[];
  search: string;
}

export const DEFAULT_FILTERS: FilterState = {
  stages: [],
  sectors: [],
  countries: [],
  search: "",
};
