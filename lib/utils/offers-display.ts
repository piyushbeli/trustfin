import type { ActiveLender } from '@/lib/utils/lenders';

/**
 * Returns the lender id with the lowest numeric IntRate, or null if none have a valid rate.
 */
export function getLowestRateLenderId(lenders: ActiveLender[]): string | null {
  let lowestId: string | null = null;
  let lowestRate = Infinity;

  for (const { id, lender } of lenders) {
    const rate = lender.IntRate;
    if (rate == null || typeof rate !== 'number' || Number.isNaN(rate)) {
      continue;
    }
    if (rate < lowestRate) {
      lowestRate = rate;
      lowestId = id;
    }
  }

  return lowestId;
}

/** Formats tenure for card display (e.g. "24" or "24 m" → "24 Months") */
export function formatTenureDisplay(tenure: string): string {
  if (!tenure || tenure === 'N/A') {
    return tenure;
  }

  const withoutSuffix = tenure.replace(/\s*m$/i, '').trim();
  if (/^\d+$/.test(withoutSuffix)) {
    return `${withoutSuffix} Months`;
  }

  return tenure;
}
