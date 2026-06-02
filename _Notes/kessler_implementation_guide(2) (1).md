# Kessler — Universal App Implementation Guide

> **Kessler OS** means **Kessler Orbital System**.
>
> Kessler is a universal app for **iOS, Android and Web** that helps users understand space debris, evaluate orbital risk, simulate mission decisions and explore how orbital waste can become part of a circular space economy.

---

## 0. What this guide is for

This guide is meant to be used by a developer team, or by an AI coding assistant, to build Kessler from scratch.

The app must never be treated as a web-only dashboard. Every decision in this document assumes the product must run as:

```txt
iOS + Android + Web
```

That means:

- no hover-only interactions;
- no desktop-only tables without mobile alternatives;
- no fixed-width dashboards;
- no features that only work on web;
- no layout that breaks on small screens;
- every major feature must have a phone, tablet and desktop behavior.

---

# 1. Product definition

## 1.1 Core idea

Kessler turns the problem of space debris into an interactive intelligence platform.

The app combines:

- educational awareness about orbital debris prevention;
- simplified orbital object exploration;
- risk scoring;
- priority ranking;
- simulated mission planning;
- circular-economy analysis;
- AI-style decision explanations.

The app should be honest about its scope. It is a **prototype and decision-support experience**, not a professional orbital safety tool.

## 1.2 Product promise

> Kessler helps users understand which orbital objects deserve attention, why they matter, and how future missions could reduce risk or recover value from space debris.

## 1.3 What the app should not claim

Avoid these claims in the interface, README, pitch or presentation:

- “Kessler predicts real collisions with professional precision.”
- “Kessler is better than LeoLabs, Slingshot or CelesTrak.”
- “Kessler knows the exact material composition of every object.”
- “Kessler proves whether a real mission complied with NASA or ESA rules.”
- “Kessler can remove or recycle debris in practice today.”

Use safer wording:

- “Kessler uses public data and simplified models.”
- “Kessler simulates risk and recovery decisions.”
- “Kessler estimates priority using transparent scoring.”
- “Kessler explores a future circular orbital economy.”

---

# 2. Visual identity

This identity is based on the main-screen concept image created for Kessler: a clean dark interface with a large Earth/orbit hero visual, blue-cyan accents, rounded cards, clear typography and a premium aerospace SaaS feel.

The design direction should be:

```txt
Premium space-tech
Clean and modern
Dark, calm and cinematic
Data-driven but not overloaded
Apple-like hierarchy with aerospace UI details
```

## 2.1 Brand personality

Kessler should feel like:

- precise;
- calm;
- intelligent;
- futuristic;
- trustworthy;
- technical, but still understandable.

It should not feel like:

- a game HUD;
- a noisy sci-fi poster;
- a generic NASA clone;
- a crypto dashboard;
- a cluttered admin panel.

## 2.2 Visual principles

### 1. One strong visual per screen

Each screen should have one main visual or decision area. Do not show every metric at once.

Examples:

- Home: Earth/orbit hero.
- Object detail: object passport + score summary.
- Priority: ranked queue.
- Circular economy: material potential and reuse paths.
- Mission simulator: selected object + mission decision.

### 2. Calm density

Use fewer cards with better spacing. Prefer 3 strong cards over 8 weak cards.

### 3. Explain before showing data

Every complex number needs a short human explanation.

Example:

```txt
Risk Score 82
High attention recommended due to orbit density and estimated object size.
```

### 4. Desktop can be rich, mobile must be focused

Desktop can show panels side by side. Mobile should show one decision at a time.

### 5. Do not use color only as meaning

Risk should use color + label + icon.

Example:

```txt
High Risk
red icon + red accent + text label
```

---

# 3. Design tokens

Create all styling from shared tokens. No random colors or one-off spacing inside screens.

## 3.1 Color palette

```ts
export const colors = {
  background: {
    app: '#030712',
    surface: '#07111F',
    surfaceElevated: '#0B1628',
    surfaceSoft: '#101C2F',
  },

  border: {
    subtle: 'rgba(148, 163, 184, 0.16)',
    strong: 'rgba(148, 163, 184, 0.28)',
  },

  text: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    muted: '#94A3B8',
    disabled: '#64748B',
  },

  accent: {
    blue: '#2563EB',
    blueBright: '#3B82F6',
    cyan: '#22D3EE',
    teal: '#14B8A6',
  },

  semantic: {
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#38BDF8',
  },

  chart: {
    blue: '#3B82F6',
    cyan: '#22D3EE',
    teal: '#14B8A6',
    orange: '#F97316',
    red: '#EF4444',
    violet: '#8B5CF6',
  },
};
```

## 3.2 Gradients

Use gradients only for hero visuals, key CTAs and major chart accents.

```ts
export const gradients = {
  primaryButton: ['#2563EB', '#0EA5E9'],
  earthGlow: ['rgba(37,99,235,0.35)', 'rgba(34,211,238,0.12)'],
  surfaceGlow: ['rgba(59,130,246,0.16)', 'rgba(20,184,166,0.08)'],
};
```

## 3.3 Typography

Use one clean sans-serif family.

Recommended:

- Web: `Inter`, `SF Pro Display`, system fallback.
- Native: system font through React Native.

Type scale:

```ts
export const typography = {
  display: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '700',
  },
  h1: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700',
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
};
```

Responsive typography rule:

```txt
Phone: reduce display headings by 25–35%.
Tablet: reduce display headings by 10–15%.
Desktop: use full display scale.
```

## 3.4 Spacing

Use an 8-point spacing system.

```ts
export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
};
```

## 3.5 Radius

```ts
export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
};
```

## 3.6 Shadows and glow

Keep shadows subtle. The interface should feel premium, not cartoonish.

```ts
export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  glowBlue: {
    shadowColor: '#2563EB',
    shadowOpacity: 0.22,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
};
```

---

# 4. Layout identity

## 4.1 Global layout behavior

Kessler should use a responsive shell.

```txt
Phone: single-column, scroll-first, bottom tabs
Tablet: two-column where useful, larger cards
Web/Desktop: wide content, top navigation, multi-column cards
```

Breakpoints:

```ts
export const breakpoints = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
};
```

## 4.2 Max content width

On web, keep content centered and refined.

```txt
max-width: 1280px
horizontal padding: 24–48px
```

Avoid stretching cards across huge monitors.

## 4.3 Screen composition rule

Each screen should follow this hierarchy:

```txt
1. Screen title / hero
2. Short explanation
3. Primary action or main metric
4. Main content area
5. Secondary panels
6. Educational notes / limitations
```

## 4.4 Mobile composition rule

On mobile, each screen should show:

```txt
1. Header
2. Main summary card
3. Primary action
4. One section at a time
```

Avoid showing dense tables on phone. Use stacked cards instead.

---

# 5. Component identity

All screens should be built from shared components.

## 5.1 App Shell

Responsible for:

- safe area handling;
- app background;
- navigation placement;
- max-width on web;
- bottom tabs on native/mobile;
- top nav on desktop web.

Behavior:

```txt
Phone native: bottom tabs
Phone web: bottom tabs or compact header
Tablet: compact top/bottom hybrid
Desktop web: top nav
```

## 5.2 Card

Base visual unit of the app.

Style:

- dark elevated surface;
- 1px subtle border;
- 16–22px radius;
- 16–24px padding;
- subtle glow only when important.

Card variants:

```txt
DefaultCard
FeatureCard
MetricCard
ScoreCard
ObjectCard
ActionCard
```

## 5.3 Button

Variants:

```txt
Primary: blue gradient, main action
Secondary: transparent/dark with border
Ghost: text/icon only
Danger: red accent for high-risk actions
```

Rules:

- Primary button appears once per screen section.
- Button labels should be action-oriented.
- Avoid generic labels like “Submit”.

Good labels:

```txt
Explore Orbit
Assess Object
Simulate Mission
View Priority
Generate Report
```

## 5.4 Score Badge

Used for risk, reuse and priority.

Format:

```txt
Score number + level + short reason
```

Example:

```txt
82 High Risk
Dense LEO region · close approach window
```

Levels:

```txt
0–39 Low
40–69 Medium
70–100 High
```

Colors:

```txt
Low: blue/info
Medium: orange/warning
High: red/danger
Reuse high: teal/success
```

## 5.5 Data Confidence Label

Use this whenever data is estimated.

Labels:

```txt
Confirmed public data
System estimate
Unknown
Simulated
```

This is important for credibility.

## 5.6 Priority Item

Desktop:

- row inside a table;
- object ID;
- type;
- orbit;
- score;
- closest approach;
- action.

Mobile:

- stacked card;
- object ID at top;
- score badge;
- orbit and type;
- action button.

## 5.7 Circular Economy Chart

Use simple charts. Do not overload with tiny labels.

Preferred:

- donut chart;
- 2–3 material categories;
- short explanation;
- one CTA.

---

# 6. Homepage identity

The homepage should follow the visual reference image: clean dark hero, Earth visual, three feature cards, compact stats, and two preview panels.

## 6.1 Desktop homepage layout

```txt
Top Navigation
Hero Section
  Left: headline, short text, CTAs
  Right: Earth/orbit visual
Feature Cards Row
Metric Strip
Preview Panels
  Priority Queue
  Circular Economy Snapshot
```

## 6.2 Mobile homepage layout

```txt
Compact Header
Hero Title
Short Text
CTA Buttons
Earth Visual Card
Feature Cards stacked
Metric Cards stacked or horizontal scroll
Priority Preview Card
Circular Economy Preview Card
```

## 6.3 Hero copy

Use this copy:

```txt
Space debris intelligence
for a circular orbital future.

Smarter decisions in orbit through public data,
risk analytics and mission simulation.
```

Primary CTA:

```txt
Explore Orbit
```

Secondary CTA:

```txt
See How It Works
```

## 6.4 Feature cards

Only use three cards on the homepage.

### Risk Analysis

```txt
Assess collision probability and reduce operational risk.
```

### Mission Simulation

```txt
Plan safer, lower-risk missions with predictive modeling.
```

### Circular Economy

```txt
Identify, capture and repurpose materials for a sustainable orbit.
```

## 6.5 Homepage metrics

Use only three core metrics to keep the UI clean.

```txt
Tracked Objects
High-Risk Objects
Reusable Mass Potential
```

Optional fourth metric for desktop only:

```txt
Simulated Missions
```

## 6.6 Homepage lower previews

Use two preview panels:

1. **Priority Queue**
   - show only 2–3 rows;
   - no dense controls;
   - one CTA: `View all priorities`.

2. **Circular Economy Snapshot**
   - one donut chart;
   - 2–3 material categories;
   - one CTA: `View details`.

---

# 7. UX writing rules

## 7.1 Tone

Use clear, confident, human wording.

Good:

```txt
This object deserves attention because it combines high orbital risk with recoverable mass.
```

Bad:

```txt
Leveraging advanced disruptive AI, this object is optimized for multi-dimensional circularity.
```

## 7.2 Limitations text

Always be honest when a calculation is simplified.

Use:

```txt
This result is based on public data and a simplified academic scoring model.
```

Do not use:

```txt
This is the real collision probability.
```

## 7.3 Labels

Use short labels in UI:

```txt
Risk
Reuse
Priority
Orbit
Object Type
Mission Cost
Recovery Value
Data Confidence
```

Avoid long technical labels inside cards.

---

# 8. Recommended technology

## 8.1 Main app

Use:

```txt
Expo + React Native + Expo Router + TypeScript
```

This supports:

- iOS;
- Android;
- web;
- file-based routing;
- shared components;
- shared business logic.

## 8.2 Styling

Recommended:

```txt
NativeWind or StyleSheet + design tokens
```

For this project, the safest path is:

```txt
StyleSheet + shared theme tokens
```

This avoids style inconsistencies across native and web.

## 8.3 Data and backend

MVP:

```txt
Local mock data + pure scoring functions
```

Next phase:

```txt
Supabase or PostgreSQL + backend API
```

## 8.4 Orbital visualization

Mobile and web need different strategies.

MVP:

```txt
2D/illustrated orbital visualization for all platforms
```

Web enhancement:

```txt
Three.js or CesiumJS only on web
```

Native enhancement:

```txt
Simplified canvas/SVG visual or static animated map
```

Do not block the app on a full 3D map. The app must work on phones first.

---

# 9. Project structure

Use this structure:

```txt
kessler/
├── app/                         # Expo Router routes
│   ├── _layout.tsx
│   ├── index.tsx                 # Home
│   ├── orbit/
│   │   ├── index.tsx             # Orbital map/list
│   │   └── [id].tsx              # Object passport
│   ├── priority/
│   │   └── index.tsx             # Priority queue
│   ├── missions/
│   │   ├── index.tsx             # Mission simulator
│   │   └── [id].tsx              # Mission result
│   ├── circular/
│   │   └── index.tsx             # Circular economy lab
│   ├── prevention/
│   │   └── index.tsx             # Prevention hub
│   └── reports/
│       └── [id].tsx              # AI-style report
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── app-shell/
│   │   ├── cards/
│   │   ├── charts/
│   │   ├── data-display/
│   │   ├── navigation/
│   │   └── ui/
│   │
│   ├── features/
│   │   ├── circular/
│   │   ├── home/
│   │   ├── missions/
│   │   ├── objects/
│   │   ├── prevention/
│   │   └── priority/
│   │
│   ├── data/
│   │   ├── mock-orbital-objects.ts
│   │   ├── mock-missions.ts
│   │   └── mock-reuse-materials.ts
│   │
│   ├── domain/
│   │   ├── models/
│   │   ├── scoring/
│   │   └── simulation/
│   │
│   ├── hooks/
│   │   ├── use-breakpoint.ts
│   │   └── use-platform-layout.ts
│   │
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── gradients.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   ├── radius.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   └── services/
│       ├── orbital-data-service.ts
│       └── report-service.ts
│
├── docs/
│   ├── design-identity.md
│   ├── scoring-model.md
│   └── limitations.md
│
├── package.json
├── app.json
├── tsconfig.json
└── README.md
```

---

# 10. Naming conventions

## 10.1 Files

Use kebab-case.

```txt
risk-score-card.tsx
object-passport-screen.tsx
priority-queue-list.tsx
```

## 10.2 Components

Use PascalCase.

```tsx
RiskScoreCard
ObjectPassportScreen
PriorityQueueList
```

## 10.3 Hooks

Use `use-` in the file name and `useSomething` in code.

```txt
use-breakpoint.ts
use-platform-layout.ts
```

```ts
useBreakpoint()
usePlatformLayout()
```

## 10.4 Domain functions

Use descriptive names.

```ts
calculateRiskScore()
calculateReuseScore()
calculatePriorityScore()
simulateRemovalMission()
generateDecisionExplanation()
```

---

# 11. Development phases

The app must stay runnable after each phase.

Use this order:

```txt
1. Project foundation
2. Theme and design system
3. Universal navigation shell
4. Mock data and domain models
5. Home screen
6. Orbital object list/map
7. Object passport
8. Scoring engine
9. Priority queue
10. Mission simulator
11. Circular economy lab
12. Prevention hub
13. AI-style reports
14. Responsiveness pass
15. Testing and deployment readiness
```

---

# 12. Phase 1 — Project foundation

## Goal

Create the universal Expo app and make sure it runs on iOS, Android and Web.

## Commands

```bash
npx create-expo-app@latest kessler --template blank-typescript
cd kessler
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
npm install lucide-react-native
```

Add scripts:

```json
{
  "scripts": {
    "start": "expo start",
    "ios": "expo start --ios",
    "android": "expo start --android",
    "web": "expo start --web",
    "lint": "eslint ."
  }
}
```

## Files to create or modify

```txt
app/_layout.tsx
app/index.tsx
src/theme/index.ts
src/components/ui/Text.tsx
src/components/ui/Screen.tsx
```

## Responsibilities

### `app/_layout.tsx`

- configures Expo Router;
- wraps the app in safe area providers;
- sets global background;
- prepares shared navigation.

### `app/index.tsx`

- temporary home screen;
- proves the app boots.

### `Screen.tsx`

- shared screen wrapper;
- handles safe area, background and width.

## Expected result

The app opens on:

```txt
iOS simulator
Android emulator
Web browser
```

and shows a dark Kessler placeholder screen.

---

# 13. Phase 2 — Theme and design system

## Goal

Implement the visual identity as reusable code.

## Files to create

```txt
src/theme/colors.ts
src/theme/spacing.ts
src/theme/typography.ts
src/theme/radius.ts
src/theme/shadows.ts
src/theme/index.ts
src/components/ui/Button.tsx
src/components/ui/Card.tsx
src/components/ui/Badge.tsx
src/components/ui/Metric.tsx
src/components/ui/SectionHeader.tsx
```

## Responsibilities

### `colors.ts`

Defines all colors from the Kessler identity.

### `Button.tsx`

Reusable primary, secondary and ghost button.

### `Card.tsx`

Reusable surface component for all panels.

### `Metric.tsx`

Displays one number + label + optional delta.

## Implementation notes

- Do not style screens directly with random values.
- Use tokens everywhere.
- Build components to work with mouse and touch.
- Keep hit areas at least `44px` high.

## Expected result

A local design system screen or temporary home preview shows:

- buttons;
- cards;
- badges;
- metrics;
- dark background;
- correct spacing.

---

# 14. Phase 3 — Universal navigation shell

## Goal

Create navigation that works well on native and web.

## Files to create

```txt
src/components/app-shell/AppShell.tsx
src/components/navigation/TopNavigation.tsx
src/components/navigation/BottomTabs.tsx
src/hooks/use-breakpoint.ts
src/hooks/use-platform-layout.ts
```

## Navigation behavior

```txt
Phone: bottom tabs
Tablet: bottom tabs or compact top nav
Desktop web: top nav
```

## Routes

```txt
/
/orbit
/priority
/missions
/circular
/prevention
```

## Expected result

Users can move between the main app sections on iOS, Android and Web.

---

# 15. Phase 4 — Mock data and domain models

## Goal

Create realistic local data so the app can be built before API integration.

## Files to create

```txt
src/domain/models/orbital-object.ts
src/domain/models/mission.ts
src/domain/models/reuse-material.ts
src/data/mock-orbital-objects.ts
src/data/mock-missions.ts
src/data/mock-reuse-materials.ts
```

## `orbital-object.ts`

```ts
export type OrbitalObjectType = 'satellite' | 'rocket_body' | 'debris' | 'unknown';
export type OrbitRegion = 'LEO' | 'MEO' | 'GEO' | 'HEO';
export type DataConfidence = 'confirmed' | 'estimated' | 'unknown' | 'simulated';

export interface OrbitalObject {
  id: string;
  noradId?: string;
  name: string;
  type: OrbitalObjectType;
  orbitRegion: OrbitRegion;
  altitudeKm: number;
  inclinationDeg?: number;
  estimatedMassKg?: number;
  estimatedSizeM?: number;
  launchYear?: number;
  status: 'active' | 'inactive' | 'fragment' | 'unknown';
  dataConfidence: DataConfidence;
}
```

## Expected result

The app can list and display orbital objects using local mock data.

---

# 16. Phase 5 — Home screen

## Goal

Build the main Kessler screen using the visual identity.

## Files to create

```txt
app/index.tsx
src/features/home/HomeScreen.tsx
src/features/home/components/HeroSection.tsx
src/features/home/components/EarthHeroVisual.tsx
src/features/home/components/FeatureCards.tsx
src/features/home/components/HomeMetrics.tsx
src/features/home/components/HomePreviewPanels.tsx
```

## Responsibilities

### `HeroSection.tsx`

- title;
- short product description;
- CTA buttons;
- responsive layout.

### `EarthHeroVisual.tsx`

- uses a static/simplified Earth visual on native;
- can use enhanced animation on web later;
- must never block rendering.

### `FeatureCards.tsx`

Shows only:

- Risk Analysis;
- Mission Simulation;
- Circular Economy.

### `HomeMetrics.tsx`

Shows only the clean metrics:

- Tracked Objects;
- High-Risk Objects;
- Reusable Mass Potential.

### `HomePreviewPanels.tsx`

Shows:

- simple Priority Queue preview;
- Circular Economy Snapshot.

## Responsive behavior

### Phone

```txt
Hero text
CTA buttons
Earth visual
Feature cards stacked
Metrics stacked or horizontal scroll
Preview panels stacked
```

### Tablet

```txt
Hero split if space allows
Feature cards in 2-column wrap
Metrics in row
Preview panels stacked or 2-column
```

### Desktop web

```txt
Hero split left/right
3 feature cards in row
metric strip
2 preview panels side by side
```

## Expected result

The app looks like the generated Kessler homepage concept but adapts cleanly to mobile.

---

# 17. Phase 6 — Orbital object exploration

## Goal

Let users explore tracked/simulated orbital objects.

## Files to create

```txt
app/orbit/index.tsx
src/features/objects/ObjectExplorerScreen.tsx
src/features/objects/components/ObjectList.tsx
src/features/objects/components/ObjectCard.tsx
src/features/objects/components/OrbitalVisual.tsx
src/features/objects/components/ObjectFilters.tsx
```

## Implementation notes

The first version should not depend on a complex 3D engine.

Use:

```txt
Phone: list + simplified orbit visual
Tablet: list + larger visual
Web: optional enhanced orbital canvas
```

## Expected result

Users can view orbital objects, filter by type/orbit and open details.

---

# 18. Phase 7 — Object Passport

## Goal

Show a clear detail page for each object.

## Files to create

```txt
app/orbit/[id].tsx
src/features/objects/ObjectPassportScreen.tsx
src/features/objects/components/ObjectSummaryCard.tsx
src/features/objects/components/ObjectTechnicalDetails.tsx
src/features/objects/components/DataConfidenceNote.tsx
```

## Screen content

- object name;
- type;
- orbit region;
- altitude;
- estimated mass;
- status;
- data confidence;
- risk summary;
- reuse summary;
- CTA to simulate mission.

## Expected result

Users can open an object and understand what it is, what is known, what is estimated and why it matters.

---

# 19. Phase 8 — Scoring engine

## Goal

Create transparent score calculations.

## Files to create

```txt
src/domain/scoring/risk-score.ts
src/domain/scoring/reuse-score.ts
src/domain/scoring/priority-score.ts
src/domain/scoring/score-level.ts
src/features/objects/components/RiskScoreCard.tsx
src/features/circular/components/ReuseScoreCard.tsx
```

## Risk Score inputs

- orbit region;
- altitude;
- object type;
- estimated mass;
- status;
- data confidence.

## Reuse Score inputs

- estimated mass;
- object type;
- probable material category;
- capture difficulty;
- safety limitations.

## Priority Score inputs

```txt
Risk Score
Reuse Score
Mission feasibility
Operational cost
Data confidence
```

## Expected result

Every object has:

- Risk Score;
- Reuse Score;
- Priority Score;
- human-readable reason.

---

# 20. Phase 9 — Priority Queue

## Goal

Rank objects by attention priority.

## Files to create

```txt
app/priority/index.tsx
src/features/priority/PriorityQueueScreen.tsx
src/features/priority/components/PriorityList.tsx
src/features/priority/components/PriorityItem.tsx
src/features/priority/components/PriorityFilters.tsx
```

## Desktop behavior

Use a clean table.

## Mobile behavior

Use stacked priority cards.

## Expected result

Users can see which objects matter most and why.

---

# 21. Phase 10 — Mission Simulator

## Goal

Simulate decisions for inspection, monitoring, deorbiting or recovery.

## Files to create

```txt
app/missions/index.tsx
app/missions/[id].tsx
src/features/missions/MissionSimulatorScreen.tsx
src/features/missions/MissionResultScreen.tsx
src/domain/simulation/mission-simulator.ts
src/features/missions/components/MissionTypeSelector.tsx
src/features/missions/components/MissionEstimateCard.tsx
```

## Mission types

```txt
Monitor
Inspect
Deorbit
Move
Capture
Recover
```

## Expected result

Users can select an object, choose a mission type and receive a simulated mission estimate.

---

# 22. Phase 11 — Circular Economy Lab

## Goal

Show how orbital debris could become future resource inventory.

## Files to create

```txt
app/circular/index.tsx
src/features/circular/CircularEconomyScreen.tsx
src/features/circular/components/MaterialPotentialChart.tsx
src/features/circular/components/ReusePathCard.tsx
src/features/circular/components/RecoveryValueSummary.tsx
```

## Content

- reusable mass potential;
- likely material categories;
- possible reuse paths;
- limitations;
- environmental/economic value.

## Reuse paths

```txt
Structures
Shielding
Metals
Electronics
Testing platform
Controlled disposal
```

## Expected result

Users understand the core innovation: space debris as future resource, not only risk.

---

# 23. Phase 12 — Prevention Hub

## Goal

Educate users about preventing future debris.

## Files to create

```txt
app/prevention/index.tsx
src/features/prevention/PreventionHubScreen.tsx
src/features/prevention/components/PreventionPrincipleCard.tsx
src/features/prevention/components/ResponsibleOrbitChecker.tsx
src/domain/scoring/responsible-orbit-score.ts
```

## Content

- end-of-life planning;
- deorbiting;
- passivation;
- graveyard orbit;
- responsible mission design;
- simplified checker.

## Expected result

Users can learn prevention concepts and test a fictional mission for responsibility.

---

# 24. Phase 13 — AI-style reports

## Goal

Generate readable decision reports.

## Files to create

```txt
app/reports/[id].tsx
src/features/reports/DecisionReportScreen.tsx
src/services/report-service.ts
src/features/reports/components/ReportSection.tsx
```

## MVP implementation

Start with generated template text from local score data.

Do not require a real LLM in the MVP.

## Later implementation

Add optional API integration for richer explanations.

## Expected result

Users can open a report explaining why an object was prioritized or why a mission was recommended.

---

# 25. Responsiveness checklist

Before considering the MVP done, test every screen on:

```txt
iPhone-sized viewport
Android-sized viewport
iPad/tablet viewport
Desktop web viewport
```

## Required behavior

- text is readable;
- no horizontal overflow;
- tables become cards on mobile;
- touch targets are usable;
- navigation is accessible;
- hero visual does not dominate phone screens;
- dense charts are simplified on mobile;
- all CTAs remain visible.

---

# 26. Testing checklist

## Unit tests

Test:

- risk score;
- reuse score;
- priority score;
- mission simulation;
- responsible orbit score.

## UI tests/manual QA

Test:

- navigation across routes;
- object detail opening;
- scoring display;
- mission simulation flow;
- mobile layout;
- web layout.

## Data credibility tests

Check that estimated data always shows a confidence label.

---

# 27. Deployment readiness

## Web

Use Expo web export or EAS hosting/Vercel-compatible output if configured.

```bash
npx expo export --platform web
```

## Native

Use Expo development builds or Expo Go during MVP.

Later:

```bash
eas build --platform ios
eas build --platform android
```

## Environment variables

Only needed after adding real APIs.

```txt
EXPO_PUBLIC_API_BASE_URL=
EXPO_PUBLIC_AI_API_KEY=
```

Do not commit secret keys.

---

# 28. MVP feature order summary

Build in this exact order:

```txt
1. Universal app foundation
2. Design tokens and shared UI
3. Navigation shell
4. Mock orbital data
5. Home screen
6. Object exploration
7. Object passport
8. Score engine
9. Priority queue
10. Mission simulator
11. Circular economy lab
12. Prevention hub
13. AI-style reports
14. Responsive polish
15. Testing and deployment
```

This order keeps the project running after every major milestone.

---

# 29. Definition of Done

A feature is complete only when:

- it works on iOS;
- it works on Android;
- it works on web;
- it has mobile and desktop layouts;
- it uses shared theme tokens;
- it has loading/empty/error states if data is involved;
- it does not rely on hover only;
- it explains estimated data clearly;
- it can be demonstrated independently.

---

# 30. Final product shape

The MVP should include:

- polished universal home screen;
- object exploration;
- object passport details;
- risk score;
- reuse score;
- priority queue;
- mission simulation;
- circular economy lab;
- prevention hub;
- AI-style explanation reports;
- responsive behavior across iOS, Android and web.

---

# 31. Final pitch

> **Kessler** is a universal space-debris intelligence app for iOS, Android and web. It uses public orbital data, transparent scoring models, mission simulation and explainable recommendations to help users understand orbital risk, prioritize debris attention and explore how space debris could become part of a future circular orbital economy.

---

# 32. References for implementation

- Expo Router — https://docs.expo.dev/router/introduction/
- Expo — https://docs.expo.dev/
- React Native — https://reactnative.dev/
- React Native for Web — https://necolas.github.io/react-native-web/
- CelesTrak — https://celestrak.org/
