import { JSX } from 'react';
import { HERO_COPY } from '../constants';

/** Supporting copy shown below the hero heading */
const HeroSubtitle = (): JSX.Element => {
  return (
    <p className="text-sm text-left custom-text-black mb-6 leading-relaxed">
      {HERO_COPY.subtitle}
    </p>
  );
};

export default HeroSubtitle;
