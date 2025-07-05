import React from 'react';

const AppLogo = () => {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <svg
          width="40"
          height="40"
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
      
      <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
        دارت ديليفري
      </h1>
      <p className="text-lg text-text-secondary mb-1">
        Dart Delivery
      </p>
      <p className="text-sm text-text-muted">
        خدمة التوصيل السريع والموثوق
      </p>
    </div>
  );
};

export default AppLogo;