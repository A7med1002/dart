import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        
        {/* Rating and Time */}
        <div className="flex items-center space-x-4">
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-8 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;