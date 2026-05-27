import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  fallbackIcon: LucideIcon;
  index: number;
  ctaLabel?: string;
  className?: string;
}

/** Collapses multi-line titles to a single line for card header */
const formatToolTitle = (title: string): string =>
  title.includes('\n') ? title.replace(/\n/g, ' ') : title;

/**
 * Tool calculator card — lavender border, icon + title, description, CTA button
 */
const ToolCard = ({
  title,
  description,
  href,
  fallbackIcon: FallbackIcon,
  index,
  ctaLabel = 'Calculate Now',
  className = '',
}: ToolCardProps): React.ReactNode => {
  const displayTitle = formatToolTitle(title);

  return (
    <div
      className={`flex h-full shrink-0 ${className}`}
    >
      <div className="flex h-full min-h-[200px] w-full flex-col rounded-md border border-brand-200 bg-brand-50/80 p-4">
        <div className="flex flex-1 flex-col">
          <div className="flex items-start gap-2">
            <FallbackIcon
              className="h-8 w-8 shrink-0 text-brand-primary"
              strokeWidth={1.5}
              aria-hidden
            />
            <h3 className="min-h-11 flex-1 text-base font-medium leading-snug text-brand-primary">
              {displayTitle}
            </h3>
          </div>
          {/* Full width below icon row — left edge aligns with icon */}
          <p className="mt-2 flex-1 text-sm leading-snug text-gray-600">{description}</p>
        </div>

        <Link
          href={href}
          className="mt-4 block w-full shrink-0 rounded-lg bg-brand-primary py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-brand-600"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
};

export default ToolCard;
