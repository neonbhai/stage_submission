import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClear }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={20} className="text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="w-full pl-10 pr-10 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-3 flex items-center"
          aria-label="Clear search"
        >
          <X size={20} className="text-gray-400" />
        </button>
      )}
    </div>
  );
};