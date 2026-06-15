# Manual Smoke Test Checklist

Use this checklist to verify the application's core functionality after making changes.

## Core Loading & Navigation
- [ ] **App loads**: The application initializes and displays the main dashboard.
- [ ] **No console errors**: Open DevTools and ensure there are no red error logs in the console.
- [ ] **Bottom nav works**: Each icon in the bottom navigation bar correctly updates the active view.
- [ ] **Section switching**: Verify that the Training, Nutrition, Recovery, and Progress sections switch correctly with their respective themes/colors.

## Components & Features
- [ ] **Floating AI assistant**: The AI bubble appears, opens upon clicking, and can be closed.
- [ ] **Workout logger**: The workout logger interface opens and allows for interaction.

## User Lifecycle & Data
- [ ] **Onboarding for fresh users**: Onboarding flow appears correctly for new users/incognito sessions.
- [ ] **Onboarding skip for existing users**: Existing users are taken directly to the dashboard and not forced through onboarding again.
- [ ] **Data persistence**: Changes to settings or logged data persist after a page refresh (localStorage check).

## Quality & Integrity
- [ ] **No duplicate buttons/sheets**: Ensure UI elements are not rendered multiple times (e.g., multiple AI bubbles or nav bars).
- [ ] **No conflict markers**: Ensure no `<<<<<<<`, `=======`, or `>>>>>>>` strings are present in the UI or codebase.
