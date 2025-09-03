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
      'My net income before taxes exceeded $200,000 CAD in each of the two most recent calendar years, and I expect to maintain at least that level of income this year.',
  },
  {
    id: 'income300kSpouse',
    label:
      "My net income before taxes, combined with my spouse's, exceeded $300,000 CAD in each of the two most recent calendar years, and we expect to maintain at least that level of combined income this year.",
  },
  {
    id: 'assets1M',
    label:
      'Either alone or with my spouse, I own financial assets (cash, securities, etc.) with an aggregate realizable value before taxes, but net of any related liabilities, exceeding $1,000,000 CAD.',
  },
  {
    id: 'netAssets5M',
    label:
      'Either alone or with my spouse, I have net assets of at least $5,000,000 CAD (including real estate).',
  },
  {
    id: 'permittedClient',
    label:
      "I qualify as a 'Permitted Client' as defined under Canadian securities legislation (e.g., financial institution, registered adviser, government entity, or an individual who beneficially owns financial assets having an aggregate realizable value that, before taxes but net of any related liabilities, exceeds $5 million).",
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
      <h3 className='mb-2 text-xl font-semibold text-white'>
        Accredited Investor Status (Canada)
      </h3>
      <p className='mb-4 text-sm text-gray-300'>
        To invest in this pre-IPO opportunity, you must qualify as an
        &quot;Accredited Investor&quot; under Canadian securities laws. Please
        select all criteria that apply to you.
      </p>
      <div className='space-y-3'>
        {accreditedInvestorCriteria.map((criterion) => (
          <div
            key={criterion.id}
            className='rounded-md border border-slate-600 bg-slate-700/30 p-3 hover:bg-slate-700/50'
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
                className='mt-1 border-slate-500 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
              />
              {/* Hidden input for form submission - multiple values with same name */}
              {(formData.accreditedStatus || []).includes(criterion.id) && (
                <input
                  type='hidden'
                  name='accreditedStatus'
                  value={criterion.id}
                />
              )}
              <div className='grid gap-1.5 leading-none'>
                <Label
                  htmlFor={criterion.id}
                  className='cursor-pointer text-sm font-medium text-gray-200'
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
