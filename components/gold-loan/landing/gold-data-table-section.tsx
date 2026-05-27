/**
 * GoldDataTableSection
 * Section with title, intro, two-column data table, and optional footer note.
 */

import { JSX } from 'react';
import { SectionWrapper, SectionTitle, SectionDescription } from '@/components/shared';
import GoldDataTable from './gold-data-table';
import type { GoldDataTableSectionConfig } from './constants';

interface GoldDataTableSectionProps {
  config: GoldDataTableSectionConfig;
}

const GoldDataTableSection = ({ config }: GoldDataTableSectionProps): JSX.Element => {
  return (
    <SectionWrapper>
      <div
        className="space-y-4"
      >
        <SectionTitle className="custom-text-black text-left font-semibold">
          {config.title}
        </SectionTitle>

        {config.intro && (
          <SectionDescription align="left" className="custom-text-black">
            {config.intro}
          </SectionDescription>
        )}

        <GoldDataTable rows={config.rows} />

        {config.footerNote && (
          <SectionDescription align="left" className="custom-text-black">
            {config.footerNote}
          </SectionDescription>
        )}
      </div>
    </SectionWrapper>
  );
};

export default GoldDataTableSection;
