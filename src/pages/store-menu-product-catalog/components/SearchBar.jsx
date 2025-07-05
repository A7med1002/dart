import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, placeholder = "Search menu items..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="p-4 bg-surface border-b border-border">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <Icon name="Search" size={18} className="text-text-secondary" />
        </div>
        
        <Input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
          className={`w-full pl-10 pr-10 transition-all duration-200 ${
            isExpanded ? 'ring-2 ring-primary' : ''
          }`}
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-200"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="mt-2 text-sm text-text-secondary">
          Searching for "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;