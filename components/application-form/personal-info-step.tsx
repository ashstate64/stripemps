'use client';
import type {
  ApplicationData,
  FormState,
} from '@/app/actions/submit-application';
import type React from 'react';

import { FormField, canadianProvinces } from './form-elements';

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
      <h3 className='mb-4 text-xl font-semibold text-white'>
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
          placeholder='(123) 456-7890'
          autoComplete='tel'
          inputMode='tel'
          pattern='[0-9\s\(\)\-\+]+'
          maxLength={20}
        />
      </div>

      <h3 className='mb-4 mt-6 text-xl font-semibold text-white'>
        Residential Address (Canada)
      </h3>
      <FormField
        id='streetAddress'
        label='Street Address'
        value={formData.streetAddress || ''}
        onChange={handleChange}
        error={errors?.streetAddress}
        required
        placeholder='123 Main St, Apt 4B'
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
          placeholder='Toronto'
          autoComplete='address-level2'
          maxLength={100}
        />
        <FormField
          id='province'
          label='Province'
          type='select'
          options={canadianProvinces}
          value={formData.province || ''}
          onChange={handleChange}
          error={errors?.province}
          required
          autoComplete='address-level1'
        />
        <FormField
          id='postalCode'
          label='Postal Code'
          value={formData.postalCode || ''}
          onChange={handleChange}
          error={errors?.postalCode}
          required
          placeholder='A1B 2C3'
          autoComplete='postal-code'
          pattern='[A-Za-z]\d[A-Za-z][\s\-]?\d[A-Za-z]\d'
          maxLength={7}
        />
      </div>
      <FormField
        id='sin'
        label='Social Insurance Number (SIN)'
        value={formData.sin || ''}
        onChange={handleChange}
        error={errors?.sin}
        required
        placeholder='123-456-789 or 123456789'
        info='Your SIN is required for tax reporting purposes by the Canada Revenue Agency (CRA).'
        inputMode='numeric'
        pattern='[0-9\-\s]+'
        maxLength={11}
      />
    </div>
  );
}
