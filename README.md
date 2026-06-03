# Kessler OS

Space debris intelligence for a circular orbital future.

Kessler OS is an Expo React Native app for iOS, Android, and Web. It helps users explore orbital debris, understand risk, rank attention, simulate response missions, evaluate reuse potential, and explain decisions with transparent prototype reports.

This is an academic MVP. It is not an operational collision prediction system, legal compliance verifier, or real mission planning tool.

## Features

- Home dashboard with product context and preview panels.
- Orbital object explorer with filters, a 2D orbital map, risk colors, and object selection.
- Object Passport with metadata, confidence labels, scores, and deterministic reports.
- Priority Queue for ranked attention decisions.
- Mission Simulator with monitor, inspect, avoid, deorbit, relocate, capture, and recycle scenarios.
- Circular Economy Lab for estimated reuse paths and material categories.
- Prevention Hub for responsible orbit practices.
- Impact Dashboard for presentation-ready project metrics.
- Local saved mission scenarios through AsyncStorage.
- CelesTrak adapter with local mock fallback.

## Tech Stack

- Expo SDK 55
- React Native 0.83
- Expo Router
- TypeScript
- Vitest
- AsyncStorage

## Getting Started

```bash
npm install
npm run start
```

Open:

- Web: `http://localhost:8081`
- Expo Go: scan the QR code from Expo CLI

## Useful Scripts

```bash
npm run lint
npm run typecheck
npm run test
npm run qa
npm run smoke:routes
npm run export:web
```

`npm run smoke:routes` expects the Expo dev server to be running. You can override the base URL:

```bash
EXPO_SMOKE_BASE_URL=http://localhost:8081 npm run smoke:routes
```

## Demo Routes

- `/`
- `/orbit`
- `/orbit/obj-envisat`
- `/priority`
- `/missions`
- `/circular`
- `/prevention`
- `/impact`

## Data Boundaries

- CelesTrak GP/TLE data is used through an adapter where available.
- Local mock data remains the fallback for demo safety.
- Scores are deterministic planning signals.
- Material estimates are simplified categories, not confirmed composition.
- AI-style reports are deterministic templates, not live LLM output.

## Deployment Options

- Expo Go for MVP demos.
- `npm run export:web` for static web export.
- EAS Update for managed app updates.
- EAS Build for native builds when needed.
