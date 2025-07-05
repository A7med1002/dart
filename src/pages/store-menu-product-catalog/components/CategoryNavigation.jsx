import React, { useRef, useEffect } from 'react';

const CategoryNavigation = ({ categories, activeCategory, onCategoryChange }) => {
  const scrollRef = useRef(null);
  const categoryRefs = useRef({});

  useEffect(() => {
    // Scroll active category into view
    if (categoryRefs.current[activeCategory] && scrollRef.current) {
      const activeElement = categoryRefs.current[activeCategory];
      const container = scrollRef.current;
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeElement.getBoundingClientRect();
      
      if (elementRect.left < containerRect.left || elementRect.right > containerRect.right) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-16 md:top-30 z-20 bg-surface border-b border-border">
      <div className="overflow-x-auto scrollbar-hide" ref={scrollRef}>
        <div className="flex space-x-1 p-4 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              ref={(el) => categoryRefs.current[category.id] = el}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200 hover:text-text-primary'
              }`}
            >
              {category.name}
              {category.count && (
                <span className={`ml-2 text-xs ${
                  activeCategory === category.id ? 'text-white/80' : 'text-text-muted'
                }`}>
                  ({category.count})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;