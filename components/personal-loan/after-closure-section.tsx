/**
 * After Closure Section Component
 * Checklist of things to do after loan closure
 */

import { JSX } from 'react';
import { CheckSquare } from 'lucide-react';
import { AFTER_CLOSURE_CHECKLIST, AFTER_CLOSURE_INFO, ChecklistItem } from './constants';

/** Checklist item props */
interface ChecklistItemProps {
  item: ChecklistItem;
  index: number;
}

/**
 * Individual checklist item with checkmark icon
 */
const ChecklistItemRow = ({ item, index }: ChecklistItemProps): JSX.Element => {
  return (
    <div
      className="flex items-start gap-2.5"
    >
      {/* Checkmark Icon */}
      <div className="shrink-0 mt-0.5">
        <CheckSquare className="w-5 h-5 text-brand-primary" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-gray-900 text-sm font-normal leading-5">{item.title}</p>
        <p className="text-gray-500 text-sm font-normal leading-5 mt-0.5">{item.description}</p>
      </div>
    </div>
  );
};

/**
 * After Closure Section
 * Displays checklist of post-loan closure actions
 */
const AfterClosureSection = (): JSX.Element => {
  return (
    <section className="py-6 px-4">
      <div
        className="max-w-3xl mx-auto"
      >
        {/* Section Title */}
        <h2 className="text-base font-medium text-center text-gray-900 mb-6">
          {AFTER_CLOSURE_INFO.title}
        </h2>

        {/* Checklist Items */}
        <div className="space-y-4">
          {AFTER_CLOSURE_CHECKLIST.map((item, index) => (
            <ChecklistItemRow key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AfterClosureSection;
