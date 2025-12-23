# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server (Vite)
npm run build        # TypeScript check + production build
npm run preview      # Preview production build locally
```

Deployed to GitHub Pages at `username.github.io/euromillions/` via `.github/workflows/deploy.yml`.

## Architecture

React + TypeScript + Vite application that generates EuroMillions lottery numbers using weighted statistical analysis.

### Data Flow

1. **Statistics** (`public/data/statistics.json`) contain historical draw data (times drawn, absences)
2. **useStatistics** hook fetches and provides this data
3. **useWeights** hook manages user-adjustable weight sliders (overdue, frequency, randomness)
4. **useGenerator** hook calls scoring algorithm to generate games
5. **Bulletin** displays the generated games with animated number grids

### Scoring Algorithm (`src/utils/scoring.ts`)

`generateNumbers()` calculates weighted scores for each number:
- **Overdue contribution**: Numbers not drawn recently get higher scores
- **Frequency contribution**: Based on historical draw frequency vs average
- **Random contribution**: Adds unpredictability

Numbers are assigned statuses: `hot` | `cold` | `overdue` | `neutral` based on thresholds in `constants.ts`.

### Key Types (`src/types/index.ts`)

- `NumberStats`: Raw statistics (number, timesDrawn, absences)
- `Weights`: User-controlled weight distribution (must sum to 100)
- `ScoreResult`: Calculated score with contribution breakdown
- `GeneratedGame`: A complete game with 5 main numbers + 2 stars

### Component Structure

```
src/
├── components/
│   ├── bulletin/     # Game display (Bulletin, GameCard, NumberGrid, StarGrid)
│   ├── controls/     # User inputs (WeightSliders, GameCountSelector, GenerateButton)
│   ├── layout/       # Header, Footer
│   ├── stats/        # StatsPanel, ReasoningCard
│   └── effects/      # Confetti animation
├── hooks/            # useStatistics, useWeights, useGenerator
└── utils/            # scoring.ts, constants.ts
```

### Tailwind Theme

Custom colors: `lottery-blue`, `lottery-pink`, `lottery-gold`, `lottery-paper`

Custom animations: `pop`, `shuffle`, `float`, `bounce-in`, `confetti`

### Constants (`src/utils/constants.ts`)

- `MAIN_NUMBERS_COUNT`: 50 (numbers 1-50)
- `STARS_COUNT`: 12 (stars 1-12)
- `NUMBERS_TO_SELECT`: 5 main numbers per game
- `STARS_TO_SELECT`: 2 stars per game
- `PRIZE_AMOUNT` / `MAX_JACKPOT`: Current and max jackpot for UI display
