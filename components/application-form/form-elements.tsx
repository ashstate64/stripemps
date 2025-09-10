// Helper components for form fields to reduce boilerplate
'use client';

import type React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { ApplicationData } from '@/app/actions/submit-application';
// Design system removed due to template literal issues - using direct Tailwind classes

interface FormFieldProps {
  id: keyof ApplicationData | string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number | readonly string[] | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    fieldName?: keyof ApplicationData | string
  ) => void;
  error?: string[];
  required?: boolean;
  options?: { value: string; label: string }[];
  className?: string;
  info?: string;
  autoComplete?: string;
  inputMode?:
    | 'text'
    | 'tel'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | 'url';
  pattern?: string;
  maxLength?: number;
  'aria-describedby'?: string;
}

export function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required,
  options,
  className,
  info,
  autoComplete,
  inputMode,
  pattern,
  maxLength,
  'aria-describedby': ariaDescribedBy,
}: FormFieldProps) {
  const fieldId = id as keyof ApplicationData; // Cast for direct use with ApplicationData keys
  return (
    <div className={`space-y-2 ${className}`}>
      <Label
        htmlFor={fieldId}
        className='font-medium text-gray-900 transition-colors duration-200'
      >
        {label} {required && <span className='text-red-600'>*</span>}
      </Label>
      {info && (
        <p className='-mt-1 mb-1 text-xs leading-relaxed text-gray-600'>
          {info}
        </p>
      )}
      {type === 'select' && options ? (
        <Select
          name={fieldId}
          value={value as string}
          onValueChange={(val) => onChange(val, fieldId)}
          required={required}
        >
          <SelectTrigger className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500'>
            <SelectValue placeholder={placeholder || 'Select an option'} />
          </SelectTrigger>
          <SelectContent className='border-gray-200 bg-white text-gray-900'>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className='hover:bg-gray-100'
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : type === 'textarea' ? (
        <Textarea
          id={fieldId}
          name={fieldId}
          placeholder={placeholder}
          value={value as string}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void
          }
          required={required}
          className='min-h-[80px] rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
          style={{ fontSize: '16px' }} // Prevents zoom on iOS
        />
      ) : (
        <Input
          id={fieldId}
          name={fieldId}
          type={type}
          placeholder={placeholder}
          value={value as string | number}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          }
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          pattern={pattern}
          maxLength={maxLength}
          aria-describedby={
            ariaDescribedBy ||
            (error && error.length > 0 ? `${fieldId}-error` : undefined)
          }
          className='min-h-[44px] rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
          style={{ fontSize: '16px' }} // Prevents zoom on iOS
        />
      )}
      {error && error.length > 0 && (
        <div
          id={`${fieldId}-error`}
          className='mt-1 text-xs text-red-400 duration-200 animate-in slide-in-from-top-1'
          role='alert'
          aria-live='polite'
        >
          {error.map((err, index) => (
            <p key={index} className='flex items-center gap-1'>
              <span className='text-red-500' aria-hidden='true'>
                ⚠
              </span>
              {err}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

interface CheckboxFieldProps {
  id: keyof ApplicationData | string;
  label: string | React.ReactNode;
  checked: boolean | undefined;
  onChange: (
    checked: boolean,
    fieldName: keyof ApplicationData | string
  ) => void;
  error?: string[];
  required?: boolean;
  className?: string;
}

export function CheckboxField({
  id,
  label,
  checked,
  onChange,
  error,
  required,
  className,
}: CheckboxFieldProps) {
  const fieldId = id as keyof ApplicationData;
  return (
    <div className={`items-top flex space-x-2 ${className}`}>
      <Checkbox
        id={fieldId}
        checked={checked}
        onCheckedChange={(val) => onChange(val as boolean, fieldId)}
        required={required}
        className='mt-1 border-slate-500 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
      />
      {/* Hidden input for form submission */}
      <input type='hidden' name={fieldId} value={checked ? 'on' : 'off'} />
      <div className='grid gap-1.5 leading-none'>
        <Label
          htmlFor={fieldId}
          className='cursor-pointer text-sm font-medium text-gray-200'
        >
          {label} {required && <span className='text-red-500'>*</span>}
        </Label>
        {error && error.length > 0 && (
          <p className='text-xs text-red-400'>{error.join(', ')}</p>
        )}
      </div>
    </div>
  );
}

interface RadioGroupFieldProps {
  id: keyof ApplicationData | string;
  label: string;
  value: string | undefined;
  onChange: (value: string, fieldName: keyof ApplicationData | string) => void;
  options: { value: string; label: string }[];
  error?: string[];
  required?: boolean;
  className?: string;
}

export function RadioGroupField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required,
  className,
}: RadioGroupFieldProps) {
  const fieldId = id as keyof ApplicationData;
  return (
    <div className={`space-y-2 ${className}`}>
      <Label className='font-medium text-gray-200'>
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val, fieldId)}
        required={required}
        className='space-y-1'
      >
        {options.map((option) => (
          <div key={option.value} className='flex items-center space-x-2'>
            <RadioGroupItem
              value={option.value}
              id={`${fieldId}-${option.value}`}
              className='border-slate-500 text-primary focus:ring-primary'
            />
            <Label
              htmlFor={`${fieldId}-${option.value}`}
              className='cursor-pointer font-normal text-gray-300'
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {/* Hidden input for form submission */}
      <input type='hidden' name={fieldId} value={value || ''} />
      {error && error.length > 0 && (
        <div
          id={`${fieldId}-error`}
          className='mt-1 text-xs text-red-400 duration-200 animate-in slide-in-from-top-1'
          role='alert'
          aria-live='polite'
        >
          {error.map((err, index) => (
            <p key={index} className='flex items-center gap-1'>
              <span className='text-red-500' aria-hidden='true'>
                ⚠
              </span>
              {err}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export const australianStates = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NT', label: 'Northern Territory' },
];

export const incomeRanges = [
  { value: '<50k', label: 'Under $50,000 AUD' },
  { value: '50k-99k', label: '$50,000 - $99,999 AUD' },
  { value: '100k-149k', label: '$100,000 - $149,999 AUD' },
  { value: '150k-199k', label: '$150,000 - $199,999 AUD' },
  { value: '200k-299k', label: '$200,000 - $299,999 AUD' },
  { value: '>300k', label: '$300,000 AUD or more' },
];

export const netAssetsRanges = [
  { value: '<250k', label: 'Under $250,000 AUD' },
  { value: '250k-999k', label: '$250,000 - $999,999 AUD' },
  { value: '1M-4.9M', label: '$1,000,000 - $4,999,999 AUD' },
  { value: '>5M', label: '$5,000,000 AUD or more' },
];
