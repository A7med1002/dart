import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentAddressesSection = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const recentAddresses = [
    {
      id: 'addr-1',
      type: 'home',
      typeAr: 'المنزل',
      name: 'المنزل',
      nameEn: 'Home',
      address: 'شارع الملك فهد، الرياض 12345',
      addressEn: 'King Fahd Street, Riyadh 12345',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      isDefault: true,
      lastUsed: '2024-01-15T18:30:00Z'
    },
    {
      id: 'addr-2',
      type: 'work',
      typeAr: 'العمل',
      name: 'المكتب',
      nameEn: 'Office',
      address: 'برج الفيصلية، طريق الملك فهد، الرياض',
      addressEn: 'Al Faisaliah Tower, King Fahd Road, Riyadh',
      coordinates: { lat: 24.6877, lng: 46.6857 },
      isDefault: false,
      lastUsed: '2024-01-14T12:15:00Z'
    },
    {
      id: 'addr-3',
      type: 'other',
      typeAr: 'أخرى',
      name: 'منزل الأصدقاء',
      nameEn: 'Friends House',
      address: 'حي النرجس، الرياض 11564',
      addressEn: 'Al Narjis District, Riyadh 11564',
      coordinates: { lat: 24.7500, lng: 46.6200 },
      isDefault: false,
      lastUsed: '2024-01-13T19:45:00Z'
    }
  ];

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'work':
        return 'Building';
      case 'other':
        return 'MapPin';
      default:
        return 'MapPin';
    }
  };

  const getAddressColor = (type) => {
    switch (type) {
      case 'home':
        return 'text-primary bg-primary/10';
      case 'work':
        return 'text-info bg-info/10';
      case 'other':
        return 'text-success bg-success/10';
      default:
        return 'text-text-secondary bg-gray-100';
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address.id);
    // In real app, this would update the delivery address in state management
    console.log('Selected address:', address);
  };

  const handleAddNewAddress = () => {
    // In real app, this would open address form modal
    console.log('Add new address');
  };

  const handleEditAddress = (addressId, e) => {
    e.stopPropagation();
    // In real app, this would open edit address modal
    console.log('Edit address:', addressId);
  };

  if (recentAddresses.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-bold text-text-primary">
          العناوين المحفوظة
        </h2>
        <div className="bg-surface rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MapPin" size={24} className="text-text-secondary" />
          </div>
          <h3 className="font-heading font-semibold text-text-primary mb-2">
            لا توجد عناوين محفوظة
          </h3>
          <p className="text-text-secondary mb-4">
            أضف عناوينك المفضلة لتوصيل أسرع
          </p>
          <Button
            variant="primary"
            onClick={handleAddNewAddress}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة عنوان
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-text-primary">
          العناوين المحفوظة
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddNewAddress}
          iconName="Plus"
          iconPosition="left"
        >
          إضافة عنوان
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentAddresses.map((address) => (
          <div
            key={address.id}
            onClick={() => handleAddressSelect(address)}
            className={`bg-surface rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedAddress === address.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAddressColor(address.type)}`}>
                  <Icon name={getAddressIcon(address.type)} size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-text-primary">
                      {address.name}
                    </h3>
                    {address.isDefault && (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                        افتراضي
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary mt-1">
                    {address.typeAr}
                  </p>
                </div>
              </div>
              
              <button
                onClick={(e) => handleEditAddress(address.id, e)}
                className="p-1 rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-200"
              >
                <Icon name="MoreVertical" size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Icon name="MapPin" size={14} className="text-text-secondary mt-1 flex-shrink-0" />
                <p className="text-sm text-text-secondary leading-relaxed">
                  {address.address}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-text-secondary" />
                <p className="text-xs text-text-secondary">
                  آخر استخدام: {new Date(address.lastUsed).toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>

            {selectedAddress === address.id && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center space-x-2 text-primary">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm font-medium">
                    تم اختيار هذا العنوان للتوصيل
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Location Actions */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="Navigation" size={18} className="text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                استخدام الموقع الحالي
              </h3>
              <p className="text-sm text-text-secondary">
                تحديد موقعك تلقائياً باستخدام GPS
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Navigation"
            iconPosition="left"
          >
            تحديد الموقع
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentAddressesSection;