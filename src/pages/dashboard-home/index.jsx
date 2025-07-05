import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import CartSummaryBar from '../../components/ui/CartSummaryBar';
import AuthModal from '../../components/ui/AuthModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import page components
import RecentOrdersSection from './components/RecentOrdersSection';
import QuickActionsSection from './components/QuickActionsSection';
import PromotionalBanner from './components/PromotionalBanner';
import FavoriteStoresSection from './components/FavoriteStoresSection';
import RecentAddressesSection from './components/RecentAddressesSection';

const DashboardHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ar');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const navigate = useNavigate();

  // Mock user data
  const userData = {
    name: 'أحمد حسن',
    nameEn: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    avatar: null,
    isFirstTime: false,
    totalOrders: 23,
    loyaltyPoints: 450
  };

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('app-language') || 'ar';
    setCurrentLanguage(savedLanguage);

    // Simulate loading
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      
      // Show welcome message for first-time users
      if (userData.isFirstTime) {
        setShowWelcomeMessage(true);
        setTimeout(() => setShowWelcomeMessage(false), 5000);
      }
    };

    loadData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('app-language', newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  const handleEmergencyOrder = () => {
    navigate('/custom-delivery-request', { state: { isEmergency: true } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 md:pt-30">
          <div className="container-safe py-6">
            {/* Loading Skeleton */}
            <div className="space-y-6">
              {/* Welcome Section Skeleton */}
              <div className="bg-surface rounded-lg p-6 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-surface rounded-xl p-6 animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                ))}
              </div>

              {/* Banner Skeleton */}
              <div className="bg-surface rounded-xl h-48 animate-pulse"></div>

              {/* Cards Skeleton */}
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-surface rounded-lg p-4 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Welcome Message Toast */}
      {showWelcomeMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-success text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} />
            <span className="font-medium">
              {currentLanguage === 'ar' ? 'مرحباً بك في دارت ديليفري!' : 'Welcome to Dart Delivery!'}
            </span>
          </div>
        </div>
      )}

      <main className="pt-16 md:pt-30 pb-20 md:pb-6">
        <div className="container-safe">
          {/* Pull to Refresh Indicator */}
          {refreshing && (
            <div className="flex justify-center py-4">
              <div className="flex items-center space-x-2 text-primary">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">
                  {currentLanguage === 'ar' ? 'جاري التحديث...' : 'Refreshing...'}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-8 py-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-primary-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon name="User" size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-heading font-bold mb-1">
                      {currentLanguage === 'ar' ? `مرحباً، ${userData.name}` : `Hello, ${userData.nameEn}`}
                    </h1>
                    <p className="text-white/80">
                      {currentLanguage === 'ar' ?'ماذا تريد أن تطلب اليوم؟' :'What would you like to order today?'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold">{userData.loyaltyPoints}</div>
                  <div className="text-xs text-white/80">
                    {currentLanguage === 'ar' ? 'نقطة' : 'Points'}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-xl font-bold">{userData.totalOrders}</div>
                  <div className="text-xs text-white/80">
                    {currentLanguage === 'ar' ? 'طلب مكتمل' : 'Orders Completed'}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-xl font-bold">4.9</div>
                  <div className="text-xs text-white/80">
                    {currentLanguage === 'ar' ? 'تقييمك' : 'Your Rating'}
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Order Button */}
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-error/20 rounded-full flex items-center justify-center">
                    <Icon name="Zap" size={18} className="text-error" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-error">
                      {currentLanguage === 'ar' ? 'طلب طارئ' : 'Emergency Order'}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {currentLanguage === 'ar' ?'توصيل فوري خلال 15 دقيقة' :'Instant delivery within 15 minutes'
                      }
                    </p>
                  </div>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleEmergencyOrder}
                  iconName="Zap"
                  iconPosition="left"
                >
                  {currentLanguage === 'ar' ? 'طلب الآن' : 'Order Now'}
                </Button>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex justify-center">
              <button
                onClick={handleLanguageToggle}
                className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Icon name="Globe" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  {currentLanguage === 'ar' ? 'English' : 'العربية'}
                </span>
              </button>
            </div>

            {/* Quick Actions Section */}
            <QuickActionsSection />

            {/* Promotional Banner */}
            <PromotionalBanner />

            {/* Recent Orders Section */}
            <RecentOrdersSection />

            {/* Favorite Stores Section */}
            <FavoriteStoresSection />

            {/* Recent Addresses Section */}
            <RecentAddressesSection />
          </div>
        </div>
      </main>

      <BottomNavigation />
      <CartSummaryBar />
      <AuthModal />
    </div>
  );
};

export default DashboardHome;