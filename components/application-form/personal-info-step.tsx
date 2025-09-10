'use client';
import type {
  ApplicationData,
  FormState,
} from '@/app/actions/submit-application';
import type React from 'react';

import { FormField, australianStates } from './form-elements';

interface StepProps {
  formData: Partial<ApplicationData>;
  updateFormData: (data: Partial<ApplicationData>) => void;
  errors?: FormState['errors'];
}

export function PersonalInfoStep({
  formData,
  updateFormData,
  errors,
}: StepProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    fieldName?: keyof ApplicationData | string
  ) => {
    if (typeof e === 'string') {
      // For Select components
      updateFormData({ [fieldName as keyof ApplicationData]: e });
    } else {
      updateFormData({
        [e.target.name as keyof ApplicationData]: e.target.value,
      });
    }
  };

  return (
    <div className='space-y-6'>
      <h3 className='mb-4 text-2xl font-semibold text-gray-900 md:text-3xl'>
        Personal Details
      </h3>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <FormField
          id='fullName'
          label='Full Legal Name'
          value={formData.fullName || ''}
          onChange={handleChange}
          error={errors?.fullName}
          required
          placeholder='As shown on your ID'
          autoComplete='name'
          maxLength={100}
        />
        <FormField
          id='dateOfBirth'
          label='Date of Birth'
          type='date'
          value={formData.dateOfBirth || ''}
          onChange={handleChange}
          error={errors?.dateOfBirth}
          required
          autoComplete='bday'
        />
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <FormField
          id='email'
          label='Email Address'
          type='email'
          value={formData.email || ''}
          onChange={handleChange}
          error={errors?.email}
          required
          placeholder='you@example.com'
          autoComplete='email'
          inputMode='email'
          maxLength={254}
        />
        <FormField
          id='phone'
          label='Phone Number'
          type='tel'
          value={formData.phone || ''}
          onChange={handleChange}
          error={errors?.phone}
          required
          placeholder='0412 345 678'
          autoComplete='tel'
          inputMode='tel'
          pattern='[0-9\s\(\)\-\+]+'
          maxLength={20}
        />
      </div>

      <h3 className='mb-4 mt-6 text-2xl font-semibold text-gray-900 md:text-3xl'>
        Residential Address (Australia)
      </h3>
      <FormField
        id='streetAddress'
        label='Street Address'
        value={formData.streetAddress || ''}
        onChange={handleChange}
        error={errors?.streetAddress}
        required
        placeholder='123 Collins Street, Unit 4B'
        autoComplete='street-address'
        maxLength={200}
      />
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <FormField
          id='city'
          label='City'
          value={formData.city || ''}
          onChange={handleChange}
          error={errors?.city}
          required
          placeholder='Melbourne'
          autoComplete='address-level2'
          maxLength={100}
        />
        <FormField
          id='province'
          label='State/Territory'
          type='select'
          options={australianStates}
          value={formData.province || ''}
          onChange={handleChange}
          error={errors?.province}
          required
          autoComplete='address-level1'
        />
        <FormField
          id='postalCode'
          label='Postcode'
          value={formData.postalCode || ''}
          onChange={handleChange}
          error={errors?.postalCode}
          required
          placeholder='3000'
          autoComplete='postal-code'
          pattern='\d{4}'
          maxLength={4}
        />
      </div>
      <FormField
        id='sin'
        label='Tax File Number (TFN)'
        value={formData.sin || ''}
        onChange={handleChange}
        error={errors?.sin}
        required
        placeholder='123 456 789'
        info='Your TFN is required for tax reporting purposes by the Australian Taxation Office (ATO).'
        inputMode='numeric'
        pattern='[0-9\s]+'
        maxLength={11}
      />
    </div>
  );
}
