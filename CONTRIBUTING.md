# FitCore Development Workflow

Use GitHub `main` as the source of truth.

## Branching

- Create a feature branch for each change.
- Open a pull request into `main` when finished.
- Keep PRs focused: refactor, feature, bug fix, or docs.
- Do not commit `.env`, API keys, secrets, generated dependency folders, screenshots, logs, or build output.

## Running Locally

```powershell
npm start
```

or:

```powershell
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Syntax Checks

```powershell
node --check src/app.js
node --check scripts/server.mjs
```

## Manual Smoke Test

Before opening a PR that changes runtime code, check:

- App loads at `http://localhost:5173`
- Onboarding/home loads without console errors
- Mode switching works: Training, Nutrition, Recovery, Progress
- Bottom tabs work: Home, Log, Goals, Hub
- Start workout opens the one-exercise logger
- Weight/reps inputs, `Same`, `Tap/Done`, set modifiers, add set, and finish workout still work
- Nutrition photo/manual meal flow still opens
- Recovery check-in still saves
- Goals and Progress screens still render
- Hub export/data controls still render

## AI / API Keys

The browser app must never store API keys. Optional AI features go through `scripts/server.mjs` and server-only environment variables:

- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `AI_PROVIDER`

Keep `.env` and `.env.*` out of Git.

## Refactor Guidance

The current app intentionally remains a dependency-free PWA. For code cleanup, prefer incremental module extraction over rewrites. See `docs/development-map.md` for the current app map and the safest extraction order.
