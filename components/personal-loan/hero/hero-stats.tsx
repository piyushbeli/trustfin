import { Fragment, JSX } from 'react';
import { HERO_STATS, type HeroStatItem } from '../constants';

/** Vertical divider between stat columns */
const StatDivider = (): JSX.Element => {
  return <div className="wc-stat-divider shrink-0" aria-hidden />;
};

interface HeroStatsProps {
  stats?: HeroStatItem[];
}

/** Three-column stats row: loan range, rate, lenders */
const HeroStats = ({ stats = HERO_STATS }: HeroStatsProps): JSX.Element => {
  return (
    <div className="flex w-full items-stretch mb-6">
      {stats.map((stat, index) => {
        const isLast = index === HERO_STATS.length - 1;
        return (
          <Fragment key={stat.id}>
            <div className="flex min-w-0 flex-1 flex-col items-center px-1 text-center">
              <span className="text-base font-semibold text-brand-primary">{stat.value}</span>
              <span className="mt-1 text-xs custom-text-black leading-snug">{stat.label}</span>
            </div>
            {!isLast ? <StatDivider /> : null}
          </Fragment>
        );
      })}
    </div>
  );
};

export default HeroStats;
