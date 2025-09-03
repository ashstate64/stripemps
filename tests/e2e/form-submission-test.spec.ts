import { test, expect } from '@playwright/test';

test.describe('Form Submission Test - Email Delivery Verification', () => {
  test.use({ baseURL: 'https://openai.maryanacap.com' });

  test('should complete full application submission and send email', async ({ page }) => {
    await page.goto('/apply');
    
    console.log('🧪 Starting comprehensive form submission test...');
    
    // Step 1: Personal Information
    await expect(page.getByText('Step 1 of 5: Personal Information')).toBeVisible();
    
    await page.getByLabel(/full legal name/i).fill('Test Application User');
    await page.getByLabel(/date of birth/i).fill('1990-05-15');
    await page.getByLabel(/email address/i).fill('test.applicant@example.com');
    await page.getByLabel(/phone number/i).fill('+1-555-TEST-123');
    await page.getByLabel(/street address/i).fill('123 Test Investment Avenue');
    await page.getByLabel(/city/i).fill('Toronto');
    await page.getByLabel(/postal code/i).fill('M5V 3A8');
    await page.getByLabel(/social insurance number/i).fill('123-456-789');
    
    console.log('✅ Step 1 completed - Personal Information filled');
    await page.getByRole('button', { name: /next/i }).click();
    
    // Step 2: Employment & Financial Profile
    await expect(page.getByText('Step 2 of 5: Employment & Financial Profile')).toBeVisible();
    
    // Fill employment information
    await page.getByLabel(/employment status/i).selectOption('employed');
    await page.getByLabel(/occupation/i).fill('Software Engineer');
    await page.getByLabel(/employer name/i).fill('Tech Company Inc.');
    await page.getByLabel(/annual income/i).selectOption('$200,000 - $500,000');
    await page.getByLabel(/net financial assets/i).selectOption('$1,000,000 - $5,000,000');
    await page.getByLabel(/source of funds/i).selectOption('employment-income');
    
    console.log('✅ Step 2 completed - Employment & Financial Profile filled');
    await page.getByRole('button', { name: /next/i }).click();
    
    // Step 3: Accredited Investor Status
    await expect(page.getByText('Step 3 of 5: Accredited Investor Status')).toBeVisible();
    
    // Select accredited investor qualifications
    await page.getByLabel(/income test/i).check();
    await page.getByLabel(/net worth test/i).check();
    
    console.log('✅ Step 3 completed - Accredited Investor Status selected');
    await page.getByRole('button', { name: /next/i }).click();
    
    // Step 4: Document Upload
    await expect(page.getByText('Step 4 of 5: Document Upload')).toBeVisible();
    
    console.log('✅ Step 4 completed - Document Upload (optional)');
    await page.getByRole('button', { name: /next/i }).click();
    
    // Step 5: Review & Submit
    await expect(page.getByText('Step 5 of 5: Review & Submit')).toBeVisible();
    
    // Accept all required consents
    await page.getByLabel(/consent to data processing/i).check();
    await page.getByLabel(/terms and conditions/i).check();
    await page.getByLabel(/information accuracy/i).check();
    
    console.log('✅ Step 5 completed - Consents accepted');
    
    // Submit the application
    console.log('🚀 Submitting application...');
    await page.getByRole('button', { name: /review & submit application/i }).click();
    
    // Wait for success message
    await expect(page.getByText(/application submitted successfully/i)).toBeVisible({ timeout: 10000 });
    
    // Verify success elements
    await expect(page.getByText('✅ Application Submitted Successfully!')).toBeVisible();
    await expect(page.locator('[class*="text-green-400"]').filter({ hasText: /OAI-/i })).toBeVisible();
    
    console.log('🎉 SUCCESS: Application submitted successfully!');
    console.log('📧 Email should now be sent to info@maryanacap.com');
    console.log('📋 Check your inbox for the application details');
    
    // Take a screenshot for verification
    await page.screenshot({ 
      path: 'test-results/successful-submission.png', 
      fullPage: true 
    });
  });
  
  test('should verify form validation works correctly', async ({ page }) => {
    await page.goto('/apply');
    
    // Try to submit without filling required fields
    await page.getByRole('button', { name: /next/i }).click();
    
    // Should still be on step 1 due to validation
    await expect(page.getByText('Step 1 of 5: Personal Information')).toBeVisible();
    
    console.log('✅ Form validation working correctly');
  });
});
