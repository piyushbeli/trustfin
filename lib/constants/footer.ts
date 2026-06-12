/** Footer link item */
export interface FooterLinkItem {
  label: string;
  href: string;
}

export const FOOTER_TAGLINE =
  'Let AI analyze your profile, compare loans instantly, and match you with the right lender.';

export const FOOTER_ABOUT_LINKS: FooterLinkItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-of-service' },
  { label: 'Grievance Redressals', href: '/grievance-redressal' },
];

export const FOOTER_PRODUCT_LINKS: FooterLinkItem[] = [
  { label: 'Personal Loan', href: '/personal-loan' },
  { label: 'Home Loan', href: '/home-loan' },
  { label: 'Gold Loan', href: '/gold-loan' },
  { label: 'Car Loan', href: '/car-loan' },
  { label: 'Business Loan', href: '/business-loan' },
  // { label: 'Credit Card', href: '/credit-cards' },
];

export const FOOTER_COPYRIGHT =
  '© 2026 Cleartrust Fintech Services Pvt. Ltd. All Rights Reserved.';
