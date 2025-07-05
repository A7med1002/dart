import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  requestData, 
  isSubmitting 
}) => {
  if (!isOpen) return null;

  const getServiceTypeName = (type) => {
    const types = {
      document: 'Document Delivery',
      grocery: 'Grocery Shopping',
      pharmacy: 'Pharmacy Pickup',
      custom: 'Custom Service'
    };
    return types[type] || 'Custom Service';
  };

  const getUrgencyName = (urg) => {
    const urgencies = {
      standard: 'Standard (60-90 min)',
      express: 'Express (30-45 min)',
      scheduled: 'Scheduled'
    };
    return urgencies[urg] || 'Standard';
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-surface rounded-2xl shadow-elevation-3 animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-text-primary">
              Confirm Your Request
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          <p className="text-text-secondary mt-2">
            Please review your delivery request details
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Service Details */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="Package" size={16} />
              <span>Service Details</span>
            </h3>
            <div className="bg-background rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Service Type:</span>
                <span className="font-medium text-text-primary">
                  {getServiceTypeName(requestData.serviceType)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Delivery Speed:</span>
                <span className="font-medium text-text-primary">
                  {getUrgencyName(requestData.urgency)}
                </span>
              </div>
              {requestData.scheduledTime && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Scheduled Time:</span>
                  <span className="font-medium text-text-primary">
                    {new Date(requestData.scheduledTime).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="MapPin" size={16} />
              <span>Locations</span>
            </h3>
            <div className="space-y-3">
              <div className="bg-background rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary text-sm">Pickup</p>
                    <p className="text-text-secondary text-sm">
                      {requestData.pickupLocation?.address || 'Address not set'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-background rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Navigation" size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary text-sm">Delivery</p>
                    <p className="text-text-secondary text-sm">
                      {requestData.deliveryLocation?.address || 'Address not set'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Item Description */}
          {requestData.description && (
            <div>
              <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="FileText" size={16} />
                <span>Item Description</span>
              </h3>
              <div className="bg-background rounded-lg p-4">
                <p className="text-text-primary text-sm">
                  {requestData.description}
                </p>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="User" size={16} />
              <span>Contact Information</span>
            </h3>
            <div className="bg-background rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Sender:</span>
                <span className="font-medium text-text-primary">
                  {requestData.senderInfo?.name} - {requestData.senderInfo?.phone}
                </span>
              </div>
              {requestData.isDifferentRecipient && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Recipient:</span>
                  <span className="font-medium text-text-primary">
                    {requestData.recipientInfo?.name} - {requestData.recipientInfo?.phone}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="Calculator" size={16} />
              <span>Total Cost</span>
            </h3>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-text-primary">Total</span>
                <span className="text-2xl font-bold text-primary">
                  {requestData.priceBreakdown?.total || '0'} SAR
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Review Again
            </Button>
            <Button
              variant="primary"
              onClick={onConfirm}
              loading={isSubmitting}
              className="flex-1"
            >
              Confirm Request
            </Button>
          </div>
          <p className="text-xs text-text-secondary text-center mt-3">
            By confirming, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;