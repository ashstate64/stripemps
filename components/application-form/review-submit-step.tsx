'use client';
import type {
  ApplicationData,
  FormState,
} from '@/app/actions/submit-application';
import { CheckboxField, canadianProvinces } from './form-elements'; // Assuming canadianProvinces is exported

interface StepProps {
  formData: Partial<ApplicationData>;
  updateFormData: (data: Partial<ApplicationData>) => void;
  errors?: FormState['errors'];
}

const getProvinceLabel = (value?: string) => {
  return canadianProvinces.find((p) => p.value === value)?.label || value;
};

export function ReviewSubmitStep({
  formData,
  updateFormData,
  errors,
}: StepProps) {
  const handleCheckboxChange = (
    checked: boolean,
    fieldName: keyof ApplicationData
  ) => {
    updateFormData({ [fieldName]: checked });
  };

  const displayData = [
    { label: 'Full Name', value: formData.fullName },
    { label: 'Date of Birth', value: formData.dateOfBirth },
    { label: 'Email', value: formData.email },
    { label: 'Phone', value: formData.phone },
    { label: 'Street Address', value: formData.streetAddress },
    { label: 'City', value: formData.city },
    { label: 'Province', value: getProvinceLabel(formData.province) },
    { label: 'Postal Code', value: formData.postalCode },
    {
      label: 'SIN (Masked)',
      value: formData.sin
        ? `***-***-${formData.sin.slice(-3)}`
        : 'Not Provided',
    },
    { label: 'Employment Status', value: formData.employmentStatus },
    { label: 'Occupation', value: formData.occupation || 'N/A' },
    { label: 'Employer/Business Name', value: formData.employerName || 'N/A' },
    { label: 'Annual Income (CAD)', value: formData.annualIncome },
    { label: 'Net Financial Assets (CAD)', value: formData.netFinancialAssets },
    { label: 'Source of Funds', value: formData.sourceOfFunds },
    {
      label: 'Accredited Investor Status',
      value: (formData.accreditedStatus || []).join(', ') || 'None selected',
    },
    { label: 'ID Front', value: formData.idFrontName || 'Not Uploaded' },
    { label: 'ID Back', value: formData.idBackName || 'Not Uploaded' },
    {
      label: 'Proof of Address',
      value: formData.proofOfAddressName || 'Not Uploaded',
    },
  ];

  return (
    <div className='space-y-6'>
      <h3 className='mb-4 text-xl font-semibold text-white'>
        Review Your Application
      </h3>
      <p className='mb-6 text-sm text-gray-300'>
        Please carefully review all the information you have provided. Ensure
        everything is accurate before submitting.
      </p>
      <div className='max-h-[400px] space-y-3 overflow-y-auto rounded-lg border border-slate-600 bg-slate-700/30 p-4'>
        {displayData.map(
          (item) =>
            item.value && (
              <div
                key={item.label}
                className='flex items-start justify-between border-b border-slate-600/50 py-2 last:border-b-0'
              >
                <span className='text-sm font-medium text-gray-300'>
                  {item.label}:
                </span>
                <span className='ml-2 text-right text-sm text-gray-100'>
                  {item.value}
                </span>
              </div>
            )
        )}
      </div>

      <h3 className='mt-8 mb-4 text-xl font-semibold text-white'>
        Consents & Acknowledgements
      </h3>
      <div className='space-y-4'>
        <CheckboxField
          id='consentDataProcessing'
          label='I consent to the collection, use, and processing of my personal information as described in the Privacy Policy for the purpose of this investment application.'
          checked={formData.consentDataProcessing}
          onChange={(checked) =>
            handleCheckboxChange(checked, 'consentDataProcessing')
          }
          error={errors?.consentDataProcessing}
          required
        />
        <CheckboxField
          id='consentTerms'
          label='I have read, understood, and agree to the Terms and Conditions of this investment opportunity.'
          checked={formData.consentTerms}
          onChange={(checked) => handleCheckboxChange(checked, 'consentTerms')}
          error={errors?.consentTerms}
          required
        />
        <CheckboxField
          id='informationAccuracy'
          label='I declare that all information provided in this application is true, complete, and accurate to the best of my knowledge.'
          checked={formData.informationAccuracy}
          onChange={(checked) =>
            handleCheckboxChange(checked, 'informationAccuracy')
          }
          error={errors?.informationAccuracy}
          required
        />
      </div>
      <p className='mt-4 text-xs text-gray-400 italic'>
        By clicking &quot;Review &amp; Submit Application&quot;, you are
        electronically signing and submitting your application.
      </p>
    </div>
  );
}
