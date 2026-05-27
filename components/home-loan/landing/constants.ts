/**
 * Home Loan Landing Page Constants
 * Copy sourced from the home loan content doc.
 */

import {
  ELIGIBILITY_ICON_PLACEHOLDER,
  type DocumentItem,
  type EligibilityItem,
  type HeroStatItem,
  type StepItem,
} from '@/components/personal-loan/constants';
import { IMAGES } from '@/lib/constants/images';

export const HOME_LOAN_APPLY_PATH = '/home-loan/apply' as const;

/** Hero section copy */
export const HOME_HERO_COPY = {
  productLabel: 'Home Loan',
  subtitle:
    'Lakhs of Indians are buying their dream home. Get your right home loan without calling 10 banks. TrustFin AI loan assistant helps you find the right loan without any confusion or paperwork hassle.',
  primaryCta: 'Start Loan Application',
  secondaryCta: 'Talk to Our AI Assistant',
} as const;

export const HOME_HERO_STATS: HeroStatItem[] = [
  { id: 'interest-rate', value: '8.35% p.a.', label: 'Starting Interest Rate' },
  { id: 'processing-fee', value: '0.50%', label: 'Processing Fee' },
  { id: 'max-tenure', value: '30 Years', label: 'Maximum Tenure' },
];

/** Benefit / feature card with title and description */
export interface HomeBenefitItem {
  id: string;
  title: string;
  description: string;
}

export const HOME_WHY_CHOOSE_SECTION = {
  title: 'Why choose TrustFin Home Loan',
} as const;

export const HOME_WHY_CHOOSE_ITEMS: HomeBenefitItem[] = [
  {
    id: 'simple-online',
    title: 'Simple online process',
    description:
      'Apply directly on the platform without visiting branches or handling paperwork.',
  },
  {
    id: 'ai-matching',
    title: 'AI-led matching',
    description:
      'Our system reviews your details and shows loan options that fit your profile, so you don\'t have to search on your own.',
  },
  {
    id: 'personalised',
    title: 'Personalised loan options',
    description:
      'Get loan options based on your profile, so you see what fits your needs.',
  },
  {
    id: 'guided-journey',
    title: 'Clear and guided journey',
    description:
      'At every step, you see what to do next. The process stays simple and easy to follow.',
  },
  {
    id: 'secure-data',
    title: 'Secure data handling',
    description:
      'Your details stay protected and used only to match you with suitable loan options.',
  },
  {
    id: 'saves-time',
    title: 'Saves time and effort',
    description:
      'Complete your application faster with a structured and guided flow on a single platform.',
  },
];

export const HOME_FEATURES_SECTION = {
  title: 'Features and benefits of TrustFin home loan',
  footerNote: 'Terms and conditions apply',
} as const;

export const HOME_FEATURES_ITEMS: HomeBenefitItem[] = [
  {
    id: 'flexible-amount',
    title: 'Flexible loan amount',
    description:
      'Get access to a loan amount that fits your home buying needs, whether small or large.',
  },
  {
    id: 'competitive-rates',
    title: 'Competitive interest rates',
    description:
      'Choose from loan options with rates designed to keep your monthly payments manageable.',
  },
  {
    id: 'fast-approval',
    title: 'Fast approval process',
    description:
      'Get updates on your application quickly so you can plan your next steps without delay.',
  },
  {
    id: 'long-tenure',
    title: 'Long repayment tenure',
    description:
      'Repay your loan over a longer period, making EMIs easier to manage.',
  },
  {
    id: 'prepayment',
    title: 'Prepayment flexibility',
    description:
      'Close your loan early or pay a part of it without extra charges, based on selected terms.',
  },
  {
    id: 'simple-application',
    title: 'Simple application process',
    description:
      'Complete your application with minimal effort through an easy and guided flow.',
  },
  {
    id: 'balance-transfer',
    title: 'Balance transfer option',
    description:
      'Switch your existing home loan to a better option and manage your payments more efficiently.',
  },
  {
    id: 'property-coverage',
    title: 'Wide property coverage',
    description:
      'Explore loan options for a range of approved properties across locations.',
  },
  {
    id: 'transparent-rates',
    title: 'Transparent rate structure',
    description:
      'Understand how your interest rate works with clear and simple terms.',
  },
];

export const HOME_ELIGIBILITY_SECTION = {
  title: 'Home Loan Eligibility criteria',
  intro: 'You can apply for a home loan if you meet the basic criteria below:',
  eligibilityHeading: 'Eligibility criteria',
  documentsHeading: 'Documents Required for a Home Loan',
  closingNote:
    'Note: This is a basic list. The final requirement may change based on your profile and loan details.',
} as const;

export const HOME_ELIGIBILITY_CRITERIA: EligibilityItem[] = [
  {
    id: 'nationality',
    title: 'Nationality:',
    requirement: 'You should be an Indian citizen living in India.',
    image: IMAGES.HOURGLASS.src,
  },
  {
    id: 'age',
    title: 'Age:',
    requirement:
      'You should fall within the age range set for home loan applicants. The upper age is considered at the time your loan ends.',
    image: IMAGES.SALARY_WAGE.src,
  },
  {
    id: 'credit-score',
    title: 'Credit score:',
    requirement:
      'A good credit score improves your chances of getting a home loan with better terms.',
    image: IMAGES.GRAPH.src,
  },
  {
    id: 'occupation',
    title: 'Occupation:',
    requirement: 'Both salaried and self-employed individuals can apply.',
    image: IMAGES.SALARY_WAGE.src,
  },
];

export const HOME_DOCUMENTS: DocumentItem[] = [
  {
    id: 'kyc',
    title: 'KYC documents:',
    description: 'Identity and address proof.',
  },
  {
    id: 'income',
    title: 'Income proof:',
    description: 'Salary slips or income details.',
  },
  {
    id: 'business',
    title: 'Business proof:',
    description: 'Required for self-employed applicants.',
  },
  {
    id: 'bank-statements',
    title: 'Bank statements:',
    description: 'Recent account statements to review your financial activity.',
  },
];

export const HOME_HOW_TO_APPLY_SECTION = {
  title: 'Steps to Apply for a TrustFin Home Loan Online',
  description: 'Apply for a home loan online in a few simple steps:',
} as const;

export const HOME_HOW_TO_APPLY_STEPS: StepItem[] = [
  {
    id: 'hl-step-1',
    number: 1,
    title: 'Step 1:',
    description:
      'Start with your mobile number and verify it with OTP. The TrustFin AI begins your application in seconds.',
  },
  {
    id: 'hl-step-2',
    number: 2,
    title: 'Step 2:',
    description:
      'The AI asks a few simple questions about your income, property, and loan need. You don\'t need to fill long forms.',
  },
  {
    id: 'hl-step-3',
    number: 3,
    title: 'Step 3:',
    description:
      'The AI reviews your answers and shows home loan options that fit your profile, so you can compare easily.',
  },
  {
    id: 'hl-step-4',
    number: 4,
    title: 'Step 4:',
    description:
      'A loan expert connects with you to guide you, clarify doubts, and help you move ahead.',
  },
  {
    id: 'hl-step-5',
    number: 5,
    title: 'Step 5:',
    description:
      'After approval, the lender processes your loan and credits the amount directly to your bank account.',
  },
];
