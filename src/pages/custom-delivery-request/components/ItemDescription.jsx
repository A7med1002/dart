import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ItemDescription = ({ description, onDescriptionChange, photos, onPhotosChange }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDescriptionChange = (e) => {
    onDescriptionChange(e.target.value);
  };

  const handleFileUpload = (files) => {
    const newPhotos = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    onPhotosChange([...photos, ...newPhotos]);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
    onPhotosChange(updatedPhotos);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="FileText" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-text-primary">
          Item Description
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Describe what needs to be delivered
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder={`Examples:\n• "Pick up prescription from Al-Nahdi Pharmacy on King Fahd Road"\n• "Buy 2kg apples, 1L milk, and bread from Carrefour"\n• "Collect signed contract from office building, 3rd floor"`}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={4}
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-text-secondary">
              Be as detailed as possible for accurate service
            </span>
            <span className="text-xs text-text-muted">
              {description.length}/1000
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Add Photos (Optional)
          </label>
          
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
              dragActive
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Icon name="Upload" size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-secondary mb-2">
              Drag and drop photos here, or click to select
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="photo-upload"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('photo-upload').click()}
              iconName="Camera"
              iconPosition="left"
            >
              Choose Photos
            </Button>
          </div>

          {/* Photo Previews */}
          {photos.length > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Icon name="X" size={12} />
                    </button>
                    <p className="text-xs text-text-secondary mt-1 truncate">
                      {photo.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDescription;