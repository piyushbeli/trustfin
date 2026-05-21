'use client';

import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  CreditCard,
  Home,
  Car,
  Coins,
  User2Icon,
} from 'lucide-react';
import ProductCard from './product-card';
import type { LucideIcon } from 'lucide-react';

/** Product configuration */
interface Product {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Products data — Lucide icons use brand-primary from ProductCard (SSOT) */
const products: Product[] = [
  {
    id: 'personal-loan',
    label: 'Personal\nLoan',
    href: '/personal-loan',
    icon: User2Icon,
  },
  {
    id: 'home-loan',
    label: 'Home\nLoan',
    href: '/home-loan',
    icon: Home,
  },
  {
    id: 'gold-loan',
    label: 'Gold\nLoan',
    href: '/gold-loan',
    icon: Coins,
  },
  {
    id: 'car-loan',
    label: 'Car\nLoan',
    href: '/car-loan',
    icon: Car,
  },
  {
    id: 'business-loan',
    label: 'Business\nLoan',
    href: '/business-loan',
    icon: BriefcaseBusiness,
  },
  {
    id: 'credit-cards',
    label: 'Credit\nCards',
    href: '/credit-cards',
    icon: CreditCard,
  },
];

/**
 * Our Products — mobile: swipe row with bordered cards; desktop: centered grid
 */
const ProductsSection = (): React.ReactNode => {
  return (
    <section className="min-w-0 bg-white py-4 md:mt-5 md:py-0">
      {/* Mobile header */}
      <motion.div
        className="mb-4 flex items-center justify-between px-4 md:hidden"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-gray-900">Our Products</h2>
        <span className="text-sm text-gray-500">Swipe to explore</span>
      </motion.div>

      {/* Desktop header */}
      <motion.h2
        className="mb-6 hidden px-4 text-center text-lg font-medium md:block"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        Our Products
      </motion.h2>

      {/* Mobile: horizontal scroll — wc-products-scroll + min-w-0 prevent page-level overflow */}
      <div className="min-w-0 max-w-full overflow-hidden md:hidden">
        <div
          className="wc-products-scroll scrollbar-hide flex snap-x snap-mandatory gap-3 px-4 pb-1"
          role="region"
          aria-label="Our products"
        >
          {products.map((product, index) => (
            <div key={product.id} className="w-auto shrink-0 snap-start">
              <ProductCard
                id={product.id}
                label={product.label}
                href={product.href}
                icon={product.icon}
                index={index}
                variant="compact"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="mx-auto hidden max-w-3xl grid-cols-3 gap-2 px-4 md:grid lg:grid-cols-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            label={product.label}
            href={product.href}
            icon={product.icon}
            index={index}
            variant="compact"
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
