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

interface FormFieldProps {
  id: keyof ApplicationData | string; // Allow string for dynamic ids not in ApplicationData
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number | readonly string[] | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    fieldName?: keyof ApplicationData | string
  ) => void; // string for Select/Radio
  error?: string[];
  required?: boolean;
  options?: { value: string; label: string }[];
  className?: string;
  info?: string; // Additional info/tooltip text
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
}: FormFieldProps) {
  const fieldId = id as keyof ApplicationData; // Cast for direct use with ApplicationData keys
  return (
    <div className={`space-y-2 ${className}`}>
      <Label
        htmlFor={fieldId}
        className='font-medium text-gray-200 transition-colors duration-200'
      >
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>
      {info && (
        <p className='-mt-1 mb-1 text-xs leading-relaxed text-gray-400'>
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
          <SelectTrigger className='w-full border-slate-600 bg-slate-700 text-gray-200 focus:ring-primary'>
            <SelectValue placeholder={placeholder || 'Select an option'} />
          </SelectTrigger>
          <SelectContent className='border-slate-600 bg-slate-700 text-gray-200'>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className='hover:bg-slate-600'
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
          className='min-h-[80px] border-slate-600 bg-slate-700 text-gray-200 focus:ring-primary'
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
          className='border-slate-600 bg-slate-700 text-gray-200 focus:ring-primary'
        />
      )}
      {error && error.length > 0 && (
        <div className='mt-1 text-xs text-red-400 duration-200 animate-in slide-in-from-top-1'>
          {error.map((err, index) => (
            <p key={index} className='flex items-center gap-1'>
              <span className='text-red-500'>⚠</span>
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
        name={fieldId}
        checked={checked}
        onCheckedChange={(val) => onChange(val as boolean, fieldId)}
        required={required}
        className='mt-1 border-slate-500 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
      />
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
        name={fieldId}
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
      {error && error.length > 0 && (
        <div className='mt-1 text-xs text-red-400 duration-200 animate-in slide-in-from-top-1'>
          {error.map((err, index) => (
            <p key={index} className='flex items-center gap-1'>
              <span className='text-red-500'>⚠</span>
              {err}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export const canadianProvinces = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'YT', label: 'Yukon' },
];

export const incomeRanges = [
  { value: '<50k', label: 'Under $50,000 CAD' },
  { value: '50k-99k', label: '$50,000 - $99,999 CAD' },
  { value: '100k-149k', label: '$100,000 - $149,999 CAD' },
  { value: '150k-199k', label: '$150,000 - $199,999 CAD' },
  { value: '200k-299k', label: '$200,000 - $299,999 CAD' },
  { value: '>300k', label: '$300,000 CAD or more' },
];

export const netAssetsRanges = [
  { value: '<250k', label: 'Under $250,000 CAD' },
  { value: '250k-999k', label: '$250,000 - $999,999 CAD' },
  { value: '1M-4.9M', label: '$1,000,000 - $4,999,999 CAD' },
  { value: '>5M', label: '$5,000,000 CAD or more' },
];
