'use client';

/**
 * EmploymentTabs
 * Toggle pills that switch between Salaried and Self-Employed document lists.
 * Stateless on its own - the parent owns the active tab.
 */

import { JSX } from 'react';
import { cn } from '@/lib/utils';

export type EmploymentType = 'salaried' | 'self-employed';

interface EmploymentTabsProps {
  activeTab: EmploymentType;
  onChange: (tab: EmploymentType) => void;
}

interface TabConfig {
  id: EmploymentType;
  label: string;
}

const TABS: TabConfig[] = [
  { id: 'salaried', label: 'Salaried Applicants' },
  { id: 'self-employed', label: 'Self-Employed Applicants' },
];

const EmploymentTabs = ({ activeTab, onChange }: EmploymentTabsProps): JSX.Element => {
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

export default EmploymentTabs;
