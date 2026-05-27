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
import { SALARIED_DOCUMENTS, SELF_EMPLOYED_DOCUMENTS } from './constants';

const DocumentsRequired = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<EmploymentType>('salaried');
  const documents = activeTab === 'salaried' ? SALARIED_DOCUMENTS : SELF_EMPLOYED_DOCUMENTS;

  return (
    <SectionWrapper className="bg-white">
      <SectionTitle className="mb-2">Documents Required for Personal Loan</SectionTitle>
      <SectionDescription align="left" className="mb-6">
        Basically it depends on the lender how they verify the customer, here are some common
        documents required for personal loan application.
      </SectionDescription>

      <EmploymentTabs activeTab={activeTab} onChange={setActiveTab} />
      <DocumentList documents={documents} />
    </SectionWrapper>
  );
};

export default DocumentsRequired;
