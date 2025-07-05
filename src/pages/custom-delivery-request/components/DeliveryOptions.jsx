import React from 'react';
import Icon from '../../../components/AppIcon';

const DeliveryOptions = ({ 
  urgency, 
  onUrgencyChange, 
  scheduledTime, 
  onScheduledTimeChange,
  specialInstructions,
  onSpecialInstructionsChange 
}) => {
  const urgencyOptions = [
    {
      id: 'standard',
      name: 'Standard',
      icon: 'Clock',
      time: '60-90 minutes',
      price: 0,
      description: 'Regular delivery timing'
    },
    {
      id: 'express',
      name: 'Express',
      icon: 'Zap',
      time: '30-45 minutes',
      price: 15,
      description: 'Priority delivery'
    },
    {
      id: 'scheduled',
      name: 'Scheduled',
      icon: 'Calendar',
      time: 'Choose time',
      price: 5,
      description: 'Deliver at specific time'
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Clock" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-text-primary">
          Delivery Options
        </h3>
      </div>

      <div className="space-y-4">
        {/* Urgency Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Delivery Urgency
          </label>
          <div className="space-y-2">
            {urgencyOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onUrgencyChange(option.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  urgency === option.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        urgency === option.id
                          ? 'bg-primary text-white' :'bg-gray-100 text-text-secondary'
                      }`}
                    >
                      <Icon name={option.icon} size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary text-sm">
                        {option.name}
                      </h4>
                      <p className="text-xs text-text-secondary">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">
                      {option.time}
                    </p>
                    <p className="text-xs text-primary">
                      {option.price > 0 ? `+${option.price} SAR` : 'Free'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Scheduled Time Selection */}
        {urgency === 'scheduled' && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Select Delivery Time
            </label>
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => onScheduledTimeChange(e.target.value)}
              min={new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="text-xs text-text-secondary mt-1">
              Minimum 2 hours from now
            </p>
          </div>
        )}

        {/* Special Instructions */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Special Instructions (Optional)
          </label>
          <textarea
            value={specialInstructions}
            onChange={(e) => onSpecialInstructionsChange(e.target.value)}
            placeholder={`Examples:\n• "Call when you arrive, don't ring doorbell"\n• "Leave with security guard if not home"\n• "Handle with care - fragile items"`}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={3}
            maxLength={300}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-text-secondary">
              Help our delivery agent serve you better
            </span>
            <span className="text-xs text-text-muted">
              {specialInstructions.length}/300
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;