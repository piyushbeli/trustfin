import {
  BadgeIndianRupee,
  CheckCircle2,
  Gauge,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';
import type { CreditCardFeatureIcon } from '@/types/credit-card';

export const CREDIT_CARDS_PAGE = {
  badge: 'AI RECOMMENDED',
  title: 'Recommended Credit Cards for You',
  subtitle: 'AI matched these cards based on your profile and eligibility.',
} as const;

export const CREDIT_CARD_FEATURE_ICONS: Record<CreditCardFeatureIcon, LucideIcon> = {
  'shopping-bag': ShoppingBag,
  'check-circle': CheckCircle2,
  gauge: Gauge,
  'badge-indian-rupee': BadgeIndianRupee,
};
