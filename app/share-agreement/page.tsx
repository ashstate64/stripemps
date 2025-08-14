'use client';

import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

import {
  FileText,
  Shield,
  DollarSign,
  PenTool,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Download,
  Calculator,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';
import {
  submitShareAgreement,
  type ShareAgreementFormState,
} from '@/app/actions/submit-share-agreement';
import { calculateSettlementDate } from '@/lib/share-agreement-utils';

export default function SharePurchaseAgreement() {
  // State management
  const [accountNumber, setAccountNumber] = useState('');
  const [shareQuantity, setShareQuantity] = useState<number>(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToRisks, setAgreedToRisks] = useState(false);
  const [agreedToSettlement, setAgreedToSettlement] = useState(false);
  const [agreedToSecurities, setAgreedToSecurities] = useState(false);
  const [agreedToEndorsement, setAgreedToEndorsement] = useState(false);
  const [agreedToEnhancedRisks, setAgreedToEnhancedRisks] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [agreementId, setAgreementId] = useState('');
  const [signatureData, setSignatureData] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [currentTimestamp, setCurrentTimestamp] = useState('');

  const [formState, formAction] = useActionState<
    ShareAgreementFormState | null,
    FormData
  >(submitShareAgreement, null);

  // Investment calculations
  const sharePrice = 239.8;
  const minimumShares = Math.ceil(1000 / sharePrice);
  const totalInvestmentUSD = shareQuantity * sharePrice;
  const settlementDate = calculateSettlementDate();
  const completionPercentage = Math.min(((currentStep - 1) / 3) * 100, 100);

  useEffect(() => {
    const id =
      `SPA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`.toUpperCase();
    const timestamp = new Date().toISOString();
    setAgreementId(id);
    setCurrentTimestamp(timestamp);
  }, []);

  const handleSignatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSignatureData(e.target.value);
  };

  const isFormValid = () => {
    return (
      shareQuantity >= minimumShares &&
      accountNumber.trim() !== '' &&
      signatureName.trim() !== '' &&
      signatureData.trim() !== '' &&
      agreedToTerms &&
      agreedToRisks &&
      agreedToSettlement &&
      agreedToSecurities &&
      agreedToEndorsement &&
      agreedToEnhancedRisks
    );
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Success state
  if (formState?.success && formState.submittedData) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 p-4'>
        <Card className='w-full max-w-4xl border-green-500/30 bg-slate-800/90 shadow-2xl'>
          <CardHeader className='border-b border-green-500/20 bg-gradient-to-r from-green-900/20 to-blue-900/20 text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500'>
              <CheckCircle2 className='h-8 w-8 text-white' />
            </div>
            <CardTitle className='text-2xl font-bold text-white'>
              Agreement Executed Successfully
            </CardTitle>
            <p className='text-green-300'>
              Your OpenAI Pre-IPO Share Purchase Agreement has been digitally
              signed
            </p>
          </CardHeader>
          <CardContent className='p-8'>
            <div className='space-y-6'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='rounded-lg bg-slate-700/50 p-4'>
                  <h3 className='mb-2 font-semibold text-white'>
                    Agreement Details
                  </h3>
                  <div className='space-y-2 text-sm text-gray-300'>
                    <p>
                      <strong>Agreement ID:</strong> {formState.agreementId}
                    </p>
                    <p>
                      <strong>Account Number:</strong>{' '}
                      {formState.submittedData.accountNumber}
                    </p>
                    <p>
                      <strong>Shares Purchased:</strong>{' '}
                      {formState.submittedData.shareQuantity.toLocaleString()}
                    </p>
                    <p>
                      <strong>Total Investment:</strong> USD $
                      {formState.submittedData.totalInvestment.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className='rounded-lg bg-slate-700/50 p-4'>
                  <h3 className='mb-2 font-semibold text-white'>
                    Settlement Information
                  </h3>
                  <div className='space-y-2 text-sm text-gray-300'>
                    <p>
                      <strong>Settlement Date:</strong>{' '}
                      <span suppressHydrationWarning>
                        {new Date(
                          formState.submittedData.settlementDate
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
                    </p>
                    <p>
                      <strong>Payment Due:</strong> T+2 Business Days
                    </p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <Badge className='bg-green-600'>Pending Settlement</Badge>
                    </p>
                  </div>
                </div>
              </div>

              <Alert className='border-blue-500/50 bg-blue-900/20'>
                <FileText className='h-4 w-4 text-blue-400' />
                <AlertDescription className='text-blue-300'>
                  <strong>Next Steps:</strong>
                  <ul className='mt-2 list-inside list-disc space-y-1 text-sm'>
                    <li>
                      You will receive wire transfer instructions within 24
                      hours
                    </li>
                    <li>
                      Payment must be received by{' '}
                      <span suppressHydrationWarning>
                        {new Date(
                          formState.submittedData.settlementDate
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>{' '}
                      (T+2)
                    </li>
                    <li>
                      Share certificates will be issued upon payment
                      confirmation
                    </li>
                    <li>
                      A copy of this agreement has been sent to your registered
                      email
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className='flex justify-center space-x-4'>
                <Button variant='outline' onClick={() => window.print()}>
                  <Download className='mr-2 h-4 w-4' />
                  Download Agreement
                </Button>
                <Button onClick={() => window.close()}>Close</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900'>
      {/* Ultra-Compact Mobile Header */}
      <header className='sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/95 backdrop-blur-xl'>
        <div className='mx-auto max-w-7xl px-3 py-2 sm:px-4 sm:py-3 md:py-4'>
          {/* Hyper-compact header layout for mobile */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2 sm:space-x-3'>
              <div className='openai-logo-container'>
                <Image
                  src='/maryana-logo.webp'
                  alt='Maryana Capital Inc. Logo'
                  width={24}
                  height={24}
                  className='openai-logo-image rounded-sm ring-1 ring-slate-700/50 sm:h-8 sm:w-8 md:h-10 md:w-10'
                />
              </div>
              <div>
                <h1 className='text-sm font-bold text-white sm:text-base md:text-lg lg:text-xl'>
                  OpenAI Pre-IPO
                </h1>
                <p className='text-xs text-gray-400 sm:text-sm'>
                  $239.80/share
                </p>
              </div>
            </div>

            {/* Ultra-compact badges */}
            <div className='flex flex-col items-end space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0'>
              <Badge
                variant='outline'
                className='border-green-400 px-1 py-0.5 text-xs text-green-400 sm:px-2 sm:py-1'
              >
                <Shield className='mr-0.5 h-2 w-2 sm:mr-1 sm:h-3 sm:w-3' />
                <span className='hidden sm:inline'>Bank-Grade</span> Security
              </Badge>
              <Badge
                variant='outline'
                className='border-blue-400 px-1 py-0.5 text-xs text-blue-400 sm:px-2 sm:py-1'
              >
                <Lock className='mr-0.5 h-2 w-2 sm:mr-1 sm:h-3 sm:w-3' />
                OSC Compliant
              </Badge>
            </div>
          </div>

          {/* Ultra-compact Progress Indicator */}
          <div className='mt-2 sm:mt-3'>
            <div className='mb-1 flex items-center justify-between sm:mb-2'>
              <span className='text-xs text-gray-400 sm:text-sm'>
                Step {currentStep} of 4
              </span>
              <span className='text-xs text-gray-400 sm:text-sm'>
                {Math.round(completionPercentage)}% Complete
              </span>
            </div>
            <Progress value={completionPercentage} className='h-1.5 sm:h-2' />

            {/* Ultra-compact mobile step indicators */}
            <div className='mt-2 flex justify-center space-x-1.5 sm:hidden'>
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 w-1.5 rounded-full ${
                    step <= currentStep ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-7xl px-3 py-3 sm:px-4 sm:py-4 md:py-6 lg:py-8'>
        {/* Ultra-compact mobile layout */}
        <div className='flex flex-col gap-4 sm:gap-5 md:gap-6 lg:grid lg:grid-cols-12 lg:gap-8'>
          {/* Main Content Area - Mobile full width */}
          <div className='order-2 lg:order-1 lg:col-span-8'>
            {/* Step 1: Investment Overview - Ultra-compact */}
            {currentStep === 1 && (
              <Card className='border-slate-700 bg-slate-800/60 shadow-2xl'>
                <CardHeader className='pb-3 sm:pb-4 md:pb-6'>
                  <CardTitle className='flex items-center text-lg text-white sm:text-xl md:text-2xl'>
                    <Calculator className='mr-2 h-4 w-4 sm:h-5 sm:w-5 md:mr-3 md:h-6 md:w-6' />
                    Investment Overview
                  </CardTitle>
                  <p className='text-sm text-gray-300 sm:text-base'>
                    Configure your OpenAI pre-IPO investment details
                  </p>
                </CardHeader>
                <CardContent className='space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8'>
                  {/* Ultra-compact Investment Calculator */}
                  <div className='rounded-lg border border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-3 sm:p-4 md:rounded-xl md:p-6'>
                    <h3 className='mb-2 flex items-center text-base font-semibold text-white sm:mb-3 sm:text-lg md:mb-4 md:text-xl'>
                      <DollarSign className='mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5' />
                      Investment Calculator
                    </h3>

                    {/* Ultra-compact mobile layout */}
                    <div className='space-y-3 sm:space-y-4 md:space-y-6'>
                      <div>
                        <Label className='text-sm font-medium text-gray-300 sm:text-base'>
                          Number of Shares
                        </Label>
                        <Input
                          type='number'
                          min={minimumShares}
                          value={shareQuantity || ''}
                          onChange={(e) =>
                            setShareQuantity(parseInt(e.target.value) || 0)
                          }
                          placeholder={`Min ${minimumShares} shares`}
                          className='mt-2 h-12 border-slate-600 bg-slate-700 text-base text-white sm:h-14 sm:text-lg'
                          style={{ fontSize: '16px' }} // Prevent zoom on iOS
                        />
                        <p className='mt-1 text-xs text-gray-500 sm:text-sm'>
                          Minimum: USD $1,000 (≈{minimumShares} shares)
                        </p>
                      </div>

                      {/* Investment summary - always visible on mobile */}
                      <div className='rounded-lg bg-slate-700/50 p-3 sm:p-4'>
                        <div className='space-y-2 sm:space-y-3'>
                          <div className='flex justify-between text-sm sm:text-base'>
                            <span className='text-gray-300'>Share Price:</span>
                            <span className='font-semibold text-white'>
                              $239.80
                            </span>
                          </div>
                          <div className='flex justify-between text-sm sm:text-base'>
                            <span className='text-gray-300'>Shares:</span>
                            <span className='font-semibold text-white'>
                              {shareQuantity.toLocaleString()}
                            </span>
                          </div>
                          <Separator className='bg-slate-600' />
                          <div className='flex justify-between'>
                            <span className='text-base font-bold text-white sm:text-lg'>
                              Total:
                            </span>
                            <span className='text-base font-bold text-green-400 sm:text-lg'>
                              USD ${totalInvestmentUSD.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ultra-compact Key Highlights */}
                  <div className='grid grid-cols-3 gap-2 sm:gap-3 md:gap-4'>
                    <div className='rounded-md bg-slate-700/30 p-2 text-center sm:rounded-lg sm:p-3 md:p-4'>
                      <div className='text-lg font-bold text-green-400 sm:text-xl md:text-2xl'>
                        $300B
                      </div>
                      <div className='text-xs text-gray-300 sm:text-sm'>
                        <span className='sm:hidden'>Valuation</span>
                        <span className='hidden sm:inline'>
                          Current Valuation
                        </span>
                      </div>
                    </div>
                    <div className='rounded-md bg-slate-700/30 p-2 text-center sm:rounded-lg sm:p-3 md:p-4'>
                      <div className='text-lg font-bold text-blue-400 sm:text-xl md:text-2xl'>
                        T+2
                      </div>
                      <div className='text-xs text-gray-300 sm:text-sm'>
                        <span className='sm:hidden'>Settlement</span>
                        <span className='hidden sm:inline'>
                          Settlement Period
                        </span>
                      </div>
                    </div>
                    <div className='rounded-md bg-slate-700/30 p-2 text-center sm:rounded-lg sm:p-3 md:p-4'>
                      <div className='text-lg font-bold text-purple-400 sm:text-xl md:text-2xl'>
                        12mo
                      </div>
                      <div className='text-xs text-gray-300 sm:text-sm'>
                        <span className='sm:hidden'>Lock-up</span>
                        <span className='hidden sm:inline'>Lock-up Period</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-optimized action button - thumb-friendly position */}
                  <div className='flex flex-col space-y-3 sm:flex-row sm:justify-end sm:space-y-0'>
                    <Button
                      onClick={nextStep}
                      disabled={shareQuantity < minimumShares}
                      className='w-full bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 text-base font-medium hover:opacity-90 sm:w-auto sm:px-8 sm:py-3'
                      style={{ minHeight: '44px', minWidth: '44px' }} // Touch-friendly 44px minimum
                    >
                      Continue to Terms
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Agreement Terms - Ultra-compact */}
            {currentStep === 2 && (
              <Card className='border-slate-700 bg-slate-800/60 shadow-2xl'>
                <CardHeader className='pb-3 sm:pb-4 md:pb-6'>
                  <CardTitle className='flex items-center text-lg text-white sm:text-xl md:text-2xl'>
                    <FileText className='mr-2 h-4 w-4 sm:h-5 sm:w-5 md:mr-3 md:h-6 md:w-6' />
                    Agreement Terms
                  </CardTitle>
                  <p className='text-sm text-gray-300 sm:text-base'>
                    Key terms and conditions for your investment
                  </p>
                </CardHeader>
                <CardContent className='space-y-3 sm:space-y-4 md:space-y-6'>
                  {/* Ultra-compact Terms - optimized for mobile reading */}
                  <div className='space-y-2 sm:space-y-3 md:space-y-4'>
                    {/* Purchase Agreement */}
                    <div className='rounded-md border border-blue-500/30 bg-blue-900/20 p-2 sm:rounded-lg sm:p-3 md:p-4'>
                      <h3 className='mb-1 text-sm font-semibold text-white sm:mb-2 sm:text-base md:mb-3 md:text-lg'>
                        Purchase Agreement
                      </h3>
                      <ul className='space-y-0.5 text-xs leading-relaxed text-gray-300 sm:space-y-1 sm:text-sm md:space-y-2'>
                        <li>
                          • Purchase OpenAI Class A Shares via CG Financial
                          International
                        </li>
                        <li>
                          • Fixed price: USD $239.80/share ($300B valuation)
                        </li>
                        <li>• USD denominated transactions</li>
                        <li>• Legally binding digital execution</li>
                      </ul>
                    </div>

                    {/* Settlement Terms */}
                    <div className='rounded-md border border-green-500/30 bg-green-900/20 p-2 sm:rounded-lg sm:p-3 md:p-4'>
                      <h3 className='mb-1 text-sm font-semibold text-white sm:mb-2 sm:text-base md:mb-3 md:text-lg'>
                        Settlement & Security
                      </h3>
                      <ul className='space-y-0.5 text-xs leading-relaxed text-gray-300 sm:space-y-1 sm:text-sm md:space-y-2'>
                        <li>• T+2 business days settlement (USD wire)</li>
                        <li>• Third-party trust account protection</li>
                        <li>• 2-4 weeks OpenAI ROFR compliance</li>
                        <li>• Full refund + 2% if delivery fails (60 days)</li>
                      </ul>
                    </div>

                    {/* Legal Compliance */}
                    <div className='rounded-md border border-purple-500/30 bg-purple-900/20 p-2 sm:rounded-lg sm:p-3 md:p-4'>
                      <h3 className='mb-1 text-sm font-semibold text-white sm:mb-2 sm:text-base md:mb-3 md:text-lg'>
                        Legal & Compliance
                      </h3>
                      <ul className='space-y-0.5 text-xs leading-relaxed text-gray-300 sm:space-y-1 sm:text-sm md:space-y-2'>
                        <li>• OSC compliant under NI 45-106</li>
                        <li>• Accredited investor requirement</li>
                        <li>• 4-month hold + 12-month lock-up</li>
                        <li>• Valid digital signatures (Ontario Act)</li>
                      </ul>
                    </div>

                    {/* Mobile-optimized Risk Warning */}
                    <Alert className='border-amber-500/50 bg-amber-900/20'>
                      <AlertTriangle className='h-4 w-4 text-amber-400 sm:h-5 sm:w-5' />
                      <AlertDescription className='text-amber-200'>
                        <strong className='text-sm text-amber-300 sm:text-base'>
                          INVESTMENT RISKS
                        </strong>
                        <ul className='mt-2 space-y-1 text-xs leading-relaxed sm:text-sm'>
                          <li>• Substantial risk of total loss</li>
                          <li>• OpenAI may reject share transfer</li>
                          <li>• No IPO guarantee or positive returns</li>
                          <li>• Illiquid with no secondary market</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>

                  {/* Mobile-friendly navigation buttons */}
                  <div className='flex flex-col justify-between space-y-3 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
                    <Button
                      variant='outline'
                      onClick={prevStep}
                      className='order-2 h-12 w-full text-base sm:order-1 sm:w-auto'
                      style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                      <ArrowLeft className='mr-2 h-4 w-4' />
                      Back to Overview
                    </Button>
                    <Button
                      onClick={nextStep}
                      className='order-1 h-12 w-full bg-gradient-to-r from-green-600 to-blue-600 text-base font-medium hover:opacity-90 sm:order-2 sm:w-auto'
                      style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                      Continue to Details
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Account Details - Mobile-optimized */}
            {currentStep === 3 && (
              <Card className='border-slate-700 bg-slate-800/60 shadow-2xl'>
                <CardHeader className='pb-4 sm:pb-6'>
                  <CardTitle className='flex items-center text-xl text-white sm:text-2xl'>
                    <PenTool className='mr-2 h-5 w-5 sm:mr-3 sm:h-6 sm:w-6' />
                    Account Details
                  </CardTitle>
                  <p className='text-sm text-gray-300 sm:text-base'>
                    Provide your account information and digital signature
                  </p>
                </CardHeader>
                <CardContent className='space-y-4 sm:space-y-6'>
                  {/* Mobile-first form layout - stack all inputs */}
                  <div className='space-y-4 sm:space-y-6'>
                    <div>
                      <Label className='text-sm font-medium text-gray-300 sm:text-base'>
                        Agreement ID
                      </Label>
                      <Input
                        value={agreementId}
                        disabled
                        className='mt-2 h-12 border-slate-600 bg-slate-700 font-mono text-sm text-gray-400'
                      />
                    </div>

                    <div>
                      <Label className='text-sm font-medium text-gray-300 sm:text-base'>
                        Account Number *
                      </Label>
                      <Input
                        type='text'
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder='Enter your account number'
                        className='mt-2 h-12 border-slate-600 bg-slate-700 text-base text-white'
                        style={{ fontSize: '16px' }} // Prevent iOS zoom
                        required
                      />
                      {formState?.errors?.accountNumber && (
                        <p className='mt-1 text-sm text-red-400'>
                          {formState.errors.accountNumber[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className='text-sm font-medium text-gray-300 sm:text-base'>
                        Full Legal Name *
                      </Label>
                      <Input
                        type='text'
                        value={signatureName}
                        onChange={(e) => setSignatureName(e.target.value)}
                        placeholder='Enter your full legal name'
                        className='mt-2 h-12 border-slate-600 bg-slate-700 text-base text-white'
                        style={{ fontSize: '16px' }} // Prevent iOS zoom
                        required
                      />
                    </div>

                    {/* Mobile-optimized signature field */}
                    <div>
                      <Label className='flex items-center text-sm font-medium text-gray-300 sm:text-base'>
                        <PenTool className='mr-2 h-3 w-3 sm:h-4 sm:w-4' />
                        Digital Signature *
                      </Label>
                      <textarea
                        value={signatureData}
                        onChange={handleSignatureChange}
                        placeholder='Type your full legal name to create digital signature'
                        className='mt-2 min-h-[80px] w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-base text-white placeholder-gray-400 sm:min-h-[100px] sm:p-4 sm:text-lg'
                        style={{ fontFamily: 'cursive', fontSize: '16px' }} // Prevent iOS zoom
                        required
                      />
                      <p className='mt-2 text-xs leading-relaxed text-gray-500'>
                        Your signature will be legally binding under the Ontario
                        Electronic Commerce Act, 2000
                      </p>
                    </div>
                  </div>

                  {/* Mobile-friendly navigation */}
                  <div className='flex flex-col justify-between space-y-3 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
                    <Button
                      variant='outline'
                      onClick={prevStep}
                      className='order-2 h-12 w-full text-base sm:order-1 sm:w-auto'
                      style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                      <ArrowLeft className='mr-2 h-4 w-4' />
                      Back to Terms
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={
                        !accountNumber.trim() ||
                        !signatureName.trim() ||
                        !signatureData.trim()
                      }
                      className='order-1 h-12 w-full bg-gradient-to-r from-green-600 to-blue-600 text-base font-medium hover:opacity-90 sm:order-2 sm:w-auto'
                      style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                      Continue to Review
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Final Review - Mobile-optimized */}
            {currentStep === 4 && (
              <Card className='border-slate-700 bg-slate-800/60 shadow-2xl'>
                <CardHeader className='pb-4 sm:pb-6'>
                  <CardTitle className='flex items-center text-xl text-white sm:text-2xl'>
                    <CheckCircle className='mr-2 h-5 w-5 sm:mr-3 sm:h-6 sm:w-6' />
                    Review & Execute
                  </CardTitle>
                  <p className='text-sm text-gray-300 sm:text-base'>
                    Final review before executing your agreement
                  </p>
                </CardHeader>
                <CardContent className='space-y-4 sm:space-y-6'>
                  {/* Mobile-optimized Investment Summary */}
                  <div className='rounded-xl border border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20 p-4 sm:p-6'>
                    <h3 className='mb-3 text-lg font-semibold text-white sm:mb-4 sm:text-xl'>
                      Final Investment Summary
                    </h3>
                    <div className='grid grid-cols-2 gap-3 sm:gap-4'>
                      <div className='text-center'>
                        <div className='text-lg font-bold text-green-400 sm:text-2xl'>
                          {shareQuantity}
                        </div>
                        <div className='text-xs text-gray-300 sm:text-sm'>
                          Shares
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-lg font-bold text-blue-400 sm:text-2xl'>
                          $239.80
                        </div>
                        <div className='text-xs text-gray-300 sm:text-sm'>
                          Per Share
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-lg font-bold text-purple-400 sm:text-2xl'>
                          ${totalInvestmentUSD.toLocaleString()}
                        </div>
                        <div className='text-xs text-gray-300 sm:text-sm'>
                          Total USD
                        </div>
                      </div>
                      <div className='text-center'>
                        <div
                          className='text-lg font-bold text-amber-400 sm:text-2xl'
                          suppressHydrationWarning
                        >
                          {settlementDate.toLocaleDateString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </div>
                        <div className='text-xs text-gray-300 sm:text-sm'>
                          Settlement
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-optimized Form */}
                  <form action={formAction} className='space-y-4'>
                    {/* Hidden fields for FormSubmit.co integration */}
                    <input
                      type='hidden'
                      name='agreementId'
                      value={agreementId}
                    />
                    <input
                      type='hidden'
                      name='totalInvestment'
                      value={totalInvestmentUSD}
                    />
                    <input
                      type='hidden'
                      name='settlementDate'
                      value={settlementDate.toISOString()}
                    />
                    <input
                      type='hidden'
                      name='timestamp'
                      value={currentTimestamp}
                    />
                    <input
                      type='hidden'
                      name='digitalSignature'
                      value={signatureData}
                    />
                    <input
                      type='hidden'
                      name='accountNumber'
                      value={accountNumber}
                    />
                    <input
                      type='hidden'
                      name='shareQuantity'
                      value={shareQuantity}
                    />
                    <input
                      type='hidden'
                      name='signatureName'
                      value={signatureName}
                    />

                    {/* Checkbox states as hidden fields */}
                    <input
                      type='hidden'
                      name='agreedToTerms'
                      value={agreedToTerms.toString()}
                    />
                    <input
                      type='hidden'
                      name='agreedToRisks'
                      value={agreedToRisks.toString()}
                    />
                    <input
                      type='hidden'
                      name='agreedToSettlement'
                      value={agreedToSettlement.toString()}
                    />
                    <input
                      type='hidden'
                      name='agreedToSecurities'
                      value={agreedToSecurities.toString()}
                    />
                    <input
                      type='hidden'
                      name='agreedToEndorsement'
                      value={agreedToEndorsement.toString()}
                    />
                    <input
                      type='hidden'
                      name='agreedToEnhancedRisks'
                      value={agreedToEnhancedRisks.toString()}
                    />

                    {/* Mobile-optimized checkboxes with better touch targets */}
                    <div className='max-h-64 space-y-3 overflow-y-auto pr-2 sm:max-h-80'>
                      {[
                        {
                          id: 'terms',
                          state: agreedToTerms,
                          setState: setAgreedToTerms,
                          label:
                            'I agree to all terms and conditions of this Share Purchase Agreement',
                        },
                        {
                          id: 'risks',
                          state: agreedToRisks,
                          setState: setAgreedToRisks,
                          label:
                            'I acknowledge the high-risk nature and potential for total loss',
                        },
                        {
                          id: 'settlement',
                          state: agreedToSettlement,
                          setState: setAgreedToSettlement,
                          label: `I agree to T+2 settlement by ${settlementDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}`,
                        },
                        {
                          id: 'securities',
                          state: agreedToSecurities,
                          setState: setAgreedToSecurities,
                          label:
                            'I acknowledge NI 45-106 exemption and resale restrictions',
                        },
                        {
                          id: 'endorsement',
                          state: agreedToEndorsement,
                          setState: setAgreedToEndorsement,
                          label:
                            'I understand OpenAI has not endorsed this offering',
                        },
                        {
                          id: 'enhanced-risks',
                          state: agreedToEnhancedRisks,
                          setState: setAgreedToEnhancedRisks,
                          label:
                            'I acknowledge all material risk factors including transfer and dilution risks',
                        },
                      ].map((checkbox) => (
                        <div
                          key={checkbox.id}
                          className='flex min-h-[44px] items-start space-x-3 rounded-lg bg-slate-700/30 p-3 transition-colors hover:bg-slate-700/50'
                        >
                          <Checkbox
                            id={checkbox.id}
                            checked={checkbox.state}
                            onCheckedChange={(checked) =>
                              checkbox.setState(checked as boolean)
                            }
                            required
                            className='mt-1 h-5 w-5 sm:h-4 sm:w-4' // Larger touch target on mobile
                          />
                          <Label
                            htmlFor={checkbox.id}
                            className='flex-1 cursor-pointer text-xs leading-relaxed text-gray-300 sm:text-sm'
                          >
                            {checkbox.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    {formState && !formState.success && formState.message && (
                      <Alert className='border-red-500/50 bg-red-900/20'>
                        <AlertTriangle className='h-4 w-4 text-red-400' />
                        <AlertDescription className='text-sm text-red-300'>
                          {formState.message}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Mobile-optimized final actions */}
                    <div className='flex flex-col justify-between space-y-3 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
                      <Button
                        variant='outline'
                        onClick={prevStep}
                        className='order-2 h-12 w-full text-base sm:order-1 sm:w-auto'
                        style={{ minHeight: '44px', minWidth: '44px' }}
                      >
                        <ArrowLeft className='mr-2 h-4 w-4' />
                        Back to Details
                      </Button>
                      <Button
                        type='submit'
                        disabled={!isFormValid()}
                        className='order-1 w-full bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 text-base font-semibold text-white hover:opacity-90 sm:order-2 sm:w-auto sm:px-8 sm:py-3 sm:text-lg'
                        style={{ minHeight: '44px', minWidth: '44px' }}
                      >
                        <PenTool className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
                        Execute Agreement
                      </Button>
                    </div>

                    <p className='px-4 text-center text-xs leading-relaxed text-gray-500'>
                      By clicking &quot;Execute Agreement&quot;, you are
                      creating a legally binding contract
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Ultra-compact Mobile Sidebar */}
          <div className='order-1 lg:order-2 lg:col-span-4'>
            <div className='space-y-3 sm:space-y-4 md:space-y-6 lg:sticky lg:top-32'>
              {/* Ultra-compact mobile investment summary */}
              <Card className='border-slate-700 bg-slate-800/60 shadow-xl'>
                <CardHeader className='pb-2 sm:pb-3 md:pb-4'>
                  <CardTitle className='flex items-center text-sm text-white sm:text-base md:text-lg'>
                    <DollarSign className='mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 md:h-5 md:w-5' />
                    Investment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-2 sm:space-y-3 md:space-y-4'>
                  <div className='space-y-1 sm:space-y-2 md:space-y-3'>
                    <div className='flex justify-between text-xs sm:text-sm md:text-base'>
                      <span className='text-gray-300'>Shares:</span>
                      <span className='font-semibold text-white'>
                        {shareQuantity || 0}
                      </span>
                    </div>
                    <div className='flex justify-between text-xs sm:text-sm md:text-base'>
                      <span className='text-gray-300'>Price:</span>
                      <span className='font-semibold text-white'>$239.80</span>
                    </div>
                    <Separator className='bg-slate-600' />
                    <div className='flex justify-between'>
                      <span className='text-xs font-bold text-white sm:text-sm md:text-base'>
                        Total:
                      </span>
                      <span className='text-sm font-bold text-green-400 sm:text-base md:text-lg'>
                        ${totalInvestmentUSD.toLocaleString()}
                      </span>
                    </div>
                    <div className='flex justify-between text-xs sm:text-sm'>
                      <span className='text-gray-400'>Settlement:</span>
                      <span className='text-gray-300' suppressHydrationWarning>
                        {settlementDate.toLocaleDateString('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ultra-compact security indicators */}
              <Card className='border-slate-700 bg-slate-800/60 shadow-xl lg:block'>
                <CardHeader className='pb-2 sm:pb-3 md:pb-4'>
                  <CardTitle className='flex items-center text-sm text-white sm:text-base md:text-lg'>
                    <Shield className='mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 md:h-5 md:w-5' />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-1 sm:space-y-2 md:space-y-3'>
                  <div className='flex items-center space-x-1 text-green-400 sm:space-x-2'>
                    <CheckCircle className='h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4' />
                    <span className='text-xs sm:text-sm'>SSL Encrypted</span>
                  </div>
                  <div className='flex items-center space-x-1 text-green-400 sm:space-x-2'>
                    <CheckCircle className='h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4' />
                    <span className='text-xs sm:text-sm'>OSC Compliant</span>
                  </div>
                  <div className='flex items-center space-x-1 text-green-400 sm:space-x-2'>
                    <CheckCircle className='h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4' />
                    <span className='text-xs sm:text-sm'>Escrow Protected</span>
                  </div>
                </CardContent>
              </Card>

              {/* Ultra-compact support card */}
              <Card className='border-slate-700 bg-slate-800/60 shadow-xl'>
                <CardHeader className='pb-2 sm:pb-3 md:pb-4'>
                  <CardTitle className='text-sm text-white sm:text-base md:text-lg'>
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-1 text-xs sm:space-y-2 sm:text-sm md:space-y-3'>
                  <p className='text-gray-300'>
                    <span className='sm:hidden'>Specialists available</span>
                    <span className='hidden sm:inline'>
                      Investment specialists available
                    </span>
                  </p>
                  <div className='space-y-1 sm:space-y-2'>
                    <a
                      href='tel:+14375235816'
                      className='block text-xs font-semibold text-blue-400 hover:text-blue-300 sm:text-sm md:text-base'
                      style={{
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center',
                      }} // Touch-friendly
                    >
                      +1 437 523 5816
                    </a>
                    <div className='text-xs text-gray-400'>
                      <span className='sm:hidden'>Mon-Fri, 9 AM - 8 PM</span>
                      <span className='hidden sm:inline'>
                        Mon-Fri, 9 AM - 8 PM EST
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Ultra-compact Mobile Footer */}
      <footer className='mt-4 border-t border-slate-800 bg-slate-950/50 sm:mt-6 md:mt-8 lg:mt-16'>
        <div className='mx-auto max-w-7xl space-y-0.5 px-3 py-3 text-center text-xs text-gray-500 sm:space-y-1 sm:px-4 sm:py-4 md:py-6 lg:space-y-2 lg:py-8'>
          <p className='font-semibold text-gray-400'>
            © 2024 CG Financial International
          </p>
          <p>OSC Compliant • NI 45-106 Exempt Distribution</p>
          <p className='hidden sm:block'>
            Confidential • Accredited Investors Only
          </p>
          <p className='sm:hidden'>
            USD Transactions • Professional Investment Advice Suggested
          </p>
          <p className='hidden sm:block'>
            USD Transactions • North American Banking • Legal Review Recommended
          </p>
        </div>
      </footer>
    </div>
  );
}
