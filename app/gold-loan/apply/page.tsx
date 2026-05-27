import React, { Suspense } from 'react';
import GoldLoanPageContent from '@/components/gold-loan/gold-loan-page-content';
import { PageLoader } from '@/components/shared/page-loader';

const GoldLoanApplyPage = (): React.ReactNode => {
  return (
    <Suspense fallback={<PageLoader />}>
      <GoldLoanPageContent />
    </Suspense>
  );
};

export default GoldLoanApplyPage;
