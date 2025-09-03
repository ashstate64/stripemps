import { test, expect } from '@playwright/test';

// Test against the live production application
test.describe('Live OpenAI Application Form - Production Tests', () => {
  test.use({ baseURL: 'https://openai.maryanacap.com' });

  test('should load the main application page', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /Invest in the Future of AI/i })).toBeVisible();
    
    // Check key metrics are visible - target specific metric cards
    await expect(page.locator('.grid .group').filter({ hasText: '~$300B' }).first()).toBeVisible();
    await expect(page.locator('.grid .group').filter({ hasText: '$58B+' }).first()).toBeVisible();
    await expect(page.locator('.grid .group').filter({ hasText: 'Q4 2025' }).first()).toBeVisible();
  });

  test('should navigate to application form', async ({ page }) => {
    await page.goto('/');
    
    // Click the main CTA button
    await page.getByRole('link', { name: /start investment application/i }).click();
    
    // Should be on the apply page
    await expect(page).toHaveURL('/apply');
    await expect(page.getByRole('heading', { name: /OpenAI Pre-IPO Investment Application/i })).toBeVisible();
  });

  test('should display application form correctly', async ({ page }) => {
    await page.goto('/apply');
    
    // Check form structure
    await expect(page.getByText('Step 1 of 5: Personal Information')).toBeVisible();
    await expect(page.getByText('Progress: 20%')).toBeVisible();
    
    // Check required fields are present
    await expect(page.getByLabel(/full legal name/i)).toBeVisible();
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(page.getByLabel(/phone number/i)).toBeVisible();
    
    // Check security indicators
    await expect(page.getByText('Secure • Encrypted • Confidential')).toBeVisible();
  });

  test('should have working navigation buttons', async ({ page }) => {
    await page.goto('/apply');
    
    // Previous button should be disabled on first step
    const previousButton = page.getByRole('button', { name: /previous/i });
    await expect(previousButton).toBeDisabled();
    
    // Next button should be enabled
    const nextButton = page.getByRole('button', { name: /next/i });
    await expect(nextButton).not.toBeDisabled();
    
    // Click next to go to step 2
    await nextButton.click();
    await expect(page.getByText('Step 2 of 5: Employment & Financial Profile')).toBeVisible();
    
    // Previous button should now be enabled
    await expect(previousButton).not.toBeDisabled();
  });

  test('should validate form inputs', async ({ page }) => {
    await page.goto('/apply');
    
    // Test email validation
    const emailInput = page.getByLabel(/email address/i);
    await emailInput.fill('invalid-email');
    
    // Check HTML5 validation
    const isValid = await emailInput.evaluate((input: HTMLInputElement) => input.validity.valid);
    expect(isValid).toBe(false);
    
    // Test with valid email
    await emailInput.fill('test@example.com');
    const isValidNow = await emailInput.evaluate((input: HTMLInputElement) => input.validity.valid);
    expect(isValidNow).toBe(true);
  });

  test('should maintain responsive design', async ({ page }) => {
    await page.goto('/apply');
    
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('heading', { name: /OpenAI Pre-IPO Investment Application/i })).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { name: /OpenAI Pre-IPO Investment Application/i })).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: /OpenAI Pre-IPO Investment Application/i })).toBeVisible();
    
    // Check that form fields are still accessible on mobile
    await expect(page.getByLabel(/full legal name/i)).toBeVisible();
    await expect(page.getByLabel(/email address/i)).toBeVisible();
  });

  test('should display correct updated dates (Q4 2025)', async ({ page }) => {
    await page.goto('/');
    
    // Check that dates have been updated from 2026 to Q4 2025 - target specific elements
    await expect(page.locator('[class*="text-purple-400"]').filter({ hasText: 'Q4 2025' }).first()).toBeVisible();
    await expect(page.locator('span').filter({ hasText: /Target close: Q4 2025/i })).toBeVisible();
    
    // Navigate to apply page and check there too
    await page.goto('/apply');
    await expect(page.locator('[class*="text-purple-400"]').filter({ hasText: 'Q4 2025' }).first()).toBeVisible();
  });

  test('should have proper SEO and meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/OpenAI Pre-IPO Investment Opportunity/i);
    
    // Check meta description exists
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });

  test('should load without JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    
    await page.goto('/apply');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check that no JavaScript errors occurred
    expect(errors).toHaveLength(0);
  });

  test('should have working contact links', async ({ page }) => {
    await page.goto('/apply');
    
    // Check phone link
    const phoneLink = page.getByRole('link', { name: /\+1 \(437\) 886-1252/i });
    await expect(phoneLink).toHaveAttribute('href', 'tel:+14378861252');
    
    // Check email link
    const emailLink = page.getByRole('link', { name: /info@maryanacap\.com/i });
    await expect(emailLink).toHaveAttribute('href', 'mailto:info@maryanacap.com');
  });

  test('should display legal disclaimers', async ({ page }) => {
    await page.goto('/apply');
    
    // Check for important legal text
    await expect(page.getByText(/this application does not constitute an offer/i)).toBeVisible();
    await expect(page.getByText(/investment opportunities are subject to availability/i)).toBeVisible();
    await expect(page.getByText(/© 2025 Maryana Capital Inc/i)).toBeVisible();
  });
});
