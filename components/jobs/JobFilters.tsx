'use client';

import { Search, ChevronDown } from 'lucide-react';

interface JobFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  locationValue: string;
  onLocationChange: (value: string) => void;
  locations: string[];
  onClearFilters: () => void;
  placeholders: {
    search: string;
    location: string;
    clearFilters: string;
  };
}

export function JobFilters({
  searchValue,
  onSearchChange,
  locationValue,
  onLocationChange,
  locations,
  onClearFilters,
  placeholders,
}: JobFiltersProps) {
  const hasFilters = searchValue || locationValue !== 'all';

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search Input */}
      <div className="flex-1">
        <label className="block text-[13px] font-medium text-[#4c4d58] mb-2">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholders.search}
            className="w-full h-[44px] pl-4 pr-10 border border-gray-300 rounded-[6px] text-[14px] text-[#4c4d58] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B894] focus:border-transparent transition-all"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        </div>
      </div>

      {/* Location Filter */}
      <div className="w-full md:w-[200px]">
        <label className="block text-[13px] font-medium text-[#4c4d58] mb-2">
          Filter by Location
        </label>
        <div className="relative">
          <select
            value={locationValue}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full h-[44px] pl-4 pr-10 border border-gray-300 rounded-[6px] text-[14px] text-[#4c4d58] bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B894] focus:border-transparent transition-all"
          >
            <option value="all">{placeholders.location}</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            className="h-[44px] px-4 text-[14px] text-[#00B894] hover:text-[#009874] font-medium transition-colors"
          >
            {placeholders.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}

