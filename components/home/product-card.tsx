import Link from 'next/link';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';

type ProductCardVariant = 'compact' | 'default';

/** Props for ProductCard component */
interface ProductCardProps {
  id: string;
  label: string;
  href: string;
  icon?: LucideIcon;
  imagePath?: string;
  index: number;
  /** compact = mobile bordered card; default = desktop circular icon */
  variant?: ProductCardVariant;
}

/** Renders label with line breaks (compact) or a single line (default) */
const ProductCardLabel = ({
  label,
  variant,
}: {
  label: string;
  variant: ProductCardVariant;
}): React.ReactNode => {
  if (variant === 'default') {
    const singleLine = label.includes('\n') ? label.replace(/\n/g, ' ') : label;
    return (
      <span className="text-xs text-center leading-tight">{singleLine}</span>
    );
  }

  const lines = label.split('\n');
  return (
    <span className="text-xs text-gray-700 text-center leading-tight">
      {lines.map((line, idx) => (
        <span key={idx}>
          {line}
          {idx < lines.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
};

/**
 * Individual product card with icon/image and label
 */
const ProductCard = ({
  label,
  href,
  icon: Icon,
  imagePath,
  index,
  variant = 'default',
}: ProductCardProps): React.ReactNode => {
  const isCompact = variant === 'compact';

  const linkClassName = isCompact
    ? 'wc-product-card flex min-w-[88px] flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-3'
    : 'wc-product-card flex flex-col items-center gap-3 p-2';

  const iconContainerClassName = isCompact
    ? 'flex h-10 w-10 items-center justify-center overflow-hidden rounded-sm bg-brand-100'
    : 'flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-brand-100';

  const iconClassName = isCompact
    ? 'h-5 w-5 stroke-brand-primary text-brand-primary'
    : 'h-7 w-7 stroke-brand-primary text-brand-primary';

  const imageSize = isCompact ? 20 : 40;

  return (
    <div
      className={isCompact ? 'shrink-0' : undefined}
    >
      <Link href={href} className={linkClassName}>
        <div
          className={iconContainerClassName}
        >
          {imagePath ? ( 
            <Image
              src={imagePath}
              alt={label.replace(/\n/g, ' ')}
              width={imageSize}
              height={imageSize}
              className="object-contain icon-brand-image"
            />
          ) : Icon ? (
            <Icon
              className={iconClassName}
              strokeWidth={2}
              aria-hidden
            />
          ) : null}
        </div>

        <ProductCardLabel label={label} variant={variant} />
      </Link>
    </div>
  );
};

export default ProductCard;
