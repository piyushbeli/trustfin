import { JSX } from 'react';
import DocumentRow from './document-row';
import type { DocumentItem } from '../constants';
import { SectionDescription } from '@/components/shared';
import { HOME_ELIGIBILITY_SECTION } from '@/components/home-loan/landing/constants';

interface DocumentListProps {
  documents: DocumentItem[];
}

/** Vertical list of DocumentRows */
const DocumentList = ({ documents }: DocumentListProps): JSX.Element => {
  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <DocumentRow key={doc.id} document={doc} />
      ))}
       <SectionDescription align="left" className="custom-text-black">
         {HOME_ELIGIBILITY_SECTION.closingNote}
        </SectionDescription>
    </div>
  );
};

export default DocumentList;
