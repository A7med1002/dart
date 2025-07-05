import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.id || '');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen || !product) return null;

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleExtraToggle = (extraId) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const calculateTotalPrice = () => {
    let total = product.price;
    
    // Add size price difference
    if (selectedSize && product.sizes) {
      const size = product.sizes.find(s => s.id === selectedSize);
      if (size) total += size.priceAdd || 0;
    }
    
    // Add extras price
    if (product.extras) {
      selectedExtras.forEach(extraId => {
        const extra = product.extras.find(e => e.id === extraId);
        if (extra) total += extra.price;
      });
    }
    
    return total * quantity;
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    const cartItem = {
      ...product,
      quantity,
      selectedSize,
      selectedExtras,
      specialInstructions,
      totalPrice: calculateTotalPrice()
    };
    
    setTimeout(() => {
      onAddToCart(cartItem);
      setIsAdding(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-200 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-surface rounded-t-2xl md:rounded-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-heading font-bold text-text-primary">
            Product Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Product Image */}
          <div className="relative h-64 md:h-80">
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col space-y-1">
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
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Product Info */}
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                {product.name}
              </h1>
              <p className="text-text-secondary mb-4">
                {product.description}
              </p>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-text-secondary">({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} className="text-text-secondary" />
                  <span className="text-text-secondary">{product.prepTime}</span>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-3">
                  Choose Size
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedSize === size.id
                          ? 'border-primary bg-primary/5' :'border-border hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm font-medium text-text-primary">
                        {size.name}
                      </div>
                      {size.priceAdd > 0 && (
                        <div className="text-xs text-text-secondary">
                          +{size.priceAdd} SAR
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Extras */}
            {product.extras && product.extras.length > 0 && (
              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-3">
                  Add Extras
                </h3>
                <div className="space-y-3">
                  {product.extras.map((extra) => (
                    <label
                      key={extra.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedExtras.includes(extra.id)}
                          onChange={() => handleExtraToggle(extra.id)}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <div>
                          <div className="font-medium text-text-primary">
                            {extra.name}
                          </div>
                          {extra.description && (
                            <div className="text-sm text-text-secondary">
                              {extra.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="font-medium text-text-primary">
                        +{extra.price} SAR
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-3">
                Special Instructions
              </h3>
              <Input
                type="text"
                placeholder="Any special requests or modifications..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Nutritional Info */}
            {product.nutrition && (
              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-3">
                  Nutritional Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="font-bold text-text-primary">{product.nutrition.calories}</div>
                    <div className="text-sm text-text-secondary">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-text-primary">{product.nutrition.protein}g</div>
                    <div className="text-sm text-text-secondary">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-text-primary">{product.nutrition.carbs}g</div>
                    <div className="text-sm text-text-secondary">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-text-primary">{product.nutrition.fat}g</div>
                    <div className="text-sm text-text-secondary">Fat</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-surface border-t border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary">Quantity:</span>
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
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-text-primary">
                {calculateTotalPrice()} SAR
              </div>
              <div className="text-sm text-text-secondary">
                {quantity} × {product.price} SAR
              </div>
            </div>
          </div>
          
          <Button
            variant="primary"
            fullWidth
            onClick={handleAddToCart}
            loading={isAdding}
            iconName="ShoppingCart"
            iconPosition="left"
            disabled={!product.available}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;