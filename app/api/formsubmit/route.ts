import { NextRequest, NextResponse } from 'next/server';
import {
  testFormSubmitConnection,
  getFormSubmitApiKey,
  getFormSubmissions,
} from '@/app/actions/submit-application';

// GET request handler for FormSubmit operations
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const email = searchParams.get('email');

  try {
    switch (action) {
      case 'test':
        // Test FormSubmit connection
        const testResult = await testFormSubmitConnection();
        return NextResponse.json(testResult);

      case 'get-api-key':
        // Get FormSubmit API key
        if (!email) {
          return NextResponse.json(
            { success: false, message: 'Email parameter is required' },
            { status: 400 }
          );
        }

        const apiKeyResult = await getFormSubmitApiKey(email);
        return NextResponse.json(apiKeyResult);

      case 'get-submissions':
        // Get form submissions (requires API key in environment)
        const submissionsResult = await getFormSubmissions();
        return NextResponse.json(submissionsResult);

      default:
        return NextResponse.json(
          {
            success: false,
            message:
              'Valid action required: test, get-api-key, or get-submissions',
            availableActions: [
              {
                action: 'test',
                description: 'Test FormSubmit connection',
                example: '/api/formsubmit?action=test',
              },
              {
                action: 'get-api-key',
                description: 'Request FormSubmit API key',
                example:
                  '/api/formsubmit?action=get-api-key&email=your@email.com',
              },
              {
                action: 'get-submissions',
                description: 'Retrieve form submissions (requires API key)',
                example: '/api/formsubmit?action=get-submissions',
              },
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('FormSubmit API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST request handler for direct form submission (alternative method)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Add FormSubmit specific fields
    const submissionData = {
      _subject:
        formData._subject || 'Stripe Investment Application Form Submission',
      _captcha: false,
      _template: 'table',
      _next:
        formData._next ||
        `${process.env.NEXT_PUBLIC_APP_URL || 'https://stripe.mpsfc.com'}/apply?success=true`,
      ...formData,
      submitted_at: new Date().toISOString(),
      source: 'Stripe Investment Portal API',
    };

    const formSubmitEmail = process.env.FORMSUBMIT_EMAIL || 'admin@mpsfc.com';

    const response = await fetch(`https://formsubmit.co/${formSubmitEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FormSubmit Error:', errorText);

      return NextResponse.json(
        {
          success: false,
          message: 'Failed to submit form to FormSubmit',
          error: errorText,
        },
        { status: response.status }
      );
    }

    let result;
    try {
      result = await response.json();
    } catch {
      // FormSubmit sometimes returns HTML on success
      console.log('FormSubmit returned HTML instead of JSON (likely success)');
      result = { success: true, message: 'Form submitted successfully' };
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully to FormSubmit',
      result,
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process form submission',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
