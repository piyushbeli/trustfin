'use client';

/**
 * Sticky apply button for the home loan landing page.
 * Navigates to the home loan application form route.
 */

import { JSX } from 'react';
import HomeApplyButton from './home-apply-button';
import { HOME_HERO_COPY } from './constants';

const HomeStickyApplyButton = (): JSX.Element => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white border-t shadow-lg z-10">
      <HomeApplyButton
        label={HOME_HERO_COPY.primaryCta}
        className="h-14 text-base font-medium max-w-3xl mx-auto items-center justify-center flex"
      />
    </div>
  );
};

export default HomeStickyApplyButton;
