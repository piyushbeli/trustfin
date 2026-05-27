'use client';

/**
 * InfoAccordionPanel
 * Renders the appropriate panel body based on `panel.type`.
 */

import { JSX } from 'react';
import type { PersonalLoanInfoAccordionPanel } from '../constants';

interface InfoAccordionPanelProps {
  panel: PersonalLoanInfoAccordionPanel;
}

const InfoAccordionPanel = ({ panel }: InfoAccordionPanelProps): JSX.Element => {
  if (panel.type === 'text') {
    return (
      <div className="space-y-3">
        {panel.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-sm text-gray-600 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  if (panel.type === 'fees-table') {
    return (
      <div className="space-y-4">
        {panel.intro && (
          <p className="text-sm text-gray-600 leading-relaxed">{panel.intro}</p>
        )}
        <div className="overflow-hidden rounded-lg border border-brand-primary/20">
          <table className="w-full border-collapse">
            <tbody>
              {panel.rows.map((row) => (
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
        {panel.closing && (
          <p className="text-sm text-gray-600 leading-relaxed">{panel.closing}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {panel.intro && (
        <p className="text-sm text-gray-600 leading-relaxed">{panel.intro}</p>
      )}
      {panel.items.map((item) => (
        <p key={item.id} className="text-sm text-gray-600 leading-relaxed">
          <span className="font-semibold text-gray-900">{item.title}</span>{' '}
          {item.description}
        </p>
      ))}
      {panel.closing && (
        <p className="text-sm text-gray-600 leading-relaxed">{panel.closing}</p>
      )}
    </div>
  );
};

export default InfoAccordionPanel;
