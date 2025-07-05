import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      path: '/dashboard-home',
      icon: 'Home',
      activeIcon: 'Home',
    },
    {
      label: 'Browse',
      path: '/store-browse-categories',
      icon: 'Store',
      activeIcon: 'Store',
    },
    {
      label: 'Cart',
      path: '/shopping-cart-checkout',
      icon: 'ShoppingCart',
      activeIcon: 'ShoppingCart',
      badge: 3, // Cart item count
    },
    {
      label: 'Custom',
      path: '/custom-delivery-request',
      icon: 'Package',
      activeIcon: 'Package',
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Hide bottom navigation on login/registration page
  if (location.pathname === '/login-registration') {
    return null;
  }

  return (
    <>
      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 tap-highlight-none relative ${
                isActive(item.path)
                  ? 'text-primary' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="relative">
                <Icon
                  name={isActive(item.path) ? item.activeIcon : item.icon}
                  size={20}
                  className={`transition-colors duration-200 ${
                    isActive(item.path) ? 'text-primary' : 'text-current'
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-200 ${
                  isActive(item.path) ? 'text-primary' : 'text-current'
                }`}
              >
                {item.label}
              </span>
              {isActive(item.path) && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Top Navigation - Desktop */}
      <nav className="hidden md:block fixed top-16 left-0 right-0 z-50 bg-surface border-b border-border">
        <div className="container-safe">
          <div className="flex items-center justify-center space-x-8 h-14">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 focus-ring relative ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="relative">
                  <Icon
                    name={isActive(item.path) ? item.activeIcon : item.icon}
                    size={18}
                    className={`transition-colors duration-200 ${
                      isActive(item.path) ? 'text-primary' : 'text-current'
                    }`}
                  />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`font-medium transition-colors duration-200 ${
                    isActive(item.path) ? 'text-primary' : 'text-current'
                  }`}
                >
                  {item.label}
                </span>
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="md:hidden h-16" />
      <div className="hidden md:block h-14" />
    </>
  );
};

export default BottomNavigation;