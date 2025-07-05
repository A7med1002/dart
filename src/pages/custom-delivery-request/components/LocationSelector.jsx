import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LocationSelector = ({ type, location, onLocationChange, onUseCurrentLocation }) => {
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [address, setAddress] = useState(location?.address || '');

  const handleUseCurrentLocation = () => {
    onUseCurrentLocation();
    setIsManualEntry(false);
  };

  const handleManualEntry = () => {
    setIsManualEntry(true);
  };

  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    onLocationChange({
      ...location,
      address: newAddress,
      coordinates: null
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon 
          name={type === 'pickup' ? 'MapPin' : 'Navigation'} 
          size={20} 
          className="text-primary" 
        />
        <h3 className="font-heading font-semibold text-text-primary">
          {type === 'pickup' ? 'Pickup Location' : 'Delivery Destination'}
        </h3>
      </div>

      {!isManualEntry ? (
        <div className="space-y-3">
          {location?.address ? (
            <div className="p-3 bg-background rounded-lg border border-border">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={16} className="text-primary mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-text-primary text-sm">
                    {location.address}
                  </p>
                  {location.coordinates && (
                    <p className="text-xs text-text-secondary mt-1">
                      {location.coordinates.lat.toFixed(6)}, {location.coordinates.lng.toFixed(6)}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setIsManualEntry(true)}
                  className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <Icon name="Edit2" size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <Icon name="MapPin" size={48} className="text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary mb-4">
                Select {type === 'pickup' ? 'pickup' : 'delivery'} location
              </p>
            </div>
          )}

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleUseCurrentLocation}
              iconName="Crosshair"
              iconPosition="left"
              className="flex-1"
            >
              Use Current Location
            </Button>
            <Button
              variant="ghost"
              onClick={handleManualEntry}
              iconName="Edit2"
              iconPosition="left"
              className="flex-1"
            >
              Enter Manually
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Input
            type="text"
            placeholder={`Enter ${type === 'pickup' ? 'pickup' : 'delivery'} address`}
            value={address}
            onChange={handleAddressChange}
            className="w-full"
          />
          <div className="flex space-x-2">
            <Button
              variant="primary"
              onClick={() => setIsManualEntry(false)}
              className="flex-1"
            >
              Confirm Address
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsManualEntry(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Map Integration */}
      <div className="mt-4 h-48 bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={`${type === 'pickup' ? 'Pickup' : 'Delivery'} Location`}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${location?.coordinates?.lat || 24.7136},${location?.coordinates?.lng || 46.6753}&z=14&output=embed`}
        />
      </div>
    </div>
  );
};

export default LocationSelector;