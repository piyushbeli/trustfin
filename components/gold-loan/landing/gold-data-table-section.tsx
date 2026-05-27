'use client';

/**
 * GoldDataTableSection
 * Section with title, intro, two-column data table, and optional footer note.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle, SectionDescription } from '@/components/shared';
import GoldDataTable from './gold-data-table';
import type { GoldDataTableSectionConfig } from './constants';

interface GoldDataTableSectionProps {
  config: GoldDataTableSectionConfig;
}

const GoldDataTableSection = ({ config }: GoldDataTableSectionProps): JSX.Element => {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
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
      </motion.div>
    </SectionWrapper>
  );
};

export default GoldDataTableSection;
