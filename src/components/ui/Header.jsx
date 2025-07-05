import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard-home':
        return 'Dashboard';
      case '/store-browse-categories':
        return 'Browse Stores';
      case '/store-menu-product-catalog':
        return 'Menu';
      case '/shopping-cart-checkout':
        return 'Cart & Checkout';
      case '/custom-delivery-request':
        return 'Custom Delivery';
      case '/login-registration':
        return 'Welcome';
      default:
        return 'Dart Delivery';
    }
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
  };

  const handleSearchClick = () => {
    if (location.pathname !== '/store-browse-categories') {
      navigate('/store-browse-categories');
    }
  };

  const handleLogoClick = () => {
    navigate('/dashboard-home');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border safe-area-top">
      <div className="container-safe">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 focus-ring rounded-lg p-1 tap-highlight-none"
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5 15L5.5 17.5L8 18L5.5 18.5L5 21L4.5 18.5L2 18L4.5 17.5L5 15Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="font-heading font-bold text-lg text-text-primary hidden sm:block">
                Dart Delivery
              </span>
            </button>
          </div>

          {/* Page Title - Mobile */}
          <div className="flex-1 text-center sm:hidden">
            <h1 className="font-heading font-semibold text-lg text-text-primary">
              {getPageTitle()}
            </h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <button
                onClick={handleSearchClick}
                className="w-full flex items-center px-4 py-2 bg-background border border-border rounded-lg text-text-muted hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
              >
                <Icon name="Search" size={18} className="mr-3" />
                <span className="text-sm">Search restaurants, food...</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button - Mobile */}
            <button
              onClick={handleSearchClick}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100 focus-ring tap-highlight-none transition-colors duration-200"
            >
              <Icon name="Search" size={20} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100 focus-ring tap-highlight-none transition-colors duration-200 relative"
              >
                <Icon name="Bell" size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
                  3
                </span>
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-elevation-2 border border-border z-200 animate-fade-in">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-heading font-semibold text-text-primary">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 hover:bg-background transition-colors duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm text-text-primary font-medium">
                            Your order is on the way!
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            Estimated delivery: 15 minutes
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-background transition-colors duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm text-text-primary font-medium">
                            Order delivered successfully
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            Thank you for choosing Dart Delivery
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-background transition-colors duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm text-text-primary font-medium">
                            New restaurant available
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            Check out Mediterranean Delights
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      fullWidth
                      onClick={() => setIsNotificationOpen(false)}
                    >
                      View All Notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 focus-ring tap-highlight-none transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-white" />
                </div>
                <span className="hidden lg:block font-medium text-text-primary text-sm">
                  Ahmed
                </span>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className={`hidden lg:block text-text-secondary transition-transform duration-200 ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface rounded-lg shadow-elevation-2 border border-border z-200 animate-fade-in">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">Ahmed Hassan</p>
                        <p className="text-sm text-text-secondary">ahmed@example.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background transition-colors duration-200 flex items-center space-x-3">
                      <Icon name="User" size={16} />
                      <span>Profile Settings</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background transition-colors duration-200 flex items-center space-x-3">
                      <Icon name="MapPin" size={16} />
                      <span>Delivery Addresses</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background transition-colors duration-200 flex items-center space-x-3">
                      <Icon name="CreditCard" size={16} />
                      <span>Payment Methods</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background transition-colors duration-200 flex items-center space-x-3">
                      <Icon name="Clock" size={16} />
                      <span>Order History</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background transition-colors duration-200 flex items-center space-x-3">
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </button>
                  </div>
                  <div className="border-t border-border py-2">
                    <button
                      onClick={() => navigate('/login-registration')}
                      className="w-full px-4 py-2 text-left text-sm text-error hover:bg-background transition-colors duration-200 flex items-center space-x-3"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(isProfileOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;