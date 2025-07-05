import React from 'react';


const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'تسجيل الدخول', labelEn: 'Sign In' },
    { id: 'register', label: 'إنشاء حساب', labelEn: 'Sign Up' }
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-white text-primary shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <span className="block">{tab.label}</span>
          <span className="block text-xs opacity-70">{tab.labelEn}</span>
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;