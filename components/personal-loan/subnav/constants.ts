/** Personal Loan sub-page navigation links */
export interface PersonalLoanSubnavLink {
  label: string;
  href: string;
}

export const PERSONAL_LOAN_SUBNAV_LINKS: PersonalLoanSubnavLink[] = [
  { label: 'Personal Loan Overview', href: '/personal-loan' },
  { label: 'Interest Rates', href: '/personal-loan/interest-rates' },
  { label: 'Documents Required', href: '/personal-loan/documents-required' },
];
