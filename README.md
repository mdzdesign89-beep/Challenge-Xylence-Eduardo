# Xylence — Startup Intelligence Feed

Frontend technical challenge for Xylence, a startup intelligence platform for VC investors in LATAM.

## Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** — styling, no external UI component libraries
- **TanStack Query v5** — async data fetching with loading/error states

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project structure

```
src/
├── api/
│   └── mock.ts           # fetchStartups() — 900ms simulated latency, 15 mock startups
├── types/
│   └── index.ts          # Startup, FilterState, KeySignal, NewsItem, ConvictionSignals…
├── hooks/
│   └── useStartups.ts    # useStartups() + useFilteredStartups() via React Query
├── components/
│   ├── Navbar.tsx         # Top bar with search
│   ├── Sidebar.tsx        # Icon navigation sidebar
│   ├── FilterBar.tsx      # Stage / Sector / Country multi-select dropdowns
│   ├── StartupCard.tsx    # Table row: Name | Stage | Country | Sector | Score | Trend
│   ├── StartupCardSkeleton.tsx
│   ├── DetailPanel.tsx    # Right-side panel: signals, description, news
│   ├── DetailPanelSkeleton.tsx
│   ├── ConvictionScore.tsx
│   ├── TrendBadge.tsx
│   └── StageBadge.tsx
└── App.tsx               # Root layout, sort, filter, pagination, list/grid toggle
```

## Features

- **Skeleton loading** — shimmer animation while the mock API resolves (900ms)
- **Sortable columns** — click any column header to sort ascending/descending
- **Filters** — Stage, Sector, Country multi-select dropdowns + text search
- **Pagination** — 10 rows per page
- **Detail panel** — click a row to open; shows conviction signals, funding, description, key signals, website, news
- **List / Grid toggle** — switch between table rows and a 4-column card grid
- **Auto-select** — first startup selected by default to match the Figma default state

## Design decisions

- Conviction score bar is always `#439AFF` (blue) per the Figma spec; no color-coding by range in the table row — the detail panel shows the full breakdown
- Country displayed as 2-letter ISO code in the table for density; full name visible in the detail panel
- No external UI libraries (Radix, shadcn, etc.) — all components built from scratch with Tailwind
- React Query cache key `['startups']` ensures the mock call runs once per session
