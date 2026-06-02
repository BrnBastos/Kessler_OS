# Kessler OS QA Checklist

Use this checklist before demo or submission.

## Automated Checks

```bash
npm run qa
```

Runs:

- `npm run lint`
- `npm run typecheck`
- `npm run test`

With the Expo dev server running:

```bash
npm run smoke:routes
```

## Manual Route Smoke

- `/`
- `/orbit`
- `/orbit/obj-envisat`
- `/priority`
- `/missions`
- `/circular`
- `/prevention`
- `/impact`

## Mobile Layout Checks

- Bottom tabs remain scrollable and usable.
- Metric cards wrap without overlapping text.
- Mission simulator form and saved scenarios remain readable.
- Object cards, report panels, and circular material panels do not overflow.

## Web Layout Checks

- Top navigation shows all routes, including Impact.
- Two-column layouts keep useful spacing on desktop.
- Orbital map markers remain visible and selectable.
- Report panels do not stretch text beyond readable width.

## Data Safety Checks

- CelesTrak failure keeps the local catalog visible.
- Decision reports say they are deterministic templates.
- Material estimates do not claim confirmed composition.
- Mission results do not claim operational feasibility.
