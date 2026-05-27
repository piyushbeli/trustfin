/**
 * GoldProseSection
 * Flexible prose section for gold loan landing — paragraphs, bullets, or feature list.
 */

import { JSX } from 'react';
import { SectionWrapper, SectionTitle, SectionDescription } from '@/components/shared';
import type { GoldProseSectionConfig } from './constants';

const BODY_CLASS = 'text-sm custom-text-black leading-5';

interface GoldProseSectionProps {
  config: GoldProseSectionConfig;
}

const GoldProseSection = ({ config }: GoldProseSectionProps): JSX.Element => {
  const hasFeatures = config.features && config.features.length > 0;
  const hasBullets = config.bullets && config.bullets.length > 0;

  return (
    <SectionWrapper>
      <div
        className="space-y-4"
      >
        <SectionTitle className="custom-text-black text-left font-semibold">
          {config.title}
        </SectionTitle>

        {config.intro && (
          <SectionDescription align="left" className="custom-text-black">
            {config.intro}
          </SectionDescription>
        )}

        {config.paragraphs?.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className={BODY_CLASS}>
            {paragraph}
          </p>
        ))}

        {hasBullets && config.bulletsTitle && (
          <p className={`${BODY_CLASS} font-medium`}>{config.bulletsTitle}</p>
        )}

        {hasBullets && (
          <ul className="list-disc pl-5 space-y-2">
            {config.bullets?.map((bullet) => (
              <li key={bullet.slice(0, 40)} className={BODY_CLASS}>
                {bullet}
              </li>
            ))}
          </ul>
        )}

        {hasFeatures && (
          <div className="space-y-4">
            {config.features?.map((feature) => (
              <p key={feature.id} className={BODY_CLASS}>
                <span className="font-semibold custom-text-black">{feature.title}</span>{' '}
                {feature.description}
              </p>
            ))}
          </div>
        )}

        {config.footerNote && (
          <SectionDescription align="left" className="custom-text-black">
            {config.footerNote}
          </SectionDescription>
        )}
      </div>
    </SectionWrapper>
  );
};

export default GoldProseSection;
