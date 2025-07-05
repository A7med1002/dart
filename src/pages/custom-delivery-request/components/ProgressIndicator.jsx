import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, label: 'Pickup', icon: 'MapPin' },
    { id: 2, label: 'Delivery', icon: 'Navigation' },
    { id: 3, label: 'Details', icon: 'FileText' },
    { id: 4, label: 'Confirm', icon: 'CheckCircle' }
  ];

  return (
    <div className="bg-surface border-b border-border p-4">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  step.id <= currentStep
                    ? 'bg-primary text-white' :'bg-gray-200 text-text-muted'
                }`}
              >
                <Icon name={step.icon} size={16} />
              </div>
              <span
                className={`text-xs mt-1 font-medium ${
                  step.id <= currentStep ? 'text-primary' : 'text-text-muted'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-200 ${
                  step.id < currentStep ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;