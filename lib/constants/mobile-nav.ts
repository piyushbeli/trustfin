import type { GlobalLink } from '@/types/strapi';

/** Nav items shown only when the user is authenticated (e.g. Loan Status). */
export const AUTH_NAV_LINKS: GlobalLink[] = [
  {
    id: 100,
    order: 0,
    label: 'Loan Status',
    url: '/offers/',
    openInNewTab: false,
    children: [],
  },
];
