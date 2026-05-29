import type { GlobalLink } from '@/types/strapi';

/** Whether a link has nested children to render as an expandable group. */
export const hasLinkChildren = (link: GlobalLink): boolean =>
  Array.isArray(link.children) && link.children.length > 0;

/** Sort links by `order`; missing order sorts after explicit values. */
export const sortHeaderLinks = (links: GlobalLink[]): GlobalLink[] =>
  [...links].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
