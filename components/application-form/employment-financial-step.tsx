'use client';
import type {
  ApplicationData,
  FormState,
} from '@/app/actions/submit-application';
import type React from 'react';

import {
  FormField,
  RadioGroupField,
  incomeRanges,
  netAssetsRanges,
} from './form-elements';

interface StepProps {
  formData: Partial<ApplicationData>;
  updateFormData: (data: Partial<ApplicationData>) => void;
  errors?: FormState['errors'];
}

const employmentStatusOptions = [
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'retired', label: 'Retired' },
  { value: 'student', label: 'Student' },
];

export function EmploymentFinancialStep({
  formData,
  updateFormData,
  errors,
}: StepProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    fieldName?: keyof ApplicationData | string
  ) => {
    const target =
      fieldName || (e as React.ChangeEvent<HTMLInputElement>).target.name;
    const value =
      typeof e === 'string'
        ? e
        : (e as React.ChangeEvent<HTMLInputElement>).target.value;
    updateFormData({ [target as keyof ApplicationData]: value });
  };

  return (
    <div className='space-y-6'>
      <h3 className='mb-4 text-2xl font-semibold text-gray-900 md:text-3xl'>
        Employment Information
      </h3>
      <RadioGroupField
        id='employmentStatus'
        label='Current Employment Status'
        options={employmentStatusOptions}
        value={formData.employmentStatus}
        onChange={handleChange}
        error={errors?.employmentStatus}
        required
      />
      {(formData.employmentStatus === 'employed' ||
        formData.employmentStatus === 'self-employed') && (
        <>
          <FormField
            id='occupation'
            label='Occupation / Job Title'
            value={formData.occupation || ''}
            onChange={handleChange}
            error={errors?.occupation}
            required={true}
          />
          <FormField
            id='employerName'
            label={
              formData.employmentStatus === 'employed'
                ? 'Employer Name'
                : 'Business Name'
            }
            value={formData.employerName || ''}
            onChange={handleChange}
            error={errors?.employerName}
            required={true}
          />
        </>
      )}

      <h3 className='mb-4 mt-8 text-2xl font-semibold text-gray-900 md:text-3xl'>
        Financial Profile (AUD)
      </h3>
      <FormField
        id='annualIncome'
        label='Estimated Annual Income (AUD)'
        type='select'
        options={incomeRanges}
        value={formData.annualIncome || ''}
        onChange={handleChange}
        error={errors?.annualIncome}
        required
        placeholder='Select income range'
      />
      <FormField
        id='netFinancialAssets'
        label='Estimated Net Financial Assets (AUD)'
        type='select'
        options={netAssetsRanges}
        value={formData.netFinancialAssets || ''}
        onChange={handleChange}
        error={errors?.netFinancialAssets}
        required
        placeholder='Excludes primary residence, includes cash, stocks, bonds'
        info='Net financial assets = Total financial assets (cash, stocks, bonds, etc.) minus any related debts. Do not include your primary residence.'
      />
      <FormField
        id='sourceOfFunds'
        label='Primary Source of Funds for this Investment'
        type='textarea'
        value={formData.sourceOfFunds || ''}
        onChange={handleChange}
        error={errors?.sourceOfFunds}
        required
        placeholder='e.g., Employment Income, Savings, Inheritance, Sale of Assets'
      />
    </div>
  );
}
