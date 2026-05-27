/**
 * Business Loan Landing Page Constants
 * Copy sourced from the business loan content doc.
 */

import {
  AI_CTA_COPY,
  type AiFeatureItem,
  type BorrowerQuestionItem,
  type DocumentItem,
  type EligibilityItem,
  type FeeChargeItem,
  type HeroStatItem,
  type PersonalLoanInfoAccordionItem,
  type StepItem,
  type TrustFinFeatureItem,
} from '@/components/personal-loan/constants';

/** Hero section copy */
export const BUSINESS_HERO_COPY = {
  productLabel: 'Business Loan',
  subtitle:
    'Whether you are an MSME, a startup, or a self-employed professional, TrustFin\'s AI finds the right business loan for your needs. Compare offers from 25+ lenders and apply in minutes.',
  primaryCta: 'Start Loan Application',
  secondaryCta: 'Talk to AI Assistant',
} as const;

export const BUSINESS_HERO_STATS: HeroStatItem[] = [
  { id: 'loan-range', value: '50K-60L', label: 'Loan Range' },
  { id: 'lenders', value: '25+', label: 'Trusted Lenders' },
  { id: 'collateral', value: 'No Collateral', label: 'For Most Offers' },
];

/** EMI calculator defaults for business loans */
export const BUSINESS_EMI_CALCULATOR_CONFIG = {
  loanAmount: {
    min: 50000,
    max: 6000000,
    step: 50000,
    default: 500000,
  },
  tenure: {
    minMonths: 6,
    maxMonths: 84,
    default: 36,
  },
  interestRate: {
    min: 10,
    max: 28,
    step: 0.5,
    default: 14,
  },
} as const;

export const BUSINESS_HOW_TO_APPLY_STEPS: StepItem[] = [
  {
    id: 'bl-step-1',
    number: 1,
    title: 'Step 1:',
    description:
      'Verify your mobile number Enter your registered mobile number and confirm with OTP to get started.',
  },
  {
    id: 'bl-step-2',
    number: 2,
    title: 'Step 2:',
    description:
      'Share your business details Provide basic information about your business including type, vintage, annual turnover, and loan requirement. The AI analyses your profile in real time.',
  },
  {
    id: 'bl-step-3',
    number: 3,
    title: 'Step 3:',
    description:
      'Review your matched offers and apply Compare AI-matched business loan offers from multiple lenders side by side and proceed with the offer that best fits your business needs.',
  },
];

export const BUSINESS_ELIGIBILITY_SECTION_INFO = {
  title: 'Business Loan Eligibility Criteria',
  description:
    'Eligibility requirements vary across lenders. The table below outlines the general criteria applicable to most business loans on TrustFin.',
  footer:
    "TrustFin's AI checks your eligibility across all matched lenders in one step, so you know exactly where you stand before applying.",
} as const;

export const BUSINESS_ELIGIBILITY_CRITERIA: EligibilityItem[] = [
  {
    id: 'age',
    title: 'Applicant Age:',
    requirement: '21 to 65 years',
  },
  {
    id: 'vintage',
    title: 'Business Vintage:',
    requirement: 'Minimum 1 to 3 years (varies by lender)',
  },
  {
    id: 'business-type',
    title: 'Business Type:',
    requirement:
      'Proprietorship, Partnership, Pvt. Ltd., LLP, Self-employed professionals',
  },
  {
    id: 'turnover',
    title: 'Annual Turnover:',
    requirement: '₹10 lakh and above (varies by lender)',
  },
  {
    id: 'credit-score',
    title: 'Credit Score:',
    requirement: '700 and above recommended',
  },
  {
    id: 'gst',
    title: 'GST Registration:',
    requirement: 'Required by most lenders for higher loan amounts',
  },
];

export const BUSINESS_DOCUMENTS_SECTION_INFO = {
  title: 'Documents Required for a Business Loan',
  description:
    'Documentation requirements depend on the lender and your business structure. Here is a general list of documents most lenders on TrustFin require.',
  closing:
    "Once matched, TrustFin's AI will specify exactly which documents your chosen lender requires, so there are no last-minute surprises.",
} as const;

export const BUSINESS_IDENTITY_DOCUMENTS: DocumentItem[] = [
  {
    id: 'pan',
    title: 'PAN Card:',
    description: 'PAN Card of the business owner and the business entity',
  },
  {
    id: 'identity',
    title: 'Identity Proof:',
    description: 'Aadhaar, Passport, or Voter ID of the applicant',
  },
  {
    id: 'address',
    title: 'Business Address Proof:',
    description: 'Utility bill, rental agreement, or GST certificate',
  },
];

export const BUSINESS_FINANCIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'gst-returns',
    title: 'GST Documents:',
    description: 'GST registration certificate and last 6 to 12 months\' GST returns',
  },
  {
    id: 'bank-statements',
    title: 'Bank Statements:',
    description: 'Last 6 to 12 months\' business bank statements',
  },
  {
    id: 'itr',
    title: 'Financial Statements:',
    description:
      'Last 1 to 2 years\' ITR with profit and loss statement and balance sheet (for higher loan amounts)',
  },
  {
    id: 'registration',
    title: 'Business Registration:',
    description:
      'Udyam certificate, Shop Act licence, or incorporation certificate',
  },
];

export interface BusinessDocumentGroup {
  id: string;
  title: string;
  documents: DocumentItem[];
}

/** Static document groups shown under the business loan documents section */
export const BUSINESS_DOCUMENT_GROUPS: BusinessDocumentGroup[] = [
  {
    id: 'identity-address',
    title: 'Identity and Address Proof',
    documents: BUSINESS_IDENTITY_DOCUMENTS,
  },
  {
    id: 'business-financial',
    title: 'Business and Financial Documents',
    documents: BUSINESS_FINANCIAL_DOCUMENTS,
  },
];

export const BUSINESS_AI_MATCHED_FEATURES: AiFeatureItem[] = [
  {
    id: 'profile-matching',
    text: 'Profile matching across 25+ lenders based on your business type, vintage, and financials',
  },
  {
    id: 'offer-ranking',
    text: 'Ranking of offers by interest rate, processing fee, disbursal speed, and approval likelihood',
  },
  {
    id: 'reduce-enquiries',
    text: 'Reduction of unnecessary credit enquiries by filtering out unsuitable lenders upfront',
  },
  {
    id: 'instant-answers',
    text: 'Instant answers to any question about eligibility, documentation, or loan terms',
  },
];

export const BUSINESS_AI_MATCHED_SECTION = {
  titleLead: 'Business Loans,',
  titleHighlight: 'Powered by AI',
  intro: {
    lead:
      'Access funds to grow your business without the usual hassle. TrustFin.ai matches small business owners, MSMEs, and startups with the right lenders from our network of 25+ trusted banks and NBFCs.',
    emphasis:
      'Borrow from ₹50,000 to ₹60 lakh at competitive interest rates, with flexible repayment tenures designed around your cash flow.',
    closing:
      'No collateral required for most offers. Our AI does the heavy lifting so you can focus on running your business.',
  },
  difference: {
    title: "How TrustFin's AI Works for Business Borrowers",
    paragraphs: [
      'Business loan rejections are costly. They waste time, trigger hard enquiries on your credit report, and delay your growth plans. TrustFin is built to prevent exactly that.',
      'When you submit your business details, our AI engine evaluates your business profile including revenue, vintage, GST filings, credit score, and loan requirement, and matches you with lenders whose criteria your business actually meets. You see a curated shortlist of real offers, not a generic list of every lender on the platform.',
    ],
    featuresTitle: 'What the AI handles for you:',
  },
  advisor: {
    title: 'Have a Question? Ask the AI',
    paragraphs: [
      'Business loan queries are rarely straightforward. Eligibility rules differ across lenders, documentation requirements vary by business type, and the right loan structure depends on how your business operates.',
      "TrustFin's AI advisor is available around the clock to give you clear, accurate answers without requiring you to speak to a sales representative.",
    ],
    questionsTitle: 'Business owners commonly ask:',
    closing:
      'The AI gives you a direct, informed answer. If you are ready to proceed, it takes you straight into the application.',
    ctaLabel: AI_CTA_COPY.askAiLabel,
  },
} as const;

export const BUSINESS_AI_BORROWER_QUESTIONS: BorrowerQuestionItem[] = [
  {
    id: 'vintage-18-months',
    question: 'My business is 18 months old. Can I get a loan?',
  },
  {
    id: 'no-audited-financials',
    question: 'I do not have audited financials. What are my options?',
  },
  {
    id: 'proprietorship',
    question: 'Which lenders work with proprietorship firms?',
  },
  {
    id: 'max-loan-turnover',
    question: 'What is the maximum loan I can get with a turnover of ₹40 lakh per year?',
  },
  {
    id: 'personal-credit',
    question: 'Will a business loan affect my personal credit score?',
  },
  {
    id: 'term-vs-overdraft',
    question: 'What is the difference between a term loan and an overdraft facility?',
  },
];

export const BUSINESS_FEES_AND_CHARGES: FeeChargeItem[] = [
  { id: 'interest-rate', label: 'Interest Rate:', value: 'Varies by lender and profile' },
  { id: 'processing-fee', label: 'Processing Fee:', value: '1% to 3% of loan amount' },
  {
    id: 'prepayment',
    label: 'Prepayment / Foreclosure:',
    value: '2% to 5% of outstanding amount',
  },
  {
    id: 'late-payment',
    label: 'Late Payment Charges:',
    value: 'Around 2% to 3% per month on overdue amount',
  },
  { id: 'emi-bounce', label: 'EMI Bounce Charges:', value: '₹500 to ₹2,000 per instance' },
  { id: 'cancellation', label: 'Loan Cancellation:', value: 'Nil to ₹2,000 (post-sanction)' },
  { id: 'statement', label: 'Statement Request:', value: '₹100 to ₹500 per request' },
];

const BUSINESS_WHY_TRUSTFIN_FEATURES: TrustFinFeatureItem[] = [
  {
    id: 'ai-matched',
    title: 'AI-matched offers based on your business profile',
    description:
      'TrustFin does not show you every lender on the platform. It shows you the ones whose criteria your business meets, based on your actual financials, vintage, and credit history.',
  },
  {
    id: 'one-application',
    title: 'One application, multiple lender comparisons',
    description:
      'Compare loan offers from banks, NBFCs, and fintech lenders in one place. No need to visit multiple websites or submit separate applications.',
  },
  {
    id: 'collateral-free',
    title: 'Collateral-free options available',
    description:
      'Many lenders on TrustFin offer unsecured business loans, especially for established businesses with a healthy credit profile and consistent turnover.',
  },
  {
    id: 'faster-funds',
    title: 'Faster access to funds',
    description:
      "Reduce time spent on paperwork and lender identification. TrustFin's AI streamlines the process so funds reach your account faster.",
  },
  {
    id: 'ai-guidance',
    title: 'AI guidance at every step',
    description:
      'From checking eligibility to understanding loan terms, TrustFin\'s AI is available at any hour to assist you, without any sales pressure.',
  },
];

const BUSINESS_BEFORE_APPLYING_FEATURES: TrustFinFeatureItem[] = [
  {
    id: 'vintage',
    title: 'Business vintage is a key eligibility factor',
    description:
      "Most lenders require a minimum business age of 1 to 3 years. Newer businesses may find fewer options among traditional lenders but may qualify for startup-focused NBFC products. TrustFin's AI filters lenders by vintage requirement so you are not wasting time on applications you are not eligible for.",
  },
  {
    id: 'personal-credit',
    title: 'Your personal credit score affects business loan eligibility',
    description:
      'For proprietorships and small businesses, lenders often evaluate the personal credit score of the business owner alongside business financials. A score of 700 and above is generally preferred.',
  },
  {
    id: 'gst',
    title: 'GST compliance strengthens your application',
    description:
      'Regular GST filing signals financial discipline to lenders and opens access to higher loan amounts. Inconsistent or absent GST filings can limit your options significantly.',
  },
  {
    id: 'collateral-rates',
    title: 'Collateral-free loans come with higher interest rates',
    description:
      'Unsecured business loans are convenient but typically carry higher rates than secured options. If you have a property or asset to pledge, a secured loan may reduce your overall borrowing cost considerably.',
  },
  {
    id: 'repayment-capacity',
    title: 'Loan amount should match your repayment capacity',
    description:
      "Over-borrowing strains cash flow and increases the risk of default. Use TrustFin's business loan EMI calculator to determine an EMI that fits comfortably within your monthly revenue cycle.",
  },
  {
    id: 'total-cost',
    title: 'Comparing total cost matters more than comparing rates',
    description:
      'A loan with a lower interest rate but high processing fees may cost more than one with a slightly higher rate and minimal charges. Always evaluate the total outflow over the loan tenure.',
  },
];

const BUSINESS_AFTER_CLOSURE_INTRO =
  'Paying off your business loan is a milestone. Here is what to do next to protect your business credit and records.';

const BUSINESS_AFTER_CLOSURE_FEATURES: TrustFinFeatureItem[] = [
  {
    id: 'confirm-closure',
    title: 'Obtain official closure confirmation',
    description:
      'Request written confirmation from the lender that the loan account has been closed and there are no outstanding dues.',
  },
  {
    id: 'collect-noc',
    title: 'Collect the NOC and closure letter',
    description:
      'The No Objection Certificate is an important legal document confirming the lender relinquishes any claim. Store it permanently in your business records.',
  },
  {
    id: 'verify-credit',
    title: 'Verify your credit report',
    description:
      'Confirm that the loan reflects as "Closed" across all credit bureaus including CIBIL, Experian, CRIF, and Equifax. Inaccuracies can create complications in future loan applications and are best addressed promptly.',
  },
  {
    id: 'release-collateral',
    title: 'Release any collateral',
    description:
      'If the loan was secured against property or assets, initiate the process of releasing the charge or lien with the lender and update relevant records.',
  },
  {
    id: 'cancel-mandate',
    title: 'Cancel the EMI auto-debit mandate',
    description:
      'Revoke the NACH instruction from your business bank account to prevent unintended deductions after closure.',
  },
  {
    id: 'update-records',
    title: 'Update your business financial records',
    description:
      'Record the loan closure in your books of accounts and archive all loan-related documents including the agreement, repayment history, and closure certificate for future reference and audits.',
  },
];

export interface BusinessLoanTypeItem {
  id: string;
  title: string;
  description: string;
}

export const BUSINESS_LOAN_TYPES: BusinessLoanTypeItem[] = [
  {
    id: 'term-loan',
    title: 'Term Loan',
    description:
      'A lump sum disbursed upfront and repaid in fixed EMIs over a defined tenure. Suitable for capital expenditure, equipment purchase, or business expansion.',
  },
  {
    id: 'working-capital',
    title: 'Working Capital Loan',
    description:
      'Short-term financing to cover day-to-day operational expenses such as inventory, payroll, and receivables management.',
  },
  {
    id: 'overdraft',
    title: 'Overdraft Facility',
    description:
      'A revolving credit line linked to your business account. You borrow what you need and pay interest only on the amount used.',
  },
  {
    id: 'msme',
    title: 'MSME Loan',
    description:
      'Loans specifically structured for micro, small, and medium enterprises under government-backed schemes such as MUDRA and CGTMSE, offering lower rates and relaxed eligibility norms.',
  },
  {
    id: 'lap',
    title: 'Loan Against Property for Business',
    description:
      'Secured business financing against commercial or residential property for higher loan amounts at lower interest rates.',
  },
];

export const BUSINESS_LOAN_TYPES_SECTION_INFO = {
  title: 'Types of Business Loans Available on TrustFin',
  description:
    'TrustFin connects you with multiple types of business financing depending on your requirement.',
  closing:
    'Not sure which type suits your business? Ask TrustFin\'s AI and it will recommend the most appropriate option based on your requirement.',
} as const;

/** Document accordion groups — expanded by default to match design */
export const BUSINESS_DOCUMENTS_ACCORDION_DEFAULT_OPEN = [
  'identity-address',
  'business-financial',
] as const;

export const BUSINESS_LOAN_INFO_ACCORDION_ITEMS: PersonalLoanInfoAccordionItem[] = [
  {
    id: 'interest-rates',
    title: 'Business Loan Interest Rates',
    panel: {
      type: 'text',
      paragraphs: [
        'Business loan interest rates on TrustFin are competitive and vary based on your business profile, credit score, loan amount, tenure, and the lender\'s assessment criteria.',
        "Rather than approaching lenders one by one, let TrustFin's AI compare rates across 25+ banks and NBFCs simultaneously and surface the most suitable offer for your business.",
      ],
    },
  },
  {
    id: 'fees-and-charges',
    title: 'Fees and Charges',
    panel: { type: 'fees-table', rows: BUSINESS_FEES_AND_CHARGES },
  },
  {
    id: 'why-trustfin',
    title: 'Why Business Owners Choose TrustFin',
    panel: { type: 'feature-list', items: BUSINESS_WHY_TRUSTFIN_FEATURES },
  },
  {
    id: 'loan-types',
    title: BUSINESS_LOAN_TYPES_SECTION_INFO.title,
    panel: {
      type: 'feature-list',
      intro: BUSINESS_LOAN_TYPES_SECTION_INFO.description,
      items: BUSINESS_LOAN_TYPES.map(({ id, title, description }) => ({
        id,
        title,
        description,
      })),
      closing: BUSINESS_LOAN_TYPES_SECTION_INFO.closing,
    },
  },
  {
    id: 'before-applying',
    title: 'Things to Know Before You Apply',
    panel: { type: 'feature-list', items: BUSINESS_BEFORE_APPLYING_FEATURES },
  },
  {
    id: 'after-loan-closed',
    title: 'After Your Business Loan Is Closed',
    panel: {
      type: 'feature-list',
      intro: BUSINESS_AFTER_CLOSURE_INTRO,
      items: BUSINESS_AFTER_CLOSURE_FEATURES,
    },
  },
];

export const BUSINESS_LOAN_INFO_ACCORDION_DEFAULT_OPEN: string[] =
  BUSINESS_LOAN_INFO_ACCORDION_ITEMS.slice(0, 2).map((item) => item.id);

export const BUSINESS_VIDEO_CONFIG = {
  thumbnailUrl: '/assets/images/personal-loan-video-thumbnail.jpg',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  title: 'Business Loans on TrustFin',
  fallbackThumbnail: '/assets/images/personal-loan-illustration.png',
  cardTitle: 'Business Loan',
  description:
    'Access funds to grow your business without the usual hassle. TrustFin.ai matches MSMEs and startups with 25+ trusted banks and NBFCs. Borrow from ₹50,000 to ₹60 lakh with flexible repayment designed around your cash flow.',
  watchLabel: 'Watch: How TrustFin Works for Business',
} as const;

/** Route for the business loan application form */
export const BUSINESS_LOAN_APPLY_PATH = '/business-loan/apply' as const;
