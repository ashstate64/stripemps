'use client';
import type {
  ApplicationData,
  FormState,
} from '@/app/actions/submit-application';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ExternalLink } from 'lucide-react';

interface StepProps {
  formData: Partial<ApplicationData>;
  updateFormData: (data: Partial<ApplicationData>) => void;
  errors?: FormState['errors'];
}

const accreditedInvestorCriteria = [
  {
    id: 'income200k',
    label:
      'My net income before taxes exceeded $250,000 AUD in each of the two most recent financial years, and I expect to maintain at least that level of income this year.',
  },
  {
    id: 'income300kSpouse',
    label:
      "My net income before taxes, combined with my spouse's, exceeded $400,000 AUD in each of the two most recent financial years, and we expect to maintain at least that level of combined income this year.",
  },
  {
    id: 'assets1M',
    label:
      'Either alone or with my spouse, I own financial assets (cash, securities, etc.) with an aggregate realizable value before taxes, but net of any related liabilities, exceeding $2,500,000 AUD.',
  },
  {
    id: 'netAssets5M',
    label:
      'Either alone or with my spouse, I have net assets of at least $2,500,000 AUD (including real estate).',
  },
  {
    id: 'permittedClient',
    label:
      "I qualify as a 'Wholesale Client' as defined under Australian Corporations Act (e.g., financial institution, registered adviser, government entity, or an individual who beneficially owns financial assets having an aggregate realizable value that, before taxes but net of any related liabilities, exceeds $2.5 million AUD).",
  },
];

export function AccreditedInvestorStep({
  formData,
  updateFormData,
  errors,
}: StepProps) {
  const handleCheckboxChange = (checked: boolean, criterionId: string) => {
    const currentSelected = formData.accreditedStatus || [];
    let newSelected: string[];
    if (checked) {
      newSelected = [...currentSelected, criterionId];
    } else {
      newSelected = currentSelected.filter((id) => id !== criterionId);
    }
    updateFormData({ accreditedStatus: newSelected });
  };

  return (
    <div className='space-y-6'>
      <h3 className='mb-2 text-2xl font-semibold text-gray-900 md:text-3xl'>
        Wholesale Client Status (Australia)
      </h3>
      <p className='mb-4 text-sm text-gray-600'>
        To invest in this pre-IPO opportunity, you must qualify as a
        &quot;Wholesale Client&quot; under Australian Corporations Act. Please
        select all criteria that apply to you.
      </p>
      <div className='space-y-3'>
        {accreditedInvestorCriteria.map((criterion) => (
          <div
            key={criterion.id}
            className='rounded-md border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md'
          >
            <div className='items-top flex space-x-2'>
              <Checkbox
                id={criterion.id}
                checked={(formData.accreditedStatus || []).includes(
                  criterion.id
                )}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(checked as boolean, criterion.id)
                }
                className='mt-1 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white'
              />

              <div className='grid gap-1.5 leading-none'>
                <Label
                  htmlFor={criterion.id}
                  className='cursor-pointer text-sm text-gray-600 text-gray-700'
                >
                  {criterion.label}
                </Label>
              </div>
            </div>
          </div>
        ))}
      </div>
      {errors?.accreditedStatus && (
        <p className='mt-1 text-xs text-red-400'>
          {errors.accreditedStatus.join(', ')}
        </p>
      )}
      <p className='mt-4 text-xs text-gray-400'>
        For official definitions, please consult the applicable securities
        legislation or your financial advisor. You can find more information on
        the Ontario Securities Commission website (or your local regulator).
        <a
          href='https://www.osc.ca/en/securities-law/instruments-rules-policies/4/45-106/unofficial-consolidation-national-instrument-45-106-prospectus-exemptions'
          target='_blank'
          rel='noopener noreferrer'
          className='ml-1 inline-flex items-center text-primary hover:underline'
        >
          OSC NI 45-106 <ExternalLink className='ml-1 h-3 w-3' />
        </a>
      </p>
      <p className='mt-2 text-xs italic text-gray-400'>
        By submitting this application, you represent that your declarations
        regarding your accredited investor status are true and accurate.
      </p>
    </div>
  );
}
