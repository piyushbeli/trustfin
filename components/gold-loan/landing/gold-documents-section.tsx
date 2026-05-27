'use client';

/**
 * GoldDocumentsSection
 * Documents required for a gold loan — Standard KYC / Additional tabs
 * (same pattern as personal loan DocumentsRequired).
 */

import { JSX, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared';
import DocumentList from '@/components/personal-loan/documents/document-list';
import GoldDocumentTabs, { type GoldDocumentTabId } from './gold-document-tabs';
import {
  GOLD_ADDITIONAL_DOCUMENTS,
  GOLD_DOCUMENTS_SECTION,
  GOLD_STANDARD_KYC_DOCUMENTS,
} from './constants';

const GoldDocumentsSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<GoldDocumentTabId>('standard-kyc');
  const documents =
    activeTab === 'standard-kyc' ? GOLD_STANDARD_KYC_DOCUMENTS : GOLD_ADDITIONAL_DOCUMENTS;

  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle className="mb-2 custom-text-black text-left font-semibold">
          {GOLD_DOCUMENTS_SECTION.title}
        </SectionTitle>
        <SectionDescription align="left" className="mb-6 custom-text-black">
          {GOLD_DOCUMENTS_SECTION.intro}
        </SectionDescription>

        <GoldDocumentTabs activeTab={activeTab} onChange={setActiveTab} />
        <DocumentList documents={documents} />

        <SectionDescription align="left" className="mt-6 custom-text-black">
          {GOLD_DOCUMENTS_SECTION.closing}
        </SectionDescription>
      </motion.div>
    </SectionWrapper>
  );
};

export default GoldDocumentsSection;
