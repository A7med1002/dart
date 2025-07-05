import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StoreCard = ({ store, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(store.isFavorite);
  const navigate = useNavigate();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavoriteToggle(store.id, !isFavorite);
  };

  const handleStoreClick = () => {
    navigate('/store-menu-product-catalog', { state: { storeId: store.id, storeName: store.name } });
  };

  return (
    <div
      onClick={handleStoreClick}
      className="bg-surface rounded-lg shadow-sm border border-border overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="relative h-32 overflow-hidden">
        <Image
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200"
        >
          <Icon
            name={isFavorite ? 'Heart' : 'Heart'}
            size={16}
            className={isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}
          />
        </button>
        {store.isOpen ? (
          <div className="absolute top-2 left-2 bg-success text-white px-2 py-1 rounded-full text-xs font-medium">
            Open
          </div>
        ) : (
          <div className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Closed
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-text-primary text-sm mb-1 truncate">
          {store.name}
        </h3>
        <p className="text-xs text-text-secondary mb-2 truncate">
          {store.cuisine}
        </p>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
            <span className="font-medium text-text-primary">{store.rating}</span>
            <span className="text-text-secondary">({store.reviews})</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{store.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Truck" size={12} />
              <span>{store.deliveryFee === 0 ? 'Free' : `${store.deliveryFee} SAR`}</span>
            </div>
          </div>
        </div>
        
        {store.minOrder && (
          <div className="mt-2 text-xs text-text-secondary">
            Min order: {store.minOrder} SAR
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreCard;