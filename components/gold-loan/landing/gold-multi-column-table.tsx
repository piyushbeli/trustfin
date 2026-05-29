'use client';

/**
 * GoldMultiColumnTable
 * Re-exports shared MultiColumnTable for gold loan LTV tables.
 */

import { JSX } from 'react';
import MultiColumnTable from '@/components/shared/multi-column-table';
import type { GoldMultiColumnTableRow } from './constants';

interface GoldMultiColumnTableProps {
  headers: readonly string[];
  rows: readonly GoldMultiColumnTableRow[];
}

const GoldMultiColumnTable = ({ headers, rows }: GoldMultiColumnTableProps): JSX.Element => {
  return <MultiColumnTable headers={headers} rows={rows} />;
};

export default GoldMultiColumnTable;
