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
import DocumentGroupHeading from '@/components/personal-loan/documents/document-group-heading';
import {
  BUSINESS_DOCUMENT_GROUPS,
  BUSINESS_DOCUMENTS_SECTION_INFO,
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

        {BUSINESS_DOCUMENT_GROUPS.map((group, index) => {
          const isFirstGroup = index === 0;
          const groupSpacing = isFirstGroup ? '' : 'mt-6';

          return (
            <div key={group.id} className={groupSpacing}>
              <DocumentGroupHeading>{group.title}</DocumentGroupHeading>
              <DocumentList documents={group.documents} />
            </div>
          );
        })}

        <SectionDescription align="left" className="mt-6 custom-text-black">
          {BUSINESS_DOCUMENTS_SECTION_INFO.closing}
        </SectionDescription>
      </motion.div>
    </SectionWrapper>
  );
};

export default BusinessDocumentsRequired;
