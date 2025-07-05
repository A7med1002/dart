import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethod = ({ selectedPayment, onChangePayment }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      name: 'Visa ending in 4242',
      details: 'Expires 12/25',
      icon: 'CreditCard',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      name: 'Mastercard ending in 8888',
      details: 'Expires 08/26',
      icon: 'CreditCard',
      isDefault: false
    },
    {
      id: 3,
      type: 'cash',
      name: 'Cash on Delivery',
      details: 'Pay with cash when order arrives',
      icon: 'Banknote',
      isDefault: false
    },
    {
      id: 4,
      type: 'wallet',
      name: 'Digital Wallet',
      details: 'Apple Pay / Google Pay',
      icon: 'Wallet',
      isDefault: false
    }
  ];

  const handlePaymentSelect = (payment) => {
    onChangePayment(payment);
    setShowPaymentModal(false);
  };

  const getPaymentIcon = (type) => {
    switch (type) {
      case 'card':
        return 'CreditCard';
      case 'cash':
        return 'Banknote';
      case 'wallet':
        return 'Wallet';
      default:
        return 'CreditCard';
    }
  };

  const getPaymentColor = (type) => {
    switch (type) {
      case 'cash':
        return 'text-success';
      case 'wallet':
        return 'text-info';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="CreditCard" size={20} className="mr-2" />
        Payment Method
      </h3>

      {/* Selected Payment Method */}
      <div className="border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center ${getPaymentColor(selectedPayment.type)}`}>
              <Icon 
                name={getPaymentIcon(selectedPayment.type)} 
                size={18} 
                className={getPaymentColor(selectedPayment.type)}
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-text-primary">{selectedPayment.name}</h4>
                {selectedPayment.isDefault && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <p className="text-text-secondary text-sm">
                {selectedPayment.details}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPaymentModal(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Change
          </Button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-background rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-success mt-0.5" />
          <div>
            <p className="text-text-primary text-sm font-medium">Secure Payment</p>
            <p className="text-text-secondary text-xs">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      </div>

      {/* Payment Method Selection Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setShowPaymentModal(false)} 
          />
          <div className="relative bg-surface rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-text-primary">
                  Select Payment Method
                </h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            {/* Payment Methods List */}
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {paymentMethods.map((payment) => (
                <button
                  key={payment.id}
                  onClick={() => handlePaymentSelect(payment)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 hover:border-primary ${
                    selectedPayment.id === payment.id
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-background'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedPayment.id === payment.id
                          ? `bg-primary text-white`
                          : `bg-gray-100 ${getPaymentColor(payment.type)}`
                      }`}>
                        <Icon name={getPaymentIcon(payment.type)} size={18} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-text-primary">{payment.name}</h4>
                          {payment.isDefault && (
                            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-text-secondary text-sm">
                          {payment.details}
                        </p>
                      </div>
                    </div>
                    {selectedPayment.id === payment.id && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Add New Payment Method */}
            <div className="p-6 border-t border-border">
              <Button
                variant="outline"
                fullWidth
                iconName="Plus"
                iconPosition="left"
                onClick={() => {
                  setShowPaymentModal(false);
                  // Handle add new payment method
                }}
              >
                Add New Payment Method
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;