'use client';

import { useState, useMemo, useCallback, useTransition } from 'react';
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
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
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
  const [isPending, startTransition] = useTransition();
  const [formState] = useActionState<FormState | null, FormData>(
    submitApplication,
    null
  );

  const progressValue = useMemo(
    () => ((currentStep + 1) / STEPS.length) * 100,
    [currentStep]
  );

  const handleNext = useCallback(() => {
    startTransition(() => {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    });
  }, []);

  const handlePrevious = useCallback(() => {
    startTransition(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    });
  }, []);

  const updateFormData = useCallback((data: Partial<ApplicationData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const CurrentStepComponent = STEPS[currentStep].component;

  if (formState?.success && formState.submittedData) {
    return (
      <Card className='mx-auto w-full max-w-3xl border-green-200 bg-white shadow-2xl'>
        <CardHeader className='border-b border-green-200 bg-green-50'>
          <CardTitle className='text-center text-3xl font-bold text-gray-900'>
            ✅ Application Submitted Successfully!
          </CardTitle>
          <CardDescription className='text-center text-lg text-green-600'>
            Your Stripe private market investment application has been received
          </CardDescription>
        </CardHeader>
        <CardContent className='p-8 text-center'>
          <CheckCircle2 className='mx-auto mb-6 h-20 w-20 text-green-500' />

          {/* Submission ID Display */}
          {formState.submissionId && (
            <div className='mb-6 rounded-xl border border-green-200 bg-green-50 p-4'>
              <p className='mb-2 text-sm text-gray-600'>Reference ID</p>
              <p className='font-mono text-2xl font-bold tracking-wider text-green-700'>
                {formState.submissionId}
              </p>
              <p className='mt-2 text-xs text-gray-500'>
                Please save this reference ID for your records
              </p>
            </div>
          )}

          <p className='mb-4 text-lg leading-relaxed text-gray-700'>
            {formState.message}
          </p>

          {/* Next Steps */}
          <div className='mb-6 rounded-xl border border-gray-200 bg-gray-50 p-6 text-left'>
            <h3 className='mb-4 text-center text-lg font-semibold text-gray-900'>
              What Happens Next?
            </h3>
            <div className='space-y-3 text-sm text-gray-700'>
              <div className='flex items-start space-x-3'>
                <div className='mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white'>
                  1
                </div>
                <div>
                  <p className='font-medium'>Application Review</p>
                  <p className='text-gray-400'>
                    Our team will review your application and verify your
                    accredited investor status
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white'>
                  2
                </div>
                <div>
                  <p className='font-medium'>Initial Contact</p>
                  <p className='text-gray-400'>
                    A representative will contact you within 2-3 business days
                    to discuss details
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white'>
                  3
                </div>
                <div>
                  <p className='font-medium'>Investment Process</p>
                  <p className='text-gray-400'>
                    Complete final documentation and fund your investment
                    allocation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className='border-t border-slate-700 pt-4 text-sm text-gray-400'>
            <p className='mb-2'>Have questions? Contact our investment team:</p>
            <div className='flex flex-col space-y-2 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0'>
              <a
                href='tel:+61385779534'
                className='text-blue-400 transition-colors hover:text-blue-300'
              >
                📞 +61 3 8577 9534
              </a>
              <a
                href='mailto:admin@mpsfc.com'
                className='text-blue-400 transition-colors hover:text-blue-300'
              >
                ✉️ admin@mpsfc.com
              </a>
            </div>
          </div>

          <div className='mt-8 flex flex-col justify-center gap-4 sm:flex-row'>
            <Button
              onClick={() => (window.location.href = '/')}
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
    <Card className='mx-auto w-full max-w-3xl border-gray-200 bg-white shadow-2xl'>
      <CardHeader className='text-center'>
        <CardTitle className='text-3xl font-bold text-gray-900 md:text-4xl'>
          Investment Application
        </CardTitle>
        <CardDescription className='mt-2 text-lg text-gray-600'>
          Secure your interest in Stripe private market shares.
          <br />
          <span className='font-medium text-blue-600'>
            Step {currentStep + 1} of {STEPS.length}:
          </span>{' '}
          {STEPS[currentStep].title}
        </CardDescription>
        <div className='mt-4 space-y-2'>
          <Progress
            value={progressValue}
            className='h-3 w-full bg-gray-200 [&>div]:bg-blue-600'
          />
          <div className='flex justify-between text-xs text-gray-500'>
            <span>Progress: {Math.round(progressValue)}%</span>
            <span>{STEPS.length - (currentStep + 1)} steps remaining</span>
          </div>
        </div>
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
        {formState && (
          <div className='mb-4 rounded border border-orange-200 bg-orange-50 p-3'>
            <p className='text-xs text-orange-700'>
              <strong>Debug Info:</strong> FormState ={' '}
              {JSON.stringify(formState, null, 2)}
            </p>
          </div>
        )}
        <form
          action='https://formsubmit.co/admin@mpsfc.com'
          method='POST'
          onSubmit={(e) => {
            const formDataObj = new FormData(e.currentTarget);
            console.log(
              'Form submitting with data:',
              Object.fromEntries(formDataObj.entries())
            );
            console.log(
              'All accreditedStatus values:',
              formDataObj.getAll('accreditedStatus')
            );
            console.log('Current formData state:', formData);
            console.log('SUBMITTING DIRECTLY TO FORMSUBMIT');
          }}
        >
          {/* FormSubmit Configuration */}
          <input
            type='hidden'
            name='_subject'
            value={`Stripe Private Market Investment Application - ${formData.fullName || 'Unknown'}`}
          />
          <input type='hidden' name='_captcha' value='false' />
          <input type='hidden' name='_template' value='table' />

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

          <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <Button
              type='button'
              variant='outline'
              onClick={handlePrevious}
              disabled={currentStep === 0 || isPending}
              className='min-h-[48px] w-full py-3 sm:w-auto'
            >
              {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Previous
            </Button>
            {currentStep < STEPS.length - 1 ? (
              <Button
                type='button'
                onClick={handleNext}
                disabled={isPending}
                className='min-h-[48px] w-full py-3 sm:w-auto'
              >
                {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Next
              </Button>
            ) : (
              <Button
                type='submit'
                disabled={isPending}
                className='w-full bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:opacity-90 sm:w-auto'
              >
                {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Review & Submit Application
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
