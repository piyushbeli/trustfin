'use client';

import { cn } from '@/lib/utils';

/** Props for BottomSheet component */
interface BottomSheetProps {
  /** Content to render inside the bottom sheet */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Bottom sheet component with rounded top corners
 * Used for login/auth forms
 */
const BottomSheet = ({ children, className }: BottomSheetProps): React.ReactNode => {
  const hasFlex = className?.includes('flex');
  return (
    <div
      className={cn(
        'bg-white rounded-t-3xl -mt-6 relative z-10 shadow-2xl',
        className
      )}
    >
      {/* Drag Indicator */}
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </div>
      {/* Content */}
      <div className={cn('px-6 pb-8', hasFlex && 'flex-1 flex flex-col')}>{children}</div>
    </div>
  );
};

export default BottomSheet;

