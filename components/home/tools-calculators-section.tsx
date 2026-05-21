'use client';

import { Calculator, PieChart, Briefcase, Gauge } from 'lucide-react';
import ToolCard from './tool-card';
import type { LucideIcon } from 'lucide-react';

/** Tool configuration interface */
interface Tool {
  id: string;
  title: string;
  description: string;
  href: string;
  fallbackIcon: LucideIcon;
  ctaLabel?: string;
}

/** Tools data matching the design */
const tools: Tool[] = [
  {
    id: 'personal-loan-calculator',
    title: 'Personal Loan EMI Calculator',
    description:
      'Find your EMI instantly. Enter loan, tenure & rate – see results fast.',
    href: '/calculator/personal-loan',
    fallbackIcon: Calculator,
  },
  {
    id: 'emi-calculator',
    title: 'EMI Calculator',
    description: 'Plan repayments with a quick EMI estimate for any loan amount.',
    href: '/calculator/emi',
    fallbackIcon: PieChart,
  },
  {
    id: 'business-loan-calculator',
    title: 'Business Loan Calculator',
    description: 'Estimate business loan EMIs before you apply.',
    href: '/calculator/business-loan',
    fallbackIcon: Briefcase,
  },
  {
    id: 'credit-score-check',
    title: 'Check Credit Score',
    description: 'View your bureau score and understand your credit health.',
    href: '/bureau-report/',
    fallbackIcon: Gauge,
  },
];

/**
 * Tools & Calculators — horizontal scroll of calculator cards
 */
const ToolsCalculatorsSection = (): React.ReactNode => {
  return (
    <section className="min-w-0 overflow-hidden bg-white py-6 common-section-wrapper">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">Tools & Calculators</h2>
        <span className="shrink-0 text-sm text-gray-500">Swipe to explore</span>
      </div>

      <div className="min-w-0 overflow-hidden">
        <div className="wc-products-scroll scrollbar-hide flex items-stretch gap-4 overflow-x-auto overscroll-x-contain pb-1">
          {tools.map((tool, index) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              fallbackIcon={tool.fallbackIcon}
              index={index}
              ctaLabel={tool.ctaLabel}
              className="w-[min(280px,85vw)] sm:w-[280px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsCalculatorsSection;
