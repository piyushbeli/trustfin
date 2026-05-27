'use client';

import { JSX } from 'react';
import StepRow from './step-row';
import { HOW_TO_APPLY_STEPS, type StepItem } from '../constants';

interface StepsTimelineProps {
  steps?: StepItem[];
}

/** Renders the full vertical timeline of application steps */
const StepsTimeline = ({ steps = HOW_TO_APPLY_STEPS }: StepsTimelineProps): JSX.Element => {
  return (
    <div className="mb-6">
      {steps.map((step, index) => (
        <StepRow
          key={step.id}
          step={step}
          index={index}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
};

export default StepsTimeline;
