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
  { id: 'salaried', label: 'Salaried' },
  { id: 'self-employed', label: 'Self-Employed' },
];

const EmploymentTabs = ({ activeTab, onChange }: EmploymentTabsProps): JSX.Element => {
  return (
    <div className="flex justify-center mb-6">
      <div className="w-60 h-10 bg-brand-primary/10 rounded-lg p-1 flex items-center">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'w-28 h-8 rounded-md text-xs font-medium leading-5 transition-colors',
                isActive
                  ? 'bg-brand-primary text-white'
                  : 'bg-transparent text-zinc-800',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EmploymentTabs;
