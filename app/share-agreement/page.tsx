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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import { 
  submitShareAgreement,
  type ShareAgreementFormState 
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
  
  const [formState, formAction] = useActionState<ShareAgreementFormState | null, FormData>(
    submitShareAgreement,
    null
  );
  
  // Investment calculations
  const sharePrice = 239.80;
  const minimumShares = Math.ceil(1000 / sharePrice);
  const totalInvestmentUSD = shareQuantity * sharePrice;
  const settlementDate = calculateSettlementDate();
  const completionPercentage = Math.min(((currentStep - 1) / 3) * 100, 100);

  useEffect(() => {
    const id = `SPA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`.toUpperCase();
    const timestamp = new Date().toISOString();
    setAgreementId(id);
    setCurrentTimestamp(timestamp);
  }, []);

  const handleSignatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSignatureData(e.target.value);
  };

  const isFormValid = () => {
    return shareQuantity >= minimumShares && 
           accountNumber.trim() !== '' && 
           signatureName.trim() !== '' && 
           signatureData.trim() !== '' && 
           agreedToTerms && 
           agreedToRisks && 
           agreedToSettlement &&
           agreedToSecurities &&
           agreedToEndorsement &&
           agreedToEnhancedRisks;
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
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center p-4'>
        <Card className='w-full max-w-4xl border-green-500/30 bg-slate-800/90 shadow-2xl'>
          <CardHeader className='text-center border-b border-green-500/20 bg-gradient-to-r from-green-900/20 to-blue-900/20'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500'>
              <CheckCircle2 className='h-8 w-8 text-white' />
            </div>
            <CardTitle className='text-2xl font-bold text-white'>
              Agreement Executed Successfully
            </CardTitle>
            <p className='text-green-300'>Your OpenAI Pre-IPO Share Purchase Agreement has been digitally signed</p>
          </CardHeader>
          <CardContent className='p-8'>
            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='bg-slate-700/50 p-4 rounded-lg'>
                  <h3 className='font-semibold text-white mb-2'>Agreement Details</h3>
                  <div className='space-y-2 text-sm text-gray-300'>
                    <p><strong>Agreement ID:</strong> {formState.agreementId}</p>
                    <p><strong>Account Number:</strong> {formState.submittedData.accountNumber}</p>
                    <p><strong>Shares Purchased:</strong> {formState.submittedData.shareQuantity.toLocaleString()}</p>
                    <p><strong>Total Investment:</strong> USD ${formState.submittedData.totalInvestment.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className='bg-slate-700/50 p-4 rounded-lg'>
                  <h3 className='font-semibold text-white mb-2'>Settlement Information</h3>
                  <div className='space-y-2 text-sm text-gray-300'>
                    <p><strong>Settlement Date:</strong> <span suppressHydrationWarning>
                      {new Date(formState.submittedData.settlementDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit' 
                      })}
                    </span></p>
                    <p><strong>Payment Due:</strong> T+2 Business Days</p>
                    <p><strong>Status:</strong> <Badge className='bg-green-600'>Pending Settlement</Badge></p>
                  </div>
                </div>
              </div>

              <Alert className='border-blue-500/50 bg-blue-900/20'>
                <FileText className='h-4 w-4 text-blue-400' />
                <AlertDescription className='text-blue-300'>
                  <strong>Next Steps:</strong>
                  <ul className='mt-2 list-disc list-inside space-y-1 text-sm'>
                    <li>You will receive wire transfer instructions within 24 hours</li>
                    <li>Payment must be received by <span suppressHydrationWarning>
                      {new Date(formState.submittedData.settlementDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit' 
                      })}
                    </span> (T+2)</li>
                    <li>Share certificates will be issued upon payment confirmation</li>
                    <li>A copy of this agreement has been sent to your registered email</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className='flex justify-center space-x-4'>
                <Button variant='outline' onClick={() => window.print()}>
                  <Download className='mr-2 h-4 w-4' />
                  Download Agreement
                </Button>
                <Button onClick={() => window.close()}>
                  Close
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900'>
      {/* Enhanced Mobile-First Header */}
      <header className='sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50'>
        <div className='mx-auto max-w-7xl px-3 sm:px-4 py-3 sm:py-4'>
          {/* Mobile-optimized header layout */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2 sm:space-x-4'>
              <div className='openai-logo-container'>
                <Image
                  src='/OpenAI_Logo.svg.png'
                  alt='OpenAI Logo'
                  width={32}
                  height={32}
                  className='openai-logo-image sm:w-10 sm:h-10'
                />
              </div>
              <div>
                <h1 className='text-lg sm:text-xl font-bold text-white'>OpenAI Pre-IPO</h1>
                <p className='text-xs sm:text-sm text-gray-400'>$239.80/share</p>
              </div>
            </div>
            
            {/* Mobile-friendly badges - stack on small screens */}
            <div className='flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-2'>
              <Badge variant='outline' className='text-green-400 border-green-400 text-xs px-2 py-1'>
                <Shield className='mr-1 h-2 w-2 sm:h-3 sm:w-3' />
                <span className='hidden sm:inline'>Bank-Grade</span> Security
              </Badge>
              <Badge variant='outline' className='text-blue-400 border-blue-400 text-xs px-2 py-1'>
                <Lock className='mr-1 h-2 w-2 sm:h-3 sm:w-3' />
                OSC Compliant
              </Badge>
            </div>
          </div>
          
          {/* Mobile-optimized Progress Indicator */}
          <div className='mt-3 sm:mt-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-xs sm:text-sm text-gray-400'>Step {currentStep} of 4</span>
              <span className='text-xs sm:text-sm text-gray-400'>{Math.round(completionPercentage)}% Complete</span>
            </div>
            <Progress value={completionPercentage} className='h-2' />
            
            {/* Mobile step indicators */}
            <div className='flex justify-center space-x-2 mt-3 sm:hidden'>
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full ${
                    step <= currentStep ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-7xl px-3 sm:px-4 py-4 sm:py-8'>
        {/* Mobile-first grid layout - stack on mobile */}
        <div className='flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8'>
          {/* Main Content Area - Mobile full width */}
          <div className='lg:col-span-8 order-2 lg:order-1'>
            {/* Step 1: Investment Overview */}
            {currentStep === 1 && (
              <Card className='border-slate-700 bg-slate-800/60 shadow-2xl'>
                <CardHeader className='pb-4 sm:pb-6'>
                  <CardTitle className='flex items-center text-white text-xl sm:text-2xl'>
                    <Calculator className='mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6' />
                    Investment Overview
                  </CardTitle>
                  <p className='text-sm sm:text-base text-gray-300'>Configure your OpenAI pre-IPO investment details</p>
                </CardHeader>
                <CardContent className='space-y-6 sm:space-y-8'>
                  {/* Mobile-optimized Investment Calculator */}
                  <div className='bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-4 sm:p-6 border border-purple-500/30'>
                    <h3 className='text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center'>
                      <DollarSign className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
                      Investment Calculator
                    </h3>
                    
                    {/* Mobile-first: Stack inputs vertically on small screens */}
                    <div className='space-y-4 sm:space-y-6'>
                      <div>
                        <Label className='text-gray-300 text-sm sm:text-base font-medium'>Number of Shares</Label>
                        <Input
                          type='number'
                          min={minimumShares}
                          value={shareQuantity || ''}
                          onChange={(e) => setShareQuantity(parseInt(e.target.value) || 0)}
                          placeholder={`Min ${minimumShares} shares`}
                          className='mt-2 bg-slate-700 border-slate-600 text-white text-base sm:text-lg h-12 sm:h-14'
                          style={{ fontSize: '16px' }} // Prevent zoom on iOS
                        />
                        <p className='text-xs sm:text-sm text-gray-500 mt-1'>
                          Minimum: USD $1,000 (≈{minimumShares} shares)
                        </p>
                      </div>
                      
                      {/* Investment summary - always visible on mobile */}
                      <div className='bg-slate-700/50 rounded-lg p-3 sm:p-4'>
                        <div className='space-y-2 sm:space-y-3'>
                          <div className='flex justify-between text-sm sm:text-base'>
                            <span className='text-gray-300'>Share Price:</span>
                            <span className='text-white font-semibold'>$239.80</span>
                          </div>
                          <div className='flex justify-between text-sm sm:text-base'>
                            <span className='text-gray-300'>Shares:</span>
                            <span className='text-white font-semibold'>{shareQuantity.toLocaleString()}</span>
                          </div>
                          <Separator className='bg-slate-600' />
                          <div className='flex justify-between'>
                            <span className='text-white font-bold text-base sm:text-lg'>Total:</span>
                            <span className='text-green-400 font-bold text-base sm:text-lg'>USD ${totalInvestmentUSD.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-optimized Key Highlights - single column on mobile */}
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4'>
                    <div className='bg-slate-700/30 rounded-lg p-3 sm:p-4 text-center'>
                      <div className='text-xl sm:text-2xl font-bold text-green-400'>$300B</div>
                      <div className='text-xs sm:text-sm text-gray-300'>Current Valuation</div>
                    </div>
                    <div className='bg-slate-700/30 rounded-lg p-3 sm:p-4 text-center'>
                      <div className='text-xl sm:text-2xl font-bold text-blue-400'>T+2</div>
                      <div className='text-xs sm:text-sm text-gray-300'>Settlement Period</div>
                    </div>
                    <div className='bg-slate-700/30 rounded-lg p-3 sm:p-4 text-center'>
                      <div className='text-xl sm:text-2xl font-bold text-purple-400'>12mo</div>
                      <div className='text-xs sm:text-sm text-gray-300'>Lock-up Period</div>
                    </div>
                  </div>

                  {/* Mobile-optimized action button - thumb-friendly position */}
                  <div className='flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0'>
                    <Button 
                      onClick={nextStep}
                      disabled={shareQuantity < minimumShares}
                      className='w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 px-6 sm:px-8 py-4 sm:py-3 text-base font-medium'
                      style={{ minHeight: '44px', minWidth: '44px' }} // Touch-friendly 44px minimum
                    >
                      Continue to Terms
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Agreement Terms - Mobile-optimized */}
            {currentStep === 2 && (
              <Card className='border-slate-700 bg-slate-800/60 shadow-2xl'>
                <CardHeader className='pb-4 sm:pb-6'>
                  <CardTitle className='flex items-center text-white text-xl sm:text-2xl'>
                    <FileText className='mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6' />
                    Agreement Terms
                  </CardTitle>
                  <p className='text-sm sm:text-base text-gray-300'>Key terms and conditions for your investment</p>
                </CardHeader>
                <CardContent className='space-y-4 sm:space-y-6'>
                  {/* Mobile-optimized Terms - better spacing and readability */}
                  <div className='space-y-3 sm:space-y-4'>
                    {/* Purchase Agreement */}
                    <div className='bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 sm:p-4'>
                      <h3 className='text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3'>Purchase Agreement</h3>
                      <ul className='space-y-1 sm:space-y-2 text-gray-300 text-xs sm:text-sm leading-relaxed'>
                        <li>• Purchase OpenAI Class A Shares via CG Financial International</li>
                        <li>• Fixed price: USD $239.80/share ($300B valuation)</li>
                        <li>• USD denominated transactions</li>
                        <li>• Legally binding digital execution</li>
                      </ul>
                    </div>

                    {/* Settlement Terms */}
                    <div className='bg-green-900/20 border border-green-500/30 rounded-lg p-3 sm:p-4'>
                      <h3 className='text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3'>Settlement & Security</h3>
                      <ul className='space-y-1 sm:space-y-2 text-gray-300 text-xs sm:text-sm leading-relaxed'>
                        <li>• T+2 business days settlement (USD wire)</li>
                        <li>• Third-party trust account protection</li>
                        <li>• 2-4 weeks OpenAI ROFR compliance</li>
                        <li>• Full refund + 2% if delivery fails (60 days)</li>
                      </ul>
                    </div>

                    {/* Legal Compliance */}
                    <div className='bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 sm:p-4'>
                      <h3 className='text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3'>Legal & Compliance</h3>
                      <ul className='space-y-1 sm:space-y-2 text-gray-300 text-xs sm:text-sm leading-relaxed'>
                        <li>• OSC compliant under NI 45-106</li>
                        <li>• Accredited investor requirement</li>
                        <li>• 4-month hold + 12-month lock-up</li>
                        <li>• Valid digital signatures (Ontario Act)</li>
                      </ul>
                    </div>

                    {/* Mobile-optimized Risk Warning */}
                    <Alert className='border-amber-500/50 bg-amber-900/20'>
                      <AlertTriangle className='h-4 w-4 sm:h-5 sm:w-5 text-amber-400' />
                      <AlertDescription className='text-amber-200'>
                        <strong className='text-amber-300 text-sm sm:text-base'>INVESTMENT RISKS</strong>
                        <ul className='mt-2 space-y-1 text-xs sm:text-sm leading-relaxed'>
                          <li>• Substantial risk of total loss</li>
                          <li>• OpenAI may reject share transfer</li>
                          <li>• No IPO guarantee or positive returns</li>
                          <li>• Illiquid with no secondary market</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>

                  {/* Mobile-friendly navigation buttons */}
                  <div className='flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4 pt-4'>
                    <Button 
                      variant='outline' 
                      onClick={prevStep}
                      className='w-full sm:w-auto order-2 sm:order-1 h-12 text-base'
                      style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                      <ArrowLeft className='mr-2 h-4 w-4' />
                      Back to Overview
                    </Button>
                    <Button 
                      onClick={nextStep}
                      className='w-full sm:w-auto order-1 sm:order-2 bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 h-12 text-base font-medium'
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
                  <CardTitle className='flex items-center text-white text-xl sm:text-2xl'>
                    <PenTool className='mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6' />
                    Account Details
                  </CardTitle>
                  <p className='text-sm sm:text-base text-gray-300'>Provide your account information and digital signature</p>
                </CardHeader>
                <CardContent className='space-y-4 sm:space-y-6'>
                  {/* Mobile-first form layout - stack all inputs */}
                  <div className='space-y-4 sm:space-y-6'>
                    <div>
                      <Label className='text-gray-300 text-sm sm:text-base font-medium'>Agreement ID</Label>
                      <Input
                        value={agreementId}
                        disabled
                        className='mt-2 bg-slate-700 border-slate-600 text-gray-400 font-mono h-12 text-sm'
                      />
                    </div>
                    
                    <div>
                      <Label className='text-gray-300 text-sm sm:text-base font-medium'>Account Number *</Label>
                      <Input
                        type='text'
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder='Enter your account number'
                        className='mt-2 bg-slate-700 border-slate-600 text-white h-12 text-base'
                        style={{ fontSize: '16px' }} // Prevent iOS zoom
                        required
                      />
                      {formState?.errors?.accountNumber && (
                        <p className='text-red-400 text-sm mt-1'>{formState.errors.accountNumber[0]}</p>
                      )}
                    </div>

                    <div>
                      <Label className='text-gray-300 text-sm sm:text-base font-medium'>Full Legal Name *</Label>
                      <Input
                        type='text'
                        value={signatureName}
                        onChange={(e) => setSignatureName(e.target.value)}
                        placeholder='Enter your full legal name'
                        className='mt-2 bg-slate-700 border-slate-600 text-white h-12 text-base'
                        style={{ fontSize: '16px' }} // Prevent iOS zoom
                        required
                      />
                    </div>

                    {/* Mobile-optimized signature field */}
                    <div>
                      <Label className='text-gray-300 text-sm sm:text-base font-medium flex items-center'>
                        <PenTool className='mr-2 h-3 w-3 sm:h-4 sm:w-4' />
                        Digital Signature *
                      </Label>
                      <textarea
                        value={signatureData}
                        onChange={handleSignatureChange}
                        placeholder='Type your full legal name to create digital signature'
                        className='w-full mt-2 p-3 sm:p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 text-base sm:text-lg min-h-[80px] sm:min-h-[100px]'
                        style={{ fontFamily: 'cursive', fontSize: '16px' }} // Prevent iOS zoom
                        required
                      />
                      <p className='text-xs text-gray-500 mt-2 leading-relaxed'>
                        Your signature will be legally binding under the Ontario Electronic Commerce Act, 2000
                      </p>
                    </div>
                  </div>

                  {/* Mobile-friendly navigation */}
                  <div className='flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4 pt-4'>
                    <Button 
                      variant='outline' 
                      onClick={prevStep}
                      className='w-full sm:w-auto order-2 sm:order-1 h-12 text-base'
                      style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                      <ArrowLeft className='mr-2 h-4 w-4' />
                      Back to Terms
                    </Button>
                    <Button 
                      onClick={nextStep}
                      disabled={!accountNumber.trim() || !signatureName.trim() || !signatureData.trim()}
                      className='w-full sm:w-auto order-1 sm:order-2 bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 h-12 text-base font-medium'
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
                  <CardTitle className='flex items-center text-white text-xl sm:text-2xl'>
                    <CheckCircle className='mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6' />
                    Review & Execute
                  </CardTitle>
                  <p className='text-sm sm:text-base text-gray-300'>Final review before executing your agreement</p>
                </CardHeader>
                <CardContent className='space-y-4 sm:space-y-6'>
                  {/* Mobile-optimized Investment Summary */}
                  <div className='bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-4 sm:p-6 border border-green-500/30'>
                    <h3 className='text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4'>Final Investment Summary</h3>
                    <div className='grid grid-cols-2 gap-3 sm:gap-4'>
                      <div className='text-center'>
                        <div className='text-lg sm:text-2xl font-bold text-green-400'>{shareQuantity}</div>
                        <div className='text-xs sm:text-sm text-gray-300'>Shares</div>
                      </div>
                      <div className='text-center'>
                        <div className='text-lg sm:text-2xl font-bold text-blue-400'>$239.80</div>
                        <div className='text-xs sm:text-sm text-gray-300'>Per Share</div>
                      </div>
                      <div className='text-center'>
                        <div className='text-lg sm:text-2xl font-bold text-purple-400'>${totalInvestmentUSD.toLocaleString()}</div>
                        <div className='text-xs sm:text-sm text-gray-300'>Total USD</div>
                      </div>
                      <div className='text-center'>
                        <div className='text-lg sm:text-2xl font-bold text-amber-400' suppressHydrationWarning>
                          {settlementDate.toLocaleDateString('en-US', { 
                            month: '2-digit',
                            day: '2-digit'
                          })}
                        </div>
                        <div className='text-xs sm:text-sm text-gray-300'>Settlement</div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-optimized Form */}
                  <form action={formAction} className='space-y-4'>
                    {/* Hidden fields for FormSubmit.co integration */}
                    <input type="hidden" name="agreementId" value={agreementId} />
                    <input type="hidden" name="totalInvestment" value={totalInvestmentUSD} />
                    <input type="hidden" name="settlementDate" value={settlementDate.toISOString()} />
                    <input type="hidden" name="timestamp" value={currentTimestamp} />
                    <input type="hidden" name="digitalSignature" value={signatureData} />
                    <input type="hidden" name="accountNumber" value={accountNumber} />
                    <input type="hidden" name="shareQuantity" value={shareQuantity} />
                    <input type="hidden" name="signatureName" value={signatureName} />
                    
                    {/* Checkbox states as hidden fields */}
                    <input type="hidden" name="agreedToTerms" value={agreedToTerms.toString()} />
                    <input type="hidden" name="agreedToRisks" value={agreedToRisks.toString()} />
                    <input type="hidden" name="agreedToSettlement" value={agreedToSettlement.toString()} />
                    <input type="hidden" name="agreedToSecurities" value={agreedToSecurities.toString()} />
                    <input type="hidden" name="agreedToEndorsement" value={agreedToEndorsement.toString()} />
                    <input type="hidden" name="agreedToEnhancedRisks" value={agreedToEnhancedRisks.toString()} />

                    {/* Mobile-optimized checkboxes with better touch targets */}
                    <div className='space-y-3 max-h-64 sm:max-h-80 overflow-y-auto pr-2'>
                      {[
                        { id: 'terms', state: agreedToTerms, setState: setAgreedToTerms, label: 'I agree to all terms and conditions of this Share Purchase Agreement' },
                        { id: 'risks', state: agreedToRisks, setState: setAgreedToRisks, label: 'I acknowledge the high-risk nature and potential for total loss' },
                        { id: 'settlement', state: agreedToSettlement, setState: setAgreedToSettlement, label: `I agree to T+2 settlement by ${settlementDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}` },
                        { id: 'securities', state: agreedToSecurities, setState: setAgreedToSecurities, label: 'I acknowledge NI 45-106 exemption and resale restrictions' },
                        { id: 'endorsement', state: agreedToEndorsement, setState: setAgreedToEndorsement, label: 'I understand OpenAI has not endorsed this offering' },
                        { id: 'enhanced-risks', state: agreedToEnhancedRisks, setState: setAgreedToEnhancedRisks, label: 'I acknowledge all material risk factors including transfer and dilution risks' }
                      ].map((checkbox) => (
                        <div key={checkbox.id} className='flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors min-h-[44px]'>
                          <Checkbox
                            id={checkbox.id}
                            checked={checkbox.state}
                            onCheckedChange={(checked) => checkbox.setState(checked as boolean)}
                            required
                            className='mt-1 h-5 w-5 sm:h-4 sm:w-4' // Larger touch target on mobile
                          />
                          <Label htmlFor={checkbox.id} className='text-xs sm:text-sm text-gray-300 leading-relaxed cursor-pointer flex-1'>
                            {checkbox.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    {formState && !formState.success && formState.message && (
                      <Alert className='border-red-500/50 bg-red-900/20'>
                        <AlertTriangle className='h-4 w-4 text-red-400' />
                        <AlertDescription className='text-red-300 text-sm'>
                          {formState.message}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Mobile-optimized final actions */}
                    <div className='flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4 pt-4'>
                      <Button 
                        variant='outline' 
                        onClick={prevStep}
                        className='w-full sm:w-auto order-2 sm:order-1 h-12 text-base'
                        style={{ minHeight: '44px', minWidth: '44px' }}
                      >
                        <ArrowLeft className='mr-2 h-4 w-4' />
                        Back to Details
                      </Button>
                      <Button
                        type='submit'
                        disabled={!isFormValid()}
                        className='w-full sm:w-auto order-1 sm:order-2 bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 text-white font-semibold px-6 sm:px-8 py-4 sm:py-3 text-base sm:text-lg'
                        style={{ minHeight: '44px', minWidth: '44px' }}
                      >
                        <PenTool className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
                        Execute Agreement
                      </Button>
                    </div>

                    <p className='text-xs text-gray-500 text-center leading-relaxed px-4'>
                      By clicking "Execute Agreement", you are creating a legally binding contract
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Mobile-optimized Sidebar - Show above content on mobile */}
          <div className='lg:col-span-4 order-1 lg:order-2'>
            <div className='lg:sticky lg:top-32 space-y-4 sm:space-y-6'>
              {/* Compact mobile investment summary */}
              <Card className='border-slate-700 bg-slate-800/60 shadow-xl'>
                <CardHeader className='pb-3 sm:pb-4'>
                  <CardTitle className='text-white text-base sm:text-lg flex items-center'>
                    <DollarSign className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
                    Investment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3 sm:space-y-4'>
                  <div className='space-y-2 sm:space-y-3'>
                    <div className='flex justify-between text-sm sm:text-base'>
                      <span className='text-gray-300'>Shares:</span>
                      <span className='text-white font-semibold'>{shareQuantity || 0}</span>
                    </div>
                    <div className='flex justify-between text-sm sm:text-base'>
                      <span className='text-gray-300'>Price:</span>
                      <span className='text-white font-semibold'>$239.80</span>
                    </div>
                    <Separator className='bg-slate-600' />
                    <div className='flex justify-between'>
                      <span className='text-white font-bold text-sm sm:text-base'>Total:</span>
                      <span className='text-green-400 font-bold text-base sm:text-lg'>${totalInvestmentUSD.toLocaleString()}</span>
                    </div>
                    <div className='flex justify-between text-xs sm:text-sm'>
                      <span className='text-gray-400'>Settlement:</span>
                      <span className='text-gray-300' suppressHydrationWarning>
                        {settlementDate.toLocaleDateString('en-US', { 
                          month: '2-digit', 
                          day: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compact security indicators - hide some on mobile */}
              <Card className='border-slate-700 bg-slate-800/60 shadow-xl lg:block'>
                <CardHeader className='pb-3 sm:pb-4'>
                  <CardTitle className='text-white text-base sm:text-lg flex items-center'>
                    <Shield className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-2 sm:space-y-3'>
                  <div className='flex items-center space-x-2 text-green-400'>
                    <CheckCircle className='h-3 w-3 sm:h-4 sm:w-4' />
                    <span className='text-xs sm:text-sm'>SSL Encrypted</span>
                  </div>
                  <div className='flex items-center space-x-2 text-green-400'>
                    <CheckCircle className='h-3 w-3 sm:h-4 sm:w-4' />
                    <span className='text-xs sm:text-sm'>OSC Compliant</span>
                  </div>
                  <div className='flex items-center space-x-2 text-green-400'>
                    <CheckCircle className='h-3 w-3 sm:h-4 sm:w-4' />
                    <span className='text-xs sm:text-sm'>Escrow Protected</span>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile-friendly support card */}
              <Card className='border-slate-700 bg-slate-800/60 shadow-xl'>
                <CardHeader className='pb-3 sm:pb-4'>
                  <CardTitle className='text-white text-base sm:text-lg'>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2 sm:space-y-3 text-xs sm:text-sm'>
                  <p className='text-gray-300'>Investment specialists available</p>
                  <div className='space-y-1 sm:space-y-2'>
                    <a 
                      href='tel:+14375235816' 
                      className='text-blue-400 font-semibold text-sm sm:text-base block hover:text-blue-300'
                      style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }} // Touch-friendly
                    >
                      +1 437 523 5816
                    </a>
                    <div className='text-gray-400 text-xs'>Mon-Fri, 9 AM - 8 PM EST</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile-optimized Footer */}
      <footer className='mt-8 sm:mt-16 border-t border-slate-800 bg-slate-950/50'>
        <div className='mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 text-center text-xs text-gray-500 space-y-1 sm:space-y-2'>
          <p className='font-semibold text-gray-400'>© 2024 CG Financial International</p>
          <p>OSC Compliant • NI 45-106 Exempt Distribution</p>
          <p className='hidden sm:block'>Confidential • Accredited Investors Only</p>
          <p className='sm:hidden'>USD Transactions • Professional Investment Advice Suggested</p>
          <p className='hidden sm:block'>USD Transactions • North American Banking • Legal Review Recommended</p>
        </div>
      </footer>
    </div>
  );
} 