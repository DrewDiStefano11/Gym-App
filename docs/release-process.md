# Release Process

This document outlines the standard procedure for reviewing, testing, and merging changes into FitCore (Apex Signal).

## Core Rules

1. **Never merge automatically**: Every Pull Request requires manual review and verification.
2. **One feature per PR**: Keep changes focused and atomic to make debugging and recovery easier.
3. **Test on mobile viewports**: FitCore is designed for mobile-first use. All UI changes must be verified using mobile-sized viewports (e.g., iPhone 12/13 Pro dimensions).
4. **No hardcoded secrets**: Ensure no API keys or sensitive configurations are included in the source code.

## Pre-Merge Safety Checks

Before deciding if a PR is safe to merge, confirm the following:

- **Syntax Validation**: Run `node --check` on modified files (specifically `src/app.js`).
- **Data Persistence**: Verify that the changes do not erase or corrupt existing `localStorage` data for returning users.
- **Onboarding Logic**: If modified, ensure new users see the onboarding flow and existing users bypass it.
- **AI Assistant**: Confirm the floating button is visible and the chat sheet functions correctly without console errors.

## Testing Checklist

After applying changes in a development environment:

- **Smoke Test**: Launch the app and click through all four main sections (Training, Nutrition, Recovery, Progress).
- **Navigation**: Verify the bottom nav and top-bar actions work correctly.
- **Reload**: Ensure the app state persists after a page refresh.
- **Mobile UI**: Check for overlapping elements or layout breaks in small viewports.

## Recovery Procedure

If a merged PR breaks the application:

1. **Revert Immediately**: Use `git revert` on the merge commit to restore the `main` branch to its last known stable state.
2. **Notify the Team**: Communicate the breakage and the revert in the relevant communication channel.
3. **Debug in Isolation**: Do not attempt to "fix forward" on the `main` branch. Create a new branch to address the issues identified.
4. **Restore Data**: If `localStorage` was corrupted, advise testers to clear their browser cache or use the "Restore from backup" tool if a JSON backup is available.
