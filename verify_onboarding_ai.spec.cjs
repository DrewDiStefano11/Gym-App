const { test, expect } = require('@playwright/test');

test('Verify Onboarding and AI Assistant', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // 1. Check Onboarding Start
  const onboardingHeading = page.locator('.onboarding-screen h1');
  await expect(onboardingHeading).toBeVisible();
  await page.screenshot({ path: 'verify_onboarding_step1.png' });

  // 2. Step through onboarding
  await page.click('[data-action="onboarding-next"]'); // To Goal
  await page.click('[data-action="onboarding-select"][data-value="Strength"]'); // To Experience
  await page.click('[data-action="onboarding-select"][data-value="intermediate"]'); // To Schedule
  await page.click('[data-action="onboarding-next"]'); // To Split
  await page.click('[data-action="onboarding-select"][data-value="Upper Lower"]'); // To Equipment
  await page.click('[data-action="onboarding-next"]'); // To Bodyweight
  await page.click('[data-action="onboarding-next"]'); // To Summary

  await page.screenshot({ path: 'verify_onboarding_summary.png' });
  await page.click('[data-action="complete-onboarding"]');

  // 3. Verify Home Screen and AI Button
  await expect(page.locator('.home-hero h1')).toBeVisible();
  const aiButton = page.locator('.floating-ai');
  await expect(aiButton).toBeVisible();
  await page.screenshot({ path: 'verify_home_with_ai.png' });

  // 4. Verify AI Assistant Sheet
  await aiButton.click();
  const assistantSheet = page.locator('.assistant-sheet');
  await expect(assistantSheet).toBeVisible();
  await expect(page.locator('.assistant-sheet h2')).toHaveText('Assistant');
  await page.screenshot({ path: 'verify_ai_sheet.png' });

  // 5. Close AI Assistant
  await page.click('[data-action="close-ai-assistant"]');
  await expect(assistantSheet).not.toBeVisible();
});
