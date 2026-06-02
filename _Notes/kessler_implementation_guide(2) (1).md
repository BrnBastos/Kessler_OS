# Kessler - Expo Universal App Implementation Guide

> **Space debris intelligence for a circular orbital future.**
>
> This guide is for the current **Expo React Native universal app** in this repository. Do not migrate this project to Next.js, Tailwind, Vercel, or a web-only architecture unless the team explicitly decides to restart the project.

---

## 0. Product Intent

**Kessler OS** means **Kessler Orbital System**.

Kessler is a universal app for **iOS, Android, and Web** that helps users understand space debris, evaluate orbital risk, simulate mission decisions, and explore how orbital waste could become part of a circular space economy.

The app is a **prototype and decision-support experience**, not a professional orbital safety tool.

The app should help users answer five questions:

1. **What is in orbit?**
   Explore tracked, estimated, and simulated orbital objects.

2. **Why does it matter?**
   Explain debris prevention, end-of-life planning, passivation, disposal, and responsible orbital behavior.

3. **Which objects deserve attention first?**
   Score objects using transparent risk, reuse, and priority models.

4. **What could we do about them?**
   Simulate monitoring, inspection, avoidance, deorbit, capture, or recycling missions.

5. **Can waste become infrastructure?**
   Estimate reuse potential and frame debris as a possible future material source.

The product should feel calm, technical, and premium: minimal interface, strong hierarchy, clear metrics, dark aerospace visual language, and honest labels for public, estimated, unknown, or simulated data.

---

## 1. Non-Negotiable Technical Direction

This repository is an **Expo React Native app**, not a Next.js app.

Use:

```txt
Expo SDK 56
React Native
Expo Router
TypeScript
React Native StyleSheet
Custom design tokens
Local mock data first
Domain services and repositories before external APIs
```

Do **not** use:

```txt
Next.js App Router
Tailwind CSS
Server-only API routes as the main app architecture
Vercel-only assumptions
Desktop-only tables without mobile alternatives
Hover-only interactions
Web-only layouts
```

Every feature should work on:

```txt
iOS
Android
Web
```

That means:

- touch-first controls;
- responsive layouts;
- bottom navigation for phone/native;
- top navigation only when useful on desktop web;
- no dense table as the only way to use a feature;
- no complex 3D dependency before the app is already useful.

---

## 2. Current Project Setup

The app has already been created with Expo and committed.

Current command style:

```bash
npm install
npm run start
npm run ios
npm run android
npm run web
npm run lint
npx tsc --noEmit
```

The local dev server can be tested with:

```bash
npm run web -- --port 8081
```

Current package direction:

```txt
Expo Router for routes
expo-linear-gradient for CTA gradients
React Native StyleSheet for UI
Custom tokens in src/theme
Mock data in src/data
Domain models in src/domain
Feature modules in src/features
```

---

## 3. Current Folder Organization

Keep this structure. Extend it, do not replace it.

```txt
kessler_os/
  assets/

  src/
    app/
      _layout.tsx
      index.tsx

      orbit/
        index.tsx
        [id].tsx              # planned

      priority.tsx
      missions.tsx
      circular.tsx
      prevention.tsx

    components/
      app-shell/
        AppShell.tsx
        SectionPlaceholderScreen.tsx

      navigation/
        BottomTabs.tsx
        TopNavigation.tsx
        navigation-items.ts

      ui/
        Badge.tsx
        Button.tsx
        Card.tsx
        Metric.tsx
        SectionHeader.tsx
        index.ts

    data/
      index.ts
      mock-orbital-objects.ts
      mock-missions.ts
      mock-reuse-materials.ts

    domain/
      models/
        index.ts
        orbital-object.ts
        mission.ts
        reuse-material.ts

      repositories/           # planned
        orbital-object-repository.ts

      scoring/                # planned
        risk-score.ts
        forge-value-score.ts
        priority-score.ts
        responsible-orbit-score.ts

    features/
      home/
        HomeScreen.tsx
        components/

      objects/
        ObjectExplorerScreen.tsx
        ObjectPassportScreen.tsx      # planned
        object-formatters.ts
        components/

      priority/                       # planned
      prevention/                     # planned
      missions/                       # planned
      circular/                       # planned

    hooks/
      use-breakpoint.ts
      use-platform-layout.ts
      use-color-scheme.ts

    theme/
      colors.ts
      gradients.ts
      layout.ts
      radius.ts
      shadows.ts
      spacing.ts
      typography.ts
      index.ts

    types/
      styles.d.ts
```

### Folder Rules

- `src/app` should stay thin. Route files should import feature screens.
- `src/features` owns screen-specific composition and components.
- `src/components/ui` owns reusable visual primitives.
- `src/domain` owns types, repositories, and scoring logic.
- `src/data` owns mock data only.
- Screens should eventually call repositories instead of importing mock data directly.

---

## 4. Visual Identity

Design direction:

```txt
Premium space-tech
Dark, calm, cinematic
Data-driven but not overloaded
Technical but understandable
Mobile-first
```

Use the existing tokens in:

```txt
src/theme/colors.ts
src/theme/spacing.ts
src/theme/typography.ts
src/theme/radius.ts
src/theme/shadows.ts
src/theme/layout.ts
```

UI principles:

- one strong visual or decision area per screen;
- explain complex numbers in human language;
- use color + text label, never color only;
- show confidence labels for public, estimated, unknown, and simulated values;
- phone layouts must stack content clearly;
- desktop web can be richer, but must not define the only usable experience.

---

## 5. Data Strategy

Build in this order:

```txt
1. Mock data
2. Repository layer
3. Deterministic scoring engines
4. Optional external data adapters
5. Optional persistence/database
6. Optional AI report adapter
```

The app should be useful before external APIs are connected.

### Data Confidence Labels

Use these labels in UI:

```txt
Confirmed public data
System estimate
Unknown
Simulated
```

Do not imply:

- exact material composition;
- professional collision prediction;
- real legal compliance verification;
- guaranteed mission feasibility.

Use safer wording:

- "Kessler uses public data and simplified models."
- "Kessler simulates risk and recovery decisions."
- "Kessler estimates priority using transparent scoring."
- "Kessler explores a future circular orbital economy."

---

## 6. External Data Strategy

External APIs are future phases. They should be added through adapters and repositories, not directly inside screens.

Recommended future sources:

| Source | Use | Notes |
|---|---|---|
| CelesTrak | TLE/object lists | Best first public integration |
| Space-Track | Catalog enrichment | May require account/API credentials |
| ESA DISCOSweb | Object metadata | Useful for object passport enrichment |
| NASA ODPO references | Education/prevention content | Static educational source |
| ESA Space Debris Office references | Education/prevention content | Static educational source |

Planned adapter shape:

```txt
src/domain/repositories/orbital-object-repository.ts
src/services/celestrak/celestrak-client.ts
src/services/celestrak/tle-parser.ts
src/services/spacetrack/spacetrack-client.ts
src/services/discos/discos-client.ts
```

For now, the repository should return local mock objects.

---

# Implementation Roadmap

The roadmap below is adapted to the current Expo app. The app must remain runnable after every step.

## Current Completed Work

These steps already exist in the app:

```txt
1. Expo app foundation
2. Kessler design system foundation
3. Universal navigation shell
4. Domain models and mock data
5. Home screen
6. Orbital object explorer
```

The next recommended step is:

```txt
7. Repository layer and scoring engines
```

This order keeps the app aligned with the updated guide's emphasis on real logic, without changing the Expo structure.

---

## Step 1 - Expo App Foundation

### Goal

Create the universal Expo app and prove it runs on iOS, Android, and Web.

### Status

Done.

### Existing Files

```txt
src/app/_layout.tsx
src/app/index.tsx
package.json
app.json
tsconfig.json
```

### Expected Result

The app boots locally with Expo Router.

---

## Step 2 - Design System Foundation

### Goal

Implement the Kessler visual identity as reusable tokens and primitives.

### Status

Done.

### Existing Files

```txt
src/theme/colors.ts
src/theme/gradients.ts
src/theme/layout.ts
src/theme/radius.ts
src/theme/shadows.ts
src/theme/spacing.ts
src/theme/typography.ts
src/theme/index.ts

src/components/ui/Badge.tsx
src/components/ui/Button.tsx
src/components/ui/Card.tsx
src/components/ui/Metric.tsx
src/components/ui/SectionHeader.tsx
src/components/ui/index.ts
```

### Expected Result

All future screens use shared components and tokens instead of random local styling.

---

## Step 3 - Universal Navigation Shell

### Goal

Create navigation that works across phone, tablet, desktop web, iOS, and Android.

### Status

Done.

### Existing Files

```txt
src/components/app-shell/AppShell.tsx
src/components/navigation/TopNavigation.tsx
src/components/navigation/BottomTabs.tsx
src/components/navigation/navigation-items.ts
src/hooks/use-breakpoint.ts
src/hooks/use-platform-layout.ts
```

### Existing Routes

```txt
/
/orbit
/priority
/missions
/circular
/prevention
```

### Expected Result

Users can move between all main sections. Desktop web uses top navigation; phone/native uses bottom tabs.

---

## Step 4 - Domain Models and Mock Data

### Goal

Create typed local data so features can be built before API integration.

### Status

Done.

### Existing Files

```txt
src/domain/models/orbital-object.ts
src/domain/models/mission.ts
src/domain/models/reuse-material.ts
src/domain/models/index.ts

src/data/mock-orbital-objects.ts
src/data/mock-missions.ts
src/data/mock-reuse-materials.ts
src/data/index.ts
```

### Expected Result

The app can display orbital objects, mock missions, and reuse estimates.

---

## Step 5 - Home Screen

### Goal

Build the main Kessler entry screen using product copy, metrics, feature cards, and preview panels.

### Status

Done.

### Existing Files

```txt
src/app/index.tsx
src/features/home/HomeScreen.tsx
src/features/home/components/HeroSection.tsx
src/features/home/components/EarthHeroVisual.tsx
src/features/home/components/FeatureCards.tsx
src/features/home/components/HomeMetrics.tsx
src/features/home/components/HomePreviewPanels.tsx
```

### Expected Result

The home screen feels like a polished Kessler product entry point and links into the main modules.

---

## Step 6 - Orbital Object Explorer

### Goal

Let users explore local orbital object data with filters, object cards, a focused detail summary, and a simplified orbit visual.

### Status

Done.

### Existing Files

```txt
src/app/orbit/index.tsx
src/features/objects/ObjectExplorerScreen.tsx
src/features/objects/components/ObjectFilters.tsx
src/features/objects/components/ObjectList.tsx
src/features/objects/components/ObjectCard.tsx
src/features/objects/components/OrbitalVisual.tsx
src/features/objects/object-formatters.ts
```

### Expected Result

Users can filter by object type and orbit region, select an object, and view focused local details.

---

## Step 7 - Repository Layer and Scoring Engines

### Goal

Create the app's deterministic analytical core before building deeper feature pages.

### Create or Modify

```txt
src/domain/repositories/orbital-object-repository.ts

src/domain/scoring/risk-score.ts
src/domain/scoring/forge-value-score.ts
src/domain/scoring/priority-score.ts
src/domain/scoring/responsible-orbit-score.ts
src/domain/scoring/index.ts

src/features/objects/ObjectExplorerScreen.tsx
src/features/objects/components/ObjectCard.tsx
```

### Responsibilities

| File | Responsibility |
|---|---|
| `orbital-object-repository.ts` | Returns objects from mock data now; later can switch to API/database |
| `risk-score.ts` | Calculates orbital risk from orbit, status, type, mass, and uncertainty |
| `forge-value-score.ts` | Estimates reuse value from type, mass, likely material utility, and confidence |
| `priority-score.ts` | Combines risk, reuse value, feasibility, and uncertainty |
| `responsible-orbit-score.ts` | Scores fictional mission behavior/prevention quality |

### Implementation Notes

Use simple, explainable scoring. Do not pretend the model is scientifically exact.

Example risk factors:

```txt
orbit congestion
object status
object type
estimated mass
altitude persistence
data uncertainty
```

Example forge value factors:

```txt
estimated mass
object type
reuse potential
handling difficulty
confidence level
```

### Expected Result

Every orbital object can display:

```txt
Risk Score
Forge Value Score
Priority Score
Short explanation
```

### Commands

```bash
npm run lint
npx tsc --noEmit
npm run web -- --port 8081
```

### Suggested Commit Message

```txt
Add orbital scoring engines
```

---

## Step 8 - Object Passport

### Goal

Create a detail route for each orbital object.

### Create or Modify

```txt
src/app/orbit/[id].tsx

src/features/objects/ObjectPassportScreen.tsx
src/features/objects/components/ObjectSummaryCard.tsx
src/features/objects/components/ObjectTechnicalDetails.tsx
src/features/objects/components/ObjectScorePanel.tsx
src/features/objects/components/DataConfidenceNote.tsx

src/components/charts/ScoreRing.tsx
src/components/charts/RiskBar.tsx
```

### Screen Content

```txt
object name
type
orbit region
altitude
estimated mass
status
data confidence
risk score
forge value score
priority score
risk summary
reuse summary
CTA to simulate mission
```

### Implementation Notes

- The object passport should explain what is known, what is estimated, and what is unknown.
- Use the repository instead of importing mock data directly.
- Add links from object cards to `/orbit/[id]`.
- Keep the selected-card behavior in `/orbit` useful even after adding detail pages.

### Expected Result

Users can open an object and understand why it matters.

### Suggested Commit Message

```txt
Build object passport screen
```

---

## Step 9 - Priority Queue

### Goal

Build the decision interface that ranks which objects deserve attention first.

### Create or Modify

```txt
src/app/priority.tsx

src/features/priority/PriorityQueueScreen.tsx
src/features/priority/components/PriorityFilters.tsx
src/features/priority/components/PriorityList.tsx
src/features/priority/components/PriorityItem.tsx
```

### Implementation Notes

Phone:

```txt
stacked priority cards
score badge
short reason
primary action
```

Desktop web:

```txt
sortable comparison list
rank
risk score
forge value score
priority score
recommended decision
```

Suggested decisions:

```txt
Monitor
Inspect
Prioritize removal
Evaluate reuse
Low priority
Insufficient data
```

### Expected Result

Users can compare objects and see which ones matter most.

### Suggested Commit Message

```txt
Build priority queue
```

---

## Step 10 - Prevention Hub

### Goal

Explain responsible orbital behavior and debris prevention.

### Create or Modify

```txt
src/app/prevention.tsx

src/features/prevention/PreventionHubScreen.tsx
src/features/prevention/components/PreventionPrinciples.tsx
src/features/prevention/components/ResponsibleMissionChecklist.tsx
src/features/prevention/components/PreventionScorePreview.tsx
```

### Content

```txt
passivation
end-of-life planning
controlled reentry
graveyard orbit
tracking and cataloging
collision avoidance
responsible mission design
```

### Expected Result

Users understand that Kessler is about preventing debris, not only reacting to it.

### Suggested Commit Message

```txt
Build prevention hub
```

---

## Step 11 - Orbital Map MVP

### Goal

Add a stronger orbital visual without depending on a complex 3D engine yet.

### Create or Modify

```txt
src/features/objects/components/OrbitalVisual.tsx
src/features/map/OrbitalMapScreen.tsx
src/app/map.tsx                 # optional route if the team wants a separate map
```

### Implementation Notes

Start with a 2D/simplified visual:

```txt
Earth
orbit rings
object markers
selected object
risk colors
legend
```

Only later consider:

```txt
Three.js
Cesium
satellite.js propagation
```

### Expected Result

The app has visual impact while staying stable on native and web.

### Suggested Commit Message

```txt
Improve orbital map visual
```

---

## Step 12 - Live Orbital Data Integration

### Goal

Connect public orbital data through adapters without changing screen code.

### Create or Modify

```txt
src/services/celestrak/celestrak-client.ts
src/services/celestrak/tle-parser.ts
src/domain/repositories/orbital-object-repository.ts
```

### Implementation Notes

- Keep mock data as fallback.
- Add loading and error states.
- Do not block the app if the external API fails.
- Cache or limit requests where appropriate.

### Expected Result

The app can use public data while remaining demo-safe.

### Suggested Commit Message

```txt
Add CelesTrak data adapter
```

---

## Step 13 - Mission Simulator

### Goal

Let users simulate practical responses to selected orbital objects.

### Create or Modify

```txt
src/app/missions.tsx

src/features/missions/MissionSimulatorScreen.tsx
src/features/missions/components/MissionSimulatorForm.tsx
src/features/missions/components/MissionResultPanel.tsx

src/domain/scoring/mission-estimator.ts
```

### Mission Types

```txt
Monitor
Inspect
Avoid
Deorbit
Move to safer orbit
Capture
Recycle
```

### Expected Result

Users can choose an object and mission type, then receive a deterministic estimate and explanation.

### Suggested Commit Message

```txt
Build mission simulator
```

---

## Step 14 - Circular Economy Lab

### Goal

Show how selected debris could become a future resource.

### Create or Modify

```txt
src/app/circular.tsx

src/features/circular/CircularEconomyScreen.tsx
src/features/circular/components/ReusePotentialPanel.tsx
src/features/circular/components/MaterialUseCases.tsx
```

### Reuse Categories

```txt
Structural material
Radiation shielding
Manufacturing feedstock
Testing platform
Component recovery
Controlled disposal
```

### Expected Result

Kessler shows both risk reduction and future orbital reuse value.

### Suggested Commit Message

```txt
Build circular economy lab
```

---

## Step 15 - AI-Style Decision Report

### Goal

Generate clear natural-language explanations for scores, priorities, and mission recommendations.

### Create or Modify

```txt
src/services/ai/report-generator.ts
src/services/ai/prompt-templates.ts
src/features/reports/DecisionReportPanel.tsx
```

### MVP Implementation

Do not require a real LLM at first.

Start with deterministic template reports:

```txt
This object receives a high priority because its LEO orbit, inactive status, and estimated mass increase attention.
The reuse estimate is simulated and should be treated as a planning signal, not confirmed material composition.
```

### Later Implementation

Add an adapter for:

```txt
OpenAI
OpenRouter
local LLM
```

### Expected Result

Users can understand recommendations without reading raw score formulas.

### Suggested Commit Message

```txt
Add decision report generator
```

---

## Step 16 - Optional Persistence Layer

### Goal

Persist saved simulations, reports, or object notes if the project needs it.

### Expo-Friendly Options

```txt
Supabase client
Firebase
SQLite for local-only demos
AsyncStorage for lightweight saved state
```

Avoid adding Prisma unless the team is building a separate backend. Prisma is not a natural fit for the Expo client app itself.

### Expected Result

Users can save selected results or scenarios.

---

## Step 17 - Impact Dashboard

### Goal

Summarize the project's value for presentation.

### Create or Modify

```txt
src/features/impact/ImpactDashboardScreen.tsx
src/app/impact.tsx
```

### Suggested Metrics

```txt
objects analyzed
high-priority objects
estimated reusable mass
simulated missions
prevention recommendations
```

### Expected Result

The project can be presented clearly to evaluators.

---

## Step 18 - Testing and QA

### Goal

Protect the core domain logic and verify the main flows.

### Recommended Tests

```txt
scoring function unit tests
repository tests
manual route smoke tests
mobile layout checks
web layout checks
```

Current useful checks:

```bash
npm run lint
npx tsc --noEmit
```

Optional future test setup:

```txt
Jest or Vitest for domain functions
React Native Testing Library for components
Playwright only for web smoke tests if browser tooling is installed
```

---

## Step 19 - UI Polish and Deployment Readiness

### Goal

Make the demo feel coherent, trustworthy, and easy to test.

### Polish Checklist

- no Expo starter copy;
- no dense mobile tables;
- no clipped text;
- no web-only interactions;
- route transitions feel predictable;
- all estimates have confidence labels;
- all CTAs go somewhere useful;
- app runs on web and Expo Go/development build.

### Expo Deployment Options

```txt
Expo web export
EAS Update
EAS Build
Expo Go for MVP demo
```

### Expected Result

The app is ready for a project presentation/demo.

---

# API and Backend Notes

This app should not depend on server routes yet.

If a backend is added later, keep the client API shape simple:

## `GET /orbital-objects`

Returns orbital objects.

```json
{
  "items": [
    {
      "id": "obj-envisat",
      "name": "ENVISAT",
      "type": "satellite",
      "orbitRegion": "LEO",
      "dataConfidence": "estimated"
    }
  ]
}
```

## `GET /orbital-objects/:id`

Returns one object with scores.

```json
{
  "id": "obj-envisat",
  "name": "ENVISAT",
  "scores": {
    "risk": 86,
    "forgeValue": 72,
    "priority": 84
  }
}
```

## `POST /missions`

Creates a mission simulation.

```json
{
  "orbitalObjectId": "obj-envisat",
  "missionType": "inspect"
}
```

## `POST /reports`

Generates or returns a decision report.

```json
{
  "orbitalObjectId": "obj-envisat",
  "context": "priority"
}
```

---

# Minimum Viable Demo

If time is short, ship this:

```txt
1. Home
2. Object explorer with mock data
3. Scoring engines
4. Object Passport
5. Priority Queue
6. Mission Simulator
7. Circular Economy Lab
8. AI-style decision report
```

---

# Team Workflow

Recommended branch style:

```txt
feature/scoring-engines
feature/object-passport
feature/priority-queue
feature/mission-simulator
```

Commit style:

```txt
Build Kessler home screen
Add orbital scoring engines
Build object passport screen
Build priority queue
```

Each implementation step should end with:

```txt
npm run lint
npx tsc --noEmit
manual app test
suggested commit message
```

---

# Scope Boundaries

Do not claim:

```txt
Kessler predicts real collisions with professional precision.
Kessler is better than operational space traffic tools.
Kessler knows exact material composition.
Kessler verifies real compliance with NASA/ESA rules.
Kessler can remove or recycle debris in practice today.
```

Use:

```txt
Kessler uses public data and simplified models.
Kessler simulates risk and recovery decisions.
Kessler estimates priority using transparent scoring.
Kessler explores a future circular orbital economy.
```

---

# Definition of Done

The MVP is done when:

- the app runs on Expo web;
- the app remains usable on phone-sized screens;
- users can explore orbital objects;
- users can open an object passport;
- scores are deterministic and explainable;
- priority ranking works;
- mission simulation returns practical recommendations;
- circular economy value is shown with confidence labels;
- estimates are never presented as confirmed facts;
- lint and TypeScript checks pass.

---

# Final Product Statement

Kessler is a universal Expo app that turns orbital debris into an understandable decision experience: explore what is in orbit, understand why it matters, rank what deserves attention, simulate possible responses, and imagine how orbital waste could become part of a circular space economy.
