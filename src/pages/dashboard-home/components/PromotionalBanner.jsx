import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PromotionalBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const promotions = [
    {
      id: 'promo-1',
      title: 'خصم 30% على الطلب الأول',
      titleEn: '30% Off First Order',
      description: 'استمتع بخصم 30% على طلبك الأول من أي مطعم',
      descriptionEn: 'Enjoy 30% discount on your first order from any restaurant',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop',
      backgroundColor: 'bg-gradient-to-r from-primary to-primary-600',
      textColor: 'text-white',
      buttonText: 'اطلب الآن',
      buttonTextEn: 'Order Now',
      code: 'FIRST30',
      expiryDate: '2024-02-15',
      route: '/store-browse-categories'
    },
    {
      id: 'promo-2',
      title: 'توصيل مجاني للطلبات فوق 50 ر.س',
      titleEn: 'Free Delivery Above 50 SAR',
      description: 'لا تدفع رسوم توصيل عند الطلب بقيمة 50 ريال أو أكثر',
      descriptionEn: 'No delivery fees when you order 50 SAR or more',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=400&fit=crop',
      backgroundColor: 'bg-gradient-to-r from-success to-emerald-600',
      textColor: 'text-white',
      buttonText: 'تصفح المطاعم',
      buttonTextEn: 'Browse Restaurants',
      code: 'FREEDEL50',
      expiryDate: '2024-02-20',
      route: '/store-browse-categories'
    },
    {
      id: 'promo-3',
      title: 'وجبة مجانية مع كل 5 طلبات',
      titleEn: 'Free Meal Every 5 Orders',
      description: 'احصل على وجبة مجانية عند إكمال 5 طلبات',
      descriptionEn: 'Get a free meal when you complete 5 orders',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop',
      backgroundColor: 'bg-gradient-to-r from-warning to-amber-600',
      textColor: 'text-white',
      buttonText: 'ابدأ الآن',
      buttonTextEn: 'Start Now',
      code: 'LOYALTY5',
      expiryDate: '2024-03-01',
      route: '/store-browse-categories'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, promotions.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handlePromotionClick = (route) => {
    navigate(route);
  };

  const currentPromo = promotions[currentSlide];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-text-primary">
          العروض الخاصة
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevSlide}
            className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
          >
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
          </button>
          <button
            onClick={handleNextSlide}
            className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
          >
            <Icon name="ChevronLeft" size={16} className="text-text-secondary" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="w-full flex-shrink-0 relative"
            >
              <div className={`${promo.backgroundColor} rounded-xl overflow-hidden`}>
                <div className="flex flex-col lg:flex-row">
                  <div className="flex-1 p-6 lg:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className={`text-2xl lg:text-3xl font-heading font-bold ${promo.textColor} mb-2`}>
                          {promo.title}
                        </h3>
                        <p className={`${promo.textColor} opacity-90 mb-4 text-sm lg:text-base`}>
                          {promo.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                            <p className={`text-sm font-mono ${promo.textColor}`}>
                              كود: {promo.code}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="Clock" size={16} className={promo.textColor} />
                            <p className={`text-sm ${promo.textColor} opacity-80`}>
                              ينتهي في {new Date(promo.expiryDate).toLocaleDateString('ar-SA')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="secondary"
                      onClick={() => handlePromotionClick(promo.route)}
                      iconName="ArrowLeft"
                      iconPosition="right"
                      className="bg-white text-text-primary hover:bg-gray-100"
                    >
                      {promo.buttonText}
                    </Button>
                  </div>
                  
                  <div className="lg:w-80 h-48 lg:h-auto">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-6' :'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        {isAutoPlaying && (
          <div className="absolute top-4 left-4">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Icon name="Play" size={12} className="text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionalBanner;