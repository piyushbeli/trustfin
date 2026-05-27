/**
 * AiFeatureCard
 * Single tile in the "What the AI handles for you" 2x2 grid.
 * Mirrors the entrance animation used in BenefitCard but with a bordered,
 * tinted style matching the section design.
 */

import { JSX } from 'react';
import type { AiFeatureItem } from '../constants';

interface AiFeatureCardProps {
  feature: AiFeatureItem;
  index: number;
}

const AiFeatureCard = ({ feature, index }: AiFeatureCardProps): JSX.Element => {
  return (
    <div
      className="rounded-md wc-ai-feature-card p-3"
    >
      <p className="text-sm font-normal leading-5 custom-text-black">{feature.text}</p>
    </div>
  );
};

export default AiFeatureCard;
