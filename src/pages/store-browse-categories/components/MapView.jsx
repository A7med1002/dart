import React from 'react';
import Icon from '../../../components/AppIcon';

const MapView = ({ stores, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          Map View
        </h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-200"
        >
          <Icon name="X" size={20} />
        </button>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Restaurants Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=24.7136,46.6753&z=12&output=embed"
          className="w-full h-full"
        />
        
        {/* Map Overlay with Store Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-4 max-h-32 overflow-y-auto">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop"
                  alt="Restaurant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary text-sm">
                  Al Baik Restaurant
                </h4>
                <p className="text-xs text-text-secondary">Fast Food • 4.5 ⭐</p>
                <p className="text-xs text-text-secondary">25-35 min • Free delivery</p>
              </div>
              <button className="px-3 py-1 bg-primary text-white rounded-full text-xs font-medium">
                View Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;