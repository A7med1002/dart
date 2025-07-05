import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import DeliveryAddress from './components/DeliveryAddress';
import PaymentMethod from './components/PaymentMethod';
import OrderNotes from './components/OrderNotes';
import EmptyCart from './components/EmptyCart';

const ShoppingCartCheckout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Chicken Shawarma Wrap",
      restaurant: "Mediterranean Delights",
      price: 25,
      originalPrice: 30,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300&h=200&fit=crop",
      customizations: [
        { name: "Extra Garlic Sauce", price: 2 },
        { name: "No Onions", price: 0 }
      ],
      specialInstructions: "Make it spicy please"
    },
    {
      id: 2,
      name: "Falafel Plate",
      restaurant: "Mediterranean Delights",
      price: 18,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop",
      customizations: [
        { name: "Extra Tahini", price: 3 }
      ],
      specialInstructions: ""
    },
    {
      id: 3,
      name: "Baklava (3 pieces)",
      restaurant: "Mediterranean Delights",
      price: 15,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop",
      customizations: [],
      specialInstructions: ""
    }
  ]);

  // Mock address data
  const [selectedAddress, setSelectedAddress] = useState({
    id: 1,
    type: 'home',
    label: 'Home',
    address: 'Building 123, Al Malaz District, Riyadh 12345',
    details: 'Apartment 4B, Floor 2',
    isDefault: true
  });

  // Mock payment data
  const [selectedPayment, setSelectedPayment] = useState({
    id: 1,
    type: 'card',
    name: 'Visa ending in 4242',
    details: 'Expires 12/25',
    icon: 'CreditCard',
    isDefault: true
  });

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const customizationTotal = item.customizations.reduce((custSum, cust) => custSum + cust.price, 0) * item.quantity;
    return sum + itemTotal + customizationTotal;
  }, 0);

  const deliveryFee = 8;
  const taxes = subtotal * 0.15; // 15% tax
  const discount = promoCode === 'SAVE10' ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee + taxes - discount;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle cart operations
  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const handleUpdateCustomization = (itemId) => {
    // Navigate to menu page for customization
    navigate('/store-menu-product-catalog');
  };

  const handleApplyPromo = async (code) => {
    setPromoError('');
    setPromoSuccess('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (code === 'SAVE10') {
      setPromoCode(code);
      setPromoSuccess('10% discount applied!');
    } else if (code === '') {
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    
    // Simulate order placement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and navigate to success page
    setCartItems([]);
    navigate('/dashboard-home');
    setIsLoading(false);
  };

  // Show empty cart if no items
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-16 md:pt-32">
        <div className="container-safe">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-32 pb-20 md:pb-8">
      <div className="container-safe">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                Your Order
              </h1>
              <p className="text-text-secondary mt-1">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} • Mediterranean Delights
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/store-menu-product-catalog')}
              iconName="Plus"
              iconPosition="left"
            >
              Add Items
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  onUpdateCustomization={handleUpdateCustomization}
                />
              ))}
            </div>

            {/* Delivery Address */}
            <DeliveryAddress
              selectedAddress={selectedAddress}
              onChangeAddress={setSelectedAddress}
            />

            {/* Payment Method */}
            <PaymentMethod
              selectedPayment={selectedPayment}
              onChangePayment={setSelectedPayment}
            />

            {/* Order Notes */}
            <OrderNotes
              notes={orderNotes}
              onNotesChange={setOrderNotes}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-36">
              <OrderSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                taxes={taxes}
                discount={discount}
                total={total}
                onApplyPromo={handleApplyPromo}
                promoCode={promoCode}
                promoError={promoError}
                promoSuccess={promoSuccess}
              />

              {/* Place Order Button */}
              <div className="mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handlePlaceOrder}
                  loading={isLoading}
                  iconName="CreditCard"
                  iconPosition="left"
                >
                  Place Order • {total.toFixed(2)} SAR
                </Button>
                
                <div className="flex items-center justify-center mt-4 space-x-2 text-text-muted text-sm">
                  <Icon name="Shield" size={16} />
                  <span>Secure checkout with 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Footer */}
        <div className="lg:hidden fixed bottom-16 left-0 right-0 z-10 p-4 bg-surface border-t border-border safe-area-bottom">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handlePlaceOrder}
            loading={isLoading}
            iconName="CreditCard"
            iconPosition="left"
          >
            Place Order • {total.toFixed(2)} SAR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartCheckout;