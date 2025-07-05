import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import CartSummaryBar from '../../components/ui/CartSummaryBar';
import AuthModal from '../../components/ui/AuthModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import all components
import ProgressIndicator from './components/ProgressIndicator';
import LocationSelector from './components/LocationSelector';
import ServiceTypeSelector from './components/ServiceTypeSelector';
import ItemDescription from './components/ItemDescription';
import DeliveryOptions from './components/DeliveryOptions';
import ContactInformation from './components/ContactInformation';
import PriceEstimation from './components/PriceEstimation';
import ConfirmationModal from './components/ConfirmationModal';

const CustomDeliveryRequest = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPriceLoading, setIsPriceLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    pickupLocation: {
      address: '',
      coordinates: null
    },
    deliveryLocation: {
      address: '',
      coordinates: null
    },
    serviceType: 'document',
    customDescription: '',
    description: '',
    photos: [],
    urgency: 'standard',
    scheduledTime: '',
    specialInstructions: '',
    senderInfo: {
      name: 'Ahmed Hassan',
      phone: '+966 50 123 4567'
    },
    recipientInfo: {
      name: '',
      phone: '',
      notes: ''
    },
    isDifferentRecipient: false,
    distance: 0,
    priceBreakdown: null
  });

  // Calculate price when relevant data changes
  useEffect(() => {
    if (formData.pickupLocation.address && formData.deliveryLocation.address) {
      calculatePrice();
    }
  }, [
    formData.pickupLocation,
    formData.deliveryLocation,
    formData.serviceType,
    formData.urgency
  ]);

  const calculatePrice = () => {
    setIsPriceLoading(true);
    
    // Simulate API call for price calculation
    setTimeout(() => {
      const mockDistance = Math.random() * 15 + 2; // 2-17 km
      const basePrice = getBasePrice(formData.serviceType);
      const distanceFee = Math.ceil(mockDistance * 2);
      const urgencyFee = formData.urgency === 'express' ? 15 : formData.urgency === 'scheduled' ? 5 : 0;
      const serviceFee = formData.serviceType === 'custom' ? 10 : 0;
      const subtotal = basePrice + distanceFee + urgencyFee + serviceFee;
      const vat = Math.ceil(subtotal * 0.15);
      const total = subtotal + vat;

      setFormData(prev => ({
        ...prev,
        distance: mockDistance,
        priceBreakdown: {
          basePrice,
          distanceFee,
          urgencyFee,
          serviceFee,
          vat,
          total
        }
      }));
      setIsPriceLoading(false);
    }, 1500);
  };

  const getBasePrice = (serviceType) => {
    const prices = {
      document: 15,
      grocery: 25,
      pharmacy: 20,
      custom: 30
    };
    return prices[serviceType] || 30;
  };

  const handleLocationChange = (type, location) => {
    setFormData(prev => ({
      ...prev,
      [type]: location
    }));
  };

  const handleUseCurrentLocation = (type) => {
    // Simulate GPS location detection
    const mockLocation = {
      address: type === 'pickupLocation' ?'King Fahd Road, Al Olaya, Riyadh 12333, Saudi Arabia' :'Prince Mohammed Bin Abdulaziz Road, Al Sahafa, Riyadh 13315, Saudi Arabia',
      coordinates: {
        lat: type === 'pickupLocation' ? 24.7136 : 24.7500,
        lng: type === 'pickupLocation' ? 46.6753 : 46.6900
      }
    };
    
    setFormData(prev => ({
      ...prev,
      [type]: mockLocation
    }));
  };

  const handleServiceTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      serviceType: type
    }));
  };

  const handleCustomDescriptionChange = (description) => {
    setFormData(prev => ({
      ...prev,
      customDescription: description
    }));
  };

  const handleDescriptionChange = (description) => {
    setFormData(prev => ({
      ...prev,
      description: description
    }));
  };

  const handlePhotosChange = (photos) => {
    setFormData(prev => ({
      ...prev,
      photos: photos
    }));
  };

  const handleUrgencyChange = (urgency) => {
    setFormData(prev => ({
      ...prev,
      urgency: urgency
    }));
  };

  const handleScheduledTimeChange = (time) => {
    setFormData(prev => ({
      ...prev,
      scheduledTime: time
    }));
  };

  const handleSpecialInstructionsChange = (instructions) => {
    setFormData(prev => ({
      ...prev,
      specialInstructions: instructions
    }));
  };

  const handleSenderInfoChange = (info) => {
    setFormData(prev => ({
      ...prev,
      senderInfo: info
    }));
  };

  const handleRecipientInfoChange = (info) => {
    setFormData(prev => ({
      ...prev,
      recipientInfo: info
    }));
  };

  const handleDifferentRecipientChange = (isDifferent) => {
    setFormData(prev => ({
      ...prev,
      isDifferentRecipient: isDifferent
    }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.pickupLocation.address && formData.deliveryLocation.address;
      case 2:
        return formData.serviceType && (formData.serviceType !== 'custom' || formData.customDescription);
      case 3:
        return formData.description && formData.senderInfo.name && formData.senderInfo.phone;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmRequest = () => {
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(false);
      
      // Navigate to success page or dashboard
      navigate('/dashboard-home', { 
        state: { 
          message: 'Custom delivery request submitted successfully!',
          requestId: 'CDR-' + Date.now()
        }
      });
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <LocationSelector
              type="pickup"
              location={formData.pickupLocation}
              onLocationChange={(location) => handleLocationChange('pickupLocation', location)}
              onUseCurrentLocation={() => handleUseCurrentLocation('pickupLocation')}
            />
            <LocationSelector
              type="delivery"
              location={formData.deliveryLocation}
              onLocationChange={(location) => handleLocationChange('deliveryLocation', location)}
              onUseCurrentLocation={() => handleUseCurrentLocation('deliveryLocation')}
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <ServiceTypeSelector
              selectedType={formData.serviceType}
              onTypeChange={handleServiceTypeChange}
              customDescription={formData.customDescription}
              onCustomDescriptionChange={handleCustomDescriptionChange}
            />
            <ItemDescription
              description={formData.description}
              onDescriptionChange={handleDescriptionChange}
              photos={formData.photos}
              onPhotosChange={handlePhotosChange}
            />
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <DeliveryOptions
              urgency={formData.urgency}
              onUrgencyChange={handleUrgencyChange}
              scheduledTime={formData.scheduledTime}
              onScheduledTimeChange={handleScheduledTimeChange}
              specialInstructions={formData.specialInstructions}
              onSpecialInstructionsChange={handleSpecialInstructionsChange}
            />
            <ContactInformation
              senderInfo={formData.senderInfo}
              onSenderInfoChange={handleSenderInfoChange}
              recipientInfo={formData.recipientInfo}
              onRecipientInfoChange={handleRecipientInfoChange}
              isDifferentRecipient={formData.isDifferentRecipient}
              onDifferentRecipientChange={handleDifferentRecipientChange}
            />
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <PriceEstimation
              distance={formData.distance}
              serviceType={formData.serviceType}
              urgency={formData.urgency}
              isLoading={isPriceLoading}
              breakdown={formData.priceBreakdown}
            />
            
            {/* Final Review */}
            <div className="bg-surface rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <h3 className="font-heading font-semibold text-text-primary">
                  Ready to Submit
                </h3>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                Your custom delivery request is ready. Click submit to send it to our delivery agents.
              </p>
              <div className="bg-info/10 border border-info/20 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-info mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      What happens next?
                    </p>
                    <ul className="text-xs text-text-secondary mt-1 space-y-1">
                      <li>• We'll find the best delivery agent for your request</li>
                      <li>• You'll receive confirmation within 5 minutes</li>
                      <li>• Track your delivery in real-time</li>
                      <li>• Pay securely when the service is completed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BottomNavigation />
      <CartSummaryBar />
      <AuthModal />

      {/* Progress Indicator */}
      <div className="fixed top-16 md:top-30 left-0 right-0 z-10">
        <ProgressIndicator currentStep={currentStep} totalSteps={4} />
      </div>

      {/* Main Content */}
      <main className="pt-32 md:pt-44 pb-20 md:pb-8">
        <div className="container-safe max-w-4xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-8">
            {/* Form Content */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  Custom Delivery Request
                </h1>
                <p className="text-text-secondary">
                  Tell us what you need delivered and we'll take care of the rest
                </p>
              </div>
              
              {renderStepContent()}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <PriceEstimation
                distance={formData.distance}
                serviceType={formData.serviceType}
                urgency={formData.urgency}
                isLoading={isPriceLoading}
                breakdown={formData.priceBreakdown}
              />
              
              {/* Navigation Buttons */}
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex space-x-3">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      iconName="ArrowLeft"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Previous
                    </Button>
                  )}
                  {currentStep < 4 ? (
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      disabled={!validateCurrentStep()}
                      iconName="ArrowRight"
                      iconPosition="right"
                      className="flex-1"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={!validateCurrentStep() || isPriceLoading}
                      iconName="Send"
                      iconPosition="right"
                      className="flex-1"
                    >
                      Submit Request
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-6">
            <div className="px-4">
              <h1 className="text-xl font-heading font-bold text-text-primary mb-2">
                Custom Delivery Request
              </h1>
              <p className="text-text-secondary text-sm">
                Step {currentStep} of 4
              </p>
            </div>

            <div className="px-4">
              {renderStepContent()}
            </div>

            {/* Mobile Navigation */}
            <div className="fixed bottom-20 left-0 right-0 p-4 bg-surface border-t border-border">
              <div className="flex space-x-3">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    iconName="ArrowLeft"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Previous
                  </Button>
                )}
                {currentStep < 4 ? (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={!validateCurrentStep()}
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="flex-1"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!validateCurrentStep() || isPriceLoading}
                    iconName="Send"
                    iconPosition="right"
                    className="flex-1"
                  >
                    Submit Request
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmRequest}
        requestData={formData}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default CustomDeliveryRequest;