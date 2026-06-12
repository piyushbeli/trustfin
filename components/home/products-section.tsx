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
  // {
  //   id: 'credit-cards',
  //   label: 'Credit\nCards',
  //   href: '/credit-cards',
  //   icon: CreditCard,
  // },
];

/**
 * Our Products — mobile: swipe row with bordered cards; desktop: centered grid
 */
const ProductsSection = (): React.ReactNode => {
  return (
    <section className="mb-2 min-w-0 bg-white py-4 md:mt-5 md:py-0">
      {/* Mobile — section padding on parent, not the scroll container (avoids edge flush at scroll 0) */}
      <div className="common-section-wrapper md:hidden">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Our Products</h2>
          <span className="text-sm text-gray-500">Swipe to explore</span>
        </div>

        <div className="min-w-0 overflow-hidden">
          <div
            className="wc-products-scroll scrollbar-hide flex snap-x snap-mandatory gap-3 pb-1"
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
      </div>

      {/* Desktop header */}
      <h2 className="mb-6 hidden px-4 text-center text-lg font-medium md:block">
        Our Products
      </h2>

      {/* Desktop: grid */}
      <div className="mx-auto hidden common-section-wrapper grid-cols-3 gap-2 px-4 md:grid lg:grid-cols-5">
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
