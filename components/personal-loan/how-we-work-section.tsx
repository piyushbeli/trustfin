/**
 * How We Work Section Component
 * Explains the personal loan matching process
 */

import { JSX } from 'react';
import { HOW_WE_WORK_INFO } from './constants';

/**
 * How We Work Section
 * Displays explanation of how the PL engine matches lenders
 */
const HowWeWorkSection = (): JSX.Element => {
  return (
    <section className="py-6 px-4">
      <div
        className="max-w-3xl mx-auto"
      >
        {/* Section Title */}
        <h2 className="text-base font-medium text-center text-gray-900 mb-4">
          {HOW_WE_WORK_INFO.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-5">{HOW_WE_WORK_INFO.description}</p>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
