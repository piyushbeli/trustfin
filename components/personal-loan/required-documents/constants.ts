/**
 * Personal Loan Documents Required page — copy and structured data (2026).
 */

import type { MultiColumnTableRow } from '@/components/shared/multi-column-table';
import type {
  DocumentGroupItem,
  PersonalLoanInfoAccordionItem,
  TrustFinFeatureItem,
} from '@/components/personal-loan/constants';

/** Re-export for section builders */
export type DocumentBulletGroup = DocumentGroupItem;

interface ApplicantDocumentsSection {
  id: string;
  title: string;
  intro: readonly string[];
  groups: readonly DocumentGroupItem[];
  footerNotes?: readonly string[];
}

/** First section open on load — matches mockup (Salaried expanded) */
export const REQUIRED_DOCUMENTS_ACCORDION_DEFAULT_OPEN = ['salaried'] as const;

export const REQUIRED_DOCUMENTS_HERO = {
  titleHighlight: 'Documents Required for a',
  titleRest: 'Personal Loan in India (2026)',
  paragraphs: [
    'Getting your documents ready before applying for a personal loan saves time, reduces back-and-forth with the lender, and significantly improves your chances of a smooth, fast approval. This guide covers everything you need, by applicant type, by lender category, and including the digital verification options now accepted by most lenders on TrustFin.',
    "Not sure which documents your specific matched lender will ask for? TrustFin's AI tells you the exact requirements for your chosen lender before you apply, so there are no surprises at the verification stage.",
  ],
} as const;

export const CTA_LABELS = {
  afterHero: 'See Documents For My Profile',
  afterApplicantSections: 'Check My Lender-Specific Requirements',
  afterTips: 'Start My Application',
} as const;

export const WHAT_DOCUMENTS_SECTION = {
  title: 'What Documents Are Required for a Personal Loan?',
  intro: [
    'All lenders require documents that verify four things: who you are, where you live, how much you earn, and that you have agreed to the loan terms. The specific documents accepted for each of these categories vary by lender type.',
  ],
  closing: [
    'The key difference across lenders on TrustFin is how they verify these four categories. Traditional NBFCs and larger fintech lenders typically follow a full documentation process. Smaller digital lenders often complete the entire process using just Aadhaar eKYC and bank statement analysis, with no physical documents required at all.',
  ],
} as const;

export const VERIFICATION_TABLE_HEADERS = [
  'Verification Category',
  'What It Confirms',
  'Common Documents',
] as const;

export const VERIFICATION_TABLE_ROWS: MultiColumnTableRow[] = [
  {
    id: 'identity',
    cells: ['Identity (KYC)', 'You are who you claim to be', 'Aadhaar, PAN, Passport, Voter ID, Driving Licence'],
  },
  {
    id: 'address',
    cells: ['Address', 'Where you currently reside', 'Aadhaar, Utility bill, Passport, Rent Agreement'],
  },
  {
    id: 'income',
    cells: ['Income', 'Your repayment capacity', 'Salary slips, Bank statements, ITR, Form 16'],
  },
  {
    id: 'post-sanction',
    cells: ['Post-sanction', 'Your agreement to the loan', 'Signed loan agreement, NACH or e-NACH mandate'],
  },
];

export const SALARIED_SECTION: ApplicantDocumentsSection = {
  id: 'salaried',
  title: 'Documents Required for Salaried Employees',
  intro: [
    'Salaried applicants generally have the most straightforward documentation process. Most lenders accept the same core set of documents.',
  ],
  groups: [
    {
      id: 'salaried-identity',
      title: 'Identity Proof (any one)',
      bullets: [
        'Aadhaar Card',
        'PAN Card',
        'Passport',
        'Voter ID',
        'Driving Licence',
        'NREGA Job Card',
      ],
    },
    {
      id: 'salaried-address',
      title: 'Address Proof (any one)',
      bullets: [
        'Aadhaar Card',
        'Utility bill (electricity, water, gas, telephone) not older than 3 months',
        'Passport',
        'Driving Licence',
        'Voter ID',
        'Rent Agreement',
      ],
    },
    {
      id: 'salaried-income',
      title: 'Income Proof',
      bullets: [
        "Last 2 to 3 months' salary slips",
        "Last 3 to 6 months' bank statements showing salary credits",
        'Form 16 or latest ITR (required by some lenders for higher loan amounts)',
        'Employment certificate or offer letter (if recently joined)',
      ],
    },
    {
      id: 'salaried-post-sanction',
      title: 'Post-Sanction Documents',
      bullets: [
        'Signed loan agreement',
        'NACH mandate or e-NACH for EMI auto-debit',
        'Cancelled cheque (required by select lenders)',
        'Passport-sized photograph (required by lenders using physical or offline processes; not needed for fully digital applications)',
      ],
    },
  ],
};

export const SELF_EMPLOYED_SECTION: ApplicantDocumentsSection = {
  id: 'self-employed',
  title: 'Documents Required for Self-Employed Individuals',
  intro: [
    "Self-employed applicants face slightly more scrutiny because income is less predictable. The documents required depend on business type and the lender's risk appetite.",
  ],
  groups: [
    {
      id: 'se-identity',
      title: 'Identity Proof (any one)',
      bullets: ['Aadhaar Card', 'PAN Card', 'Passport', 'Voter ID', 'Driving Licence'],
    },
    {
      id: 'se-address',
      title: 'Address Proof (any one)',
      bullets: [
        'Aadhaar Card',
        'Utility bill dated within the last 3 months',
        'Passport',
        'Rent Agreement',
      ],
    },
    {
      id: 'se-income',
      title: 'Income Proof',
      bullets: [
        "Last 2 years' Income Tax Returns (ITR) with computation",
        'Audited profit and loss statement and balance sheet',
        "Last 6 months' business bank statements",
        'GST returns for the last 6 to 12 months (required by most lenders for higher amounts)',
      ],
    },
    {
      id: 'se-business',
      title: 'Business Existence Proof (any one or more)',
      bullets: [
        'GST registration certificate',
        'Udyam registration certificate (MSME)',
        'Shop and Establishment Act licence',
        'Business incorporation or registration certificate',
        'Trade licence',
      ],
    },
    {
      id: 'se-post-sanction',
      title: 'Post-Sanction Documents',
      bullets: ['Signed loan agreement', 'NACH mandate or e-NACH for EMI auto-debit'],
    },
  ],
  footerNotes: [
    'Exception for self-employed without ITR: Several NBFCs on TrustFin offer loans to self-employed applicants without ITR. In such cases, lenders typically accept 6 to 12 months of business bank statements combined with GST filings as a substitute for ITR. Loan amounts in such cases are generally capped at ₹3 to 5 lakh. TrustFin\'s AI can identify which lenders accept this profile.',
  ],
};

export const PENSIONER_SECTION: ApplicantDocumentsSection = {
  id: 'pensioner',
  title: 'Documents Required for Pensioners',
  intro: [
    'Pensioners and retired individuals are eligible for personal loans from select lenders. The income proof requirements are different from salaried or self-employed applicants.',
  ],
  groups: [
    {
      id: 'pensioner-identity',
      title: 'Identity Proof (any one)',
      bullets: ['Aadhaar Card', 'PAN Card', 'Passport', 'Voter ID', 'Government employee ID (if applicable)'],
    },
    {
      id: 'pensioner-address',
      title: 'Address Proof (any one)',
      bullets: [
        'Aadhaar Card',
        'Passport',
        'Utility bill dated within the last 3 months',
      ],
    },
    {
      id: 'pensioner-income',
      title: 'Income Proof',
      bullets: [
        'Pension payment slip or pension certificate',
        'Bank account statement showing regular pension credits (last 3 to 6 months)',
        'Pension Payment Order (PPO)',
        'Form 16 (if applicable)',
      ],
    },
    {
      id: 'pensioner-post-sanction',
      title: 'Post-Sanction Documents',
      bullets: ['Signed loan agreement', 'NACH mandate or e-NACH for EMI debit'],
    },
  ],
  footerNotes: [
    'Most lenders cap the loan tenure for pensioners so that the final repayment falls before the age of 70 to 75. The maximum loan amount is typically lower than for salaried applicants and is based on monthly pension income.',
  ],
};

export const NRI_SECTION: ApplicantDocumentsSection = {
  id: 'nri',
  title: 'Documents Required for NRI Applicants',
  intro: [
    "NRI applicants are assessed by a limited number of lenders. Documentation requirements are more extensive given the cross-border nature of the applicant's income and residence.",
  ],
  groups: [
    {
      id: 'nri-identity',
      title: 'Identity Proof',
      bullets: ['Valid Indian Passport', 'Valid Visa or Work Permit'],
    },
    {
      id: 'nri-indian-address',
      title: 'Indian Address Proof (any one)',
      bullets: [
        'Aadhaar Card',
        'Indian Passport with Indian address',
        'Utility bill or rent agreement at Indian address',
      ],
    },
    {
      id: 'nri-overseas-address',
      title: 'Overseas Address Proof (any one)',
      bullets: [
        'Overseas driving licence',
        "Recent overseas utility bill in applicant's name",
        'Overseas tenancy agreement or resident permit',
      ],
    },
    {
      id: 'nri-income',
      title: 'Employment and Income Proof',
      bullets: [
        'Employment contract or appointment letter from overseas employer',
        "Last 3 months' overseas salary slips or income certificate",
        'Overseas bank account statements (last 3 to 6 months)',
        'Tax identification number or tax statement from country of employment',
      ],
    },
    {
      id: 'nri-banking',
      title: 'India Banking Documents',
      bullets: [
        'NRE or NRO bank account statement (last 6 months)',
        'Pension number (if applicable)',
      ],
    },
    {
      id: 'nri-post-sanction',
      title: 'Post-Sanction Documents',
      bullets: [
        'Signed loan agreement',
        'ECS or NACH mandate linked to NRE or NRO account',
      ],
    },
  ],
  footerNotes: [
    "NRI personal loans are offered by a limited number of lenders. Availability depends on the country of residence, employment status, and lender-specific policies. TrustFin's AI will show you NRI-eligible offers where applicable.",
  ],
};

export const DIGITAL_KYC_SECTION = {
  title: 'Digital KYC, What Most Fintech Lenders Now Accept',
  intro:
    "This is where TrustFin's lender network differs significantly from traditional banks. Many lenders on the platform are fully digital and do not require you to upload or submit physical documents at all.",
} as const;

export const DIGITAL_KYC_CLOSING_CALLOUT = {
  title: 'What this means for you',
  description:
    'For many lenders on TrustFin, especially for loan amounts up to ₹5 lakh, the entire process from application to disbursal requires only your Aadhaar, PAN, and consent for bank statement access. No physical documents. No uploads. No branch visit.',
} as const;

/** Exact copy for the "Digital KYC" accordion panel */
export const DIGITAL_KYC_ACCORDION_FEATURES: TrustFinFeatureItem[] = [
  {
    id: 'aadhaar-ekyc',
    title: 'Aadhaar eKYC (OTP-based)',
    description:
      'Your identity and address are verified instantly using your Aadhaar number and a one-time OTP sent to your registered mobile number. No document upload needed. Accepted by most fintech lenders on TrustFin.',
  },
  {
    id: 'pan-verification',
    title: 'PAN Verification',
    description:
      'PAN is verified digitally against NSDL or UTI databases in real time. No physical PAN card copy needed.',
  },
  {
    id: 'video-kyc',
    title: 'Video KYC (V-CIP)',
    description:
      'Some lenders complete the full KYC process via a short live video call where you show your original documents on camera. This replaces the branch visit entirely. RBI-compliant and accepted by select lenders.',
  },
  {
    id: 'digilocker',
    title: 'DigiLocker',
    description:
      'Documents stored in your DigiLocker (driving licence, Aadhaar, class 10 and 12 marksheets etc.) can be shared directly with the lender digitally. These are treated as originals.',
  },
  {
    id: 'account-aggregator',
    title: 'Bank Statement via Account Aggregator (AA Framework)',
    description:
      "Under RBI's Account Aggregator framework, lenders can access your bank statements directly with your consent, without requiring you to manually upload PDFs. This speeds up income verification significantly and is increasingly used by lenders on TrustFin.",
  },
];

export const DOCUMENT_TIPS_SECTION = {
  title: 'Tips to Speed Up Your Loan Approval Through Documents',
} as const;

/** Exact copy for the "Tips to Speed Up Approval" accordion panel */
export const DOCUMENT_TIPS_ACCORDION_FEATURES: TrustFinFeatureItem[] = [
  {
    id: 'digital-copies',
    title: 'Keep digital copies ready',
    description:
      'Store clear scans or photos of your Aadhaar, PAN, latest salary slips, and bank statements in one folder before you start the application. Most lenders accept PDF or JPEG uploads.',
  },
  {
    id: 'aadhaar-mobile',
    title: 'Ensure Aadhaar is linked to your current mobile number',
    description:
      'Most digital lenders use Aadhaar OTP for eKYC. A mismatched or inactive mobile number is one of the most common reasons for application delays.',
  },
  {
    id: 'salary-account',
    title: 'Use your salary account bank statement',
    description:
      'Lenders place higher trust on statements from the account where your salary is credited. Avoid submitting statements from a secondary account even if the balance is higher.',
  },
  {
    id: 'self-attest',
    title: 'Self-attest physical documents if required',
    description:
      'Sign across all physical document copies with the date. Some lenders reject applications where self-attestation is missing.',
  },
  {
    id: 'name-match',
    title: 'Match your name across all documents',
    description:
      'A name mismatch between PAN, Aadhaar, and bank account (for example, initials vs full name) can delay or reject your application. Resolve such mismatches before applying.',
  },
  {
    id: 'expired-docs',
    title: 'Do not submit expired documents',
    description:
      'Passport and driving licence must be valid at the time of application. Utility bills must not be older than 3 months.',
  },
];

export const PAGE_DISCLAIMER =
  'Document requirements listed above are general and indicative. Actual requirements vary by lender, loan amount, and applicant profile. TrustFin\'s AI will show you the specific documents required by your matched lender before you apply. TrustFin.ai is a product of Cleartrust Fintech Services Private Limited and operates as a loan marketplace intermediary.';

/** H2 sections as accordion items — uses shared PersonalLoan InfoAccordionList */
export const REQUIRED_DOCUMENTS_ACCORDION_ITEMS: PersonalLoanInfoAccordionItem[] = [
  {
    id: SALARIED_SECTION.id,
    title: SALARIED_SECTION.title,
    panel: {
      type: 'document-groups',
      intro: SALARIED_SECTION.intro,
      groups: SALARIED_SECTION.groups,
    },
  },
  {
    id: SELF_EMPLOYED_SECTION.id,
    title: SELF_EMPLOYED_SECTION.title,
    panel: {
      type: 'document-groups',
      intro: SELF_EMPLOYED_SECTION.intro,
      groups: SELF_EMPLOYED_SECTION.groups,
      footerNotes: SELF_EMPLOYED_SECTION.footerNotes,
    },
  },
  {
    id: PENSIONER_SECTION.id,
    title: PENSIONER_SECTION.title,
    panel: {
      type: 'document-groups',
      intro: PENSIONER_SECTION.intro,
      groups: PENSIONER_SECTION.groups,
      footerNotes: PENSIONER_SECTION.footerNotes,
    },
  },
  {
    id: NRI_SECTION.id,
    title: NRI_SECTION.title,
    panel: {
      type: 'document-groups',
      intro: NRI_SECTION.intro,
      groups: NRI_SECTION.groups,
      footerNotes: NRI_SECTION.footerNotes,
    },
  },
  {
    id: 'digital-kyc',
    title: DIGITAL_KYC_SECTION.title,
    panel: {
      type: 'lavender-card-list',
      intro: DIGITAL_KYC_SECTION.intro,
      items: DIGITAL_KYC_ACCORDION_FEATURES,
      closingCallout: DIGITAL_KYC_CLOSING_CALLOUT,
    },
  },
  {
    id: 'tips',
    title: DOCUMENT_TIPS_SECTION.title,
    panel: {
      type: 'prose-tip-list',
      items: DOCUMENT_TIPS_ACCORDION_FEATURES,
    },
  },
];
