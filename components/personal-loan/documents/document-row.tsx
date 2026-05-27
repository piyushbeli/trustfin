import { JSX } from 'react';
import Image from 'next/image';
import { IMAGES } from '@/lib/constants/images';
import type { DocumentItem } from '../constants';

interface DocumentRowProps {
  document: DocumentItem;
}

/** Single document line with icon, title, and description */
const DocumentRow = ({ document }: DocumentRowProps): JSX.Element => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-4 h-4 shrink-0 mt-1">
        <Image
          src={IMAGES.ICONS.DOCUMENT}
          alt="Document icon"
          width={14}
          height={14}
          className="w-3.5 h-3.5"
        />
      </div>
      <div className="flex-1">
        <span className="text-zinc-800 text-sm font-medium leading-5">{document.title}</span>
        <br />
        <span className="text-zinc-500 text-xs font-normal leading-5">{document.description}</span>
      </div>
    </div>
  );
};

export default DocumentRow;
