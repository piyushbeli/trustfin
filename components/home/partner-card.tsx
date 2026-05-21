import { Partner } from '@/types/wecredit';
import Image from 'next/image';

interface PartnerCardProps {
  partner: Partner;
}

/**
 * Partner logo — flat presentation for carousel row (no background box)
 */
const PartnerCard = ({ partner }: PartnerCardProps): React.ReactNode => {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-center px-1 sm:px-2">
      <Image
        src={partner.logo}
        alt={partner.name}
        width={120}
        height={48}
        unoptimized
        className="h-7 w-auto max-w-full object-contain sm:h-8 md:h-10"
      />
    </div>
  );
};

export default PartnerCard;
