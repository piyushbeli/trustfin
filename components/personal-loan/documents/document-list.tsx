import { JSX } from 'react';
import DocumentRow from './document-row';
import type { DocumentItem } from '../constants';

interface DocumentListProps {
  documents: DocumentItem[];
}

/** Vertical list of DocumentRows */
const DocumentList = ({ documents }: DocumentListProps): JSX.Element => {
  return (
    <div className="space-y-5">
      {documents.map((doc) => (
        <DocumentRow key={doc.id} document={doc} />
      ))}
    </div>
  );
};

export default DocumentList;
