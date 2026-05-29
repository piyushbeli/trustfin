/**
 * FAQ items for the Personal Loan Documents Required page.
 */

import type { FaqItem } from '@/lib/constants/faqs';

export const PERSONAL_LOAN_DOCUMENTS_REQUIRED_FAQS: FaqItem[] = [
  {
    id: 'pl-doc-faq-1',
    question: 'What is the minimum documentation required for a personal loan in India?',
    answer:
      'For fully digital lenders on TrustFin, the minimum documentation is your Aadhaar number (for eKYC), PAN, and consent for bank statement access via the Account Aggregator framework. No uploads or physical documents may be needed for loans up to ₹5 lakh.',
  },
  {
    id: 'pl-doc-faq-2',
    question: 'Is a PAN card mandatory for a personal loan?',
    answer:
      'Yes. PAN is mandatory for all personal loans above ₹50,000 as per income tax regulations. Lenders verify PAN digitally and use it for credit bureau checks.',
  },
  {
    id: 'pl-doc-faq-3',
    question: 'Can I apply for a personal loan without salary slips?',
    answer:
      'Yes, in some cases. Bank statements showing regular salary credits are accepted as a substitute by many lenders. For self-employed applicants without salary slips, bank statements and GST filings are the primary income proof.',
  },
  {
    id: 'pl-doc-faq-4',
    question: 'Is Aadhaar mandatory for a personal loan?',
    answer:
      'Aadhaar is the most widely accepted identity and address proof and is used for OTP-based eKYC by most digital lenders. While it is not legally mandatory, most lenders on TrustFin use Aadhaar eKYC as the primary verification method. Applicants without Aadhaar can use passport or voter ID along with Video KYC.',
  },
  {
    id: 'pl-doc-faq-5',
    question: 'How many months of bank statements are needed?',
    answer:
      'Most lenders ask for 3 to 6 months of bank statements. Lenders using the Account Aggregator framework can access statements digitally with your consent, eliminating the need to download and upload PDF statements.',
  },
  {
    id: 'pl-doc-faq-6',
    question: 'Do I need to submit original documents?',
    answer:
      'No. Most lenders on TrustFin accept self-attested copies or digital verification. Originals may be requested only for in-person verification, which is rare for digital lenders. Video KYC allows you to show originals via a live video call.',
  },
  {
    id: 'pl-doc-faq-7',
    question: 'Can I use DigiLocker documents for a personal loan application?',
    answer:
      'Yes. Documents available on DigiLocker such as Aadhaar, driving licence, and educational certificates are treated as originals and accepted by lenders who support DigiLocker integration.',
  },
  {
    id: 'pl-doc-faq-8',
    question: 'What is an e-NACH mandate and why do lenders need it?',
    answer:
      'e-NACH (Electronic National Automated Clearing House) is a digital instruction that authorises the lender to debit your EMI automatically from your bank account each month. It replaces the physical ECS mandate form and is set up digitally during the loan process. It ensures timely EMI payment without manual intervention.',
  },
  {
    id: 'pl-doc-faq-9',
    question: 'Will submitting documents on TrustFin mean all lenders receive them?',
    answer:
      'No. Your documents and personal information are shared only with the specific lender you choose to apply with, after you give explicit consent. TrustFin does not share your data with all lenders simultaneously.',
  },
  {
    id: 'pl-doc-faq-10',
    question: 'What if my address on Aadhaar is different from my current address?',
    answer:
      'You can submit a recent utility bill or rent agreement at your current address along with your Aadhaar. Most lenders accept this combination. Updating your Aadhaar address at an enrolment centre before applying is advisable if the gap is significant.',
  },
];
