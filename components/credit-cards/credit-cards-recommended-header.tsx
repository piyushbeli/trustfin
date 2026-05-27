import { Sparkles } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/section';
import { CREDIT_CARDS_PAGE } from './constants';

const CreditCardsRecommendedHeader = (): React.ReactNode => {
  return (
    <SectionWrapper className="pt-20 pb-4" innerClassName="max-w-xl mx-auto">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1">
          <Sparkles className="h-3 w-3 text-brand-primary" aria-hidden />
          <span className="text-[11px] font-semibold tracking-wide text-brand-primary">
            {CREDIT_CARDS_PAGE.badge}
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {CREDIT_CARDS_PAGE.title}
        </h1>
        <p className="max-w-md text-sm leading-5 text-gray-500">{CREDIT_CARDS_PAGE.subtitle}</p>
      </div>
    </SectionWrapper>
  );
};

export default CreditCardsRecommendedHeader;
