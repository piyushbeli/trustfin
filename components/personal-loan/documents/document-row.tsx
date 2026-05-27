import { JSX } from 'react';
import type { DocumentItem } from '../constants';

interface DocumentRowProps {
  document: DocumentItem;
}

/** Single document line rendered as a hyphen bullet */
const DocumentRow = ({ document }: DocumentRowProps): JSX.Element => {
  return (
    <p className="text-sm leading-5 flex flex-col items-start justify-between gap-2">
      <span className="font-medium">{document.title}</span>
      <span className="text-sm font-normal custom-text-black">{document.description}</span>
    </p>
  );
};

export default DocumentRow;
