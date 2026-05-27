import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { IMAGES } from '@/lib/constants/images';

/** Blog post configuration */
interface BlogPost {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  href: string;
}

/** Static blog posts data */
const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How to Automate Your Bank Savings Like a Pro',
    description:
      'Learn practical steps to automate your savings and grow your wealth effortlessly.',
    imagePath: IMAGES.ILLUSTRATIONS.EMI_CALC,
    href: 'https://wecredit.co.in/blog/how-to-automate-your-bank-savings-like-a-pro/',
  },
  {
    id: 'blog-2',
    title: 'Secure Your Emergency Fund With These Options',
    description:
      'Explore the best options to keep your emergency fund safe and accessible.',
    imagePath: IMAGES.ILLUSTRATIONS.PERSONAL_LOAN,
    href: 'https://wecredit.co.in/blog/secure-your-emergency-fund-with-these-options/',
  },
  {
    id: 'blog-3',
    title: 'India’s 5 Best Apps to Track and Save Money Easily',
    description:
      'Discover top apps for tracking expenses and boosting your savings in India.',
    imagePath: IMAGES.ILLUSTRATIONS.CREDIT_SCORE,
    href: 'https://wecredit.co.in/blog/india-s-5-best-apps-to-track-and-save-money-easily/',
  },
  {
    id: 'blog-4',
    title: 'SIP vs RD: What’s Best for Your Money Goals?',
    description:
      'Compare SIP and RD to choose the right investment for your financial goals.',
    imagePath: IMAGES.ILLUSTRATIONS.BUSINESS_LOAN_CALC,
    href: 'https://wecredit.co.in/blog/sip-vs-rd-what-s-best-for-your-money-goals/',
  },
];

/** Props for BlogCard component */
interface BlogCardProps {
  post: BlogPost;
  index: number;
}

/**
 * Single blog card — inset image, title, description, Read More CTA
 */
const BlogCard = ({ post, index }: BlogCardProps): React.ReactNode => {
  return (
    <div
      className="min-w-0"
    >
      <Link
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-lg border border-brand-primary bg-brand-50/80 p-2 transition-colors hover:border-brand-primary/20"
      >
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-brand-100">
          <Image
            src={post.imagePath}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>

        <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-zinc-900 transition-colors group-hover:text-brand-600 sm:text-base">
          {post.title}
        </h3>
        <p className="mt-1 line-clamp-3 text-xs text-zinc-600 sm:text-sm">{post.description}</p>

        <span className="mt-3 flex items-center gap-1 text-sm font-medium text-brand-primary">
          Read More
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
        </span>
      </Link>
    </div>
  );
};

/**
 * Smart Money Guides — 2x2 card grid on sm+, stacked on narrow mobile
 */
const BlogSection = (): React.ReactNode => {
  return (
    <section className="min-w-0 bg-white px-4 py-6 sm:py-10 md:py-12 common-section-wrapper">
      <h2
        className="mb-6 text-center text-xl font-semibold text-zinc-900 sm:mb-8 sm:text-2xl"
      >
        Smart Money Guides
        <br />
        <span className="text-brand-primary">For everyday Needs</span>
      </h2>

      <div className="mx-auto grid w-full min-w-0 grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-4 md:gap-5">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
