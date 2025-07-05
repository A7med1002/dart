import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeliveryAddress = ({ selectedAddress, onChangeAddress }) => {
  const [showAddressModal, setShowAddressModal] = useState(false);

  const savedAddresses = [
    {
      id: 1,
      type: 'home',
      label: 'Home',
      address: 'Building 123, Al Malaz District, Riyadh 12345',
      details: 'Apartment 4B, Floor 2',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      label: 'Work',
      address: 'King Fahd Road, Business District, Riyadh 11564',
      details: 'Office Tower, 15th Floor',
      isDefault: false
    },
    {
      id: 3,
      type: 'other',
      label: 'Friend\'s Place',
      address: 'Al Nakheel District, Riyadh 13244',
      details: 'Villa 45, Street 7',
      isDefault: false
    }
  ];

  const handleAddressSelect = (address) => {
    onChangeAddress(address);
    setShowAddressModal(false);
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'work':
        return 'Building';
      default:
        return 'MapPin';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="MapPin" size={20} className="mr-2" />
        Delivery Address
      </h3>

      {/* Selected Address */}
      <div className="border border-border rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon 
                name={getAddressIcon(selectedAddress.type)} 
                size={18} 
                className="text-primary" 
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-text-primary">{selectedAddress.label}</h4>
                {selectedAddress.isDefault && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <p className="text-text-secondary text-sm mb-1">
                {selectedAddress.address}
              </p>
              {selectedAddress.details && (
                <p className="text-text-muted text-xs">
                  {selectedAddress.details}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddressModal(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Change
          </Button>
        </div>
      </div>

      {/* Delivery Instructions */}
      <div className="bg-background rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="MessageSquare" size={16} className="text-text-secondary" />
          <span className="text-text-secondary text-sm">Delivery Instructions</span>
        </div>
        <p className="text-text-primary text-sm">
          Please call when you arrive. Ring the doorbell twice.
        </p>
      </div>

      {/* Address Selection Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setShowAddressModal(false)} 
          />
          <div className="relative bg-surface rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-text-primary">
                  Select Delivery Address
                </h3>
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            {/* Address List */}
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {savedAddresses.map((address) => (
                <button
                  key={address.id}
                  onClick={() => handleAddressSelect(address)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 hover:border-primary ${
                    selectedAddress.id === address.id
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-background'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedAddress.id === address.id
                        ? 'bg-primary text-white' :'bg-gray-100 text-text-secondary'
                    }`}>
                      <Icon name={getAddressIcon(address.type)} size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-text-primary">{address.label}</h4>
                        {address.isDefault && (
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-text-secondary text-sm mb-1">
                        {address.address}
                      </p>
                      {address.details && (
                        <p className="text-text-muted text-xs">
                          {address.details}
                        </p>
                      )}
                    </div>
                    {selectedAddress.id === address.id && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Add New Address */}
            <div className="p-6 border-t border-border">
              <Button
                variant="outline"
                fullWidth
                iconName="Plus"
                iconPosition="left"
                onClick={() => {
                  setShowAddressModal(false);
                  // Handle add new address
                }}
              >
                Add New Address
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;