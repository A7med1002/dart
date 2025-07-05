import React from 'react';
import Icon from '../../../components/AppIcon';

const PriceEstimation = ({ 
  distance, 
  serviceType, 
  urgency, 
  isLoading,
  breakdown 
}) => {
  const formatDistance = (dist) => {
    if (dist < 1) return `${(dist * 1000).toFixed(0)}m`;
    return `${dist.toFixed(1)}km`;
  };

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
      standard: 'Standard',
      express: 'Express',
      scheduled: 'Scheduled'
    };
    return urgencies[urg] || 'Standard';
  };

  if (isLoading) {
    return (
      <div className="bg-surface rounded-lg border border-border p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Calculator" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-text-primary">
            Price Estimation
          </h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Calculator" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-text-primary">
          Price Estimation
        </h3>
      </div>

      <div className="space-y-4">
        {/* Service Summary */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-text-secondary">Distance</p>
            <p className="font-medium text-text-primary">
              {distance ? formatDistance(distance) : 'Calculating...'}
            </p>
          </div>
          <div>
            <p className="text-text-secondary">Service Type</p>
            <p className="font-medium text-text-primary">
              {getServiceTypeName(serviceType)}
            </p>
          </div>
          <div>
            <p className="text-text-secondary">Delivery Speed</p>
            <p className="font-medium text-text-primary">
              {getUrgencyName(urgency)}
            </p>
          </div>
          <div>
            <p className="text-text-secondary">Estimated Time</p>
            <p className="font-medium text-text-primary">
              {urgency === 'express' ? '30-45 min' : 
               urgency === 'scheduled' ? 'As scheduled' : '60-90 min'}
            </p>
          </div>
        </div>

        {/* Price Breakdown */}
        {breakdown && (
          <div className="border-t border-border pt-4">
            <h4 className="font-medium text-text-primary mb-3">Price Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Base Service Fee</span>
                <span className="text-text-primary">{breakdown.basePrice} SAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Distance Fee ({formatDistance(distance)})</span>
                <span className="text-text-primary">{breakdown.distanceFee} SAR</span>
              </div>
              {breakdown.urgencyFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Express Fee</span>
                  <span className="text-text-primary">{breakdown.urgencyFee} SAR</span>
                </div>
              )}
              {breakdown.serviceFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Service Fee</span>
                  <span className="text-text-primary">{breakdown.serviceFee} SAR</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-secondary">VAT (15%)</span>
                <span className="text-text-primary">{breakdown.vat} SAR</span>
              </div>
            </div>
          </div>
        )}

        {/* Total Price */}
        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-text-primary">Total</span>
            <span className="text-2xl font-bold text-primary">
              {breakdown ? breakdown.total : '0'} SAR
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Final price may vary based on actual service requirements
          </p>
        </div>

        {/* Delivery Agent Availability */}
        <div className="bg-success/10 border border-success/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <div>
              <p className="text-sm font-medium text-text-primary">
                Delivery agents available
              </p>
              <p className="text-xs text-text-secondary">
                3 agents in your area ready to help
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceEstimation;