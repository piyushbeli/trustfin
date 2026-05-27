'use client';

/**
 * GoldDataTable
 * Two-column table using brand styling consistent with info accordion panels.
 */

import { JSX } from 'react';
import type { GoldTableRow } from './constants';

interface GoldDataTableProps {
  rows: readonly GoldTableRow[];
}

const GoldDataTable = ({ rows }: GoldDataTableProps): JSX.Element => {
  return (
    <div className="overflow-hidden rounded-lg border border-brand-primary/20">
      <table className="w-full border-collapse">
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="w-36 border-b border-r border-brand-primary/20 bg-brand-primary/5 p-2 text-sm text-gray-700">
                {row.label}
              </td>
              <td className="border-b border-brand-primary/20 p-2 text-sm text-gray-600">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoldDataTable;
