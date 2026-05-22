import type { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/lib/constants/images';

interface PageBannerProps {
  /** Page heading (e.g. "Privacy Policy") */
  title: string;
  /** Optional icon; defaults to Trustfin heart shield */
  iconImage?: string;
  iconAlt?: string;
  className?: string;
}

/**
 * Simple page heading row: title on the left, optional icon on the right.
 * Used on static pages (privacy policy, terms, contact, etc.).
 */
const PageBanner = ({
  title,
  iconImage = IMAGES.ICONS.TRUSTFIN_HEART,
  iconAlt = 'Page icon',
  className,
}: PageBannerProps): ReactNode => {
  if (!title.trim()) {
    return null;
  }

  return (
    <header className={cn('flex w-full items-center gap-4', className)}>
      <h1 className="text-xl font-bold text-gray-900 mb-0!">{title}</h1>
      {iconImage ? (
        <Image
          src={iconImage}
          alt={iconAlt}
          width={24}
          height={24}
          className="size-8 shrink-0 object-contain"
        />
      ) : null}
    </header>
  );
};

export default PageBanner;
