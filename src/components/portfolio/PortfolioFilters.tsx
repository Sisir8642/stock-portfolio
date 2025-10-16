import React from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

interface PortfolioFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: 'ticker' | 'gainLoss' | 'value';
  onSortChange: (value: 'ticker' | 'gainLoss' | 'value') => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderToggle: () => void;
}

export const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderToggle,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by ticker or company name..."
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as any)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="ticker">Sort by Ticker</option>
          <option value="gainLoss">Sort by Gain/Loss</option>
          <option value="value">Sort by Value</option>
        </select>

        <button
          onClick={onSortOrderToggle}
          className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          aria-label="Toggle sort order"
        >
          <ArrowUpDown className="w-5 h-5" />
          <span className="ml-2 text-sm">{sortOrder === 'asc' ? '↑' : '↓'}</span>
        </button>
      </div>
    </div>
  );
};