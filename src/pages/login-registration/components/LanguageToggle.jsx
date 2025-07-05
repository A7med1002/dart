import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState('ar');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'ar';
    setCurrentLanguage(savedLanguage);
    
    // Apply RTL/LTR to document
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage;
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Apply RTL/LTR to document
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
    
    // Reload page to apply language changes
    window.location.reload();
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 left-4 rtl:left-auto rtl:right-4 z-50 flex items-center space-x-2 rtl:space-x-reverse bg-white/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white transition-all duration-200 shadow-sm"
    >
      <Icon name="Globe" size={16} />
      <span>{currentLanguage === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
};

export default LanguageToggle;