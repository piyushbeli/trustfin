/**
 * Reusable consent checkbox component shared across loan forms.
 * Keeps the consent wording, styling, and error display consistent.
 */
'use client';

import { BRAND_NAME } from '@/lib/constants/common';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ConsentCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  className?: string;
}

const ConsentCheckbox = ({
  id,
  checked,
  onChange,
  error,
  className,
}: ConsentCheckboxProps): React.ReactNode => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary cursor-pointer shrink-0"
        />
        <label htmlFor={id} className="text-sm text-gray-700">
          I agree to the{' '}
          <Link
            target="_blank"
            href="/terms-of-service"
            className="text-brand-primary underline"
          >
            Terms of Service{' '}
          </Link>
          of {BRAND_NAME}.{' '}
        </label>
      </div>
      {error && <p className="text-xs text-red-600 ml-8">{error}</p>}
    </div>
  );
};

export default ConsentCheckbox;
