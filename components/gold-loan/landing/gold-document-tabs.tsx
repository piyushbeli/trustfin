'use client';

/**
 * GoldDocumentTabs
 * Toggle pills that switch between Standard KYC and Additional document lists.
 * Mirrors the personal loan EmploymentTabs pattern.
 */

import { JSX } from 'react';
import { cn } from '@/lib/utils';

export type GoldDocumentTabId = 'standard-kyc' | 'additional';

interface GoldDocumentTabsProps {
  activeTab: GoldDocumentTabId;
  onChange: (tab: GoldDocumentTabId) => void;
}

interface TabConfig {
  id: GoldDocumentTabId;
  label: string;
}

const TABS: TabConfig[] = [
  { id: 'standard-kyc', label: 'Standard KYC' },
  { id: 'additional', label: 'Additional Documents' },
];

const GoldDocumentTabs = ({ activeTab, onChange }: GoldDocumentTabsProps): JSX.Element => {
  return (
    <div className="flex mb-6 w-full">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex-1 text-sm font-medium leading-5 py-3 transition-colors',
              isActive
                ? 'bg-brand-50 border-b-2 border-brand-primary text-gray-900'
                : 'bg-transparent border-b-2 border-transparent text-gray-700',
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default GoldDocumentTabs;
