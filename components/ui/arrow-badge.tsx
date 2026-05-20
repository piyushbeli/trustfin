import React from 'react';

/** Props for ArrowBadge component */
interface ArrowBadgeProps {
  /** Badge text content */
  text: string;
  /** Optional custom class names */
  className?: string;
}

/**
 * Arrow-styled ribbon badge component
 * Displays text with an arrow/ribbon shape pointing inward (right)
 */
const ArrowBadge = ({ text, className = '' }: ArrowBadgeProps): React.ReactNode => {
  return (
    <div
      className={`relative text-white text-[10px] font-medium pl-4 pr-2 py-0.5 bg-linear-to-r from-brand-primary/60 via-brand-primary/90 to-brand-primary ${className}`}
      style={{
        clipPath: 'polygon(0% 0%, 10px 50%, 0% 100%, 100% 100%, 100% 0%)',
      }}
    >
      {text}
    </div>
  );
};

export default ArrowBadge;

