'use client';

/**
 * GoldMultiColumnTable
 * Responsive table for LTV illustration with multiple columns.
 */

import { JSX } from 'react';
import type { GoldMultiColumnTableRow } from './constants';

interface GoldMultiColumnTableProps {
  headers: readonly string[];
  rows: readonly GoldMultiColumnTableRow[];
}

const GoldMultiColumnTable = ({ headers, rows }: GoldMultiColumnTableProps): JSX.Element => {
  return (
    <div className="overflow-x-auto rounded-lg border border-brand-primary/20">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="bg-brand-primary/5">
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-r border-brand-primary/20 p-2 text-left font-medium text-gray-700 last:border-r-0"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.cells.map((cell, cellIndex) => (
                <td
                  key={`${row.id}-${cellIndex}`}
                  className="border-b border-r border-brand-primary/20 p-2 text-gray-600 last:border-r-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoldMultiColumnTable;
