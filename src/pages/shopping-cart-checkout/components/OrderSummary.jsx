import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  deliveryFee, 
  taxes, 
  discount, 
  total, 
  onApplyPromo,
  promoCode,
  promoError,
  promoSuccess 
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    
    setIsApplyingPromo(true);
    await onApplyPromo(promoInput);
    setIsApplyingPromo(false);
  };

  const handleRemovePromo = () => {
    onApplyPromo('');
    setPromoInput('');
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="Receipt" size={20} className="mr-2" />
        Order Summary
      </h3>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-text-primary">{subtotal.toFixed(2)} SAR</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Delivery Fee</span>
          <span className="text-text-primary">{deliveryFee.toFixed(2)} SAR</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Taxes & Fees</span>
          <span className="text-text-primary">{taxes.toFixed(2)} SAR</span>
        </div>
        
        {discount > 0 && (
          <div className="flex items-center justify-between text-success">
            <span className="flex items-center">
              <Icon name="Tag" size={16} className="mr-1" />
              Discount
            </span>
            <span>-{discount.toFixed(2)} SAR</span>
          </div>
        )}
        
        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-text-primary">Total</span>
            <span className="font-bold text-lg text-primary">{total.toFixed(2)} SAR</span>
          </div>
        </div>
      </div>

      {/* Promo Code Section */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">Promo Code</h4>
        
        {promoCode ? (
          <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Tag" size={16} className="text-success" />
              <span className="text-success font-medium">{promoCode}</span>
            </div>
            <button
              onClick={handleRemovePromo}
              className="text-success hover:text-success-600 transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter promo code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="md"
                onClick={handleApplyPromo}
                loading={isApplyingPromo}
                disabled={!promoInput.trim()}
              >
                Apply
              </Button>
            </div>
            
            {promoError && (
              <p className="text-error text-sm flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {promoError}
              </p>
            )}
            
            {promoSuccess && (
              <p className="text-success text-sm flex items-center animate-fade-in">
                <Icon name="CheckCircle" size={14} className="mr-1" />
                {promoSuccess}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Savings Summary */}
      {discount > 0 && (
        <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 text-success">
            <Icon name="Sparkles" size={16} />
            <span className="font-medium">You're saving {discount.toFixed(2)} SAR!</span>
          </div>
        </div>
      )}

      {/* Estimated Time */}
      <div className="bg-background rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-text-secondary text-sm">Estimated Delivery</span>
          </div>
          <span className="font-medium text-text-primary">25-35 min</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;