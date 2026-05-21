'use client';

import React, { useCallback, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getCookie } from 'cookies-next';
import { useAuth } from '@/hooks/use-auth';
import { checkStatusAll } from '@/lib/api/wecredit';
import { STORAGE_MOBILE, STORAGE_AUTH_TOKEN } from '@/lib/constants/api-keys';
import type { LenderOfferStatus, LenderType } from '@/types/wecredit';
import { getAmountUptoLabel } from '@/lib/lender-display';
import { formatTenureDisplay } from '@/lib/utils/offers-display';

/** Props for TrendingOfferCard component */
interface TrendingOfferCardProps {
  id: string;
  lenderName: string;
  logoPath?: string;
  amount: string;
  interestRate: string;
  tenure: string;
  href: string;
  index: number;
  skipAnimation?: boolean;
  lenderType?: LenderType | null;
  showLowestRateBadge?: boolean;
}

interface OfferPillProps {
  label: string;
  variant: 'brand' | 'amber';
}

/** Stacked pill badge on offer card */
const OfferPill = ({ label, variant }: OfferPillProps): React.ReactNode => {
  const className =
    variant === 'brand'
      ? 'rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-medium text-brand-primary'
      : 'rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-800';

  return <span className={className}>{label}</span>;
};

/**
 * Best offer card — tap anywhere to run eligibility flow (PDF Step 5)
 */
const TrendingOfferCard = ({
  id,
  lenderName,
  logoPath,
  amount,
  interestRate,
  tenure,
  href,
  index,
  skipAnimation = false,
  lenderType,
  showLowestRateBadge = false,
}: TrendingOfferCardProps): React.ReactNode => {
  const amountUptoLabel = getAmountUptoLabel(lenderType);
  const tenureDisplay = formatTenureDisplay(tenure);

  const hasValidLogoPath = React.useMemo((): boolean => {
    if (!logoPath || typeof logoPath !== 'string') {
      return false;
    }
    const trimmedPath = logoPath.trim();
    if (trimmedPath === '') {
      return false;
    }
    if (trimmedPath.startsWith('/')) {
      return true;
    }
    if (
      trimmedPath.startsWith('http://') ||
      trimmedPath.startsWith('https://') ||
      trimmedPath.startsWith('data:')
    ) {
      try {
        new URL(trimmedPath);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }, [logoPath]);

  const router = useRouter();
  const { isAuthenticated, openAuthModalWithAction } = useAuth();
  const [isCheckingEligibility, setIsCheckingEligibility] = useState<boolean>(false);
  const isMountedRef = useRef<boolean>(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const findLenderInOffers = useCallback(
    (lenders: LenderOfferStatus[], searchName: string): LenderOfferStatus | null => {
      if (!lenders || lenders.length === 0) {
        return null;
      }
      if (!searchName || typeof searchName !== 'string') {
        return null;
      }

      const normalizedSearchName = searchName.toLowerCase().trim();

      const matchedLender = lenders.find((lender) => {
        if (!lender?.lenderName || typeof lender.lenderName !== 'string') {
          return false;
        }
        return lender.lenderName.toLowerCase().trim() === normalizedSearchName;
      });

      return matchedLender || null;
    },
    []
  );

  const handleCheckEligibility = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) {
      openAuthModalWithAction({
        type: 'check_eligibility',
        lenderId: id,
        lenderName,
      });
      return;
    }

    if (!lenderName || typeof lenderName !== 'string') {
      router.push(`/personal-loan/lender/${lenderName || 'unknown'}`);
      return;
    }

    if (isCheckingEligibility) {
      return;
    }

    const mobile = getCookie(STORAGE_MOBILE) as string | undefined;

    if (!mobile || typeof mobile !== 'string') {
      router.push(`/personal-loan/lender/${lenderName}`);
      return;
    }

    const token = getCookie(STORAGE_AUTH_TOKEN) as string | undefined;
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    if (isMountedRef.current) {
      setIsCheckingEligibility(true);
    }

    try {
      const result = await checkStatusAll(mobile, token, abortController.signal);

      if (!isMountedRef.current) {
        return;
      }

      if (!result.success || !result.data) {
        setIsCheckingEligibility(false);
        router.push(`/personal-loan/lender/${lenderName}`);
        return;
      }

      const { lenders } = result.data;
      if (!lenders || !Array.isArray(lenders)) {
        setIsCheckingEligibility(false);
        router.push(`/personal-loan/lender/${lenderName}`);
        return;
      }

      const matchedLender = findLenderInOffers(lenders, lenderName);
      setIsCheckingEligibility(false);

      if (matchedLender) {
        router.push(`/offers/?lenderName=${encodeURIComponent(lenderName)}`);
      } else {
        router.push(`/personal-loan/lender/${lenderName}`);
      }
    } catch (error) {
      if (!isMountedRef.current) {
        return;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      setIsCheckingEligibility(false);
      router.push(`/personal-loan/lender/${lenderName}`);
    } finally {
      if (isMountedRef.current) {
        abortControllerRef.current = null;
      }
    }
  }, [
    isAuthenticated,
    openAuthModalWithAction,
    id,
    lenderName,
    href,
    router,
    isCheckingEligibility,
    findLenderInOffers,
  ]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      void handleCheckEligibility();
    }
  };

  return (
    <motion.div
      initial={skipAnimation ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={
        skipAnimation
          ? { duration: 0 }
          : {
              type: 'spring',
              stiffness: 100,
              damping: 15,
              delay: index * 0.05,
            }
      }
      className="h-full w-full"
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`Check eligibility for ${lenderName}`}
        aria-busy={isCheckingEligibility}
        onClick={() => void handleCheckEligibility()}
        onKeyDown={handleKeyDown}
        className={`flex h-full min-h-[168px] w-full cursor-pointer flex-col items-center rounded-xl border border-brand-primary bg-brand-primary/10 p-3 text-center transition-opacity ${
          isCheckingEligibility ? 'pointer-events-none opacity-70' : 'hover:border-brand-primary/20'
        }`}
      >
        <div className="mb-2 flex h-8 w-full items-center justify-center overflow-hidden">
          {hasValidLogoPath ? (
            <Image
              src={logoPath?.trim() ?? ''}
              alt={lenderName}
              width={100}
              height={32}
              className="max-h-8 w-auto max-w-full object-contain"
            />
          ) : (
            <span className="truncate text-xs font-medium text-gray-700">{lenderName}</span>
          )}
        </div>

        <p className="text-2xl font-semibold leading-tight text-brand-primary">{interestRate}</p>

        <p className="mt-1 text-sm text-gray-600">
          {amountUptoLabel} {amount}
        </p>
        <p className="text-base text-gray-600">{tenureDisplay}</p>

        <div className="mt-auto flex w-full flex-col items-center gap-1">
          {/* {showLowestRateBadge ? ( */}
            <OfferPill label="Lowest Interest Rate" variant="brand" />
          {/* // ) : null} */}
          <OfferPill label="Quick Disbursal" variant="amber" />
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingOfferCard;
