import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const CartSummaryBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock cart data - in real app this would come from state management
  const cartItems = [
    { id: 1, name: 'Chicken Shawarma', price: 25, quantity: 2 },
    { id: 2, name: 'Falafel Wrap', price: 18, quantity: 1 },
  ];

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Hide cart summary on certain pages
  const hiddenPages = ['/login-registration', '/shopping-cart-checkout'];
  if (hiddenPages.includes(location.pathname) || totalItems === 0 || !isVisible) {
    return null;
  }

  const handleViewCart = () => {
    navigate('/shopping-cart-checkout');
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <>
      {/* Cart Summary Bar - Mobile */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-10 px-4 pb-2 safe-area-bottom">
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border animate-slide-up">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="ShoppingCart" size={20} className="text-white" />
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              </div>
              <div>
                <p className="font-medium text-text-primary">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </p>
                <p className="text-sm text-text-secondary">
                  Total: {totalPrice} SAR
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDismiss}
                className="p-1 rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-200"
              >
                <Icon name="X" size={16} />
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleViewCart}
                iconName="ArrowRight"
                iconPosition="right"
              >
                View Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Summary Sidebar - Desktop */}
      <div className="hidden md:block fixed top-32 right-4 w-80 z-10">
        {location.pathname !== '/shopping-cart-checkout' && (
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border animate-fade-in">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-text-primary flex items-center space-x-2">
                  <Icon name="ShoppingCart" size={18} />
                  <span>Your Order</span>
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                </h3>
                <button
                  onClick={handleDismiss}
                  className="p-1 rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-200"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-text-primary text-sm">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-text-primary">
                    {item.price * item.quantity} SAR
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-text-primary">Total:</span>
                <span className="font-bold text-lg text-primary">
                  {totalPrice} SAR
                </span>
              </div>
              <Button
                variant="primary"
                fullWidth
                onClick={handleViewCart}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSummaryBar;