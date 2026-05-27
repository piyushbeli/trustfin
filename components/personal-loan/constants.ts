/**
 * Personal Loan Page Constants
 * Static data for all sections of the personal loan landing page
 */

import { IMAGES } from '@/lib/constants/images';
import { Calculator, Clock, Shield, Percent, FileText, Users, Zap, HeadphonesIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
/** Benefit card configuration */
export interface BenefitItem {
  id: string;
  icon: string;
  title: string;
  value: string;
  fallbackIcon: string;
}

/** Hero section benefits */
export const HERO_BENEFITS: BenefitItem[] = [
  {
    id: 'loan-amount',
    icon: '/icons/loan-amount.svg',
    title: 'Loan Amount',
    value: 'Upto ₹15 Lakhs',
    fallbackIcon: '💰',
  },
  {
    id: 'interest-rate',
    icon: '/icons/interest-rate.svg',
    title: 'Interest Rate',
    value: 'From 9.9%',
    fallbackIcon: '📊',
  },
  {
    id: 'disbursal',
    icon: '/icons/disbursal.svg',
    title: 'Disbursal',
    value: 'In 5 Minutes',
    fallbackIcon: '⚡',
  },
];

/** Step configuration for how to apply */
export interface StepItem {
  id: string;
  number: number;
  title: string;
  description: string;
}

/** How to apply steps */
export const HOW_TO_APPLY_STEPS: StepItem[] = [
  {
    id: 'step-1',
    number: 1,
    title: 'Step 1 :',
    description: 'Verify your mobile number Enter your number and confirm with OTP. Quick and secure.',
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Step 2:',
    description: 'Enter your details, Share your income, employment type, and loan requirement. The AI analyses your profile instantly.',
  },
  {
    id: 'step-3',
    number: 3,
    title: 'Step 3 :',
    description: 'Pick your offer and apply Review your matched offers, compare them side by side, and proceed with the one that suits you best.',
  },
];

/** Document item configuration */
export interface DocumentItem {
  id: string;
  title: string;
  description: string;
}

/** Documents required for personal loan */
export const DOCUMENTS_REQUIRED: DocumentItem[] = [
  {
    id: 'doc-identity',
    title: 'Identity Proof',
    description: 'Aadhaar Card / PAN Card / Voter ID / Passport',
  },
  {
    id: 'doc-address',
    title: 'Address Proof',
    description: 'Aadhaar Card / Utility Bills / Rent Agreement',
  },
  {
    id: 'doc-income',
    title: 'Income Proof',
    description: 'Salary Slips (3 months) / Bank Statement (6 months)',
  },
  {
    id: 'doc-photo',
    title: 'Photograph',
    description: 'Passport-sized recent photograph',
  },
  {
    id: 'doc-bank',
    title: 'Bank Details',
    description: 'Cancelled cheque / Bank account statement',
  },
  {
    id: 'doc-employment',
    title: 'Employment Proof',
    description: 'Employee ID / Offer Letter / Employment Certificate',
  },
];

/** Documents required for salaried employees */
export const SALARIED_DOCUMENTS: DocumentItem[] = [
  {
    id: 'identity',
    title: 'Identity Proof:',
    description: 'PAN, Aadhaar, Passport, or Voter ID',
  },
  {
    id: 'address',
    title: 'Address Proof:',
    description: 'Utility bill, Aadhaar, Passport, or Rent Agreement',
  },
  {
    id: 'income',
    title: 'Income Proof:',
    description: "Last 3 months' salary slips and bank statements",
  },
];

/** Documents required for self-employed individuals */
export const SELF_EMPLOYED_DOCUMENTS: DocumentItem[] = [
  {
    id: 'identity',
    title: 'Identity Proof:',
    description: 'PAN, Aadhaar, Passport, or Voter ID',
  },
  {
    id: 'address',
    title: 'Address Proof:',
    description: 'Utility bill, Aadhaar, Passport, or Rent Agreement',
  },
  {
    id: 'income',
    title: 'Income Proof:',
    description: 'Last 2–3 years ITR, GST Certificate, and 6-months bank statement',
  },
];

/** Eligibility item configuration */
export interface EligibilityItem {
  id: string;
  title: string;
  requirement: string;
}

/** Eligibility criteria for personal loan */
export const ELIGIBILITY_CRITERIA: EligibilityItem[] = [
  {
    id: 'age',
    title: 'Age :',
    requirement: '21 to 60 years, for self employed and pensioners it may go up to 70.',
  },
  {
    id: 'employment',
    title: 'Employment:',
    requirement: 'You must be either a salaried or a self-employed.',
  },
  {
    id: 'credit-score',
    title: 'Credit Score :',
    requirement: '720+ Recommended',
  },
  {
    id: 'salary',
    title: 'Salary :',
    requirement: 'Usually Rs. 20,000 - 30,000 a month',
  },
  {
    id: 'income',
    title: 'Income :',
    requirement: '3 Lakhs annually (For self-employed person)',
  },
];

/** Lender interest rate configuration */
export interface LenderRate {
  id: string;
  name: string;
  logo: string;
  interestRate: string;
  processingFee: string;
  loanAmount: string;
  tenure: string;
}

/** Interest rates by lender */
export const LENDER_RATES: LenderRate[] = [
  {
    id: 'mpokket',
    name: 'mPokket',
    logo: '/logos/mpokket.png',
    interestRate: '0% - 48%',
    processingFee: '0% - 15%',
    loanAmount: '₹500 - ₹30,000',
    tenure: '61 - 120 days',
  },
  {
    id: 'fibe',
    name: 'Fibe',
    logo: '/logos/fibe.png',
    interestRate: '14% - 30%',
    processingFee: '2% - 6%',
    loanAmount: '₹5,000 - ₹5,00,000',
    tenure: '3 - 36 months',
  },
  {
    id: 'kreditbee',
    name: 'KreditBee',
    logo: '/logos/kreditbee.png',
    interestRate: '0% - 29.95%',
    processingFee: '0% - 10%',
    loanAmount: '₹1,000 - ₹5,00,000',
    tenure: '2 - 24 months',
  },
  {
    id: 'moneyview',
    name: 'MoneyView',
    logo: '/logos/moneyview.png',
    interestRate: '14% - 36%',
    processingFee: '2% - 8%',
    loanAmount: '₹10,000 - ₹10,00,000',
    tenure: '3 - 60 months',
  },
  {
    id: 'cashe',
    name: 'CASHe',
    logo: '/logos/cashe.png',
    interestRate: '2.25% p.m.',
    processingFee: '2% - 3%',
    loanAmount: '₹5,000 - ₹4,00,000',
    tenure: '3 - 18 months',
  },
  {
    id: 'nira',
    name: 'NIRA',
    logo: '/logos/nira.png',
    interestRate: '24% - 36%',
    processingFee: '2.5% - 5%',
    loanAmount: '₹5,000 - ₹1,00,000',
    tenure: '3 - 12 months',
  },
];

/** Why WeCredit benefit configuration */
export interface WhyWeCreditItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Why choose WeCredit benefits */
export const WHY_WECREDIT_BENEFITS: WhyWeCreditItem[] = [
  {
    id: 'instant-approval',
    icon: Zap,
    title: 'Instant Approval',
    description: 'Get loan approval within minutes with our AI-powered verification system.',
  },
  {
    id: 'low-interest',
    icon: Percent,
    title: 'Low Interest Rates',
    description: 'Compare offers from 30+ lenders to find the best interest rates for you.',
  },
  {
    id: 'minimal-docs',
    icon: FileText,
    title: 'Minimal Documentation',
    description: 'Simple online process with minimal paperwork required.',
  },
  {
    id: 'secure',
    icon: Shield,
    title: '100% Secure',
    description: 'Your data is encrypted and protected with bank-grade security.',
  },
  {
    id: 'support',
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our customer support team is available round the clock to assist you.',
  },
  {
    id: 'trusted',
    icon: Users,
    title: 'Trusted by Lakhs',
    description: 'Over 4 lakh+ satisfied customers have chosen WeCredit for their loans.',
  },
];

/** Simplified Why WeCredit benefit for 2x2 grid */
export interface WhyWeCreditSimpleItem {
  id: string;
  text: string;
}

/** Simplified benefits for Why Choose WeCredit section */
export const WHY_WECREDIT_SIMPLE: WhyWeCreditSimpleItem[] = [
  {
    id: 'multiple-offers',
    text: 'Multiple personal loan offers',
  },
  {
    id: 'eligibility-check',
    text: 'Check eligibility in one place',
  },
  {
    id: 'higher-approval',
    text: 'Higher loan approval chances',
  },
  {
    id: 'quick-disbursal',
    text: 'Quick approval and fast loan disbursal',
  },
];

/** Interest rates info section content */
export const INTEREST_RATES_INFO = {
  title: 'Personal loan Interest Rates',
  description:
    "Personal loan interest rates available on WeCredit start from 9.99% p.a.* The final rate offered depends on the lender's criteria, loan amount, tenure, and the applicant's credit profile. Comparing offers from multiple banks and NBFCs can help in selecting a suitable interest rate.",
  /** Copy shown inside the personal-loan info accordion "Interest Rates" panel */
  accordionParagraphs: [
    'Personal loan interest rates on TrustFin start from 9.99% p.a.* Your final rate depends on your credit score, income, loan amount, tenure, and the lender\'s own criteria.',
    'Rather than guessing which lender will give you the best rate, let the AI compare across 25+ lenders and surface the most competitive offer available for your profile.',
  ],
} as const;

/** Eligibility section content */
export const ELIGIBILITY_SECTION_INFO = {
  title: 'Eligibility Criteria of Personal Loan',
  description:
    'Eligibility criteria for a personal loan may vary from lender to lender, but these are some basic requirements.',
};

/** Documents section content */
export const DOCUMENTS_SECTION_INFO = {
  title: 'Documents You Will Need',
  description:
    'The exact documents required depend on the lender. Here is what most banks and NBFCs on TrustFin commonly ask for.',
  closing:
    "Once you are matched with a lender, TrustFin's AI will tell you the specific documents that lender requires so there are no surprises at the application stage.",
} as const;

/** EMI Calculator configuration */
export const EMI_CALCULATOR_CONFIG = {
  loanAmount: {
    min: 5000,
    max: 1500000,
    step: 5000,
    default: 25000,
  },
  tenure: {
    minMonths: 1,
    maxMonths: 288, // 24 years
    default: 4,
  },
  interestRate: {
    min: 8,
    max: 30,
    step: 0.5,
    default: 10.5,
  },
} as const;

/** Hero stats row shown below the headline on the personal loan page */
export interface HeroStatItem {
  id: string;
  value: string;
  label: string;
}

export const HERO_STATS: HeroStatItem[] = [
  { id: 'loan-range', value: '5K-15L', label: 'Loan Range' },
  { id: 'rate', value: '9.99%', label: 'Rate From p.a.' },
  { id: 'lenders', value: '50+', label: 'Money Lenders' },
];

/** Hero section copy for the personal loan landing page */
export const HERO_COPY = {
  subtitle:
    'Stop applying blindly. Tell our AI what you need, and it will find the right personal loan from 25+ lenders in seconds.',
  primaryCta: 'Start Loan Application',
  secondaryCta: 'Talk to AI Assistant',
} as const;

/** Stats data */
export const STATS_DATA = [
  {
    id: 'disbursed',
    label: 'Total Loan Disbursed',
    value: '₹650 Crore',
  },
  {
    id: 'users',
    label: 'Trusted by',
    value: '4 Lakh+ Indians',
  },
];

/** Video section configuration */
export const VIDEO_CONFIG = {
  thumbnailUrl: '/assets/images/personal-loan-video-thumbnail.jpg',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  title: 'How WeCredit Works',
  fallbackThumbnail: '/assets/images/personal-loan-illustration.png',
};

/** Fee and charge item configuration */
export interface FeeChargeItem {
  id: string;
  label: string;
  value: string;
}

/** Fees and charges for personal loan */
export const FEES_AND_CHARGES: FeeChargeItem[] = [
  {
    id: 'interest-rates',
    label: 'Interest rates:',
    value: 'Starting from 9.99%',
  },
  {
    id: 'processing-fee',
    label: 'Processing fee',
    value: '0.5% to 4% of the loan amount',
  },
  {
    id: 'foreclosure-charges',
    label: 'Foreclosure charges',
    value: 'Often 1-5% of the outstanding loan amount',
  },
  {
    id: 'late-payment-charges',
    label: 'Late payment charges',
    value: 'Around 2% per month on overdue EMIs',
  },
  {
    id: 'emi-bounce-charges',
    label: 'EMI bounce charges',
    value: '₹300 to ₹1,500 per bounce depending on policy',
  },
  {
    id: 'loan-cancellation',
    label: 'Loan Cancellation',
    value: 'Nil to ₹1,000 (post-sanction)',
  },
  {
    id: 'statement-fees',
    label: 'Statement Fees',
    value: '₹100 to ₹500 per request',
  },
];

/** Feature bullet used in the "Why Customers Choose TrustFin" accordion panel */
export interface TrustFinFeatureItem {
  id: string;
  title: string;
  description: string;
}

/** Exact copy for the "Why Customers Choose TrustFin" accordion panel */
export const WHY_TRUSTFIN_ACCORDION_FEATURES: TrustFinFeatureItem[] = [
  {
    id: 'matched-offers',
    title: 'Matched offers, not a random list',
    description:
      'Every offer you see on TrustFin is filtered by the AI based on your profile. This means higher approval chances and less time wasted on lenders who would reject you anyway.',
  },
  {
    id: 'one-platform',
    title: 'One platform, 25+ lenders',
    description:
      'Compare personal loans from top banks and NBFCs in one place without visiting multiple websites or filling out multiple forms.',
  },
  {
    id: 'fewer-enquiries',
    title: 'Fewer credit enquiries',
    description:
      'TrustFin checks your eligibility internally before forwarding your application to a lender. This reduces the number of hard enquiries on your credit report.',
  },
  {
    id: 'transparent-comparison',
    title: 'Transparent cost comparison',
    description:
      'See interest rates, processing fees, and disbursal timelines side by side. No hidden surprises.',
  },
  {
    id: 'ai-support',
    title: 'AI support around the clock',
    description:
      "Get answers to any loan question at any time. TrustFin's AI is always on.",
  },
];

/** Exact copy for the "Things to Know Before You Apply" accordion panel */
export const BEFORE_APPLYING_ACCORDION_FEATURES: TrustFinFeatureItem[] = [
  {
    id: 'credit-score-rate',
    title: 'Your credit score influences your rate, not just your approval',
    description:
      "A strong credit score does not just help you get approved. It can significantly lower the interest rate you are offered. If your score is below 720, it is worth improving it before applying. TrustFin's AI can tell you which lenders are still accessible at your current score.",
  },
  {
    id: 'lender-fit',
    title: 'Not every lender is right for every borrower',
    description:
      'A bank that approves one person may reject another with a similar profile, because each lender has different weightages for income, employer type, location, and credit history. This is exactly why AI-based matching exists.',
  },
  {
    id: 'total-cost',
    title: 'The interest rate is not the only cost',
    description:
      'A loan at 12% with a 3% processing fee can cost more than a loan at 13% with no processing fee over a short tenure. Always evaluate the total cost before deciding.',
  },
  {
    id: 'platform-comparison',
    title: 'Comparing on one platform protects your credit score',
    description:
      'Every time you apply directly to a lender, it triggers a hard enquiry. Multiple enquiries in a short period signal credit-hungry behaviour to bureaus. Using TrustFin reduces this risk significantly.',
  },
  {
    id: 'repayment-track-record',
    title: 'Your repayment track record follows you',
    description:
      'EMI payments are reported to credit bureaus every month. A single missed payment can take months to recover from. Borrow an amount whose EMI you can comfortably pay every month without strain.',
  },
];

/** Intro line for the "After Your Loan Is Closed" accordion panel */
export const AFTER_LOAN_CLOSED_ACCORDION_INTRO =
  'Paying off your loan is a win. Here is what to do next to protect that win.';

/** Exact copy for the "After Your Loan Is Closed" accordion panel */
export const AFTER_LOAN_CLOSED_ACCORDION_FEATURES: TrustFinFeatureItem[] = [
  {
    id: 'confirm-closure',
    title: 'Get official confirmation of closure',
    description:
      'Do not assume the loan is closed after the last EMI. Confirm with the lender in writing that the account has been marked as closed.',
  },
  {
    id: 'collect-noc',
    title: 'Collect the NOC and closure letter',
    description:
      'The No Objection Certificate is proof that the lender has no further claim against you. Keep it permanently.',
  },
  {
    id: 'verify-credit-report',
    title: 'Verify your credit report',
    description:
      'Check all four bureaus (CIBIL, Experian, CRIF, Equifax) to confirm the loan status shows as "Closed." Discrepancies can affect your next loan application and are easier to fix sooner rather than later.',
  },
  {
    id: 'cancel-auto-debit',
    title: 'Cancel the auto-debit instruction',
    description:
      'Revoke the NACH mandate from your bank so no further deductions are triggered by mistake.',
  },
  {
    id: 'wait-before-new-loan',
    title: 'Wait before taking a new loan',
    description:
      'Give your credit profile a short recovery window before applying for the next loan. This keeps your utilization and enquiry count healthy.',
  },
  {
    id: 'archive-documents',
    title: 'Archive your documents',
    description:
      'Save your loan agreement, all payment receipts, and the closure documents both digitally and in hard copy for future reference.',
  },
];

/** Personal loan info accordion panel types (keeps accordion extensible). */
export type PersonalLoanInfoAccordionPanel =
  | { type: 'text'; paragraphs: readonly string[] }
  | { type: 'fees-table'; rows: FeeChargeItem[] }
  | { type: 'feature-list'; items: TrustFinFeatureItem[]; intro?: string; closing?: string };

export interface PersonalLoanInfoAccordionItem {
  id: string;
  title: string;
  panel: PersonalLoanInfoAccordionPanel;
}

/** Items shown inside the "Personal Loan Info" accordion section. */
export const PERSONAL_LOAN_INFO_ACCORDION_ITEMS: PersonalLoanInfoAccordionItem[] =
  [
    {
      id: 'interest-rates',
      title: 'Interest Rates',
      panel: { type: 'text', paragraphs: INTEREST_RATES_INFO.accordionParagraphs },
    },
    {
      id: 'fees-and-charges',
      title: 'Fees and Charges',
      panel: { type: 'fees-table', rows: FEES_AND_CHARGES },
    },
    {
      id: 'why-trustfin',
      title: 'Why Customers Choose TrustFin',
      panel: { type: 'feature-list', items: WHY_TRUSTFIN_ACCORDION_FEATURES },
    },
    {
      id: 'before-applying',
      title: 'Things to Know Before You Apply',
      panel: { type: 'feature-list', items: BEFORE_APPLYING_ACCORDION_FEATURES },
    },
    {
      id: 'after-loan-closed',
      title: 'After Your Loan Is Closed',
      panel: {
        type: 'feature-list',
        intro: AFTER_LOAN_CLOSED_ACCORDION_INTRO,
        items: AFTER_LOAN_CLOSED_ACCORDION_FEATURES,
      },
    },
  ];

/** Interest Rates and Fees and Charges panels open on initial page load */
export const PERSONAL_LOAN_INFO_ACCORDION_DEFAULT_OPEN: string[] =
  PERSONAL_LOAN_INFO_ACCORDION_ITEMS.slice(0, 2).map((item) => item.id);

/** Fees and charges section content */
export const FEES_CHARGES_INFO = {
  title: 'Fees and charges',
  description:
    'Personal loan fees and charges vary based on lender and bank policies. The information below explains the charges generally applicable.',
};

/** How we work section content */
export const HOW_WE_WORK_INFO = {
  title: 'How We Work',
  description:
    'When an application is submitted, our PL engine reviews the provided details such as basic information, income, and credit profile. Based on the given information, eligible lenders are matched according to their criteria. The engine then shows suitable personal loan offers available for the profile, making it easier to compare and proceed with the most relevant option.',
};

/** Tip card item configuration */
export interface TipCardItem {
  id: string;
  title: string;
  description: string;
}

/** Tips to know before applying for a personal loan */
export const BEFORE_APPLYING_TIPS: TipCardItem[] = [
  {
    id: 'credit-score-impact',
    title: 'Credit Score Impact on Loan Approval and Interest Rate',
    description:
      'A higher credit score improves approval chances and may help get a lower interest rate. A low credit score can lead to higher rates or even rejection.',
  },
  {
    id: 'eligibility-varies',
    title: 'Personal Loan Eligibility Varies Across Lenders',
    description:
      'Each bank or NBFC has its own eligibility rules based on factors like income, employment type, and location.',
  },
  {
    id: 'fees-increase-cost',
    title: 'Fees and Charges Increase the Total Loan Cost',
    description:
      'Charges such as processing fees, prepayment charges, and late payment penalties add to the overall cost of the loan. These should be checked along with the interest rate.',
  },
  {
    id: 'multiple-applications',
    title: 'Multiple Loan Applications Can Affect Credit Score',
    description:
      'Applying to many lenders separately can result in multiple credit checks, which may impact the credit score. Comparing offers on one platform can help reduce this.',
  },
  {
    id: 'emi-payment-history',
    title: 'EMI Payment History Affects Future Loan Eligibility',
    description:
      'Missing or delaying EMI payments can lower the credit score and affect eligibility for future loans or better interest rates.',
  },
];

/** Before applying section content */
export const BEFORE_APPLYING_INFO = {
  title: 'Things to Know Before Applying',
};

/** Checklist item configuration */
export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
}

/** Things to do after loan closure */
export const AFTER_CLOSURE_CHECKLIST: ChecklistItem[] = [
  {
    id: 'confirm-closure',
    title: 'Confirm loan closure',
    description: 'Ensure the lender has officially marked the loan as closed after the final EMI.',
  },
  {
    id: 'collect-noc',
    title: 'Collect loan closure letter and NOC',
    description: 'These documents confirm that there are no pending dues on the loan.',
  },
  {
    id: 'check-credit-report',
    title: 'Check credit report status',
    description:
      'Verify that the loan shows as "closed" in the credit report to avoid issues in future applications.',
  },
  {
    id: 'avoid-new-loans',
    title: 'Avoid new loans instantly',
    description:
      'Allow some time after loan closure before applying for a new loan to keep the credit profile stable.',
  },
  {
    id: 'stop-auto-debit',
    title: 'Stop EMI auto-debit',
    description: 'Cancel the EMI auto-debit mandate to prevent any unintended deductions.',
  },
  {
    id: 'save-documents',
    title: 'Save all loan documents',
    description:
      'Keep loan agreements, payment receipts, and closure documents for future reference.',
  },
];

/** After closure section content */
export const AFTER_CLOSURE_INFO = {
  title: 'Things to Do After Loan Closure',
};

/** Expert quote configuration */
export interface ExpertQuote {
  quote: string;
  name: string;
  designation: string;
  imageUrl: string;
}

/** Expert testimonial quote */
export const EXPERT_QUOTE: ExpertQuote = {
  quote:
    "A personal loan is not just a transaction. It is a moment in someone's life, a medical bill that could not wait, a dream that needed a push, or a gap that needed filling. When we started WeCredit, we wanted to make sure that moment felt simple, fair, and judgment-free. That has not changed, and it never will.",
  name: 'Laksh Dua',
  designation: 'Co - Founder',
  imageUrl:IMAGES.DIRECT_CONTACT_EXPERTS.LAKASH,
};

/** Expert quote section content */
export const EXPERT_QUOTE_INFO = {
  title: 'Direct from Expert',
};

/** A single AI feature card item shown in the "Matched by AI" 2x2 grid */
export interface AiFeatureItem {
  id: string;
  text: string;
}

/** Feature cards listed under "What the AI handles for you" */
export const AI_MATCHED_FEATURES: AiFeatureItem[] = [
  {
    id: 'eligibility-matching',
    text: 'Eligibility matching across 25+ lenders before you apply.',
  },
  {
    id: 'offer-ranking',
    text: 'Ranking of offers by interest rate, fees, disbursal speed, and approval likelihood.',
  },
  {
    id: 'reduce-enquiries',
    text: 'Reduction of hard credit enquiries by filtering out unsuitable lenders upfront.',
  },
  {
    id: 'realtime-answers',
    text: 'Real-time answers to any question you have about loans, eligibility, or repayment.',
  },
];

/**
 * Copy for the "Personal Loans, Matched by AI" section.
 * Intro paragraph is split so the middle sentence can be emphasised in the UI
 * without coupling layout to constants.
 */
export const AI_MATCHED_SECTION = {
  titleLead: 'Personal Loans,',
  titleHighlight: 'Matched by AI',
  intro: {
    lead: 'Finding a personal loan should not feel like a lottery. At TrustFin.ai, our AI reads your profile and matches you with lenders who are actually likely to approve you, before you even apply.',
    emphasis:
      'Borrow from ₹5,000 to ₹15 lakh at interest rates starting from 9.99% p.a.* with tenure options from 6 months to 5 years.',
    closing: 'No collateral. No multiple applications. No wasted credit enquiries.',
  },
  difference: {
    title: 'What Makes TrustFin Different',
    paragraphs: [
      'Most loan platforms show you a list and leave you to figure out the rest. TrustFin works differently.',
      'Our AI loan engine does not just display offers. It actively analyses your income, employment type, credit score, and loan requirement, then cross-checks your profile against the eligibility rules of 25+ banks and NBFCs in real time. What you see on TrustFin are offers you actually qualify for, ranked by the factors that matter most to you.',
    ],
    featuresTitle: 'What the AI handles for you',
  },
  advisor: {
    title: 'Got a Loan Question? Ask the AI',
    paragraphs: [
      "TrustFin's AI assistant is not just a matching engine. It is also your personal loan advisor, available around the clock.",
      'Whether you are a first-time borrower or comparing your third loan, the AI gives you straight answers in plain language without the sales pitch.',
    ],
    questionsTitle: 'Some things borrowers ask:',
    closing:
      'You get an instant, personalised response. And if you are ready to move forward, the AI guides you through the application right away.',
    ctaLabel: 'Ask AI',
  },
} as const;

/** A single suggested question shown in the "Some things borrowers ask" list */
export interface BorrowerQuestionItem {
  id: string;
  question: string;
}

/** Suggested prompts surfaced in the advisor block — keep short and conversational */
export const AI_BORROWER_QUESTIONS: BorrowerQuestionItem[] = [
  {
    id: 'salary-loan',
    question: 'How much loan can I get with a ₹25,000 salary?',
  },
  {
    id: 'cibil-690',
    question: 'I have a 690 CIBIL score. Which lenders will approve me?',
  },
  {
    id: 'self-employed-no-itr',
    question: 'I am self-employed without ITR. What are my options?',
  },
  {
    id: 'emi-2-lakh',
    question: 'What will my EMI be for ₹2 lakh over 2 years?',
  },
  {
    id: 'credit-score-impact',
    question: 'If I apply today, will it affect my credit score?',
  },
];

/**
 * Shared copy for AI chat CTAs across pages. Kept centralised so the home
 * hero, personal loan hero, and matched-by-ai section stay aligned.
 */
export const AI_CTA_COPY = {
  defaultLabel: 'Chat with TrustFin AI',
  heroSecondaryLabel: 'Talk to AI Assistant',
  askAiLabel: 'Ask AI',
} as const;
