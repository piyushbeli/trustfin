import type { Metadata } from 'next';
import PageBanner from '@/components/shared/page-banner';
import PrivacyPolicyContent from '@/components/shared/privacy-policy-content';
import { IMAGES } from '@/lib/constants/images';
import { BackToHomeButton } from '@/components/shared/back-to-home-button';

/** Force static generation with 30-minute revalidation */
export const dynamic = 'force-static';
export const revalidate = 1800; // 30 minutes

/**
 * Generates metadata for the Privacy Policy page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Privacy Policy | TrustFin',
    description:
      'Read our privacy policy to understand how TrustFin collects, uses, and protects your personal information.',
    keywords: 'privacy policy, data protection, security, TrustFin',
  };
}

/**
 * Privacy Policy page component
 */
const PrivacyPolicyPage = (): React.ReactNode => {
  return (
    <div className="mx-auto max-w-4xl pt-24 pb-8 md:pt-28 md:pb-12">
      <div className="mx-4">
        <BackToHomeButton />
      </div>

      <div className="container mx-4 mb-1 flex justify-center">
        <PageBanner
          title="PRIVACY POLICY"
          iconImage={IMAGES.ICONS.TRUSTFIN_HEART}
          iconAlt="TrustFin Heart Icon"
        />
      </div>

      <PrivacyPolicyContent />
    </div>
  );
};

export default PrivacyPolicyPage;
