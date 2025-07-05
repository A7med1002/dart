import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ isOpen, onClose, filters, onFilterChange, onApplyFilters, onClearFilters }) => {
  if (!isOpen) return null;

  const cuisineTypes = [
    'Fast Food', 'Arabic', 'Asian', 'Italian', 'Mexican', 'Indian', 'Desserts', 'Healthy'
  ];

  const deliveryTimes = [
    { label: 'Under 30 min', value: 30 },
    { label: '30-45 min', value: 45 },
    { label: '45-60 min', value: 60 },
    { label: 'Over 60 min', value: 999 }
  ];

  const ratings = [
    { label: '4.5+ Stars', value: 4.5 },
    { label: '4.0+ Stars', value: 4.0 },
    { label: '3.5+ Stars', value: 3.5 },
    { label: '3.0+ Stars', value: 3.0 }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Filter Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-2xl shadow-elevation-3 z-50 animate-slide-up max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-lg text-text-primary">
              Filters
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="p-4 space-y-6">
            {/* Cuisine Type */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Cuisine Type</h4>
              <div className="flex flex-wrap gap-2">
                {cuisineTypes.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => onFilterChange('cuisine', cuisine)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      filters.cuisine.includes(cuisine)
                        ? 'bg-primary text-white' :'bg-gray-100 text-text-secondary hover:bg-gray-200'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Time */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Delivery Time</h4>
              <div className="space-y-2">
                {deliveryTimes.map((time) => (
                  <label key={time.value} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="deliveryTime"
                      value={time.value}
                      checked={filters.deliveryTime === time.value}
                      onChange={() => onFilterChange('deliveryTime', time.value)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <span className="text-text-primary">{time.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Order */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Minimum Order</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={filters.minOrder}
                    onChange={(e) => onFilterChange('minOrder', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </label>
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>0 SAR</span>
                  <span className="font-medium text-text-primary">{filters.minOrder} SAR</span>
                  <span>100+ SAR</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Rating</h4>
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <label key={rating.value} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="rating"
                      value={rating.value}
                      checked={filters.rating === rating.value}
                      onChange={() => onFilterChange('rating', rating.value)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
                      <span className="text-text-primary">{rating.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Distance */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Distance</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={filters.distance}
                    onChange={(e) => onFilterChange('distance', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </label>
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>1 km</span>
                  <span className="font-medium text-text-primary">{filters.distance} km</span>
                  <span>20+ km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="p-4 border-t border-border bg-surface">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              onClick={onApplyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;