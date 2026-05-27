'use client';

/**
 * AiFeaturesGrid
 * 2x2 grid of AI feature cards. Kept separate from the section composer so the
 * layout primitive can be reused if needed.
 */

import { JSX } from 'react';
import AiFeatureCard from './ai-feature-card';
import { AI_MATCHED_FEATURES, type AiFeatureItem } from '../constants';

interface AiFeaturesGridProps {
  features?: AiFeatureItem[];
}

const AiFeaturesGrid = ({ features = AI_MATCHED_FEATURES }: AiFeaturesGridProps): JSX.Element => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {features.map((feature, index) => (
        <AiFeatureCard key={feature.id} feature={feature} index={index} />
      ))}
    </div>
  );
};

export default AiFeaturesGrid;
