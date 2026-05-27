'use client';

/**
 * EligibilityCard
 * Single criterion row with an icon and label/requirement copy.
 */

import { JSX } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IMAGES } from '@/lib/constants/images';
import type { EligibilityItem } from '../constants';

interface EligibilityCardProps {
  item: EligibilityItem;
  index: number;
}

const EligibilityCard = ({ item, index }: EligibilityCardProps): JSX.Element => {
  return (
    <motion.div
      className="flex items-center justify-center gap-3 p-2 mb-2 bg-white rounded-lg shadow border border-gray-50"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="w-9 h-9 bg-brand-primary/10 rounded flex items-center justify-center shrink-0">
        <Image
          src={IMAGES.ICONS.HOURGLASS}
          alt="Hourglass Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm leading-5">
          <span className="font-medium text-gray-700">{item.title} </span>
          <span className="font-normal text-gray-500">{item.requirement}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default EligibilityCard;
