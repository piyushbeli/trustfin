/**
 * Button Group Component
 * Renders a group of toggle buttons for selection fields
 */

import { cn } from '@/lib/utils';
import { getLeadFormSegmentClassName } from '@/lib/utils/form-field-styles';

interface ButtonOption {
  value: string;
  label: string;
}

interface ButtonGroupProps {
  options: ButtonOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  buttonClassName?: string;
  /** id of a heading/label element; exposes this group to assistive tech like a labeled fieldset. */
  ariaLabelledBy?: string;
}

const ButtonGroup = ({
  options,
  value,
  onChange,
  disabled,
  error,
  className,
  buttonClassName,
  ariaLabelledBy,
}: ButtonGroupProps) => {
  return (
    <div role="group" aria-labelledby={ariaLabelledBy}>
      <div className={cn('flex gap-2', className)}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            disabled={disabled}
            className={getLeadFormSegmentClassName({
              selected: value === option.value,
              disabled,
              className: buttonClassName,
            })}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default ButtonGroup;
