/**
 * Shared FAQ data used across all pages
 * These FAQs are consistent throughout the application
 */

export interface FaqItem {
	id: string;
	question: string;
	answer: string;
}

/**
 * Standard FAQ items for TrustFin platform
 * Used across home page, FAQ page, personal loan page, and other relevant pages
 */
export const STANDARD_FAQS: FaqItem[] = [
	{
		id: 'faq-1',
		question:
			'What is TrustFin.ai and how is it different from other loan platforms?',
		answer:
			'TrustFin.ai is an AI-powered loan marketplace connecting borrowers with personal loans, business loans, and gold loans from 25+ trusted banks and NBFCs. Unlike other platforms that simply list lenders, our AI matches you only with lenders whose criteria you actually meet, reducing rejections and protecting your credit score.',
	},
	{
		id: 'faq-2',
		question: 'Is TrustFin.ai a lender?',
		answer:
			'No. TrustFin is a loan marketplace intermediary operated by Cleartrust Fintech Services Private Limited. We connect borrowers with banks and NBFCs. All approvals, disbursals, and repayments are handled directly by the respective lending partner.',
	},
	{
		id: 'faq-3',
		question: 'What types of loans can I apply for on TrustFin?',
		answer:
			'TrustFin currently offers personal loans up to ₹15 lakh, business loans up to ₹60 lakh, and gold loans up to ₹20 lakh, all from a network of 25+ trusted banks and NBFCs.',
	},
	{
		id: 'faq-4',
		question: 'How does the AI on TrustFin work?',
		answer:
			"When you enter your details, TrustFin's AI analyses your income, employment type, credit profile, and loan requirement, then matches you with lenders you are genuinely likely to qualify for. You can also chat with the AI directly to ask questions, compare costs, or understand your options before applying.",
	},
	{
		id: 'faq-5',
		question: 'Will using TrustFin affect my credit score?',
		answer:
			"No. TrustFin's eligibility check does not trigger a hard inquiry. A credit pull happens only when you formally apply to a specific lender and give your consent. This protects your score from the damage caused by applying to multiple lenders separately.",
	},
	{
		id: 'faq-6',
		question: 'What documents do I need to apply?',
		answer:
			"It depends on the loan type and lender. Most loans require KYC documents such as PAN and Aadhaar, along with income proof. Gold loans typically need only KYC documents. Once matched, TrustFin's AI will tell you exactly what your chosen lender requires.",
	},
	{
		id: 'faq-7',
		question: 'How long does it take to get a loan through TrustFin?',
		answer:
			'Personal loans are often approved within minutes and disbursed within 1 to 2 business days. Business loans typically take 1 to 3 business days post-verification.',
	},
	{
		id: 'faq-8',
		question: 'Is my data safe on TrustFin?',
		answer:
			'Yes. All data is stored on secure servers within India, in compliance with applicable regulations. We do not sell your information to any third party. Data shared with lenders is limited strictly to what is needed to process your application.',
	},
	{
		id: 'faq-9',
		question: 'Can I apply with a low credit score or no credit history?',
		answer:
			"For personal and business loans, most lenders prefer a score of 700 and above, though some NBFCs consider lower scores. For gold loans, credit score is generally not a barrier. TrustFin's AI shows you available options for your profile without requiring you to apply and risk rejection.",
	},
	{
		id: 'faq-10',
		question: 'Is TrustFin free to use?',
		answer:
			'Yes. There are no registration, membership, or application fees for borrowers. TrustFin is completely free to use. We receive a fee from lending partners only when a loan is successfully facilitated through the platform.',
	},
];
