import { Fragment } from 'react';
import { Star } from 'lucide-react';

/** Individual stat configuration */
interface StatItem {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  showStar?: boolean;
}

/** Stats data matching the design */
const stats: StatItem[] = [
  {
    id: 'customers',
    value: '2L',
    suffix: '+',
    label: 'Happy customers',
  },
  {
    id: 'disbursal',
    value: '₹500Cr',
    label: 'Total Disbursal',
  },
  {
    id: 'lenders',
    value: '50',
    suffix: '+',
    label: 'Money Lenders',
  },
  {
    id: 'match',
    value: '4.8',
    showStar: true,
    label: 'Average Match',
  },
];

/** Animation variants for staggered reveal */
interface StatValueProps {
  value: string;
  suffix?: string;
  showStar?: boolean;
}

/** Bold primary value with optional suffix and star */
const StatValue = ({ value, suffix, showStar }: StatValueProps): React.ReactNode => {
  return (
    <div className="flex items-center justify-center gap-0.5">
      <span className="text-sm font-semibold text-brand-primary wc-stat-number sm:text-xl md:text-2xl">
        {value}
      </span>
      {suffix ? (
        <span className="text-sm font-semibold text-brand-primary sm:text-xl md:text-2xl">
          {suffix}
        </span>
      ) : null}
      {showStar ? (
        <Star
          className="h-4 w-4 fill-brand-primary text-brand-primary sm:h-5 sm:w-5 md:h-6 md:w-6"
          aria-hidden
        />
      ) : null}
    </div>
  );
};

/** Gradient vertical divider between stat columns */
const StatDivider = (): React.ReactNode => {
  return <div className="wc-stat-divider shrink-0" aria-hidden />;
};

interface StatColumnProps {
  stat: StatItem;
}

/** Single stat column: value stack + label */
const StatColumn = ({ stat }: StatColumnProps): React.ReactNode => {
  return (
    <div
      className="flex min-w-0 flex-1 flex-col items-center px-1 text-center sm:px-2"
    >
      <StatValue value={stat.value} suffix={stat.suffix} showStar={stat.showStar} />
      <span className="mt-1 text-xs leading-snug text-gray-600 sm:text-xs md:text-sm">
        {stat.label}
      </span>
    </div>
  );
};

/**
 * Stats section — single row with gradient dividers at all breakpoints
 */
const StatsSection = (): React.ReactNode => {
  return (
    <section className="min-w-0 bg-white px-4 py-6 sm:py-8">
      <div
        className="mx-auto flex max-w-3xl min-w-0 items-stretch lg:max-w-5xl"
      >
        {stats.map((stat, index) => {
          const isLast = index === stats.length - 1;
          return (
            <Fragment key={stat.id}>
              <StatColumn stat={stat} />
              {!isLast ? <StatDivider /> : null}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSection;
