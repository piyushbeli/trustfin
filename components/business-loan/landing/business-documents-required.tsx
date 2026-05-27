'use client';

/**
 * Documents required for a business loan — two static groups per content doc.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared';
import DocumentList from '@/components/personal-loan/documents/document-list';
import {
  BUSINESS_DOCUMENTS_SECTION_INFO,
  BUSINESS_FINANCIAL_DOCUMENTS,
  BUSINESS_IDENTITY_DOCUMENTS,
} from './constants';

const BusinessDocumentsRequired = (): JSX.Element => {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle className="mb-2 custom-text-black text-left font-semibold">
          {BUSINESS_DOCUMENTS_SECTION_INFO.title}
        </SectionTitle>
        <SectionDescription align="left" className="mb-6 custom-text-black">
          {BUSINESS_DOCUMENTS_SECTION_INFO.description}
        </SectionDescription>

        <p className="text-sm font-semibold custom-text-black mb-3">
          Identity and Address Proof
        </p>
        <DocumentList documents={BUSINESS_IDENTITY_DOCUMENTS} />

        <p className="text-sm font-semibold custom-text-black mb-3 mt-6">
          Business and Financial Documents
        </p>
        <DocumentList documents={BUSINESS_FINANCIAL_DOCUMENTS} />

        <SectionDescription align="left" className="mt-6 custom-text-black">
          {BUSINESS_DOCUMENTS_SECTION_INFO.closing}
        </SectionDescription>
      </motion.div>
    </SectionWrapper>
  );
};

export default BusinessDocumentsRequired;
