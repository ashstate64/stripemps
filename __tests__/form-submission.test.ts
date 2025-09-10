/**
 * @jest-environment node
 */

import {
  submitApplication,
  testFormSubmitConnection,
} from '@/app/actions/submit-application';

// Mock fetch for testing
global.fetch = jest.fn();

describe('Form Submission Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  describe('testFormSubmitConnection', () => {
    it('should successfully test FormSubmit connection', async () => {
      // Mock successful FormSubmit response
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response);

      const result = await testFormSubmitConnection();

      expect(result.success).toBe(true);
      expect(result.message).toBe('FormSubmit connection successful');
      expect(fetch).toHaveBeenCalledWith(
        'https://formsubmit.co/info@maryanacap.com',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: expect.stringContaining('FormSubmit Connection Test'),
        })
      );
    });

    it('should handle FormSubmit connection failure', async () => {
      // Mock failed FormSubmit response
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      const result = await testFormSubmitConnection();

      expect(result.success).toBe(false);
      expect(result.message).toBe(
        'FormSubmit connection failed: 500 Internal Server Error'
      );
    });
  });

  describe('submitApplication', () => {
    it('should successfully submit a complete application', async () => {
      // Mock successful FormSubmit response
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Form submitted successfully',
        }),
      } as Response);

      // Create complete form data
      const formData = new FormData();
      formData.append('fullName', 'Test User');
      formData.append('dateOfBirth', '1990-01-01');
      formData.append('email', 'test@example.com');
      formData.append('phone', '+1-555-123-4567');
      formData.append('streetAddress', '123 Test Street');
      formData.append('city', 'Toronto');
      formData.append('province', 'ON');
      formData.append('postalCode', 'M5V 3A8');
      formData.append('sin', '123-456-789');
      formData.append('employmentStatus', 'employed');
      formData.append('annualIncome', '$100,000 - $200,000');
      formData.append('netFinancialAssets', '$500,000 - $1,000,000');
      formData.append('sourceOfFunds', 'employment-income');
      formData.append('accreditedStatus', 'income-test');
      formData.append('consentDataProcessing', 'on');
      formData.append('consentTerms', 'on');
      formData.append('informationAccuracy', 'on');

      const result = await submitApplication(null, formData);

      expect(result.success).toBe(true);
      expect(result.message).toContain('Application submitted successfully');
      expect(result.submissionId).toMatch(/^OAI-\d+-[A-Z0-9]+$/);
      expect(result.submittedData).toBeDefined();
      expect(result.submittedData?.fullName).toBe('Test User');
      expect(result.submittedData?.email).toBe('test@example.com');

      // Verify FormSubmit was called with correct data
      expect(fetch).toHaveBeenCalledWith(
        'https://formsubmit.co/info@maryanacap.com',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: expect.stringContaining('Test User'),
        })
      );

      // Parse the request body to verify it contains expected data
      const fetchCall = (fetch as jest.MockedFunction<typeof fetch>).mock
        .calls[0];
      const requestBody = JSON.parse(fetchCall[1]?.body as string);

      expect(requestBody._subject).toBe(
        'OpenAI Pre-IPO Investment Application - Test User'
      );
      expect(requestBody.full_name).toBe('Test User');
      expect(requestBody.email).toBe('test@example.com');
      expect(requestBody.phone).toBe('+1-555-123-4567');
      expect(requestBody.investment_opportunity).toBe('OpenAI Pre-IPO Shares');
      expect(requestBody.application_type).toBe('Pre-IPO Private Placement');
    });

    it('should validate required fields', async () => {
      // Create incomplete form data (missing required fields)
      const formData = new FormData();
      formData.append('fullName', ''); // Empty required field
      formData.append('email', 'invalid-email'); // Invalid email
      formData.append('dateOfBirth', '');
      formData.append('phone', '');
      formData.append('streetAddress', '');
      formData.append('city', '');
      formData.append('province', '');
      formData.append('postalCode', '');
      formData.append('sin', '');
      formData.append('employmentStatus', '');
      formData.append('annualIncome', '');
      formData.append('netFinancialAssets', '');
      formData.append('sourceOfFunds', '');
      formData.append('accreditedStatus', '');

      const result = await submitApplication(null, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe(
        'Please correct the highlighted errors and try again.'
      );
      expect(result.errors).toBeDefined();
      expect(result.errors?.fullName).toContain('Full name is required');
      expect(result.errors?.email).toContain('Invalid email address');

      // Should not call FormSubmit if validation fails
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should handle FormSubmit API errors', async () => {
      // Mock FormSubmit API error
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        text: async () => 'Invalid form data',
      } as Response);

      // Create valid form data
      const formData = new FormData();
      formData.append('fullName', 'Test User');
      formData.append('dateOfBirth', '1990-01-01');
      formData.append('email', 'test@example.com');
      formData.append('phone', '+1-555-123-4567');
      formData.append('streetAddress', '123 Test Street');
      formData.append('city', 'Toronto');
      formData.append('province', 'ON');
      formData.append('postalCode', 'M5V 3A8');
      formData.append('sin', '123-456-789');
      formData.append('employmentStatus', 'employed');
      formData.append('annualIncome', '$100,000 - $200,000');
      formData.append('netFinancialAssets', '$500,000 - $1,000,000');
      formData.append('sourceOfFunds', 'employment-income');
      formData.append('accreditedStatus', 'income-test');
      formData.append('consentDataProcessing', 'on');
      formData.append('consentTerms', 'on');
      formData.append('informationAccuracy', 'on');

      const result = await submitApplication(null, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe(
        'There was an error submitting your application. Please try again or contact support.'
      );
    });

    it('should format application data correctly for FormSubmit', async () => {
      // Mock successful FormSubmit response
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response);

      const formData = new FormData();
      formData.append('fullName', 'John Doe');
      formData.append('dateOfBirth', '1985-06-15');
      formData.append('email', 'john.doe@example.com');
      formData.append('phone', '+1-555-987-6543');
      formData.append('streetAddress', '456 Investment Ave');
      formData.append('city', 'Vancouver');
      formData.append('province', 'BC');
      formData.append('postalCode', 'V6B 1A1');
      formData.append('sin', '987-654-321');
      formData.append('employmentStatus', 'self-employed');
      formData.append('occupation', 'Software Developer');
      formData.append('employerName', 'Tech Startup Inc.');
      formData.append('annualIncome', '$200,000 - $500,000');
      formData.append('netFinancialAssets', '$1,000,000 - $5,000,000');
      formData.append('sourceOfFunds', 'business-income');
      formData.append('accreditedStatus', 'income-test');
      formData.append('accreditedStatus', 'net-worth-test');
      formData.append('consentDataProcessing', 'on');
      formData.append('consentTerms', 'on');
      formData.append('informationAccuracy', 'on');

      await submitApplication(null, formData);

      // Verify the formatted data sent to FormSubmit
      const fetchCall = (fetch as jest.MockedFunction<typeof fetch>).mock
        .calls[0];
      const requestBody = JSON.parse(fetchCall[1]?.body as string);

      // Check FormSubmit-specific fields
      expect(requestBody._subject).toBe(
        'OpenAI Pre-IPO Investment Application - John Doe'
      );
      expect(requestBody._captcha).toBe(false);
      expect(requestBody._template).toBe('table');
      expect(requestBody._next).toContain('/apply?success=true');

      // Check personal information
      expect(requestBody.full_name).toBe('John Doe');
      expect(requestBody.date_of_birth).toBe('1985-06-15');
      expect(requestBody.email).toBe('john.doe@example.com');
      expect(requestBody.phone).toBe('+1-555-987-6543');
      expect(requestBody.street_address).toBe('456 Investment Ave');
      expect(requestBody.city).toBe('Vancouver');
      expect(requestBody.province).toBe('BC');
      expect(requestBody.postal_code).toBe('V6B 1A1');
      expect(requestBody.sin).toBe('987-654-321');

      // Check employment/financial information
      expect(requestBody.employment_status).toBe('self-employed');
      expect(requestBody.occupation).toBe('Software Developer');
      expect(requestBody.employer_name).toBe('Tech Startup Inc.');
      expect(requestBody.annual_income).toBe('$200,000 - $500,000');
      expect(requestBody.net_financial_assets).toBe('$1,000,000 - $5,000,000');
      expect(requestBody.source_of_funds).toBe('business-income');

      // Check accredited investor status
      expect(requestBody.accredited_status).toBe('income-test, net-worth-test');

      // Check consents
      expect(requestBody.consent_data_processing).toBe('Yes');
      expect(requestBody.consent_terms).toBe('Yes');
      expect(requestBody.information_accuracy).toBe('Yes');

      // Check metadata
      expect(requestBody.investment_opportunity).toBe('OpenAI Pre-IPO Shares');
      expect(requestBody.application_type).toBe('Pre-IPO Private Placement');
      expect(requestBody.application_submitted_at).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
      );
    });
  });

  describe('Email Configuration', () => {
    it('should use correct email address for submissions', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response);

      await testFormSubmitConnection();

      expect(fetch).toHaveBeenCalledWith(
        'https://formsubmit.co/info@maryanacap.com',
        expect.any(Object)
      );
    });
  });
});
