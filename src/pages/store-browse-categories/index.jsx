import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import CartSummaryBar from '../../components/ui/CartSummaryBar';
import CategoryFilter from './components/CategoryFilter';

import FilterPanel from './components/FilterPanel';
import QuickFilters from './components/QuickFilters';
import SortDropdown from './components/SortDropdown';
import StoreGrid from './components/StoreGrid';
import MapView from './components/MapView';

const StoreBrowseCategories = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    cuisine: [],
    deliveryTime: null,
    minOrder: 0,
    rating: null,
    distance: 10
  });

  const [quickFilters, setQuickFilters] = useState({
    openNow: false,
    freeDelivery: false,
    highlyRated: false
  });

  // Mock data
  const categories = [
    { id: 'fastfood', name: 'Fast Food', icon: 'Zap' },
    { id: 'arabic', name: 'Arabic', icon: 'Coffee' },
    { id: 'asian', name: 'Asian', icon: 'Utensils' },
    { id: 'desserts', name: 'Desserts', icon: 'Cookie' },
    { id: 'healthy', name: 'Healthy', icon: 'Leaf' },
    { id: 'pizza', name: 'Pizza', icon: 'Pizza' }
  ];

  const mockStores = [
    {
      id: 1,
      name: "Al Baik Restaurant",
      cuisine: "Fast Food, Chicken",
      rating: 4.8,
      reviews: 2543,
      deliveryTime: "25-35 min",
      deliveryFee: 0,
      minOrder: 25,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      isOpen: true,
      isFavorite: false,
      category: 'fastfood'
    },
    {
      id: 2,
      name: "Mama Noura Restaurant",
      cuisine: "Arabic, Traditional",
      rating: 4.6,
      reviews: 1876,
      deliveryTime: "30-45 min",
      deliveryFee: 5,
      minOrder: 40,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      isOpen: true,
      isFavorite: true,
      category: 'arabic'
    },
    {
      id: 3,
      name: "Panda Express",
      cuisine: "Asian, Chinese",
      rating: 4.4,
      reviews: 987,
      deliveryTime: "20-30 min",
      deliveryFee: 8,
      minOrder: 30,
      image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop",
      isOpen: true,
      isFavorite: false,
      category: 'asian'
    },
    {
      id: 4,
      name: "Cinnabon",
      cuisine: "Desserts, Bakery",
      rating: 4.7,
      reviews: 1234,
      deliveryTime: "15-25 min",
      deliveryFee: 0,
      minOrder: 20,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      isOpen: true,
      isFavorite: false,
      category: 'desserts'
    },
    {
      id: 5,
      name: "Subway",
      cuisine: "Healthy, Sandwiches",
      rating: 4.3,
      reviews: 756,
      deliveryTime: "20-30 min",
      deliveryFee: 6,
      minOrder: 25,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop",
      isOpen: false,
      isFavorite: true,
      category: 'healthy'
    },
    {
      id: 6,
      name: "Pizza Hut",
      cuisine: "Pizza, Italian",
      rating: 4.5,
      reviews: 2109,
      deliveryTime: "35-50 min",
      deliveryFee: 0,
      minOrder: 50,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      isOpen: true,
      isFavorite: false,
      category: 'pizza'
    },
    {
      id: 7,
      name: "Kudu Restaurant",
      cuisine: "Fast Food, Burgers",
      rating: 4.2,
      reviews: 1543,
      deliveryTime: "25-40 min",
      deliveryFee: 7,
      minOrder: 35,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      isOpen: true,
      isFavorite: false,
      category: 'fastfood'
    },
    {
      id: 8,
      name: "Shawarma Plus",
      cuisine: "Arabic, Shawarma",
      rating: 4.6,
      reviews: 892,
      deliveryTime: "20-35 min",
      deliveryFee: 5,
      minOrder: 20,
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop",
      isOpen: true,
      isFavorite: true,
      category: 'arabic'
    }
  ];

  const [stores, setStores] = useState(mockStores);
  const [filteredStores, setFilteredStores] = useState(mockStores);

  // Handle search from URL params or global search
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  // Filter and sort stores
  useEffect(() => {
    let filtered = [...stores];

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(store => store.category === activeCategory);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(store =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply quick filters
    if (quickFilters.openNow) {
      filtered = filtered.filter(store => store.isOpen);
    }
    if (quickFilters.freeDelivery) {
      filtered = filtered.filter(store => store.deliveryFee === 0);
    }
    if (quickFilters.highlyRated) {
      filtered = filtered.filter(store => store.rating >= 4.5);
    }

    // Apply advanced filters
    if (filters.cuisine.length > 0) {
      filtered = filtered.filter(store =>
        filters.cuisine.some(cuisine =>
          store.cuisine.toLowerCase().includes(cuisine.toLowerCase())
        )
      );
    }
    if (filters.rating) {
      filtered = filtered.filter(store => store.rating >= filters.rating);
    }
    if (filters.minOrder > 0) {
      filtered = filtered.filter(store => store.minOrder <= filters.minOrder);
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'deliveryTime':
        filtered.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime.split('-')[0]);
          const bTime = parseInt(b.deliveryTime.split('-')[0]);
          return aTime - bTime;
        });
        break;
      case 'deliveryFee':
        filtered.sort((a, b) => a.deliveryFee - b.deliveryFee);
        break;
      case 'distance':
        // Mock distance sorting
        filtered.sort(() => Math.random() - 0.5);
        break;
      default:
        // Relevance - keep original order
        break;
    }

    setFilteredStores(filtered);
  }, [stores, activeCategory, searchQuery, quickFilters, filters, sortBy]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'cuisine') {
        const newCuisine = prev.cuisine.includes(value)
          ? prev.cuisine.filter(c => c !== value)
          : [...prev.cuisine, value];
        return { ...prev, cuisine: newCuisine };
      }
      return { ...prev, [filterType]: value };
    });
  };

  const handleQuickFilterToggle = (filterId) => {
    setQuickFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      cuisine: [],
      deliveryTime: null,
      minOrder: 0,
      rating: null,
      distance: 10
    });
    setQuickFilters({
      openNow: false,
      freeDelivery: false,
      highlyRated: false
    });
  };

  const handleFavoriteToggle = (storeId, isFavorite) => {
    setStores(prev =>
      prev.map(store =>
        store.id === storeId ? { ...store, isFavorite } : store
      )
    );
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 md:pt-30 pb-20 md:pb-8">
        <div className="container-safe">
          {/* Page Header */}
          <div className="py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">
                  Browse Restaurants
                </h1>
                <p className="text-text-secondary mt-1">
                  Discover amazing food near you
                </p>
              </div>
              <button
                onClick={() => setIsMapVisible(true)}
                className="md:flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-text-primary hover:bg-gray-200 transition-colors duration-200 hidden"
              >
                <Icon name="Map" size={16} />
                <span>Map View</span>
              </button>
            </div>

            {/* Category Filters */}
            <div className="mb-4">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Quick Filters */}
            <div className="mb-4">
              <QuickFilters
                quickFilters={quickFilters}
                onQuickFilterToggle={handleQuickFilterToggle}
              />
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                iconName="Filter"
                iconPosition="left"
                size="sm"
              >
                Filters
              </Button>
              
              <button
                onClick={() => setIsMapVisible(true)}
                className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-200"
              >
                <Icon name="Map" size={20} />
              </button>
            </div>

            {/* Sort and Results */}
            <SortDropdown
              sortBy={sortBy}
              onSortChange={handleSortChange}
              resultsCount={filteredStores.length}
            />
          </div>

          {/* Store Grid */}
          <StoreGrid
            stores={filteredStores}
            onFavoriteToggle={handleFavoriteToggle}
            isLoading={isLoading}
          />

          {/* Load More Button */}
          {filteredStores.length > 0 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 1000);
                }}
                loading={isLoading}
              >
                Load More Restaurants
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Map View */}
      <MapView
        stores={filteredStores}
        isVisible={isMapVisible}
        onClose={() => setIsMapVisible(false)}
      />

      <BottomNavigation />
      <CartSummaryBar />
    </div>
  );
};

export default StoreBrowseCategories;