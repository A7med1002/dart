import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';

import LanguageToggle from './components/LanguageToggle';

const LoginRegistration = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ar');
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'ar';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleAuthSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user session (in real app, this would be handled by auth service)
      localStorage.setItem('userSession', JSON.stringify({
        isAuthenticated: true,
        user: {
          name: formData.fullName || 'أحمد حسن',
          email: formData.email || formData.emailOrPhone,
          phone: formData.phone || formData.emailOrPhone
        },
        timestamp: Date.now()
      }));
      
      // Navigate to dashboard
      navigate('/dashboard-home');
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social auth API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user session
      localStorage.setItem('userSession', JSON.stringify({
        isAuthenticated: true,
        user: {
          name: 'أحمد حسن',
          email: 'ahmed@example.com',
          provider: provider
        },
        timestamp: Date.now()
      }));
      
      // Navigate to dashboard
      navigate('/dashboard-home');
    } catch (error) {
      console.error('Social auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
      <LanguageToggle />
      
      <div className="w-full max-w-md">
        {/* Main Auth Container */}
        <div className="bg-white rounded-2xl shadow-elevation-3 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-primary px-6 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                width="32"
                height="32"
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
            <h1 className="text-2xl font-heading font-bold text-white mb-1">
              دارت ديليفري
            </h1>
            <p className="text-white/80 text-sm">
              خدمة التوصيل السريع والموثوق
            </p>
          </div>

          {/* Form Container */}
          <div className="p-6">
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            {activeTab === 'login' ? (
              <LoginForm onSubmit={handleAuthSubmit} isLoading={isLoading} />
            ) : (
              <RegisterForm onSubmit={handleAuthSubmit} isLoading={isLoading} />
            )}
            
            <SocialAuth onSocialAuth={handleSocialAuth} isLoading={isLoading} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 px-4">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} دارت ديليفري. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mt-2">
            <button className="text-xs text-text-muted hover:text-text-secondary transition-colors duration-200">
              الشروط والأحكام
            </button>
            <span className="text-text-muted">•</span>
            <button className="text-xs text-text-muted hover:text-text-secondary transition-colors duration-200">
              سياسة الخصوصية
            </button>
            <span className="text-text-muted">•</span>
            <button className="text-xs text-text-muted hover:text-text-secondary transition-colors duration-200">
              الدعم الفني
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;