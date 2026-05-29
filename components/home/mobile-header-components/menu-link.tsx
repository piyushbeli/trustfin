'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { GlobalLink } from '@/types/strapi';
import { cn } from '@/lib/utils';
import { hasLinkChildren, sortHeaderLinks } from '@/lib/navigation/header-links';

/** Props for MenuLink component */
interface MenuLinkProps {
  link: GlobalLink;
  onNavigate: () => void;
}

const drawerLinkClassName =
  'flex items-center gap-3 px-3 py-3 text-white rounded-lg hover:bg-white/10 transition-colors font-medium';

const drawerChildLinkClassName =
  'block px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors';

/**
 * Individual menu link with optional children expansion
 */
export const MenuLink = ({ link, onNavigate }: MenuLinkProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const children = hasLinkChildren(link) ? sortHeaderLinks(link.children) : [];

  if (children.length > 0) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className={cn('flex w-full items-center justify-between', drawerLinkClassName)}
        >
          <span>{link.label}</span>
          <svg
            className={cn('w-4 h-4 shrink-0 transition-transform', isExpanded && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && (
          <ul className="ml-4 mt-1 space-y-1 overflow-hidden">
            {children.map((child) => (
              <li key={child.id}>
                <Link
                  href={child.url}
                  target={child.openInNewTab ? '_blank' : undefined}
                  rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                  className={drawerChildLinkClassName}
                  onClick={onNavigate}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <Link
      href={link.url}
      target={link.openInNewTab ? '_blank' : undefined}
      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
      className={drawerLinkClassName}
      onClick={onNavigate}
    >
      {link.label}
    </Link>
  );
};
