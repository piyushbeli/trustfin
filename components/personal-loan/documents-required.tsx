'use client';

/**
 * DocumentsRequired
 * Section that lists documents needed for a personal loan, with a
 * Salaried / Self-Employed toggle. Composes leaf components and owns
 * the active tab state.
 */

import { JSX, useState } from 'react';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared';
import EmploymentTabs, { type EmploymentType } from './documents/employment-tabs';
import DocumentList from './documents/document-list';
import { DOCUMENTS_SECTION_INFO, SALARIED_DOCUMENTS, SELF_EMPLOYED_DOCUMENTS } from './constants';
import { motion } from 'framer-motion';

const DocumentsRequired = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<EmploymentType>('salaried');
  const documents = activeTab === 'salaried' ? SALARIED_DOCUMENTS : SELF_EMPLOYED_DOCUMENTS;

  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle className="mb-2 custom-text-black text-left font-semibold">
          {DOCUMENTS_SECTION_INFO.title}
        </SectionTitle>
        <SectionDescription align="left" className="mb-6 custom-text-black">
          {DOCUMENTS_SECTION_INFO.description}
        </SectionDescription>

        <EmploymentTabs activeTab={activeTab} onChange={setActiveTab} />
        <DocumentList documents={documents} />

        <SectionDescription align="left" className="mt-6 custom-text-black">
          {DOCUMENTS_SECTION_INFO.closing}
        </SectionDescription>
      </motion.div>
    </SectionWrapper>
  );
};

export default DocumentsRequired;
