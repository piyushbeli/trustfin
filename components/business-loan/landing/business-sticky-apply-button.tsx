'use client';

/**
 * Sticky apply button for the business loan landing page.
 * Navigates to the business loan application form route.
 */

import { JSX } from 'react';
import BusinessApplyButton from './business-apply-button';

const BusinessStickyApplyButton = (): JSX.Element => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white border-t shadow-lg z-10">
      <BusinessApplyButton
        label="Start Loan Application"
        className="h-14 text-base font-medium max-w-3xl mx-auto items-center justify-center flex"
      />
    </div>
  );
};

export default BusinessStickyApplyButton;
