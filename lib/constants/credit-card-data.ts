/**
 * Static credit card offers data for the credit cards page.
 * Sourced from Flutter app (lib/models/card_model.dart); images hosted on S3.
 */

import type { CreditCard } from '@/types/credit-card';


export const CREDIT_CARDS: CreditCard[] = [
  {
    title: 'SBI Simply Click',
    link: '#',
    intro: 'SBI presents, SimplyClick! Best for online shopping and e-commerce rewards.',
    features: [
      { icon: 'shopping-bag', label: '5% Online Cashback' },
      { icon: 'check-circle', label: 'Lifetime Free' },
      { icon: 'gauge', label: 'Instant Approval' },
      { icon: 'badge-indian-rupee', label: '₹1.5L Credit Limit' },
    ],
    aiInsight:
      '10x Reward Points on partner online brands like Amazon, Myntra, BookMyShow',
    annualFee: '₹2,999',
    annualFeePeriod: '/Year',
  },
];
