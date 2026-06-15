const { test, expect } = require('@playwright/test');

test('smoke test', async ({ page }) => {
  await page.goto('http://localhost:5173');
  // Wait for the app to load
  await page.waitForSelector('#app');

  // Take a screenshot to see current state
  await page.screenshot({ path: 'current_state.png' });

  // Check if onboarding is visible (if not complete)
  const onboardingVisible = await page.isVisible('section.screen header.home-hero h1:has-text("Make it yours.")');
  console.log('Onboarding visible:', onboardingVisible);

  // Check for floating AI button
  const aiButtonVisible = await page.isVisible('button.floating-ai');
  console.log('AI Button visible:', aiButtonVisible);

  // Check bottom nav
  const bottomNavVisible = await page.isVisible('nav.bottom-nav');
  console.log('Bottom Nav visible:', bottomNavVisible);
});
