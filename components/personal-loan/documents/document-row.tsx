import { JSX } from 'react';
import type { DocumentItem } from '../constants';

interface DocumentRowProps {
  document: DocumentItem;
}

/** Single document line rendered as a hyphen bullet */
const DocumentRow = ({ document }: DocumentRowProps): JSX.Element => {
  return (
    <p className="text-sm text-gray-700 leading-5">
      - <span className="font-medium">{document.title}</span> {document.description}
    </p>
  );
};

export default DocumentRow;
