'use client';
import { useState } from 'react';
import type React from 'react';

import type {
  ApplicationData,
  FormState,
} from '@/app/actions/submit-application';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UploadCloud, FileText } from 'lucide-react';

interface StepProps {
  formData: Partial<ApplicationData>;
  updateFormData: (data: Partial<ApplicationData>) => void;
  errors?: FormState['errors'];
}

export function DocumentUploadStep({
  formData,
  updateFormData: _updateFormData, // eslint-disable-line @typescript-eslint/no-unused-vars
  errors,
}: StepProps) {
  const [idFrontPreview, setIdFrontPreview] = useState<string | null>(
    formData.idFrontName || null
  );
  const [idBackPreview, setIdBackPreview] = useState<string | null>(
    formData.idBackName || null
  );
  const [proofOfAddressPreview, setProofOfAddressPreview] = useState<
    string | null
  >(formData.proofOfAddressName || null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Pick<
      ApplicationData,
      'idFrontName' | 'idBackName' | 'proofOfAddressName'
    >,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // For preview only - actual file will be submitted directly
      setPreview(file.name);
    } else {
      setPreview(null);
    }
  };

  const FileInput = ({
    id,
    label,
    onChange,
    preview,
    error,
    requiredInfo,
  }: {
    id: string; // Changed to string for FormSubmit compatibility
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    preview: string | null;
    error?: string[];
    requiredInfo: string;
  }) => (
    <div className='space-y-2 rounded-lg border border-slate-600 bg-slate-700/30 p-4'>
      <Label htmlFor={id} className='block font-medium text-gray-200'>
        {label}
      </Label>
      <p className='mb-2 text-xs text-gray-400'>{requiredInfo}</p>
      <div className='relative flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-500 transition-colors hover:border-primary'>
        <Input
          id={id}
          name={id} // Real file input for FormSubmit
          type='file'
          className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
          onChange={onChange}
          accept='image/jpeg, image/png, application/pdf'
        />
        {!preview ? (
          <div className='pointer-events-none text-center text-gray-400'>
            <UploadCloud className='mx-auto mb-1 h-8 w-8' />
            <p className='text-sm'>Click or drag file to upload</p>
            <p className='text-xs'>PNG, JPG, PDF (Max 5MB)</p>
          </div>
        ) : (
          <div className='pointer-events-none text-center text-green-400'>
            <FileText className='mx-auto mb-1 h-8 w-8' />
            <p className='max-w-[200px] truncate text-sm font-medium'>
              {preview}
            </p>
            <p className='text-xs'>File selected</p>
          </div>
        )}
      </div>
      {error && <p className='mt-1 text-xs text-red-400'>{error.join(', ')}</p>}
    </div>
  );

  return (
    <div className='space-y-6'>
      <h3 className='mb-2 text-xl font-semibold text-white'>
        Know Your Customer (KYC) Documents
      </h3>
      <p className='mb-4 text-sm text-gray-300'>
        Please upload clear copies of the following documents. This is required
        for identity verification and compliance. All uploads are simulated in
        this demo.
      </p>

      <FileInput
        id='id_front'
        label='Government-Issued Photo ID (Front)'
        onChange={(e) => handleFileChange(e, 'idFrontName', setIdFrontPreview)}
        preview={idFrontPreview}
        error={errors?.idFrontName}
        requiredInfo="e.g., Driver's License, Passport (front side)"
      />
      <FileInput
        id='id_back'
        label='Government-Issued Photo ID (Back)'
        onChange={(e) => handleFileChange(e, 'idBackName', setIdBackPreview)}
        preview={idBackPreview}
        error={errors?.idBackName}
        requiredInfo="e.g., Driver's License, Passport (back side, if applicable)"
      />
      <FileInput
        id='proof_of_address'
        label='Proof of Address'
        onChange={(e) =>
          handleFileChange(e, 'proofOfAddressName', setProofOfAddressPreview)
        }
        preview={proofOfAddressPreview}
        error={errors?.proofOfAddressName}
        requiredInfo='e.g., Utility Bill, Bank Statement (dated within last 3 months, showing your name and current address)'
      />
      <p className='mt-4 text-xs italic text-gray-500'>
        Note: Documents will be attached to your application email. Max total
        file size 5MB. Accepted formats: PNG, JPG, PDF. Files are securely
        transmitted via FormSubmit.
      </p>
    </div>
  );
}
