/**
 * @jest-environment node
 */

import { submitApplication } from '@/app/actions/submit-application';

// Mock fetch for testing
global.fetch = jest.fn();

describe('Debug Form Submission Issues', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();

    // Mock successful FormSubmit response
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);
  });

  it('should debug the exact form data causing the error', async () => {
    // Recreate the exact form data from the user's submission
    const formData = new FormData();

    // Personal Information
    formData.append('fullName', 'John Michael');
    formData.append('dateOfBirth', '1985-06-15');
    formData.append('email', 'john.test@example.com');
    formData.append('phone', '+1-647-555-9876');
    formData.append('streetAddress', '456 Bay Street Suite 2500');
    formData.append('city', 'Toronto');
    formData.append('province', 'ON'); // Should be 'ON' not 'Ontario'
    formData.append('postalCode', 'M5H 2Y4');
    formData.append('sin', '123-456-789');

    // Employment & Financial
    formData.append('employmentStatus', 'employed');
    formData.append('occupation', 'Senior Software Engineer');
    formData.append('employerName', 'Microsoft Canada');
    formData.append('annualIncome', '200k-299k');
    formData.append('netFinancialAssets', '1M-4.9M');
    formData.append('sourceOfFunds', 'Employment income and stock options');

    // Accredited Investor Status (these IDs from the error message)
    formData.append('accreditedStatus', 'income200k');
    formData.append('accreditedStatus', 'netAssets5M');

    // Documents (optional)
    formData.append('idFrontName', 'image(2)(1).jpg');
    formData.append('idBackName', 'image(2)(1).jpg');
    formData.append('proofOfAddressName', 'OVO Bill Wales-1.pdf');

    // Consents (these MUST be 'on' for checkboxes)
    formData.append('consentDataProcessing', 'on');
    formData.append('consentTerms', 'on');
    formData.append('informationAccuracy', 'on');

    console.log('=== DEBUGGING FORM SUBMISSION ===');
    console.log('Form data entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const result = await submitApplication(null, formData);

    console.log('=== SUBMISSION RESULT ===');
    console.log('Success:', result.success);
    console.log('Message:', result.message);
    if (result.errors) {
      console.log('Validation Errors:', result.errors);
    }
    if (result.submissionId) {
      console.log('Submission ID:', result.submissionId);
    }

    // This should now work
    expect(result.success).toBe(true);
  });

  it('should test with minimal required data only', async () => {
    const formData = new FormData();

    // Only the absolute minimum required fields
    formData.append('fullName', 'Test User');
    formData.append('dateOfBirth', '1990-01-01');
    formData.append('email', 'test@example.com');
    formData.append('phone', '+1-555-123-4567');
    formData.append('streetAddress', '123 Main St');
    formData.append('city', 'Toronto');
    formData.append('province', 'ON');
    formData.append('postalCode', 'M5V 3A8');
    formData.append('sin', '123456789');
    formData.append('employmentStatus', 'employed');
    formData.append('annualIncome', '200k-299k');
    formData.append('netFinancialAssets', '1M-4.9M');
    formData.append('sourceOfFunds', 'Employment income');
    formData.append('accreditedStatus', 'income200k');
    formData.append('consentDataProcessing', 'on');
    formData.append('consentTerms', 'on');
    formData.append('informationAccuracy', 'on');

    const result = await submitApplication(null, formData);

    console.log('=== MINIMAL DATA TEST ===');
    console.log('Success:', result.success);
    if (!result.success) {
      console.log('Errors:', result.errors);
    }

    expect(result.success).toBe(true);
  });
});
