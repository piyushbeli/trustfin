/**
 * OfferCard Component
 *
 * Displays a lender offer with amount, tenure, interest, and CTA.
 * Explore variant: light gradient card surface (no approval badge).
 * Status variant: same shell with status badge.
 */

import Image from 'next/image';
import type { LenderOfferStatus } from '@/types/wecredit';
import { PercentIcon, CalendarIcon } from '@/components/icons';
import {
  formatOfferDisplayAmount,
  formatOfferInterestRate,
  formatOfferTenureMonths,
} from '@/lib/utils/common-helper';
import { StatusBadge } from './status-badge';
import { OfferCardGradientBorder } from './offer-card-gradient-border';
import { ActionButton } from '../shared';
import { cn } from '@/lib/utils';

interface OfferCardProps {
  offer: LenderOfferStatus;
  onClick?: () => void;
  variant?: 'explore' | 'status';
}

const LenderLogo = ({
  logo,
  lenderName,
}: {
  logo?: string;
  lenderName: string;
}): React.ReactNode => (
  <div className="shrink-0 w-[88px] h-[32px] flex items-center justify-end overflow-hidden">
    {logo ? (
      <Image
        src={logo}
        alt={lenderName}
        width={88}
        height={32}
        className="max-h-[32px] w-auto object-contain object-right"
      />
    ) : (
      <span className="text-sm font-medium text-gray-700 truncate text-right">
        {lenderName}
      </span>
    )}
  </div>
);

const OfferTermsColumn = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}): React.ReactNode => (
  <div className="space-y-1">
    <div className="flex items-center gap-1.5 text-gray-500">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
    <p className="text-sm font-medium text-gray-900">{value}</p>
  </div>
);

export function OfferCard({ offer, onClick, variant = 'explore' }: OfferCardProps) {
  const { lenderName, intRate, tenure, logo, wcStatus, uptoAmount } = offer;

  const shouldShowStatusBadge = variant === 'status';

  const getCtaLabel = (): string => {
    if (variant === 'status') {
      return 'View Details';
    }
    if (wcStatus === 'INITIATED') {
      return 'Apply Now';
    }
    return 'Go to Status';
  };

  const ctaLabel = getCtaLabel();
  const isClickedOffer = wcStatus === 'UTM_CLICKED';
  const shouldShowGreenButton =
    variant === 'explore' && wcStatus !== 'INITIATED';

  const hasInterest =
    intRate !== undefined && intRate !== null && String(intRate).trim() !== '';
  const hasTenure =
    tenure !== undefined && tenure !== null && String(tenure).trim() !== '';

  return (
    <OfferCardGradientBorder as="div">
      <article className="py-2 px-3 space-y-2">
        {shouldShowStatusBadge && (
          <div className="flex justify-end">
            <StatusBadge status={wcStatus} className="shrink-0" />
          </div>
        )}

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Offered Amount
            </p>
            <p className="text-2xl font-bold text-brand-primary mt-1">
              {formatOfferDisplayAmount(uptoAmount)}
            </p>
          </div>
          <LenderLogo logo={logo} lenderName={lenderName} />
        </div>

        {(hasTenure || hasInterest) && (
          <div className="grid grid-cols-2 gap-4">
            {hasTenure && (
              <OfferTermsColumn
                icon={<CalendarIcon />}
                label="Tenure"
                value={formatOfferTenureMonths(tenure)}
              />
            )}
            {hasInterest && (
              <OfferTermsColumn
                icon={<PercentIcon />}
                label="Interest"
                value={formatOfferInterestRate(intRate)}
              />
            )}
          </div>
        )}

        <ActionButton
          type="button"
          onClick={onClick}
          fullWidth
          className={cn(
            'h-10 font-medium',
            (isClickedOffer || shouldShowGreenButton) &&
              'bg-green-600 hover:bg-green-700 text-white'
          )}
        >
          {ctaLabel}
        </ActionButton>
      </article>
    </OfferCardGradientBorder>
  );
}
