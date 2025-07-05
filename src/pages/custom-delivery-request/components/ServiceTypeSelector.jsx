import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceTypeSelector = ({ selectedType, onTypeChange, customDescription, onCustomDescriptionChange }) => {
  const serviceTypes = [
    {
      id: 'document',
      name: 'Document Delivery',
      icon: 'FileText',
      description: 'Important documents, contracts, certificates',
      basePrice: 15
    },
    {
      id: 'grocery',
      name: 'Grocery Shopping',
      icon: 'ShoppingBag',
      description: 'Fresh groceries, household items',
      basePrice: 25
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy Pickup',
      icon: 'Pill',
      description: 'Medicines, health products',
      basePrice: 20
    },
    {
      id: 'custom',
      name: 'Custom Service',
      icon: 'Package',
      description: 'Describe your specific delivery needs',
      basePrice: 30
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Package" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-text-primary">
          Service Type
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {serviceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedType === type.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedType === type.id
                    ? 'bg-primary text-white' :'bg-gray-100 text-text-secondary'
                }`}
              >
                <Icon name={type.icon} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary text-sm">
                  {type.name}
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  {type.description}
                </p>
                <p className="text-xs font-medium text-primary mt-2">
                  From {type.basePrice} SAR
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedType === 'custom' && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Describe your custom service
          </label>
          <textarea
            value={customDescription}
            onChange={(e) => onCustomDescriptionChange(e.target.value)}
            placeholder="Please describe what you need delivered and any special requirements..."
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={3}
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-text-secondary">
              Be specific to help us serve you better
            </span>
            <span className="text-xs text-text-muted">
              {customDescription.length}/500
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTypeSelector;