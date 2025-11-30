import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = React.memo(({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  sortOrder,
  onSortOrderChange
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = useCallback((value: string) => {
    setLocalSearchTerm(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onSearchChange(value);
    }, 300);
  }, [onSearchChange]);

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 mb-6">

      {/* MOBILE STACK / DESKTOP ROW */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4">

        {/* SEARCH BAR */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={localSearchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg
                       text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
          />
        </div>

        {/* CATEGORY + SORT (GROUPED ON MOBILE) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-2">

          {/* CATEGORY FILTER */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="flex-1 sm:flex-none bg-gray-800 border border-gray-600 rounded-lg px-3 py-2
                        text-white focus:outline-none focus:ring-2 focus:ring-blue-500
                        transition-all duration-200"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* SORT ORDER BUTTON */}
          <button
            onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center justify-center gap-2 bg-gray-800 border border-gray-600
                       rounded-lg px-3 py-2 text-white hover:bg-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition-all duration-200"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="text-sm">{sortOrder === 'asc' ? 'Low to High' : 'High to Low'}</span>
          </button>

        </div>
      </div>
    </div>
  );
});
