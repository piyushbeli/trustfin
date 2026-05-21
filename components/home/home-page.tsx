import React from 'react';
import HeroSection from './hero-section';
import StatsSection from './stats-section';
import ProductsSection from './products-section';
import TrendingOffersClient from './trending-offers-client';
import ToolsCalculatorsSection from './tools-calculators-section';
import TestimonialsSection from './testimonials-section';
import PartnersSection from './partners-section';
import CertificationsSection from './certifications-section';
import { FaqSection } from '@/components/shared';
import BlogSection from './blog-section';
import AppDownloadSection from './app-download-section';
import DreamsSection from './dreams-section';
import { PersonalLoanContent } from '@/components/personal-loan/personal-loan-content';

/**
 * Main home page component that composes all sections
 * Uses continuous gradient from blue to white across hero and stats
 * 
 * Lender Display Flow (PDF Steps 2 & 3):
 * - TrendingOffersClient handles all lender fetching internally
 * - Step 2: Generic lenders (client-side)
 * - Step 3: User-specific lenders when logged in (client-side)
 */
const HomePage = (): React.ReactNode => {
  return (
    <div className="min-h-screen min-w-0 overflow-x-clip">
      {/* Gradient wrapper for Hero + Stats for seamless transition */}
      <div className="min-w-0 overflow-x-clip">
        {/* Trustfin hero — static layout with boat image and CTAs */}
        <HeroSection />


      </div>

      {/* Products Section - on white background */}
      <ProductsSection />

      {/* Stats Section - integrated into gradient */}
      <StatsSection />

      {/* Our Partners Section */}
      <PartnersSection />

      
      {/* Trending Offers Section
          - Fetches generic lenders as fallback (PDF Step 2) - client-side
          - Fetches user-specific lenders when logged in (PDF Step 3) */}
      <TrendingOffersClient />

      {/* Tools & Calculators Section */}
      <ToolsCalculatorsSection />

      {/* Testimonials Section */}
      {/* <TestimonialsSection /> */}



      {/* FAQ Section */}
      <FaqSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Shared apply flow (auth/dedupe + lead form) for home page CTA */}
      <PersonalLoanContent />
    </div>
  );
};

export default HomePage;
