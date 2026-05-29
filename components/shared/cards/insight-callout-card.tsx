/**
 * InsightCalloutCard
 * Lavender summary callout (e.g. "What this means for you").
 */

import { JSX } from 'react';
import type { InsightCalloutContent } from './types';

interface InsightCalloutCardProps {
  callout: InsightCalloutContent;
}

const InsightCalloutCard = ({ callout }: InsightCalloutCardProps): JSX.Element => {
  return (
    <div className="space-y-1 rounded-xl bg-brand-50 p-4">
      <p className="text-sm font-semibold text-brand-primary">{callout.title}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{callout.description}</p>
    </div>
  );
};

export default InsightCalloutCard;
