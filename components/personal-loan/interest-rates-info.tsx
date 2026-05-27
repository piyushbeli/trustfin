/**
 * Interest Rates Info Component
 * Displays personal loan interest rates information text section
 */

import { JSX } from 'react';
import { INTEREST_RATES_INFO } from './constants';

/**
 * Interest Rates Info Section
 * Simple text section explaining personal loan interest rates
 */
const InterestRatesInfo = (): JSX.Element => {
  return (
    <section className="py-6 px-4">
      <div
        className="max-w-3xl mx-auto"
      >
        {/* Section Title */}
        <h2 className="text-base font-medium text-center text-gray-900 mb-4">
          {INTEREST_RATES_INFO.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-5">
          {INTEREST_RATES_INFO.description}
        </p>
      </div>
    </section>
  );
};

export default InterestRatesInfo;
