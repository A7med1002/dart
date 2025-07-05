import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FavoriteStoresSection = () => {
  const navigate = useNavigate();

  const favoriteStores = [
    {
      id: 'store-1',
      name: 'مطعم الشام الأصيل',
      nameEn: 'Authentic Sham Restaurant',
      category: 'مأكولات شامية',
      categoryEn: 'Levantine Cuisine',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 1250,
      deliveryTime: '25-35',
      deliveryFee: 5,
      isOpen: true,
      distance: '1.2 كم',
      distanceEn: '1.2 km',
      specialOffer: 'خصم 20%',
      specialOfferEn: '20% Off'
    },
    {
      id: 'store-2',
      name: 'مقهى القهوة الذهبية',
      nameEn: 'Golden Coffee Cafe',
      category: 'مشروبات وحلويات',
      categoryEn: 'Beverages & Desserts',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
      rating: 4.6,
      reviewCount: 890,
      deliveryTime: '15-25',
      deliveryFee: 3,
      isOpen: true,
      distance: '0.8 كم',
      distanceEn: '0.8 km',
      specialOffer: null
    },
    {
      id: 'store-3',
      name: 'مطعم البحر الأزرق',
      nameEn: 'Blue Sea Restaurant',
      category: 'مأكولات بحرية',
      categoryEn: 'Seafood',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 2100,
      deliveryTime: '30-45',
      deliveryFee: 8,
      isOpen: false,
      distance: '2.1 كم',
      distanceEn: '2.1 km',
      specialOffer: null,
      closedUntil: '17:00'
    },
    {
      id: 'store-4',
      name: 'مطعم الأصالة',
      nameEn: 'Authenticity Restaurant',
      category: 'مأكولات عربية',
      categoryEn: 'Arabic Cuisine',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 1680,
      deliveryTime: '20-30',
      deliveryFee: 4,
      isOpen: true,
      distance: '1.5 كم',
      distanceEn: '1.5 km',
      specialOffer: 'توصيل مجاني',
      specialOfferEn: 'Free Delivery'
    }
  ];

  const handleStoreClick = (storeId) => {
    navigate('/store-menu-product-catalog', { state: { storeId } });
  };

  const handleViewAllStores = () => {
    navigate('/store-browse-categories');
  };

  const handleToggleFavorite = (storeId, e) => {
    e.stopPropagation();
    // In real app, this would update favorites in state management
    console.log('Toggle favorite for store:', storeId);
  };

  if (favoriteStores.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-bold text-text-primary">
          المطاعم المفضلة
        </h2>
        <div className="bg-surface rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={24} className="text-text-secondary" />
          </div>
          <h3 className="font-heading font-semibold text-text-primary mb-2">
            لا توجد مطاعم مفضلة
          </h3>
          <p className="text-text-secondary mb-4">
            أضف مطاعمك المفضلة لسهولة الوصول إليها
          </p>
          <Button
            variant="primary"
            onClick={handleViewAllStores}
            iconName="Search"
            iconPosition="left"
          >
            استكشف المطاعم
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-text-primary">
          المطاعم المفضلة
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAllStores}
          iconName="ArrowLeft"
          iconPosition="right"
        >
          عرض الكل
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-2" style={{ width: 'max-content' }}>
          {favoriteStores.map((store) => (
            <div
              key={store.id}
              onClick={() => handleStoreClick(store.id)}
              className="w-72 bg-surface rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="relative">
                <Image
                  src={store.image}
                  alt={store.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => handleToggleFavorite(store.id, e)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                >
                  <Icon name="Heart" size={16} className="text-error fill-current" />
                </button>

                {/* Special Offer Badge */}
                {store.specialOffer && (
                  <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                    {store.specialOffer}
                  </div>
                )}

                {/* Status Badge */}
                <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                  store.isOpen 
                    ? 'bg-success text-white' :'bg-error text-white'
                }`}>
                  {store.isOpen ? 'مفتوح' : `مغلق حتى ${store.closedUntil}`}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-text-primary mb-1 group-hover:text-primary transition-colors duration-200">
                      {store.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {store.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm font-medium text-text-primary">
                      {store.rating}
                    </span>
                    <span className="text-xs text-text-secondary">
                      ({store.reviewCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">
                      {store.distance}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} className="text-text-secondary" />
                    <span className="text-text-secondary">
                      {store.deliveryTime} دقيقة
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Truck" size={14} className="text-text-secondary" />
                    <span className="text-text-secondary">
                      {store.deliveryFee === 0 ? 'مجاني' : `${store.deliveryFee} ر.س`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteStoresSection;