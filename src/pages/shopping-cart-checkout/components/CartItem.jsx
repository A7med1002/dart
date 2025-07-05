import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onUpdateCustomization }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      setShowDeleteConfirm(true);
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleDelete = () => {
    onRemove(item.id);
    setShowDeleteConfirm(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Main Item Display */}
      <div className="p-4">
        <div className="flex items-start space-x-4">
          {/* Product Image */}
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Item Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-text-primary truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  {item.restaurant}
                </p>
                
                {/* Customizations Preview */}
                {item.customizations && item.customizations.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-text-muted">
                      {item.customizations.slice(0, 2).map(c => c.name).join(', ')}
                      {item.customizations.length > 2 && '...'}
                    </p>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="text-right ml-4">
                <p className="font-semibold text-text-primary">
                  {item.price * item.quantity} SAR
                </p>
                {item.originalPrice && item.originalPrice > item.price && (
                  <p className="text-xs text-text-muted line-through">
                    {item.originalPrice * item.quantity} SAR
                  </p>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary transition-colors duration-200"
                >
                  <Icon name="Minus" size={14} />
                </button>
                <span className="font-medium text-text-primary min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary transition-colors duration-200"
                >
                  <Icon name="Plus" size={14} />
                </button>
              </div>

              {/* Expand/Collapse Button */}
              <button
                onClick={toggleExpanded}
                className="flex items-center space-x-1 text-primary hover:text-primary-700 transition-colors duration-200"
              >
                <span className="text-sm font-medium">
                  {isExpanded ? 'Less' : 'More'}
                </span>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className={`transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border p-4 bg-background animate-fade-in">
          {/* Customizations */}
          {item.customizations && item.customizations.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-text-primary mb-2">Customizations</h4>
              <div className="space-y-2">
                {item.customizations.map((customization, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{customization.name}</span>
                    <span className="text-text-primary">
                      +{customization.price} SAR
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          {item.specialInstructions && (
            <div className="mb-4">
              <h4 className="font-medium text-text-primary mb-2">Special Instructions</h4>
              <p className="text-sm text-text-secondary bg-surface p-3 rounded-lg">
                {item.specialInstructions}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={() => onUpdateCustomization(item.id)}
            >
              Modify
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={() => setShowDeleteConfirm(true)}
              className="text-error hover:text-error hover:bg-error/10"
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative bg-surface rounded-lg p-6 max-w-sm w-full animate-scale-in">
            <div className="text-center">
              <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Trash2" size={24} className="text-error" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Remove Item?</h3>
              <p className="text-text-secondary text-sm mb-6">
                Are you sure you want to remove "{item.name}" from your cart?
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  fullWidth
                  onClick={handleDelete}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;