'use client';

/**
 * PersonalLoanSubnav
 * Desktop-only sticky sidebar for Personal Loan sub-pages.
 */

import { JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PERSONAL_LOAN_SUBNAV_LINKS } from './constants';

const normalizePath = (path: string): string => {
  if (path === '/') {
    return '/';
  }
  return path.endsWith('/') ? path : `${path}/`;
};

const PersonalLoanSubnav = (): JSX.Element => {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname ?? '');

  return (
    <nav
      aria-label="Personal Loan pages"
      className="hidden lg:block rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-28"
    >
      <h2 className="mb-3 text-sm font-semibold custom-text-black">Personal Loan</h2>
      <ul className="space-y-1">
        {PERSONAL_LOAN_SUBNAV_LINKS.map((link) => {
          const linkPath = normalizePath(link.href);
          const isActive = currentPath === linkPath;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-brand-primary/10 font-medium text-brand-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PersonalLoanSubnav;
