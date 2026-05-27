'use client';

/**
 * AiFeaturesGrid
 * 2x2 grid of AI feature cards. Kept separate from the section composer so the
 * layout primitive can be reused if needed.
 */

import { JSX } from 'react';
import AiFeatureCard from './ai-feature-card';
import { AI_MATCHED_FEATURES } from '../constants';

const AiFeaturesGrid = (): JSX.Element => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {AI_MATCHED_FEATURES.map((feature, index) => (
        <AiFeatureCard key={feature.id} feature={feature} index={index} />
      ))}
    </div>
  );
};

export default AiFeaturesGrid;
