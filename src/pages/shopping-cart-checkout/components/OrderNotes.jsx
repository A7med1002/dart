import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const OrderNotes = ({ notes, onNotesChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localNotes, setLocalNotes] = useState(notes || '');

  const handleNotesChange = (e) => {
    const value = e.target.value;
    setLocalNotes(value);
    onNotesChange(value);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const suggestionNotes = [
    "Please ring the doorbell",
    "Leave at the door",
    "Call when you arrive",
    "Use the back entrance",
    "Contactless delivery preferred"
  ];

  const handleSuggestionClick = (suggestion) => {
    const newNotes = localNotes ? `${localNotes}. ${suggestion}` : suggestion;
    setLocalNotes(newNotes);
    onNotesChange(newNotes);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="font-heading font-semibold text-text-primary flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2" />
          Delivery Instructions
          {localNotes && (
            <span className="ml-2 w-2 h-2 bg-primary rounded-full"></span>
          )}
        </h3>
        <Icon
          name="ChevronDown"
          size={20}
          className={`text-text-secondary transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4 animate-fade-in">
          {/* Notes Input */}
          <div>
            <textarea
              value={localNotes}
              onChange={handleNotesChange}
              placeholder="Add special instructions for your delivery (e.g., ring doorbell, leave at door, etc.)"
              className="w-full px-3 py-3 border border-border rounded-lg bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
              maxLength={200}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-text-muted text-xs">
                Help your delivery person find you easily
              </p>
              <span className="text-text-muted text-xs">
                {localNotes.length}/200
              </span>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">Quick Suggestions</h4>
            <div className="flex flex-wrap gap-2">
              {suggestionNotes.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-2 bg-background border border-border rounded-full text-sm text-text-secondary hover:text-text-primary hover:border-primary transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Common Instructions */}
          <div className="bg-background rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-info mt-0.5" />
              <div>
                <p className="text-text-primary text-sm font-medium">Delivery Tips</p>
                <ul className="text-text-secondary text-xs mt-1 space-y-1">
                  <li>• Be specific about your location</li>
                  <li>• Mention landmarks if helpful</li>
                  <li>• Include your preferred contact method</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderNotes;