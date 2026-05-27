'use client';

/**
 * Video Section Component
 * Card with gradient background, description, and embedded video thumbnail.
 */

import { JSX, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { VIDEO_CONFIG } from './constants';

export interface VideoSectionConfig {
  thumbnailUrl: string;
  videoUrl: string;
  title: string;
  fallbackThumbnail: string;
  cardTitle: string;
  description: string;
  watchLabel: string;
}

interface VideoSectionProps {
  config?: VideoSectionConfig;
}

const DEFAULT_VIDEO_CONFIG: VideoSectionConfig = {
  ...VIDEO_CONFIG,
  cardTitle: 'Personal Loan',
  description:
    'At WeCredit, compare offers and apply for an instant personal loan ranging from ₹5,000 to ₹15 lakh, with interest rates starting from 9.99% p.a.* Choose from 25+ reputed lenders. Select a repayment tenure from 6 months to 5 years with EMIs that suit your budget. No collateral is required, and approval in minutes.',
  watchLabel: 'Watch: How WeCredit Works',
};

const VideoSection = ({ config = DEFAULT_VIDEO_CONFIG }: VideoSectionProps): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = useCallback((): void => {
    setIsPlaying(true);
  }, []);

  const videoDuration = '02:23';

  return (
    <section className="bg-white py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-brand-lightest rounded-2xl overflow-hidden p-4 max-w-3xl mx-auto">
          <h2 className="text-center text-black/80 text-base font-medium mb-4">
            {config.cardTitle}
          </h2>

          <p className="text-zinc-500 text-sm font-normal leading-relaxed mb-5">
            {config.description}
          </p>

          <div className="relative aspect-video rounded-sm overflow-hidden bg-gray-200">
            {isPlaying ? (
              <iframe
                src={`${config.videoUrl}?autoplay=1`}
                title={config.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <Image
                  src={config.fallbackThumbnail}
                  alt={config.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />

                <button
                  type="button"
                  onClick={handlePlayClick}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 z-10"
                  aria-label="Play video"
                >
                  <Play className="w-6 h-6 text-wc-blue-600 ml-1" fill="currentColor" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-3 px-3">
                  <div className="w-full h-1 bg-white/30 rounded-full mb-2">
                    <div className="w-1/6 h-full bg-wc-blue-500 rounded-full" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white text-xs font-medium uppercase tracking-wide">
                      {config.watchLabel}
                    </span>
                    <span className="text-white/80 text-xs">
                      {videoDuration}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoSection;
