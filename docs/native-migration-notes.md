# Future Native Migration Notes

FitCore is currently a local-first PWA. These notes mark the code areas that should become adapters before moving to Expo React Native, HealthKit, or cloud sync.

## Storage Boundary

Current web behavior:

- App data is persisted through browser `localStorage` in `src/app.js`.
- Export/import and undo snapshots also assume browser storage.

Future native boundary:

- Introduce a storage adapter before migration.
- Web implementation can keep `localStorage`.
- Native implementation can later use SQLite, SecureStore, filesystem storage, or cloud sync.
- Keep migration/version code centralized so app state shape does not fork between web and native.

## Apple Health / HealthKit Boundary

Current web behavior:

- The PWA supports manual Apple Health-style imports and normalized readiness snapshots.
- Automatic Apple Health sync is not possible in the browser-only app.

Future native boundary:

- Create a health adapter with methods such as `requestPermission`, `syncDailySummaries`, and `getSourceStatus`.
- HealthKit should store daily summaries first: sleep, HRV, resting heart rate, steps, active calories, workouts, and bodyweight.
- Do not store unnecessary raw samples forever.
- Bodyweight should continue to feed Nutrition.

## Photos / File Storage Boundary

Current web behavior:

- Meal and progress photos are compressed or represented locally.
- Hub includes cleanup/export concepts.

Future native boundary:

- Put photos behind a file/object storage adapter.
- Database records should store metadata and local/cloud file references, not large image blobs.
- Native can later map to device files, cloud object storage, or backup bundles.

## Navigation Boundary

Current web behavior:

- Navigation is global state plus render functions in `src/app.js`.
- Modes are Training, Nutrition, Recovery, and Progress.

Future native boundary:

- Keep route names stable before moving to React Navigation.
- Convert screens to pure render/view functions before translating to React components.
- Preserve the simple workout logger route as a focused full-screen flow.

## AI / Chat Boundary

Current web behavior:

- `scripts/server.mjs` proxies AI/chat and meal estimate requests.
- API keys are server environment variables only.

Future native boundary:

- Keep AI provider calls behind a backend or secure server route.
- Native app should never ship provider API keys.
- Keep coach outputs conservative and avoid medical claims.

## Recommended Native Prep Checklist

- Extract storage functions from `src/app.js` into a module.
- Extract pure metrics/coaching functions so they can be tested outside the UI.
- Extract screen render functions after state and metrics are stable.
- Add a small test harness for storage migration and recommendation logic.
- Keep PWA behavior passing while native adapters are introduced behind the same app-state contract.
