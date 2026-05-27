/**
 * Gold Loan Landing Page Constants
 * Copy sourced from the gold loan content doc.
 */

import type {
  BorrowerQuestionItem,
  DocumentItem,
  HeroStatItem,
  PersonalLoanInfoAccordionItem,
  StepItem,
} from '@/components/personal-loan/constants';

export const GOLD_LOAN_APPLY_PATH = '/gold-loan/apply' as const;

export const GOLD_EMI_CALCULATOR_ID = 'gold-loan-emi-calculator';

/** Hero section copy */
export const GOLD_HERO_COPY = {
  productLabel: 'Gold Loan',
  subtitle:
    'Your gold is an asset. Put it to work. Get a loan against your gold jewellery or ornaments from trusted NBFCs, with quick disbursal and no income proof required.',
  primaryCta: 'Get Gold Loan Offers',
  secondaryCta: 'Talk to Our AI Assistant',
} as const;

export const GOLD_HERO_STATS: HeroStatItem[] = [
  { id: 'loan-amount', value: 'Up to ₹20L', label: 'Loan Amount' },
  { id: 'ltv', value: '75% LTV', label: 'RBI Max LTV' },
  { id: 'disbursal', value: 'Same Day', label: 'Disbursal' },
];

/** EMI calculator defaults for gold loans */
export const GOLD_EMI_CALCULATOR_CONFIG = {
  loanAmount: {
    min: 10000,
    max: 2000000,
    step: 10000,
    default: 100000,
  },
  tenure: {
    minMonths: 3,
    maxMonths: 36,
    default: 12,
  },
  interestRate: {
    min: 9,
    max: 24,
    step: 0.5,
    default: 12,
  },
} as const;

/** Prose section config shape */
export interface GoldProseSectionConfig {
  id: string;
  title: string;
  intro?: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  bulletsTitle?: string;
  /** Feature-list style items with title + description */
  features?: readonly GoldBenefitItem[];
  footerNote?: string;
}

export interface GoldBenefitItem {
  id: string;
  title: string;
  description: string;
}

/** Data table config */
export interface GoldTableRow {
  id: string;
  label: string;
  value: string;
}

export interface GoldMultiColumnTableRow {
  id: string;
  cells: readonly string[];
}

export interface GoldDataTableSectionConfig {
  id: string;
  title: string;
  intro?: string;
  rows: readonly GoldTableRow[];
  footerNote?: string;
}

export const GOLD_BORROW_SMARTER_SECTION: GoldProseSectionConfig = {
  id: 'borrow-smarter',
  title: 'Borrow Against Your Gold, the Smarter Way',
  paragraphs: [
    'A gold loan is one of the fastest and most accessible ways to arrange funds in India. No lengthy paperwork. No income verification. No credit score barrier. If you have gold jewellery or ornaments, you can unlock their value within hours.',
    'At TrustFin.ai, we connect you with leading gold loan NBFCs including Muthoot Finance, Manappuram Finance, and other trusted lenders. Borrow up to ₹20 lakh against your gold, compare offers side by side, and choose the one that suits your repayment preference. Our AI helps you understand exactly how much you can borrow, what the charges are, and which lender offers the best value for your gold.',
  ],
};

export const GOLD_WHAT_IS_SECTION: GoldProseSectionConfig = {
  id: 'what-is-gold-loan',
  title: 'What Is a Gold Loan and How Does It Work?',
  paragraphs: [
    'A gold loan is a secured loan where you pledge your gold jewellery or ornaments with a lender as collateral. The lender assesses the purity and weight of your gold, determines its current market value, and offers you a loan based on a percentage of that value known as the Loan to Value ratio or LTV.',
    'Once you repay the loan in full along with interest and applicable charges, your gold is returned to you. If you default, the lender has the right to auction the gold to recover the outstanding amount.',
  ],
  bulletsTitle: 'Key characteristics of a gold loan:',
  bullets: [
    'No income proof or ITR required in most cases',
    'No credit score requirement for most NBFCs',
    'Loan amount based on gold value, not salary or business turnover',
    'Disbursal often within the same day or within a few hours',
    'Flexible repayment options including bullet repayment, EMI, and overdraft style',
  ],
};

export const GOLD_HOW_TRUSTFIN_HELPS_SECTION: GoldProseSectionConfig = {
  id: 'how-trustfin-helps',
  title: 'How TrustFin Helps You Get the Best Gold Loan',
  paragraphs: [
    'The value you get from a gold loan depends on three things: the LTV offered, the interest rate charged, and the safety of your gold while it is in the lender\'s custody. These vary significantly across lenders, and most borrowers do not compare before walking into the nearest branch.',
    'TrustFin\'s AI changes that. Before you step out of your home, you can compare offers from multiple gold loan NBFCs on our platform, understand the estimated loan amount for your gold, and identify the lender offering the best combination of LTV, rate, and terms.',
  ],
  bulletsTitle: 'What TrustFin\'s AI does for you:',
  bullets: [
    'Estimates your eligible loan amount based on gold weight and purity inputs',
    'Compares LTV ratios, interest rates, and fees across lenders',
    'Explains repayment options available with each lender',
    'Answers any question you have about gold loan terms, safety of pledged gold, or auction policies',
  ],
};

export const GOLD_ASK_AI_SECTION = {
  title: 'Ask the AI Before You Visit the Branch',
  paragraphs: [
    'Gold loans typically require a branch visit to get the gold assessed. But before you go, TrustFin\'s AI can answer every question you have so you walk in fully prepared.',
  ],
  questionsTitle: 'Borrowers commonly ask:',
  closing:
    'Get a direct, clear answer from the AI before you decide where to apply.',
  ctaLabel: 'Ask AI',
} as const;

export const GOLD_AI_BORROWER_QUESTIONS: BorrowerQuestionItem[] = [
  {
    id: 'gl-q-20g-22k',
    question: 'How much loan will I get for 20 grams of 22-carat gold?',
  },
  {
    id: 'gl-q-ltv-rbi',
    question: 'What is the current gold loan LTV allowed by RBI?',
  },
  {
    id: 'gl-q-highest-per-gram',
    question: 'Which NBFC gives the highest loan amount per gram?',
  },
  {
    id: 'gl-q-bullet-vs-emi',
    question: 'Is bullet repayment better than EMI for a gold loan?',
  },
  {
    id: 'gl-q-cannot-repay',
    question: 'What happens to my gold if I cannot repay?',
  },
  {
    id: 'gl-q-other-loans',
    question: 'Can I take a gold loan if I already have other loans?',
  },
  {
    id: 'gl-q-early-prepay',
    question: 'Is there a penalty for repaying early?',
  },
];

export const GOLD_HOW_TO_APPLY_SECTION = {
  title: 'How to Apply for a Gold Loan on TrustFin',
} as const;

export const GOLD_HOW_TO_APPLY_STEPS: StepItem[] = [
  {
    id: 'gl-step-1',
    number: 1,
    title: 'Step 1:',
    description:
      'Verify your mobile number Enter your mobile number and confirm with OTP.',
  },
  {
    id: 'gl-step-2',
    number: 2,
    title: 'Step 2:',
    description:
      'Enter your gold details Share the approximate weight and purity of your gold and your loan requirement. TrustFin\'s AI estimates your eligible loan amount and shows you matched lender offers.',
  },
  {
    id: 'gl-step-3',
    number: 3,
    title: 'Step 3:',
    description:
      'Choose a lender and visit the branch Select the offer that works best for you. Visit the chosen lender\'s nearest branch with your gold and KYC documents. Gold assessment, final loan sanction, and disbursal happen at the branch.',
  },
];

export const GOLD_LOAN_AMOUNT_SECTION = {
  title: 'How Much Loan Can You Get Against Your Gold?',
  intro:
    'The loan amount depends on three factors: the weight of your gold, its purity in carats, and the current market price of gold. The RBI has set a maximum LTV of 75% for gold loans, meaning lenders can offer up to 75% of the assessed value of your gold.',
  tableTitle: 'Illustrative example:',
  footerNote:
    'Values are illustrative and based on approximate gold prices. Actual loan amount depends on the lender\'s valuation at the time of assessment.',
  calculatorNote:
    'Use TrustFin\'s gold loan calculator to get a more accurate estimate based on current gold prices.',
  ctaLabel: 'Calculate My Gold Loan Amount',
} as const;

export const GOLD_LTV_ILLUSTRATION_TABLE = {
  headers: ['Gold Weight', 'Purity', 'Approx. Value at ₹7,000/gram', 'Max Loan (75% LTV)'],
  rows: [
    { id: 'ltv-10g', cells: ['10 grams', '22 carat', '₹64,167', '₹48,125'] },
    { id: 'ltv-20g', cells: ['20 grams', '22 carat', '₹1,28,333', '₹96,250'] },
    { id: 'ltv-50g', cells: ['50 grams', '22 carat', '₹3,20,833', '₹2,40,625'] },
    { id: 'ltv-100g', cells: ['100 grams', '22 carat', '₹6,41,667', '₹4,81,250'] },
  ] as GoldMultiColumnTableRow[],
};

export const GOLD_ELIGIBILITY_SECTION = {
  title: 'Eligibility Criteria for a Gold Loan',
  intro:
    'Gold loans have the most relaxed eligibility requirements of any loan product. Here is what most NBFCs on TrustFin require.',
  footerNote:
    'Gold coins minted by banks are accepted by some lenders. Gold bars, biscuits, and exchange-traded gold are generally not accepted.',
} as const;

export const GOLD_ELIGIBILITY_TABLE_ROWS: GoldTableRow[] = [
  { id: 'age', label: 'Age', value: '18 to 70 years' },
  { id: 'purity', label: 'Gold Purity', value: 'Minimum 18 carat (22 carat preferred)' },
  {
    id: 'gold-type',
    label: 'Gold Type',
    value: 'Jewellery and ornaments (coins accepted by select lenders)',
  },
  { id: 'income', label: 'Income Proof', value: 'Not required by most NBFCs' },
  {
    id: 'credit-score',
    label: 'Credit Score',
    value: 'Not a barrier for most gold loan NBFCs',
  },
  { id: 'kyc', label: 'KYC Documents', value: 'Mandatory for all lenders' },
];

export const GOLD_DOCUMENTS_SECTION = {
  title: 'Documents Required for a Gold Loan',
  intro:
    'Gold loans require minimal documentation compared to other loan types.',
  closing:
    'No salary slips, bank statements, ITR, or income documents are required for standard gold loans.',
} as const;

export const GOLD_STANDARD_KYC_DOCUMENTS: DocumentItem[] = [
  {
    id: 'identity',
    title: 'Identity Proof:',
    description: 'Aadhaar, PAN, Passport, or Voter ID',
  },
  {
    id: 'address',
    title: 'Address Proof:',
    description: 'Aadhaar, Utility bill, Passport, or Rent Agreement',
  },
  {
    id: 'photos',
    title: 'Passport size photographs',
    description: '',
  },
];

export const GOLD_ADDITIONAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'agricultural',
    title: 'For agricultural gold loans:',
    description: 'Land ownership documents or Kisan credit card',
  },
  {
    id: 'business',
    title: 'For business gold loans:',
    description: 'Basic business registration proof',
  },
];

export const GOLD_REPAYMENT_OPTIONS_SECTION: GoldProseSectionConfig = {
  id: 'repayment-options',
  title: 'Repayment Options for Gold Loans',
  intro:
    'Gold loans offer more flexible repayment structures compared to personal or business loans. Understanding these options helps you choose the one that matches your cash flow.',
  features: [
    {
      id: 'emi',
      title: 'EMI Based Repayment',
      description:
        'Pay fixed monthly instalments covering both principal and interest over the chosen tenure. Suitable if you have a regular monthly income.',
    },
    {
      id: 'bullet',
      title: 'Bullet Repayment',
      description:
        'Pay only interest during the loan tenure and repay the entire principal at the end. Suitable if you expect a lump sum amount at a future date such as a business payment, crop income, or investment maturity.',
    },
    {
      id: 'overdraft',
      title: 'Overdraft or Flexi Repayment',
      description:
        'Some NBFCs offer a revolving gold loan facility where you can withdraw and repay within your sanctioned limit. Interest is charged only on the amount utilised. Suitable for working capital or irregular fund requirements.',
    },
    {
      id: 'partial',
      title: 'Partial Repayment',
      description:
        'Many lenders allow you to repay in parts and release a proportionate portion of your pledged gold as you repay.',
    },
  ],
  footerNote:
    'Ask TrustFin\'s AI which repayment option is most cost-effective for your specific requirement and tenure.',
};

export const GOLD_FEES_SECTION: GoldDataTableSectionConfig = {
  id: 'interest-rates-fees',
  title: 'Interest Rates and Fees',
  intro:
    'Gold loan interest rates and charges vary across NBFCs on TrustFin. The table below provides general indicative ranges.',
  rows: [
    {
      id: 'interest-rate',
      label: 'Interest Rate',
      value: '9% to 24% p.a. (varies by lender, tenure, and LTV)',
    },
    {
      id: 'processing-fee',
      label: 'Processing Fee',
      value: 'Nil to 1% of loan amount',
    },
    {
      id: 'valuation',
      label: 'Valuation / Appraisal Fee',
      value: 'Nil to ₹500 (varies by lender)',
    },
    {
      id: 'prepayment',
      label: 'Prepayment Charges',
      value: 'Nil to 2% (many NBFCs offer nil prepayment on gold loans)',
    },
    {
      id: 'auction',
      label: 'Auction Notice Charges',
      value: 'Applicable if account becomes overdue',
    },
    {
      id: 'storage',
      label: 'Storage / Safe Custody Fee',
      value: 'Usually included in interest rate',
    },
  ],
  footerNote:
    'Gold loan interest rates are often negotiable for higher loan amounts or existing customers. Ask TrustFin\'s AI to help you identify the most cost-effective offer for your requirement.',
};

export const GOLD_SAFETY_SECTION: GoldProseSectionConfig = {
  id: 'safety-of-gold',
  title: 'Safety of Your Gold',
  intro:
    'Understandably, the safety of pledged gold is a primary concern for most borrowers. Here is what you should know.',
  paragraphs: [
    'All NBFCs on TrustFin are regulated by the Reserve Bank of India and are required to store pledged gold in secure vaults with adequate insurance cover. Your gold is kept in sealed packets bearing your loan account details and can only be released upon full repayment or by your written authorisation.',
  ],
  bulletsTitle: 'What to check before pledging your gold:',
  bullets: [
    'Confirm the lender holds a valid NBFC licence issued by RBI',
    'Ask for a gold custody receipt at the time of pledging',
    'Verify the insurance coverage on stored gold',
    'Understand the auction policy and notice period in case of default',
  ],
  footerNote:
    'TrustFin only partners with RBI-regulated NBFCs for gold loans, so you can be confident that your gold is in safe, compliant hands.',
};

export const GOLD_WHY_CHOOSE_SECTION = {
  title: 'Why Choose TrustFin for Your Gold Loan',
} as const;

export const GOLD_WHY_CHOOSE_ITEMS: GoldBenefitItem[] = [
  {
    id: 'compare-before-visit',
    title: 'Compare before you visit the branch',
    description:
      'Most borrowers walk into the nearest gold loan branch without comparing. TrustFin lets you evaluate offers from multiple NBFCs from home, so you arrive at the branch already knowing what to expect.',
  },
  {
    id: 'ai-estimate',
    title: 'AI-estimated loan amount upfront',
    description:
      'Enter your gold details and get an estimated loan amount before you step out. No surprises at the counter.',
  },
  {
    id: 'trusted-partners',
    title: 'Trusted NBFC partners only',
    description:
      'TrustFin connects you only with RBI-regulated gold loan NBFCs with established track records in gold custody and customer service.',
  },
  {
    id: 'no-barrier',
    title: 'No income or credit score barrier',
    description:
      'Gold loans are accessible to salaried individuals, self-employed professionals, farmers, homemakers, and anyone with eligible gold jewellery, regardless of credit history.',
  },
  {
    id: 'repayment-guidance',
    title: 'Guidance on repayment structure',
    description:
      'TrustFin\'s AI helps you choose the repayment option that minimises your interest cost based on your specific financial situation.',
  },
];

export const GOLD_THINGS_TO_KNOW_SECTION: GoldProseSectionConfig = {
  id: 'things-to-know',
  title: 'Things to Know Before Pledging Your Gold',
  features: [
    {
      id: 'jewellery-only',
      title: 'Only jewellery and ornaments are accepted',
      description:
        'Most gold loan NBFCs accept only physical gold jewellery and ornaments. Gold ETFs, digital gold, sovereign gold bonds, and gold bars are generally not accepted as collateral.',
    },
    {
      id: 'purity',
      title: 'Purity determines your loan amount',
      description:
        'The higher the carat, the higher the loan amount. 22 carat gold gets a better valuation than 18 carat. Mixed or studded jewellery may be valued lower due to the weight of non-gold components like stones.',
    },
    {
      id: 'ltv-cap',
      title: 'The LTV cap is set by the RBI',
      description:
        'The Reserve Bank of India has capped the maximum LTV for gold loans at 75%. No lender can legally offer more than 75% of your gold\'s assessed value as a loan, regardless of the advertised offer.',
    },
    {
      id: 'auction',
      title: 'Understand the auction clause before signing',
      description:
        'If you default on repayment and do not respond to notices within the stipulated period, the lender has the right to auction your gold to recover dues. Understand the notice period and auction timeline in your loan agreement.',
    },
    {
      id: 'prepayment',
      title: 'Prepayment is usually low cost or free',
      description:
        'Unlike personal or business loans, most gold loan NBFCs charge minimal or no prepayment fees. This makes gold loans a good option if you expect to repay early.',
    },
    {
      id: 'renewal',
      title: 'Renewal is an option',
      description:
        'If you are unable to repay at the end of your tenure, many NBFCs allow loan renewal against the same gold after paying the accrued interest. This is better than allowing the account to become overdue.',
    },
  ],
};

export const GOLD_AFTER_REPAY_SECTION: GoldProseSectionConfig = {
  id: 'after-repay',
  title: 'After You Repay Your Gold Loan',
  features: [
    {
      id: 'repay-full',
      title: 'Repay the full outstanding amount',
      description:
        'Ensure principal, interest, and any applicable charges are fully cleared before visiting the branch for gold retrieval.',
    },
    {
      id: 'collect-gold',
      title: 'Collect your gold in person',
      description:
        'Visit the branch with your original loan documents, gold custody receipt, and identity proof. Most NBFCs require the borrower to be physically present for gold release.',
    },
    {
      id: 'inspect-gold',
      title: 'Inspect your gold before leaving the branch',
      description:
        'Check the weight and condition of your returned gold at the branch counter before signing the release acknowledgement.',
    },
    {
      id: 'closure-cert',
      title: 'Obtain a loan closure certificate',
      description:
        'Collect written confirmation from the lender that the loan is fully repaid and closed with no outstanding dues.',
    },
    {
      id: 'credit-report',
      title: 'Verify your credit report',
      description:
        'Although gold loans do not always impact credit scores significantly, confirm the loan shows as "Closed" on your credit report to keep your profile clean.',
    },
    {
      id: 'store-safely',
      title: 'Store gold safely after retrieval',
      description:
        'Consider storing high-value gold in a bank locker rather than at home after retrieval.',
    },
  ],
};

export const GOLD_LOAN_DISCLAIMER =
  'Loan amounts, interest rates, and LTV ratios are indicative and subject to the lender\'s assessment at the time of application. Gold valuation is conducted by the lender at the branch and may differ from market prices. TrustFin.ai is a product of Cleartrust Fintech Services Private Limited. We operate as a loan marketplace intermediary and are not a lender. Gold loans are subject to the policies of the respective lending partner and RBI guidelines.';

/** Info accordion items for repayment, fees, safety, why choose, and post-loan sections */
export const GOLD_LOAN_INFO_ACCORDION_ITEMS: PersonalLoanInfoAccordionItem[] = [
  {
    id: 'repayment-options',
    title: GOLD_REPAYMENT_OPTIONS_SECTION.title,
    panel: {
      type: 'feature-list',
      intro: GOLD_REPAYMENT_OPTIONS_SECTION.intro,
      items: [...(GOLD_REPAYMENT_OPTIONS_SECTION.features ?? [])],
      closing: GOLD_REPAYMENT_OPTIONS_SECTION.footerNote,
    },
  },
  {
    id: 'interest-rates-fees',
    title: GOLD_FEES_SECTION.title,
    panel: {
      type: 'fees-table',
      intro: GOLD_FEES_SECTION.intro,
      rows: [...GOLD_FEES_SECTION.rows],
      closing: GOLD_FEES_SECTION.footerNote,
    },
  },
  {
    id: 'safety-of-gold',
    title: GOLD_SAFETY_SECTION.title,
    panel: {
      type: 'text',
      paragraphs: [
        GOLD_SAFETY_SECTION.intro ?? '',
        ...(GOLD_SAFETY_SECTION.paragraphs ?? []),
        GOLD_SAFETY_SECTION.bulletsTitle ?? '',
        ...(GOLD_SAFETY_SECTION.bullets ?? []),
        GOLD_SAFETY_SECTION.footerNote ?? '',
      ].filter(Boolean),
    },
  },
  {
    id: 'why-trustfin',
    title: GOLD_WHY_CHOOSE_SECTION.title,
    panel: {
      type: 'feature-list',
      items: [...GOLD_WHY_CHOOSE_ITEMS],
    },
  },
  {
    id: 'things-to-know',
    title: GOLD_THINGS_TO_KNOW_SECTION.title,
    panel: {
      type: 'feature-list',
      items: [...(GOLD_THINGS_TO_KNOW_SECTION.features ?? [])],
    },
  },
  {
    id: 'after-repay',
    title: GOLD_AFTER_REPAY_SECTION.title,
    panel: {
      type: 'feature-list',
      items: [...(GOLD_AFTER_REPAY_SECTION.features ?? [])],
    },
  },
];

export const GOLD_LOAN_INFO_ACCORDION_DEFAULT_OPEN: string[] =
  GOLD_LOAN_INFO_ACCORDION_ITEMS.slice(0, 2).map((item) => item.id);

/** Placeholder until a gold loan video URL is provided */
export const GOLD_VIDEO_CONFIG = {
  thumbnailUrl: '/assets/images/personal-loan-video-thumbnail.jpg',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  title: 'How TrustFin Gold Loans Work',
  fallbackThumbnail: '/assets/images/personal-loan-illustration.png',
};
