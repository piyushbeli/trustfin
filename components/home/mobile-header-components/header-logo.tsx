import Link from 'next/link';
import Image from 'next/image';
import { IMAGES } from '@/lib/constants/images';

interface HeaderLogoProps {
	siteName: string;
}

export const HeaderLogo = ({ siteName }: HeaderLogoProps) => (
	<Link href="/" className="flex items-center">
		<Image
			src={IMAGES.LOGOS.TRUSTFIN_LOGO}
			alt={siteName || 'Trustfin'}
			width={120}
			height={32}
			className="h-8 w-auto"
			priority
		/>
	</Link>
);
