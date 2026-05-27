'use client';

/**
 * InfoAccordionPanel
 * Renders the appropriate panel body based on `panel.type`.
 */

import { JSX } from 'react';
import type {
  PersonalLoanInfoAccordionPanel,
} from '../constants';
import BenefitsGrid from '../benefits/benefits-grid';

interface InfoAccordionPanelProps {
  panel: PersonalLoanInfoAccordionPanel;
}

const InfoAccordionPanel = ({ panel }: InfoAccordionPanelProps): JSX.Element => {
  if (panel.type === 'text') {
    return <p className="text-sm text-gray-400 leading-relaxed">{panel.body}</p>;
  }

  if (panel.type === 'fees-table') {
    return (
      <div className="overflow-hidden rounded-lg border border-brand-primary/20">
        <table className="w-full border-collapse">
          <tbody>
            {panel.rows.map((row) => (
              <tr key={row.id} className="bg-black/0">
                <td className="w-36 border-r border-brand-primary/20 bg-black/10 p-2 text-sm text-gray-200">
                  {row.label}
                </td>
                <td className="p-2 text-sm text-gray-400">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <BenefitsGrid items={panel.items} />
    </div>
  );
};

export default InfoAccordionPanel;

