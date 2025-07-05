import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onProductClick, onToggleFavorite, isFavorite }) => {
  const [quantity, setQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(0, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (quantity === 0) {
      setQuantity(1);
      setIsAdding(true);
      
      setTimeout(() => {
        onAddToCart(product, 1);
        setIsAdding(false);
      }, 300);
    } else {
      onAddToCart(product, quantity);
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative">
        <button
          onClick={() => onProductClick(product)}
          className="w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-t-lg"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {!product.available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-medium">Out of Stock</span>
              </div>
            )}
          </div>
        </button>
        
        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200"
        >
          <Icon
            name="Heart"
            size={16}
            className={isFavorite ? "text-red-500 fill-current" : "text-text-secondary"}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-success text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
          {product.isPopular && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
              Popular
            </span>
          )}
          {product.discount && (
            <span className="bg-error text-white text-xs px-2 py-1 rounded-full font-medium">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <button
          onClick={() => onProductClick(product)}
          className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        >
          <h3 className="font-heading font-semibold text-text-primary mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {product.description}
          </p>
        </button>

        {/* Product Details */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">{product.prepTime}</span>
            </div>
          </div>
          
          {product.customizable && (
            <div className="flex items-center space-x-1">
              <Icon name="Settings" size={14} className="text-primary" />
              <span className="text-xs text-primary font-medium">Customizable</span>
            </div>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-text-primary">
              {product.price} SAR
            </span>
            {product.originalPrice && (
              <span className="text-sm text-text-secondary line-through">
                {product.originalPrice} SAR
              </span>
            )}
          </div>

          {product.available ? (
            <div className="flex items-center space-x-2">
              {quantity > 0 && (
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Icon name="Minus" size={14} />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Icon name="Plus" size={14} />
                  </button>
                </div>
              )}
              
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddToCart}
                loading={isAdding}
                iconName={quantity > 0 ? "ShoppingCart" : "Plus"}
                iconPosition="left"
                className={`transition-all duration-300 ${isAdding ? 'scale-95' : ''}`}
              >
                {quantity > 0 ? 'Add' : 'Add'}
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Unavailable
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;