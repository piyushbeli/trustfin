/**
 * FAQ items for the Personal Loan Interest Rates page.
 */

import type { FaqItem } from '@/lib/constants/faqs';

export const PERSONAL_LOAN_INTEREST_RATES_FAQS: FaqItem[] = [
  {
    id: 'pl-ir-faq-1',
    question: 'What is the lowest personal loan interest rate available on TrustFin?',
    answer:
      'The lowest rate available on TrustFin is 9.99% p.a. from Poonawalla Fincorp, offered to eligible borrowers with a strong credit profile. Rates vary by lender and individual profile.',
  },
  {
    id: 'pl-ir-faq-2',
    question: 'Why is the rate shown on the lender website different from what I am offered?',
    answer:
      "Lenders advertise their best-case starting rates, which are offered to a small percentage of applicants with the strongest credit profiles. Most borrowers receive rates at the mid to upper end of the advertised range. TrustFin's AI shows you the rate range relevant to your profile rather than just the headline rate.",
  },
  {
    id: 'pl-ir-faq-3',
    question: 'Is a lower interest rate always the better choice?',
    answer:
      'Not always. A lower rate with a high processing fee may cost more than a slightly higher rate with no processing fee. Always evaluate the total repayment amount and annual percentage rate rather than comparing interest rates alone.',
  },
  {
    id: 'pl-ir-faq-4',
    question: 'Do interest rates change after the loan is sanctioned?',
    answer:
      'For fixed rate personal loans, the rate is locked at sanction and does not change during the tenure. Most personal loans in India are fixed rate. Always confirm this in the loan agreement before signing.',
  },
  {
    id: 'pl-ir-faq-5',
    question: 'Will comparing rates on TrustFin affect my credit score?',
    answer:
      "No. TrustFin's internal eligibility and rate matching does not trigger a hard enquiry. Your score is only affected when you formally apply to a specific lender and provide your consent for a credit pull.",
  },
  {
    id: 'pl-ir-faq-6',
    question: 'Why do some lenders on TrustFin not disclose their rates publicly?',
    answer:
      'Certain lenders, particularly smaller NBFCs and fintech lenders, determine rates entirely on the basis of individual credit assessment and do not publish a fixed rate range. For these lenders, the applicable rate is shown during the application process after profile evaluation.',
  },
  {
    id: 'pl-ir-faq-7',
    question: 'What is the RBI rule on prepayment charges from January 2026?',
    answer:
      'As per RBI guidelines effective January 2026, lenders cannot charge prepayment fees on floating-rate loans to individuals and MSEs. For fixed-rate personal loans, charges may still apply. Confirm the prepayment policy of your chosen lender before applying.',
  },
];
