import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  title = "No items found", 
  description = "Try adjusting your search or browse different categories",
  iconName = "Search",
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon name={iconName} size={32} className="text-text-secondary" />
      </div>
      
      <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
        {title}
      </h3>
      
      <p className="text-text-secondary mb-6 max-w-sm">
        {description}
      </p>
      
      {actionText && onAction && (
        <Button
          variant="primary"
          onClick={onAction}
          iconName="RefreshCw"
          iconPosition="left"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;