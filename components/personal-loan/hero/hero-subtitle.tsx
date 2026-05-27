import { JSX } from 'react';
import { HERO_COPY } from '../constants';

interface HeroSubtitleProps {
  subtitle?: string;
}

/** Supporting copy shown below the hero heading */
const HeroSubtitle = ({ subtitle = HERO_COPY.subtitle }: HeroSubtitleProps): JSX.Element => {
  return (
    <p className="text-sm text-left custom-text-black mb-6 leading-relaxed">
      {subtitle}
    </p>
  );
};

export default HeroSubtitle;
