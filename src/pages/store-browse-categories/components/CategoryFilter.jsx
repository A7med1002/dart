import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onCategoryChange('all')}
        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          activeCategory === 'all' ?'bg-primary text-white shadow-md' :'bg-gray-100 text-text-secondary hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category.id
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
          }`}
        >
          <Icon name={category.icon} size={16} />
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;