/**
 * Credit card data structure for Trustfin credit card offers.
 * Used by credit card list and item components.
 */

export interface CreditCard {
  id: string;
  title: string;
  link: string;
  intro: string;
  imageAsset?: string;
  features: CreditCardFeature[];
  aiInsight: string;
  annualFee: string;
  annualFeePeriod: string;
}

export type CreditCardFeatureIcon =
  | 'shopping-bag'
  | 'check-circle'
  | 'gauge'
  | 'badge-indian-rupee';

export interface CreditCardFeature {
  icon: CreditCardFeatureIcon;
  label: string;
}
