import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StoreHeader = ({ store, onCallStore, onToggleFavorite, isFavorite }) => {
  return (
    <div className="bg-surface border-b border-border">
      {/* Store Cover Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src={store.coverImage}
          alt={store.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Store Basic Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                {store.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                  <span className="font-medium">{store.rating}</span>
                  <span className="opacity-80">({store.reviewCount})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span>{store.deliveryTime}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={onToggleFavorite}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-200"
            >
              <Icon
                name="Heart"
                size={20}
                className={isFavorite ? "text-red-500 fill-current" : "text-white"}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Store Details */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span>{store.distance}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={16} />
              <span>Min order: {store.minOrder} SAR</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Truck" size={16} />
              <span>Delivery: {store.deliveryFee} SAR</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onCallStore}
            iconName="Phone"
            iconPosition="left"
          >
            Call
          </Button>
        </div>

        {/* Store Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${store.isOpen ? 'bg-success' : 'bg-error'}`} />
            <span className={`text-sm font-medium ${store.isOpen ? 'text-success' : 'text-error'}`}>
              {store.isOpen ? 'Open now' : 'Closed'}
            </span>
            <span className="text-sm text-text-secondary">
              • {store.isOpen ? `Closes at ${store.closingTime}` : `Opens at ${store.openingTime}`}
            </span>
          </div>
          
          <div className="text-sm text-text-secondary">
            {store.cuisine}
          </div>
        </div>

        {/* Promotional Banner */}
        {store.promotion && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="Tag" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                {store.promotion}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreHeader;