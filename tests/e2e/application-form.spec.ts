import { test, expect } from '@playwright/test';

test.describe('OpenAI Investment Application Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/apply');
  });

  test('should display the application form landing page', async ({ page }) => {
    // Check main heading
    await expect(page.getByRole('heading', { name: /OpenAI Pre-IPO Investment Application/i })).toBeVisible();
    
    // Check key metrics
    await expect(page.getByText('$300B')).toBeVisible();
    await expect(page.getByText('$10K CAD')).toBeVisible();
    await expect(page.getByText('Q4 2025')).toBeVisible();
    
    // Check security indicators
    await expect(page.getByText('Secure • Encrypted • Confidential')).toBeVisible();
  });

  test('should start with step 1 (Personal Information)', async ({ page }) => {
    await expect(page.getByText('Step 1 of 5: Personal Information')).toBeVisible();
    await expect(page.getByText('Progress: 20%')).toBeVisible();
    await expect(page.getByText('4 steps remaining')).toBeVisible();
  });

  test('should display all required fields in step 1', async ({ page }) => {
    // Personal Details section
    await expect(page.getByLabel(/full legal name/i)).toBeVisible();
    await expect(page.getByLabel(/date of birth/i)).toBeVisible();
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(page.getByLabel(/phone number/i)).toBeVisible();
    
    // Address section
    await expect(page.getByLabel(/street address/i)).toBeVisible();
    await expect(page.getByLabel(/city/i)).toBeVisible();
    await expect(page.getByLabel(/province/i)).toBeVisible();
    await expect(page.getByLabel(/postal code/i)).toBeVisible();
    await expect(page.getByLabel(/social insurance number/i)).toBeVisible();
  });

  test('should have Previous button disabled on first step', async ({ page }) => {
    const previousButton = page.getByRole('button', { name: /previous/i });
    await expect(previousButton).toBeDisabled();
  });

  test('should enable Next button on first step', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: /next/i });
    await expect(nextButton).not.toBeDisabled();
  });

  test('should navigate through all steps', async ({ page }) => {
    // Step 1 -> Step 2
    await page.getByRole('button', { name: /next/i }).click();
    await expect(page.getByText('Step 2 of 5: Employment & Financial Profile')).toBeVisible();
    await expect(page.getByText('Progress: 40%')).toBeVisible();
    
    // Step 2 -> Step 3
    await page.getByRole('button', { name: /next/i }).click();
    await expect(page.getByText('Step 3 of 5: Accredited Investor Status')).toBeVisible();
    await expect(page.getByText('Progress: 60%')).toBeVisible();
    
    // Step 3 -> Step 4
    await page.getByRole('button', { name: /next/i }).click();
    await expect(page.getByText('Step 4 of 5: Document Upload')).toBeVisible();
    await expect(page.getByText('Progress: 80%')).toBeVisible();
    
    // Step 4 -> Step 5
    await page.getByRole('button', { name: /next/i }).click();
    await expect(page.getByText('Step 5 of 5: Review & Submit')).toBeVisible();
    await expect(page.getByText('Progress: 100%')).toBeVisible();
    
    // Final step should show submit button
    await expect(page.getByRole('button', { name: /review & submit application/i })).toBeVisible();
  });

  test('should navigate backwards through steps', async ({ page }) => {
    // Go to step 3
    await page.getByRole('button', { name: /next/i }).click();
    await page.getByRole('button', { name: /next/i }).click();
    await expect(page.getByText('Step 3 of 5: Accredited Investor Status')).toBeVisible();
    
    // Go back to step 2
    await page.getByRole('button', { name: /previous/i }).click();
    await expect(page.getByText('Step 2 of 5: Employment & Financial Profile')).toBeVisible();
    
    // Go back to step 1
    await page.getByRole('button', { name: /previous/i }).click();
    await expect(page.getByText('Step 1 of 5: Personal Information')).toBeVisible();
  });

  test('should fill out personal information form', async ({ page }) => {
    // Fill personal details
    await page.getByLabel(/full legal name/i).fill('John Doe');
    await page.getByLabel(/date of birth/i).fill('1990-01-01');
    await page.getByLabel(/email address/i).fill('john.doe@example.com');
    await page.getByLabel(/phone number/i).fill('+1-555-123-4567');
    
    // Fill address
    await page.getByLabel(/street address/i).fill('123 Main Street');
    await page.getByLabel(/city/i).fill('Toronto');
    await page.getByLabel(/postal code/i).fill('M5V 3A8');
    await page.getByLabel(/social insurance number/i).fill('123-456-789');
    
    // Verify fields are filled
    await expect(page.getByLabel(/full legal name/i)).toHaveValue('John Doe');
    await expect(page.getByLabel(/email address/i)).toHaveValue('john.doe@example.com');
    await expect(page.getByLabel(/phone number/i)).toHaveValue('+1-555-123-4567');
  });

  test('should maintain form data when navigating between steps', async ({ page }) => {
    // Fill form data
    await page.getByLabel(/full legal name/i).fill('Jane Smith');
    await page.getByLabel(/email address/i).fill('jane@example.com');
    
    // Go to next step
    await page.getByRole('button', { name: /next/i }).click();
    await expect(page.getByText('Step 2 of 5: Employment & Financial Profile')).toBeVisible();
    
    // Go back to previous step
    await page.getByRole('button', { name: /previous/i }).click();
    
    // Verify data is maintained
    await expect(page.getByLabel(/full legal name/i)).toHaveValue('Jane Smith');
    await expect(page.getByLabel(/email address/i)).toHaveValue('jane@example.com');
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.getByLabel(/email address/i);
    
    // Enter invalid email
    await emailInput.fill('invalid-email');
    
    // Check HTML5 validation
    const isValid = await emailInput.evaluate((input: HTMLInputElement) => input.validity.valid);
    expect(isValid).toBe(false);
    
    // Enter valid email
    await emailInput.fill('valid@example.com');
    const isValidNow = await emailInput.evaluate((input: HTMLInputElement) => input.validity.valid);
    expect(isValidNow).toBe(true);
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Check for proper labels
    const nameInput = page.getByLabel(/full legal name/i);
    await expect(nameInput).toHaveAttribute('required');
    
    const emailInput = page.getByLabel(/email address/i);
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toHaveAttribute('required');
    
    const phoneInput = page.getByLabel(/phone number/i);
    await expect(phoneInput).toHaveAttribute('type', 'tel');
  });

  test('should display security information', async ({ page }) => {
    // Check for security badges
    await expect(page.getByText('Secure')).toBeVisible();
    await expect(page.getByText('Encrypted')).toBeVisible();
    await expect(page.getByText('Confidential')).toBeVisible();
    
    // Check for SSL information
    await expect(page.getByText(/protected by industry-standard ssl encryption/i)).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    await expect(page.getByText('+1 (437) 886-1252')).toBeVisible();
    await expect(page.getByText('info@maryanacap.com')).toBeVisible();
  });

  test('should display legal disclaimers', async ({ page }) => {
    await expect(page.getByText(/this application does not constitute an offer/i)).toBeVisible();
    await expect(page.getByText(/© 2025 Maryana Capital Inc/i)).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    
    // Check that form is still visible and usable
    await expect(page.getByRole('heading', { name: /OpenAI Pre-IPO Investment Application/i })).toBeVisible();
    await expect(page.getByLabel(/full legal name/i)).toBeVisible();
    
    // Check that buttons are properly sized for mobile
    const nextButton = page.getByRole('button', { name: /next/i });
    await expect(nextButton).toBeVisible();
  });
});

test.describe('Application Form - Employment & Financial Step', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/apply');
    // Navigate to step 2
    await page.getByRole('button', { name: /next/i }).click();
  });

  test('should display employment and financial fields', async ({ page }) => {
    await expect(page.getByText('Step 2 of 5: Employment & Financial Profile')).toBeVisible();
    
    // Check for employment fields
    await expect(page.getByLabel(/employment status/i)).toBeVisible();
    await expect(page.getByLabel(/annual income/i)).toBeVisible();
    await expect(page.getByLabel(/net financial assets/i)).toBeVisible();
  });
});

test.describe('Application Form - Complete Flow', () => {
  test('should complete entire application flow', async ({ page }) => {
    await page.goto('/apply');
    
    // Step 1: Personal Information
    await page.getByLabel(/full legal name/i).fill('Test User');
    await page.getByLabel(/date of birth/i).fill('1985-06-15');
    await page.getByLabel(/email address/i).fill('test@example.com');
    await page.getByLabel(/phone number/i).fill('+1-555-999-8888');
    await page.getByLabel(/street address/i).fill('456 Test Avenue');
    await page.getByLabel(/city/i).fill('Vancouver');
    await page.getByLabel(/postal code/i).fill('V6B 1A1');
    await page.getByLabel(/social insurance number/i).fill('987-654-321');
    
    await page.getByRole('button', { name: /next/i }).click();
    
    // Continue through remaining steps (simplified for testing)
    await page.getByRole('button', { name: /next/i }).click();
    await page.getByRole('button', { name: /next/i }).click();
    await page.getByRole('button', { name: /next/i }).click();
    
    // Final step
    await expect(page.getByText('Step 5 of 5: Review & Submit')).toBeVisible();
    await expect(page.getByRole('button', { name: /review & submit application/i })).toBeVisible();
  });
});
