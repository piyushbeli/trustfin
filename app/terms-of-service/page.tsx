import type { Metadata } from 'next';
import PageBanner from '@/components/shared/page-banner';
import TermsOfServiceContent from '@/components/shared/terms-of-service-content';
import { IMAGES } from '@/lib/constants/images';
import { BackToHomeButton } from '@/components/shared/back-to-home-button';

/** Force static generation with 30-minute revalidation */
export const dynamic = 'force-static';
export const revalidate = 1800; // 30 minutes

/**
 * Generates metadata for the Terms of Service page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Terms of Use | TrustFin',
    description:
      'Read our terms of use to understand the terms and conditions governing your use of the TrustFin platform.',
    keywords: 'terms of use, terms and conditions, user agreement, TrustFin',
  };
}

/**
 * Terms of Service page component
 */
const TermsOfServicePage = (): React.ReactNode => {
  return (
    <div className="mx-auto max-w-4xl pt-24 pb-8 md:pt-28 md:pb-12">
      <div className="mx-4">
        <BackToHomeButton />
      </div>

      <div className="container mx-4 mb-1 flex justify-center">
        <PageBanner
          title="TERMS OF USE"
          iconImage={IMAGES.ICONS.TRUSTFIN_HEART}
          iconAlt="TrustFin Heart Icon"
        />
      </div>

      <TermsOfServiceContent />
    </div>
  );
};

export default TermsOfServicePage;
