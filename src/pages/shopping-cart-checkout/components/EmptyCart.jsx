import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EmptyCart = () => {
  const navigate = useNavigate();

  const suggestedItems = [
    {
      id: 1,
      name: "Chicken Shawarma",
      restaurant: "Mediterranean Delights",
      price: 25,
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300&h=200&fit=crop",
      rating: 4.8
    },
    {
      id: 2,
      name: "Margherita Pizza",
      restaurant: "Italian Corner",
      price: 45,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      rating: 4.6
    },
    {
      id: 3,
      name: "Beef Burger",
      restaurant: "Burger House",
      price: 35,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      rating: 4.7
    }
  ];

  const handleBrowseStores = () => {
    navigate('/store-browse-categories');
  };

  const handleViewMenu = () => {
    navigate('/store-menu-product-catalog');
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      {/* Empty Cart Illustration */}
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Icon name="ShoppingCart" size={48} className="text-gray-400" />
      </div>

      {/* Empty State Content */}
      <h2 className="text-2xl font-heading font-bold text-text-primary mb-3">
        Your cart is empty
      </h2>
      <p className="text-text-secondary mb-8 max-w-md">
        Looks like you haven't added any items to your cart yet. 
        Discover delicious food from restaurants near you!
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Button
          variant="primary"
          size="lg"
          onClick={handleBrowseStores}
          iconName="Store"
          iconPosition="left"
        >
          Browse Restaurants
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/custom-delivery-request')}
          iconName="Package"
          iconPosition="left"
        >
          Custom Delivery
        </Button>
      </div>

      {/* Suggested Items */}
      <div className="w-full max-w-4xl">
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-6">
          Popular Items Near You
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedItems.map((item) => (
            <div
              key={item.id}
              className="bg-surface rounded-lg border border-border overflow-hidden hover:shadow-elevation-2 transition-shadow duration-200 cursor-pointer"
              onClick={handleViewMenu}
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {item.restaurant}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm text-text-secondary">{item.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">{item.price} SAR</span>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Search" size={24} className="text-primary" />
          </div>
          <h4 className="font-medium text-text-primary mb-1">Find Food</h4>
          <p className="text-sm text-text-secondary">
            Search for your favorite dishes
          </p>
        </div>
        
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="MapPin" size={24} className="text-primary" />
          </div>
          <h4 className="font-medium text-text-primary mb-1">Nearby</h4>
          <p className="text-sm text-text-secondary">
            Discover restaurants around you
          </p>
        </div>
        
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Clock" size={24} className="text-primary" />
          </div>
          <h4 className="font-medium text-text-primary mb-1">Fast Delivery</h4>
          <p className="text-sm text-text-secondary">
            Get your food delivered quickly
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;