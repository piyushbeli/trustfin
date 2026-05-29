/**
 * Personal Loan Interest Rates page — copy and table data (May 2026).
 */

import type { MultiColumnTableRow } from '@/components/shared/multi-column-table';

export const PL_INTEREST_RATES_EMI_CALCULATOR_ID = 'pl-interest-rates-emi-calculator';

export const INTEREST_RATES_HERO = {
  titleHighlight: 'Personal Loan',
  titleRest: 'Interest Rates in India, May 2026',
  paragraphs: [
    'Interest rates are the single biggest factor in how much your personal loan actually costs. Yet most borrowers apply to the first lender they find without comparing. This page lists current personal loan interest rates from all lenders available on TrustFin.ai, updated regularly, so you can compare and make an informed decision before you apply.',
    "Not sure which rate you will qualify for? TrustFin's AI checks your eligibility across all lenders and shows you offers matched to your profile, not just the best-case headline rates.",
  ],
} as const;

export const LENDER_RATES_TABLE_HEADERS = [
  'Lender',
  'Interest Rate (p.a.)',
  'Loan Amount',
  'Max Tenure',
] as const;

/** 23 lenders — indicative rates as of May 2026 */
export const PERSONAL_LOAN_LENDER_RATES: MultiColumnTableRow[] = [
  { id: 'poonawalla', cells: ['Poonawalla Fincorp', '9.99% onwards', 'Up to ₹50 lakh', '84 months'] },
  { id: 'lt-finance', cells: ['L&T Finance', '11% onwards', 'Up to ₹15 lakh', '48 months'] },
  { id: 'kreditbee', cells: ['KreditBee', '12% to 28.50%', 'Up to ₹10 lakh', '24 months'] },
  { id: 'zype', cells: ['Zype', '18% onwards', 'Up to ₹5 lakh', '12 months'] },
  { id: 'hero-fincorp', cells: ['Hero Fincorp', '18% to 30%', 'Up to ₹5 lakh', '36 months'] },
  { id: 'moneyview', cells: ['MoneyView', '14% to 36%', 'Up to ₹10 lakh', '60 months'] },
  { id: 'olyv', cells: ['Olyv', '18% to 30% p.a. (1.5% to 2.5% p.m.)', 'Up to ₹5 lakh', '12 months'] },
  { id: 'mpokket', cells: ['mPokket', '24% to 48%', 'Up to ₹45,000', '4 months'] },
  { id: 'true-balance', cells: ['True Balance', '24% to 36%', 'Up to ₹2 lakh', '12 months'] },
  {
    id: 'ram-fincorp',
    cells: ['Ram Fincorp', '72% to 365% p.a. (0.2% to 1% per day)', 'Up to ₹1 lakh', '90 days'],
  },
  { id: 'fatakpay', cells: ['FatakPay (via FDPL)', '20% onwards', 'Up to ₹2 lakh', '12 months'] },
  { id: 'chintamani', cells: ['Chintamani Finlease', 'Available on request', 'Up to ₹3 lakh', '24 months'] },
  { id: 'flot', cells: ['FLOT', 'Available on request', 'Up to ₹5 lakh', '12 months'] },
  { id: 'trustpaisa', cells: ['TrustPaisa', 'Available on request', 'Up to ₹2 lakh', '12 months'] },
  { id: 'lendingplate', cells: ['LendingPlate', 'Available on request', 'Up to ₹2 lakh', '12 months'] },
  { id: 'fdpl', cells: ['FDPL Finance', 'Available on request', 'Up to ₹2 lakh', '12 months'] },
  { id: 'salaryontime', cells: ['SalaryOnTime', 'Available on request', 'Up to ₹1 lakh', '3 months'] },
  { id: 'emergencypaisa', cells: ['EmergencyPaisa', 'Available on request', 'Up to ₹1 lakh', '3 months'] },
  { id: 'brightloans', cells: ['BrightLoans', 'Available on request', 'Up to ₹2 lakh', '12 months'] },
  { id: 'dhanvarsha', cells: ['DhanVarsha', 'Available on request', 'Up to ₹2 lakh', '12 months'] },
  { id: 'fatafatloans', cells: ['FatafatLoans', 'Available on request', 'Up to ₹1 lakh', '3 months'] },
  { id: 'loansbazaar', cells: ['LoansBazaar', 'Available on request', 'Up to ₹15 lakh', '60 months'] },
  { id: 'creditt-plus', cells: ['Creditt Plus', 'Available on request', 'Up to ₹1 lakh', '6 months'] },
];

export const LENDER_RATES_SECTION = {
  title: 'Personal Loan Interest Rates, All Lenders on TrustFin (May 2026)',
  disclaimer:
    'Rates are indicative and sourced from lender websites and public disclosures as of May 2026. Actual rates offered to individual applicants depend on credit profile, income, loan amount, and tenure. Rates marked "Available on request" are not publicly disclosed by the lender and will be shown to eligible applicants during the application process on TrustFin.',
} as const;

export const EMI_COMPARISON_TABLE_HEADERS = [
  'Interest Rate',
  'Monthly EMI',
  'Total Interest Paid',
  'Total Repayment',
] as const;

/** Example: ₹3 lakh personal loan over 3 years */
export const EMI_COMPARISON_ROWS: MultiColumnTableRow[] = [
  { id: 'emi-10', cells: ['10% p.a.', '₹9,678', '₹48,406', '₹3,48,406'] },
  { id: 'emi-14', cells: ['14% p.a.', '₹10,252', '₹69,072', '₹3,69,072'] },
  { id: 'emi-18', cells: ['18% p.a.', '₹10,851', '₹90,636', '₹3,90,636'] },
  { id: 'emi-24', cells: ['24% p.a.', '₹11,780', '₹1,24,080', '₹4,24,080'] },
  { id: 'emi-30', cells: ['30% p.a.', '₹12,762', '₹1,59,432', '₹4,59,432'] },
];

export const EMI_IMPACT_SECTION = {
  title: 'What Does the Interest Rate Actually Mean for Your EMI?',
  intro:
    'The interest rate determines how much you pay in addition to repaying the principal. Here is a simple comparison to show how even a 2% difference in rate significantly changes the total cost of your loan.',
  exampleLabel: 'Example: ₹3 lakh personal loan over 3 years',
  closing:
    'The difference between a 10% rate and a 30% rate on the same loan is over ₹1.11 lakh in additional interest. This is why comparing rates before applying matters.',
} as const;

export interface RateFactorItem {
  id: string;
  title: string;
  description: string;
}

export const RATE_FACTOR_ITEMS: RateFactorItem[] = [
  {
    id: 'credit-score',
    title: 'Credit Score',
    description:
      'The higher your CIBIL or credit bureau score, the lower the risk for the lender, and the better the rate you are offered. A score above 750 typically qualifies for the best rates. Scores between 700 and 750 attract mid-range rates. Below 700, options narrow and rates go up.',
  },
  {
    id: 'income-employment',
    title: 'Monthly Income and Employment Type',
    description:
      'Borrowers with higher, stable incomes are seen as lower-risk. Salaried employees at large corporates often receive better rates than self-employed applicants or those at smaller firms.',
  },
  {
    id: 'amount-tenure',
    title: 'Loan Amount and Tenure',
    description:
      'Larger loan amounts may attract slightly better rates from some lenders. Longer tenures generally mean higher cumulative interest, even if the monthly EMI is lower.',
  },
  {
    id: 'foir',
    title: 'Existing Obligations (FOIR)',
    description:
      'If a significant portion of your income already goes toward EMIs, lenders view you as a higher-risk borrower and may adjust the rate upward.',
  },
  {
    id: 'lender-type',
    title: 'Lender Type',
    description:
      'Banks and large NBFCs typically offer lower starting rates. Fintech lenders and small-ticket loan apps offer faster approvals but generally at higher rates, especially for borrowers without a strong credit history.',
  },
  {
    id: 'relationship',
    title: 'Relationship with the Lender',
    description:
      'Existing customers with a healthy repayment history or salary account holders often receive pre-approved offers at preferential rates.',
  },
];

export const RATE_FACTORS_SECTION = {
  title: 'What Determines Your Personal Loan Interest Rate?',
  intro:
    'Lenders do not offer every borrower the same rate. Your final rate depends on several factors that the lender uses to assess your risk profile.',
} as const;

export interface ProseTipItem {
  id: string;
  title: string;
  description: string;
}

export const FLAT_VS_REDUCING_SECTION = {
  title: 'Flat Rate vs Reducing Balance Rate, Why the Difference Matters',
  intro:
    'Many borrowers compare rates without realising that lenders use different methods to calculate interest. Understanding this prevents an expensive mistake.',
  reducingTitle: 'Reducing Balance Method',
  reducingBody:
    'Interest is calculated on the outstanding principal each month. As you repay, the interest component reduces. Most banks and regulated NBFCs use this method. This is the standard and borrower-friendly approach.',
  flatTitle: 'Flat Rate Method',
  flatBody:
    'Interest is calculated on the entire principal for the full tenure, regardless of repayment. A flat rate of 11% is approximately equivalent to a reducing balance rate of 20% to 21% on the same loan.',
  footerNotes: [
    'All interest rates listed on this page are on a reducing balance basis unless stated otherwise.',
    'Always ask the lender whether the rate quoted is flat or reducing before signing any loan agreement.',
  ],
} as const;

export const PROCESSING_FEE_SECTION = {
  title: 'Processing Fee, The Hidden Cost Most Borrowers Overlook',
  paragraphs: [
    'The processing fee is deducted from your loan amount before disbursal. This means if you apply for ₹1 lakh at a 3% processing fee, you receive ₹97,000 but repay the full ₹1 lakh plus interest.',
    'On a ₹1 lakh loan, the difference between a 1% and a 5% processing fee is ₹4,000 deducted upfront. On a ₹5 lakh loan, that gap becomes ₹20,000.',
    'Always evaluate the total loan cost including processing fee, not just the interest rate headline.',
    "TrustFin's AI shows you the all-in cost of each matched offer so you are never comparing rates in isolation.",
  ],
} as const;

export const LOWEST_RATE_TIPS: ProseTipItem[] = [
  {
    id: 'credit-score-tip',
    title: 'Improve your credit score before applying',
    description:
      'A score improvement from 700 to 750 can drop your rate by 2% to 5% depending on the lender. This translates to meaningful savings on any loan above ₹1 lakh.',
  },
  {
    id: 'relationship-tip',
    title: 'Borrow from a lender where you already have a relationship',
    description:
      'If you have a savings account, FD, or existing loan with a lender, they may offer you a pre-approved rate that is lower than the standard offer.',
  },
  {
    id: 'tenure-tip',
    title: 'Choose a shorter tenure if you can manage the EMI',
    description:
      'A shorter tenure signals lower risk to lenders and may help you negotiate a better rate. It also significantly reduces total interest paid.',
  },
  {
    id: 'compare-tip',
    title: 'Compare across lenders before applying',
    description:
      'Do not apply to the first lender you find. Rates vary by 5% to 15% across lenders for the same borrower profile. Use TrustFin to compare matched offers before committing.',
  },
  {
    id: 'enquiries-tip',
    title: 'Avoid applying to multiple lenders separately',
    description:
      'Each direct application triggers a hard enquiry on your credit report. Multiple enquiries in a short period lower your score and can actually increase the rate you are offered. Comparing on TrustFin avoids this.',
  },
];

export const LOWEST_RATE_SECTION = {
  title: 'How to Get the Lowest Possible Interest Rate on Your Personal Loan',
} as const;

export const WHY_TRUSTFIN_SECTION = {
  title: 'Why Compare Personal Loan Rates on TrustFin',
  paragraphs: [
    'Most rate comparison pages show you a static table and leave you to figure out what applies to you. TrustFin goes further.',
    "After you enter your basic details, TrustFin's AI identifies which lenders are likely to approve you and what rate range you can realistically expect, before you apply. This means you are not comparing a 9.99% rate that requires a 780 CIBIL score when you have a 700. You see the offers that are genuinely available for your profile.",
  ],
  tagline: 'Compare with confidence. Apply once. Get the right loan.',
} as const;

export const PAGE_DISCLAIMER =
  'All interest rates and charges listed are indicative, sourced from lender websites and public disclosures as of May 2026, and are subject to change. Actual rates are determined by the respective lender based on the applicant\'s credit and financial profile. TrustFin.ai is a product of Cleartrust Fintech Services Private Limited and operates as a loan marketplace intermediary. We are not a lender.';
