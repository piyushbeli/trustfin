/** Number of partner logos shown per carousel slide */
export const PARTNERS_PER_SLIDE = 5;

/**
 * Splits partner list into fixed-size chunks for carousel slides.
 */
export function chunkPartners<T>(items: T[], perSlide = PARTNERS_PER_SLIDE): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += perSlide) {
    chunks.push(items.slice(i, i + perSlide));
  }
  return chunks;
}
