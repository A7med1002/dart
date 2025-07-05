import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickFilters = ({ quickFilters, onQuickFilterToggle }) => {
  const filters = [
    { id: 'openNow', label: 'Open Now', icon: 'Clock' },
    { id: 'freeDelivery', label: 'Free Delivery', icon: 'Truck' },
    { id: 'highlyRated', label: 'Highly Rated', icon: 'Star' }
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onQuickFilterToggle(filter.id)}
          className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            quickFilters[filter.id]
              ? 'bg-success text-white shadow-md'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
          }`}
        >
          <Icon name={filter.icon} size={14} />
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickFilters;