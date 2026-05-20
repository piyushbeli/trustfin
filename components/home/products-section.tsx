'use client';

import { motion } from 'framer-motion';
import {
  ShoppingBag,
  BriefcaseBusiness,
  CreditCard,
  Home,
  Car,
  Coins,
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
    icon: ShoppingBag,
  },
  {
    id: 'credit-cards',
    label: 'Credit\nCards',
    href: '/credit-cards',
    icon: CreditCard,
  },
  {
    id: 'business-loan',
    label: 'Business\nLoan',
    href: '/business-loan',
    icon: BriefcaseBusiness,
  },
  {
    id: 'car-loan',
    label: 'Car\nLoan',
    href: '/car-loan',
    icon: Car,
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
];

/**
 * Our Products section with 4-column grid
 */
const ProductsSection = (): React.ReactNode => {
  return (
    <section className="bg-white py-4 px-4 md:mt-5 md:py-0">
      {/* Section Title */}
      <motion.h2
        className="text-lg font-medium text-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        Our Products
      </motion.h2>

      {/* Products Grid */}
     <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 mx-auto max-w-3xl">


        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            label={product.label.replace('\n', ' ')}
            href={product.href}
            icon={product.icon}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;

