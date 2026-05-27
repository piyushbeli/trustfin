import React, { Suspense } from 'react';
import BusinessLoanPageContent from '@/components/business-loan/business-loan-page-content';
import { PageLoader } from '@/components/shared/page-loader';

const BusinessLoanApplyPage = (): React.ReactNode => {
  return (
    <Suspense fallback={<PageLoader />}>
      <BusinessLoanPageContent />
    </Suspense>
  );
};

export default BusinessLoanApplyPage;
