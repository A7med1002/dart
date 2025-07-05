import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ sortBy, onSortChange, resultsCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'deliveryTime', label: 'Fastest Delivery' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'deliveryFee', label: 'Lowest Delivery Fee' }
  ];

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  const currentSort = sortOptions.find(option => option.value === sortBy);

  return (
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm text-text-secondary">
        {resultsCount} restaurants found
      </p>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-text-primary hover:bg-gray-200 transition-colors duration-200"
        >
          <span>Sort: {currentSort?.label}</span>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface rounded-lg shadow-elevation-2 border border-border z-20 animate-fade-in">
              <div className="py-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors duration-200 ${
                      sortBy === option.value 
                        ? 'text-primary font-medium bg-primary/5' :'text-text-primary'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;