'use client';

/**
 * MultiColumnTable
 * Responsive data table with lavender header row — used on gold loan and PL interest rates pages.
 */

import { JSX } from 'react';
import { cn } from '@/lib/utils';

export interface MultiColumnTableRow {
  id: string;
  cells: readonly string[];
}

interface MultiColumnTableProps {
  headers: readonly string[];
  rows: readonly MultiColumnTableRow[];
  /** Minimum table width before horizontal scroll kicks in */
  minWidthClassName?: string;
  className?: string;
}

const MultiColumnTable = ({
  headers,
  rows,
  minWidthClassName = 'min-w-[480px]',
  className,
}: MultiColumnTableProps): JSX.Element => {
  return (
    <div
      className={cn(
        'overflow-x-auto rounded-lg border border-brand-primary/20',
        className
      )}
    >
      <table className={cn('w-full border-collapse text-sm', minWidthClassName)}>
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

export default MultiColumnTable;
