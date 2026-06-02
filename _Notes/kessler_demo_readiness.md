# Kessler OS Demo Readiness

## Final Readiness Commands

```bash
npm run qa
npm run smoke:routes
npm run export:web
```

## Demo Flow

1. Start at `/` for the product story.
2. Open `/orbit` to show the orbital map and object explorer.
3. Open `/orbit/obj-envisat` for the object passport and decision report.
4. Open `/priority` to show ranked attention.
5. Open `/missions` to simulate inspection, deorbit, capture, or recycle.
6. Open `/circular` to show reuse potential and material categories.
7. Open `/prevention` to explain responsible mission design.
8. Open `/impact` to close with evaluator-friendly metrics.

## Deployment Options

- Expo Go for live mobile MVP demo.
- `npm run export:web` for static web export.
- EAS Update for managed updates.
- EAS Build for native production builds.

## Boundaries to State During Demo

- Kessler OS is a prototype decision-support experience.
- Scores are deterministic planning signals.
- CelesTrak data is adapter-fed where available, with local fallback.
- Reports are deterministic templates, not a live LLM.
- Material estimates are not confirmed composition.
- The app does not perform professional collision prediction or mission assurance.
