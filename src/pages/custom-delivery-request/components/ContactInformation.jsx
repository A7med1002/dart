import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const ContactInformation = ({ 
  senderInfo, 
  onSenderInfoChange, 
  recipientInfo, 
  onRecipientInfoChange,
  isDifferentRecipient,
  onDifferentRecipientChange 
}) => {
  const handleSenderChange = (field, value) => {
    onSenderInfoChange({
      ...senderInfo,
      [field]: value
    });
  };

  const handleRecipientChange = (field, value) => {
    onRecipientInfoChange({
      ...recipientInfo,
      [field]: value
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="User" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-text-primary">
          Contact Information
        </h3>
      </div>

      <div className="space-y-4">
        {/* Sender Information */}
        <div>
          <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="UserCheck" size={16} />
            <span>Sender Details</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              type="text"
              placeholder="Full Name"
              value={senderInfo.name}
              onChange={(e) => handleSenderChange('name', e.target.value)}
              required
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={senderInfo.phone}
              onChange={(e) => handleSenderChange('phone', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Different Recipient Toggle */}
        <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
          <input
            type="checkbox"
            id="different-recipient"
            checked={isDifferentRecipient}
            onChange={(e) => onDifferentRecipientChange(e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
          />
          <label htmlFor="different-recipient" className="text-sm text-text-primary cursor-pointer">
            Delivery is for someone else
          </label>
        </div>

        {/* Recipient Information */}
        {isDifferentRecipient && (
          <div>
            <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>Recipient Details</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                type="text"
                placeholder="Recipient Name"
                value={recipientInfo.name}
                onChange={(e) => handleRecipientChange('name', e.target.value)}
                required
              />
              <Input
                type="tel"
                placeholder="Recipient Phone"
                value={recipientInfo.phone}
                onChange={(e) => handleRecipientChange('phone', e.target.value)}
                required
              />
            </div>
            <div className="mt-3">
              <textarea
                value={recipientInfo.notes}
                onChange={(e) => handleRecipientChange('notes', e.target.value)}
                placeholder="Additional notes about the recipient (optional)"
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={2}
                maxLength={200}
              />
              <p className="text-xs text-text-muted mt-1">
                {recipientInfo.notes?.length || 0}/200
              </p>
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">
                Emergency Contact
              </p>
              <p className="text-xs text-text-secondary mt-1">
                We may contact you if there are any issues with the delivery. Please ensure your phone is reachable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;