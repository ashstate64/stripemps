'use server';

import { z } from 'zod';

// Define Zod schema for share agreement validation - Updated for CAD $10,000 minimum
const shareAgreementSchema = z.object({
  agreementId: z.string().min(1, 'Agreement ID is required'),
  accountNumber: z.string().min(6, 'Valid account number is required'),
  shareQuantity: z.number().min(42, 'Minimum 42 shares required (CAD $10,000)'),
  totalInvestment: z.number().min(10000, 'Minimum investment is CAD $10,000'),
  signatureName: z.string().min(2, 'Full legal name is required'),
  digitalSignature: z.string().min(2, 'Digital signature is required'),
  agreedToTerms: z
    .boolean()
    .refine((val) => val === true, 'Must agree to terms'),
  agreedToRisks: z
    .boolean()
    .refine((val) => val === true, 'Must acknowledge risks'),
  agreedToSettlement: z
    .boolean()
    .refine((val) => val === true, 'Must agree to settlement'),
  agreedToSecurities: z
    .boolean()
    .refine((val) => val === true, 'Must acknowledge securities compliance'),
  agreedToEndorsement: z
    .boolean()
    .refine(
      (val) => val === true,
      'Must acknowledge Databricks endorsement disclaimer'
    ),
  agreedToEnhancedRisks: z
    .boolean()
    .refine((val) => val === true, 'Must acknowledge enhanced risk factors'),
  settlementDate: z.string().min(1, 'Settlement date is required'),
  timestamp: z.string().min(1, 'Timestamp is required'),
});

export type ShareAgreementData = z.infer<typeof shareAgreementSchema>;
export type ShareAgreementFormState = {
  message: string;
  errors?: Partial<Record<keyof ShareAgreementData, string[]>>;
  success: boolean;
  agreementId?: string;
  submittedData?: ShareAgreementData;
};

// FormSubmit Configuration for Share Agreements
const FORMSUBMIT_EMAIL = process.env.FORMSUBMIT_EMAIL || 'admin@mpsfc.com';

// Helper function to format share agreement data for FormSubmit.co
function formatShareAgreementForSubmission(data: ShareAgreementData) {
  const timestamp = new Date().toISOString();
  const sharePrice = 239.8;

  return {
    // FormSubmit.co specific fields
    _subject: `🚨 URGENT: Databricks Share Purchase Agreement Executed - ${data.signatureName} - ${data.agreementId}`,
    _captcha: false,
    _template: 'table',
    _cc: 'legal@cgfinancialcanada.ca,compliance@cgfinancialcanada.ca',
    _next: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/share-agreement?success=true&id=${data.agreementId}`,

    // ===== CRITICAL INVESTMENT DETAILS =====
    '🔥_AGREEMENT_TYPE': 'Databricks Pre-IPO Share Purchase Agreement',
    '📋_AGREEMENT_ID': data.agreementId,
    '⏰_EXECUTION_TIMESTAMP': timestamp,
    '📍_EXECUTION_METHOD': 'Digital Portal - Legally Binding',

    // ===== INVESTOR INFORMATION =====
    '👤_INVESTOR_NAME': data.signatureName,
    '🏦_ACCOUNT_NUMBER': data.accountNumber,
    '✍️_DIGITAL_SIGNATURE': data.digitalSignature,
    '📝_SIGNATURE_METHOD': 'Electronic (Ontario Electronic Commerce Act 2000)',

    // ===== INVESTMENT DETAILS =====
    '💰_SHARE_PRICE_USD': `$${sharePrice}`,
    '📊_SHARES_PURCHASED': data.shareQuantity.toString(),
    '💵_TOTAL_INVESTMENT_USD': `$${data.totalInvestment.toLocaleString()}`,
    '📅_SETTLEMENT_DATE': new Date(data.settlementDate).toLocaleDateString(
      'en-US'
    ),
    '⚡_SETTLEMENT_TERMS': 'T+2 Business Days (USD Wire Transfer)',
    '🎯_VALUATION_BASIS': '$100.44B Databricks Valuation',

    // ===== LEGAL CONFIRMATIONS =====
    '✅_TERMS_ACCEPTED': data.agreedToTerms ? 'YES - All terms accepted' : 'NO',
    '⚠️_RISKS_ACKNOWLEDGED': data.agreedToRisks
      ? 'YES - Total loss potential acknowledged'
      : 'NO',
    '💳_SETTLEMENT_AGREED': data.agreedToSettlement
      ? 'YES - T+2 settlement terms accepted'
      : 'NO',
    '📜_SECURITIES_COMPLIANCE': data.agreedToSecurities
      ? 'YES - NI 45-106 exemption acknowledged'
      : 'NO',
    '🚫_DATABRICKS_ENDORSEMENT': data.agreedToEndorsement
      ? 'YES - No Databricks endorsement acknowledged'
      : 'NO',
    '🔴_ENHANCED_RISKS': data.agreedToEnhancedRisks
      ? 'YES - All material risks acknowledged'
      : 'NO',

    // ===== COMPLIANCE FRAMEWORK =====
    '🏛️_GOVERNING_LAW': 'Ontario, Canada',
    '⚖️_SECURITIES_REGULATION': 'Ontario Securities Commission NI 45-106',
    '🔒_RESALE_RESTRICTIONS': '4-month hold + 12-month IPO lock-up',
    '🏪_DISPUTE_RESOLUTION': 'Toronto Arbitration',
    '📱_ELECTRONIC_VALIDITY': 'Ontario Electronic Commerce Act 2000',

    // ===== RISK PROFILE =====
    '🚨_RISK_LEVEL': 'EXTREMELY HIGH RISK',
    '💸_LOSS_POTENTIAL': 'Total loss of principal possible',
    '🔄_LIQUIDITY': 'Highly illiquid - No secondary market',
    '📈_IPO_GUARANTEE': 'NO GUARANTEE of IPO completion',
    '🔄_TRANSFER_RISK': 'Databricks may reject share transfer',
    '📉_DILUTION_RISK': 'Ongoing funding rounds may dilute value',

    // ===== TECHNICAL METADATA =====
    '🌐_SUBMISSION_SOURCE': 'Databricks Investment Portal',
    '🔧_DOCUMENT_VERSION': 'SPA-v2.0-USD',
    '📱_USER_AGENT': 'Mobile-Optimized Investment Portal',
    '🛡️_SECURITY_LEVEL': 'Bank-grade SSL encryption',
    '⏰_SUBMISSION_TIME': timestamp,

    // ===== URGENT ACTION REQUIRED =====
    '🚨_NEXT_STEPS': [
      '1. Send wire transfer instructions within 24 hours',
      '2. Obtain Databricks Right of First Refusal clearance',
      '3. Execute escrow arrangements',
      '4. Prepare share certificates',
      '5. Send legal documentation to investor',
    ].join(' | '),

    // ===== CONTACT INFORMATION =====
    '📞_URGENT_CONTACT': '+1 (437) 886-1252',
    '📧_PRIMARY_EMAIL': 'admin@mpsfc.com',
    '🏢_OFFICE_ADDRESS':
      '123 Front Street West, Suite 1900, Toronto, ON M5J 2M3',
  };
}

export async function submitShareAgreement(
  prevState: ShareAgreementFormState | null,
  formData: FormData
): Promise<ShareAgreementFormState> {
  try {
    // Add realistic processing delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const rawData = Object.fromEntries(formData.entries());
    console.log('Raw form data received:', rawData);

    // Process the form data with proper type conversion
    const processedData = {
      agreementId: rawData.agreementId as string,
      accountNumber: rawData.accountNumber as string,
      shareQuantity: parseInt(rawData.shareQuantity as string) || 0,
      totalInvestment: parseFloat(rawData.totalInvestment as string) || 0,
      signatureName: rawData.signatureName as string,
      digitalSignature: rawData.digitalSignature as string,
      agreedToTerms: rawData.agreedToTerms === 'true',
      agreedToRisks: rawData.agreedToRisks === 'true',
      agreedToSettlement: rawData.agreedToSettlement === 'true',
      agreedToSecurities: rawData.agreedToSecurities === 'true',
      agreedToEndorsement: rawData.agreedToEndorsement === 'true',
      agreedToEnhancedRisks: rawData.agreedToEnhancedRisks === 'true',
      settlementDate: rawData.settlementDate as string,
      timestamp: rawData.timestamp as string,
    };

    console.log('Processed form data:', processedData);

    // Validate the share agreement data
    const validatedFields = shareAgreementSchema.safeParse(processedData);

    if (!validatedFields.success) {
      console.error(
        'Share Agreement Validation Errors:',
        validatedFields.error.flatten().fieldErrors
      );
      return {
        message:
          'Please correct the highlighted errors and complete all required fields.',
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
      };
    }

    // Format data for FormSubmit.co
    const submissionData = formatShareAgreementForSubmission(
      validatedFields.data
    );
    console.log('FormSubmit.co submission data:', submissionData);

    // Submit to FormSubmit.co with proper error handling
    const formSubmitResponse = await fetch(
      `https://formsubmit.co/${FORMSUBMIT_EMAIL}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': 'Databricks-Investment-Portal/2.0',
        },
        body: JSON.stringify(submissionData),
      }
    );

    console.log('FormSubmit.co response status:', formSubmitResponse.status);

    if (!formSubmitResponse.ok) {
      const errorText = await formSubmitResponse.text();
      console.error('FormSubmit.co Error Response:', errorText);

      return {
        message:
          'There was an error processing your share agreement. Our team has been notified. Please contact support at +1 (437) 886-1252.',
        success: false,
      };
    }

    let submissionResult;
    try {
      submissionResult = await formSubmitResponse.json();
      console.log('FormSubmit.co Success Response:', submissionResult);
    } catch {
      console.log('FormSubmit.co responded with success but no JSON data');
      submissionResult = { message: 'Form submitted successfully' };
    }

    return {
      message: `🎉 Share Purchase Agreement executed successfully! Your investment of USD $${validatedFields.data.totalInvestment.toLocaleString()} has been processed.`,
      success: true,
      agreementId: validatedFields.data.agreementId,
      submittedData: validatedFields.data,
    };
  } catch (error) {
    console.error('Share Agreement Submission Error:', error);

    return {
      message:
        'An unexpected error occurred while processing your agreement. Please contact our urgent support line at +1 (437) 886-1252 immediately.',
      success: false,
    };
  }
}
