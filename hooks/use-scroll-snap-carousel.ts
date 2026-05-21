'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseScrollSnapCarouselResult {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  selectedIndex: number;
  scrollTo: (index: number) => void;
}

/**
 * Syncs dot indicators with a horizontal scroll-snap container.
 * Uses native touch scrolling (smoother on mobile than Embla drag on image-heavy slides).
 */
export function useScrollSnapCarousel(slideCount: number): UseScrollSnapCarouselResult {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateSelectedIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container || slideCount <= 0) return;

    const slideWidth = container.clientWidth;
    if (slideWidth <= 0) return;

    const index = Math.round(container.scrollLeft / slideWidth);
    const clampedIndex = Math.min(Math.max(index, 0), slideCount - 1);
    setSelectedIndex(clampedIndex);
  }, [slideCount]);

  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container || slideCount <= 0) return;

    const targetIndex = Math.min(Math.max(index, 0), slideCount - 1);
    const slideWidth = container.clientWidth;
    container.scrollTo({ left: slideWidth * targetIndex, behavior: 'smooth' });
  }, [slideCount]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateSelectedIndex();
    container.addEventListener('scroll', updateSelectedIndex, { passive: true });

    const resizeObserver = new ResizeObserver(updateSelectedIndex);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', updateSelectedIndex);
      resizeObserver.disconnect();
    };
  }, [updateSelectedIndex]);

  return { scrollRef, selectedIndex, scrollTo };
}
