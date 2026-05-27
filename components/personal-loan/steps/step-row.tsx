/**
 * StepRow
 * Single step in the "How to Apply" timeline. Renders an icon column with
 * an optional connector and the step title + description on the right.
 */

import { JSX } from 'react';
import type { StepItem } from '../constants';

interface StepRowProps {
  step: StepItem;
  index: number;
  isLast: boolean;
}

const StepRow = ({ step, index }: StepRowProps): JSX.Element => {

  return (
    <div
      className="relative flex items-start gap-4"
    >
      <div className="flex-1 pt-1 pb-3">
        <p className="text-sm font-medium text-brand-primary mb-2">{step.title}</p>
        <p className="text-sm custom-text-black leading-5">{step.description}</p>
      </div>
    </div>
  );
};

export default StepRow;
