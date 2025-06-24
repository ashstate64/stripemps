'use client';

import { useState, useMemo } from 'react';
import { useActionState } from 'react';
import {
  submitApplication,
  type FormState,
  type ApplicationData,
} from '@/app/actions/submit-application';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { PersonalInfoStep } from './personal-info-step';
import { EmploymentFinancialStep } from './employment-financial-step';
import { AccreditedInvestorStep } from './accredited-investor-step';
import { DocumentUploadStep } from './document-upload-step';
import { ReviewSubmitStep } from './review-submit-step';

const initialApplicationData: Partial<ApplicationData> = {
  province: 'ON', // Default to Ontario
  employmentStatus: '',
  annualIncome: '',
  netFinancialAssets: '',
  accreditedStatus: [],
  consentDataProcessing: false,
  consentTerms: false,
  informationAccuracy: false,
};

const STEPS = [
  {
    id: 'personal',
    title: 'Personal Information',
    component: PersonalInfoStep,
  },
  {
    id: 'financial',
    title: 'Employment & Financial Profile',
    component: EmploymentFinancialStep,
  },
  {
    id: 'accredited',
    title: 'Accredited Investor Status',
    component: AccreditedInvestorStep,
  },
  { id: 'documents', title: 'Document Upload', component: DocumentUploadStep },
  { id: 'review', title: 'Review & Submit', component: ReviewSubmitStep },
];

export function ApplicationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<ApplicationData>>(
    initialApplicationData
  );
  const [formState, formAction] = useActionState<FormState | null, FormData>(
    submitApplication,
    null
  );

  const progressValue = useMemo(
    () => ((currentStep + 1) / STEPS.length) * 100,
    [currentStep]
  );

  const handleNext = () => {
    // Add validation logic per step if needed before proceeding
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateFormData = (data: Partial<ApplicationData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const CurrentStepComponent = STEPS[currentStep].component;

  if (formState?.success && formState.submittedData) {
    return (
      <Card className='border-green-500/30 mx-auto w-full max-w-3xl bg-slate-800/70 shadow-2xl'>
        <CardHeader className='border-b border-green-500/20 bg-gradient-to-r from-green-900/20 to-blue-900/20'>
          <CardTitle className='text-center text-3xl font-bold text-white'>
            ✅ Application Submitted Successfully!
          </CardTitle>
          <CardDescription className='text-center text-lg text-green-300'>
            Your OpenAI Pre-IPO investment application has been received
          </CardDescription>
        </CardHeader>
        <CardContent className='p-8 text-center'>
          <CheckCircle2 className='mx-auto mb-6 h-20 w-20 text-green-500' />
          
          {/* Submission ID Display */}
          {formState.submissionId && (
            <div className='mb-6 rounded-xl bg-slate-700/50 p-4 border border-green-500/30'>
              <p className='text-sm text-gray-400 mb-2'>Reference ID</p>
              <p className='text-2xl font-bold text-green-400 font-mono tracking-wider'>
                {formState.submissionId}
              </p>
              <p className='text-xs text-gray-500 mt-2'>
                Please save this reference ID for your records
              </p>
            </div>
          )}
          
          <p className='mb-4 text-lg text-gray-200 leading-relaxed'>
            {formState.message}
          </p>
          
          {/* Next Steps */}
          <div className='mb-6 text-left rounded-xl bg-slate-700/30 p-6'>
            <h3 className='text-lg font-semibold text-white mb-4 text-center'>What Happens Next?</h3>
            <div className='space-y-3 text-sm text-gray-300'>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>1</div>
                <div>
                  <p className='font-medium'>Application Review</p>
                  <p className='text-gray-400'>Our team will review your application and verify your accredited investor status</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>2</div>
                <div>
                  <p className='font-medium'>Initial Contact</p>
                  <p className='text-gray-400'>A representative will contact you within 2-3 business days to discuss details</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5'>3</div>
                <div>
                  <p className='font-medium'>Investment Process</p>
                  <p className='text-gray-400'>Complete final documentation and fund your investment allocation</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className='text-sm text-gray-400 border-t border-slate-700 pt-4'>
            <p className='mb-2'>Have questions? Contact our investment team:</p>
            <div className='flex flex-col sm:flex-row sm:justify-center sm:space-x-6 space-y-2 sm:space-y-0'>
              <a href='tel:+14375235816' className='text-blue-400 hover:text-blue-300 transition-colors'>
                📞 +1 437 523 5816
              </a>
              <a href='mailto:accounts@cgfinancialcanada.ca' className='text-blue-400 hover:text-blue-300 transition-colors'>
                ✉️ accounts@cgfinancialcanada.ca
              </a>
            </div>
          </div>
          
          <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
            <Button 
              onClick={() => window.location.href = '/'} 
              variant='outline'
              className='border-gray-600 hover:bg-slate-700'
            >
              Return to Overview
            </Button>
            <Button 
              onClick={() => window.location.reload()} 
              className='bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90'
            >
              Submit Another Application
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='border-primary/30 mx-auto w-full max-w-3xl bg-slate-800/70 shadow-2xl'>
      <CardHeader className='text-center'>
        <CardTitle className='text-3xl font-bold text-white md:text-4xl'>
          Investment Application
        </CardTitle>
        <CardDescription className='mt-2 text-lg text-gray-300'>
          Secure your interest in OpenAI Pre-IPO shares.
          <br />
          Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
        </CardDescription>
        <Progress
          value={progressValue}
          className='[&>div]:bg-primary mt-4 h-2 w-full bg-slate-700'
        />
      </CardHeader>
      <CardContent>
        {formState && !formState.success && formState.message && (
          <Alert variant='destructive' className='mb-6'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{formState.message}</AlertDescription>
            {formState.errors && (
              <ul className='mt-2 list-inside list-disc text-xs'>
                {Object.entries(formState.errors).map(([key, msgs]) =>
                  msgs?.map((msg, i) => <li key={`${key}-${i}`}>{msg}</li>)
                )}
              </ul>
            )}
          </Alert>
        )}
        <form action={formAction}>
          {/* Hidden inputs to carry over data not directly part of the current step's form elements but needed for submission */}
          {Object.entries(formData).map(([key, value]) => {
            if (typeof value === 'string' || typeof value === 'number') {
              return <input type='hidden' key={key} name={key} value={value} />;
            }
            if (typeof value === 'boolean') {
              return (
                <input
                  type='hidden'
                  key={key}
                  name={key}
                  value={value ? 'on' : 'off'}
                />
              );
            }
            if (Array.isArray(value)) {
              return value.map((item, index) => (
                <input
                  type='hidden'
                  key={`${key}-${index}`}
                  name={key}
                  value={item}
                />
              ));
            }
            return null;
          })}

          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            errors={formState?.errors}
          />

          <div className='mt-8 flex items-center justify-between'>
            <Button
              type='button'
              variant='outline'
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            {currentStep < STEPS.length - 1 ? (
              <Button type='button' onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                type='submit'
                className='from-primary bg-gradient-to-r via-purple-600 to-pink-600 hover:opacity-90'
              >
                Review & Submit Application
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
