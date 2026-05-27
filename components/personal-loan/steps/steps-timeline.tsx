'use client';

import { JSX } from 'react';
import StepRow from './step-row';
import { HOW_TO_APPLY_STEPS } from '../constants';

/** Renders the full vertical timeline of application steps */
const StepsTimeline = (): JSX.Element => {
  return (
    <div className="mb-6">
      {HOW_TO_APPLY_STEPS.map((step, index) => (
        <StepRow
          key={step.id}
          step={step}
          index={index}
          isLast={index === HOW_TO_APPLY_STEPS.length - 1}
        />
      ))}
    </div>
  );
};

export default StepsTimeline;
