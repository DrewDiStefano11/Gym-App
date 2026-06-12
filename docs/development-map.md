# FitCore Development Map

This project is currently a dependency-free, local-first PWA. The main runtime code intentionally lives in a small number of files so the app can run with only Node's built-in server.

## Current Tech Stack

- Static PWA shell: `index.html`, `manifest.webmanifest`, `sw.js`
- Vanilla JavaScript SPA: `src/app.js`
- Plain CSS design system: `src/styles.css`
- Local Node server and API proxy: `scripts/server.mjs`
- Browser `localStorage` for app data and migrations
- Optional AI provider proxy through server environment variables

## Main Source Files

```text
src/app.js           App state, data model, routing, rendering, coaching, nutrition, recovery, progress, storage, and event binding
src/styles.css       Mobile-first app shell, mode colors, workout logger, cards, charts, and PWA UI styling
scripts/server.mjs   Static file server plus AI/chat, meal-estimate, and barcode proxy routes
sw.js                PWA cache shell
manifest.webmanifest PWA metadata and icons
assets/              SVG app icons
```

## `src/app.js` Section Map

The file is large, but it is organized into recognizable areas. Use this map before extracting modules.

| Area | Current responsibilities | Future module target |
| --- | --- | --- |
| Constants and seed data | Storage keys, modes, icons, exercise library, default state | `state/defaults.js`, `models/exercises.js` |
| State normalization and migration | `loadState`, `normalizeState`, model normalizers, version migration | `storage/migrations.js`, `models/normalizers.js` |
| Storage and backup | `saveState`, undo stack, export/import, local backup metadata | `storage/index.js`, `storage/export.js` |
| Metrics and derived data | e1RM, volume, readiness, goals, trends, correlations, weekly reports | `metrics/index.js` |
| Coaching logic | recommendations, suggested weights, adaptive plans, deload signals, swaps | `coach/index.js` |
| Nutrition | meals, macro targets, bodyweight, supplements, barcode/photo estimate state | `nutrition/index.js` |
| Recovery/health | recovery check-ins, health imports, readiness snapshots, source cards | `recovery/index.js`, `health/imports.js` |
| Training/workouts | active workout, sets, modifiers, templates, cardio, history, review | `training/index.js`, `training/workout.js` |
| Screens/rendering | Home, Coach, Goals, Health, Nutrition, Progress, Report, Hub, Settings | `screens/*.js` |
| Navigation/events | mode tabs, top actions, bottom nav, swipe navigation, event binding | `navigation/index.js`, `events/bindings.js` |
| Charts/visuals | SVG charts, gauges, bars, heatmaps, body map, timelines | `charts/index.js` |
| AI assistant | context building, chat messages, suggestions, fallback replies | `ai/index.js` |
| Utilities | IDs, dates, formatting, escaping, short labels | `utils/index.js` |

## Recommended Refactor Order

1. Extract pure utilities first: dates, ids, escaping, formatting.
2. Extract model/default data next: seed state, exercises, modes, icons.
3. Extract storage and migration code while keeping the same public state shape.
4. Extract pure metrics and coach functions with unit-testable inputs.
5. Extract screens only after data/metrics modules are stable.
6. Extract event binding last, because it touches almost every screen.

## Safety Rules For Refactors

- Keep `STORAGE_KEY` and existing migration behavior unchanged unless explicitly migrating.
- Avoid changing persisted object shapes in module-only PRs.
- Prefer pure functions that accept `state` or records as arguments instead of hidden globals.
- Do not introduce dependencies until the PWA structure decision is revisited.
- Keep the live workout screen regression-tested after every render/event change.

## Future Native / Expo React Native Notes

These are the areas that matter most for a future Expo/React Native migration:

- Browser `localStorage` should become an adapter layer so it can later map to SQLite, SecureStore, or a cloud sync client.
- Apple Health automatic sync cannot happen in the current PWA. HealthKit access should live behind a future native health adapter.
- Meal/progress photos should move behind a storage adapter so web object URLs and native file URIs are interchangeable.
- Navigation state should become declarative before moving to React Navigation.
- AI/chat calls should stay server-side or behind a secure native/backend proxy. Never store API keys in the app bundle.
