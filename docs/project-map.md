# FitCore Project Map for AI Agents

This document provides a guide for AI coding agents working on FitCore. It outlines the project structure, identifies risks, and defines rules for safe parallel development.

## 1. Project overview

* **App Name:** FitCore (also referred to as Apex Signal in some contexts).
* **Nature:** A mobile-first fitness Progressive Web App (PWA).
* **Architecture:** Mostly a single-file vanilla JavaScript application (`src/app.js`).
* **Target Audience:** Designed for one primary user (local-first).
* **Persistence:** Uses `localStorage`-first persistence with optional auto-backups.
* **Main Sections:**
  * **Training:** Workout logging and planning.
  * **Nutrition:** Food and macro tracking.
  * **Recovery:** Sleep and readiness monitoring.
  * **Progress:** Strength trends and body metrics.
* **AI Assistant:** Features a floating AI assistant available across the main app.
* **Onboarding:** Includes a native 6-step wizard for new users.
* **Goal:** The app must remain stable, fast, and easy to test on mobile devices.

## 2. Current user priorities

* **Training:** Support for workout templates, active workout logging (one exercise at a time), cardio entries, history, goals, and Personal Records (PRs).
* **Nutrition:** Food logging, macro tracking, weight management, meal templates, and AI-assisted recommendations.
* **Recovery:** Tracking sleep, readiness, and fatigue levels.
* **Progress:** Strength trends, PR history, bodyweight tracking, and progress photos.
* **AI Assistant:** Provide actionable advice and insights without silently mutating user data. All data changes must be confirmed by the user.
* **Integrations:** Apple Health and other external integrations are planned for future phases.

## 3. High-risk files

These files are critical to the app's operation. Changes here can have wide-reaching effects.

* `src/app.js`: **Critical.** Contains main app state, rendering logic, navigation, onboarding, workout logger, AI assistant, and core behavior.
* `src/styles.css`: **High Risk.** Global styling; changes can affect every screen and break the mobile-first layout.
* `src/fitcore-bootstrap.js`: **High Risk.** The main entry point for bootstrapping the application.
* `src/fitcore-overrides.css`: **High Risk.** Contains mobile-specific overrides or specialized styling layers.
* `index.html`: **High Risk.** The app shell; manages script/style loading and the root DOM structure.
* `scripts/server.mjs`: **Medium Risk.** Manages the local development server and API/proxy behavior.
* `sw.js`: **Medium Risk.** Service worker for PWA caching; errors here can lead to stale content or broken offline behavior.
* `package.json`: **Medium Risk.** Defines dependencies and scripts; changes can break validation or the build environment.

**Rule:** Only one active PR should touch `src/app.js` at a time unless absolutely unavoidable.

## 4. Safer files for parallel work

Changes to these files are generally lower risk and safer for parallel development.

* `docs/`: Documentation and guides (like this one).
* `data/`: Content packs and structured JSON data.
* Standalone validation scripts in `scripts/`: Safe as long as they do not affect runtime application logic.
* `.github/`: Workflows and templates, if scoped carefully to CI/CD processes.

**Note:** Even "safe" files require validation and standard PR review.

## 5. Current app structure

A practical map of where key concepts live in the codebase:

* **Global State & Seed Data:** Defined at the top of `src/app.js`.
* **LocalStorage & Persistence:** `loadState`, `saveState`, and migration logic in `src/app.js`.
* **Onboarding State:** `state.onboardingComplete` and the onboarding wizard logic in `src/app.js`.
* **Floating AI Assistant:** Native integration and UI logic in `src/app.js`; proxy routes in `scripts/server.mjs`.
* **Navigation:** Mode tabs and bottom navigation rendering in `src/app.js`.
* **Training:** Workout logger, active workout state (`activeWorkout`), templates, and exercise library in `src/app.js`.
* **Nutrition:** Meal entries, macro calculations, and food data in `src/app.js`.
* **Recovery:** Readiness, sleep, and fatigue tracking logic in `src/app.js`.
* **Progress:** PR tracking, history visualizations, and bodyweight logic in `src/app.js`.
* **Server/API Proxy:** AI chat and external API proxies in `scripts/server.mjs`.
* **Validation:** Health and safety checks in `scripts/safety-check.mjs` and specialized data validators.

## 6. AI assistant boundaries

* **Security:** NEVER hardcode API keys. Do not put API keys in frontend code.
* **Architecture:** Use backend/server proxy patterns for AI communication.
* **Interaction:** AI can suggest changes or prepare data, but MUST NOT silently mutate user state.
* **Graceful Failure:** If API keys are missing or the server is down, the UI must fail gracefully without breaking the rest of the app.
* **Visibility:** The floating AI button should remain consistently available across all main sections.

## 7. Data safety rules

* **Persistence:** Do not wipe `localStorage` or change storage keys casually.
* **Onboarding:** Do not reset existing users into onboarding unless explicitly required by the task.
* **Data Integrity:** Do not delete or corrupt existing workouts, meals, or progress data.
* **Compatibility:** Always preserve backward compatibility for user data.
* **Safety Net:** Use auto-backup or export patterns when modifying storage behavior.

## 8. Validation commands

Always run the syntax checks before submitting:

```bash
node --check src/app.js
node --check scripts/server.mjs
node --check src/fitcore-bootstrap.js
```

Run specialized validators if they exist on your branch:

```bash
node scripts/safety-check.mjs
node scripts/validate-training-data.mjs
node scripts/validate-nutrition-data.mjs
```

## 9. Manual smoke test

Verify your changes with this mobile-first checklist:

* [ ] App loads without a blank screen.
* [ ] No red console errors on startup.
* [ ] Training section opens and functions.
* [ ] Nutrition section opens and functions.
* [ ] Recovery section opens and functions.
* [ ] Progress section opens and functions.
* [ ] Bottom navigation works correctly.
* [ ] Floating AI assistant opens and closes.
* [ ] Onboarding appears for fresh users (clear localStorage to test).
* [ ] Existing users are NOT forced through onboarding.
* [ ] Workout logger opens correctly.
* [ ] Manual workout flow still works.
* [ ] Template workout flow works if templates are touched.
* [ ] Data persists after a page refresh.
* [ ] No duplicate UI elements (nav bars, buttons, sheets).

## 10. PR rules for AI agents

* **Branching:** Always start from the latest `main`.
* **Scope:** One PR equals one task. Do not mix unrelated changes.
* **Freshness:** Do not reuse old branches for new tasks.
* **Restraint:** Do not touch restricted/high-risk files unless the task explicitly requires it.
* **Transparency:** Report exactly which files were changed.
* **Verification:** Report the specific validation commands run and their results.
* **Process:** Open a real GitHub PR. Provide the PR number and link.
* **No Auto-Merge:** Do not claim a PR exists unless it is real. Do not merge automatically.

## 11. Recommended merge order

1. **Safety/Infrastructure:** Safety scripts and validation tools should merge before workflows that depend on them.
2. **Data:** Content packs and JSON data should merge before the UI wiring that consumes them.
3. **Docs:** Documentation-only PRs can be merged as soon as they are reviewed.
4. **App Code:** PRs touching `src/app.js` require the most careful review and should be merged one at a time. Avoid stacking multiple PRs that touch this file.

## 12. Recovery guidance

If `main` becomes broken:

1. **Stop:** Cease all new feature work immediately.
2. **Identify:** Locate the PR that introduced the regression.
3. **Fix:** Revert the bad PR or create a focused cleanup PR.
4. **Validate:** Confirm the app loads and functions before continuing with other work.
5. **Document:** Briefly document what happened if it impacts the development process.
