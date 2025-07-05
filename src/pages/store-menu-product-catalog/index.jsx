import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import CartSummaryBar from '../../components/ui/CartSummaryBar';
import StoreHeader from './components/StoreHeader';
import CategoryNavigation from './components/CategoryNavigation';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import SearchBar from './components/SearchBar';
import ProductSkeleton from './components/ProductSkeleton';
import EmptyState from './components/EmptyState';

const StoreMenuProductCatalog = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('appetizers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [favorites, setFavorites] = useState(['1', '3', '7']);
  const [isStoreFavorite, setIsStoreFavorite] = useState(false);
  const [cart, setCart] = useState([]);

  // Mock store data
  const storeData = {
    id: 'store-1',
    name: 'Mediterranean Delights',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 1247,
    deliveryTime: '25-35 min',
    distance: '2.1 km',
    minOrder: 30,
    deliveryFee: 5,
    isOpen: true,
    openingTime: '10:00 AM',
    closingTime: '11:00 PM',
    cuisine: 'Mediterranean, Middle Eastern',
    promotion: 'Free delivery on orders over 50 SAR'
  };

  // Mock categories
  const categories = [
    { id: 'appetizers', name: 'Appetizers', count: 8 },
    { id: 'mains', name: 'Main Dishes', count: 15 },
    { id: 'grills', name: 'Grills', count: 12 },
    { id: 'desserts', name: 'Desserts', count: 6 },
    { id: 'beverages', name: 'Beverages', count: 10 },
    { id: 'salads', name: 'Salads', count: 7 }
  ];

  // Mock products data
  const allProducts = [
    {
      id: '1',
      name: 'Hummus with Pita',
      description: 'Creamy chickpea dip served with warm pita bread and olive oil drizzle',
      image: 'https://images.unsplash.com/photo-1571197119282-7c4e2b2d3a8e?w=400&h=300&fit=crop',
      price: 18,
      originalPrice: 22,
      rating: 4.7,
      reviewCount: 89,
      prepTime: '10 min',
      category: 'appetizers',
      available: true,
      isNew: false,
      isPopular: true,
      discount: 18,
      customizable: true,
      nutrition: { calories: 320, protein: 12, carbs: 35, fat: 15 },
      sizes: [
        { id: 'small', name: 'Small', priceAdd: 0 },
        { id: 'large', name: 'Large', priceAdd: 8 }
      ],
      extras: [
        { id: 'extra-pita', name: 'Extra Pita', price: 3, description: 'Additional warm pita bread' },
        { id: 'olives', name: 'Mixed Olives', price: 5, description: 'Assorted Mediterranean olives' }
      ]
    },
    {
      id: '2',
      name: 'Falafel Plate',
      description: 'Crispy chickpea fritters served with tahini sauce and fresh vegetables',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
      price: 25,
      rating: 4.6,
      reviewCount: 156,
      prepTime: '15 min',
      category: 'appetizers',
      available: true,
      isNew: true,
      isPopular: false,
      customizable: true,
      nutrition: { calories: 280, protein: 14, carbs: 28, fat: 12 },
      extras: [
        { id: 'tahini', name: 'Extra Tahini', price: 2, description: 'Additional tahini sauce' },
        { id: 'pickles', name: 'Pickled Vegetables', price: 4, description: 'Traditional pickled turnips and cucumbers' }
      ]
    },
    {
      id: '3',
      name: 'Chicken Shawarma',
      description: 'Tender marinated chicken wrapped in fresh pita with garlic sauce and vegetables',
      image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop',
      price: 32,
      rating: 4.9,
      reviewCount: 234,
      prepTime: '12 min',
      category: 'mains',
      available: true,
      isNew: false,
      isPopular: true,
      customizable: true,
      nutrition: { calories: 450, protein: 35, carbs: 40, fat: 18 },
      sizes: [
        { id: 'regular', name: 'Regular', priceAdd: 0 },
        { id: 'large', name: 'Large', priceAdd: 10 }
      ],
      extras: [
        { id: 'extra-chicken', name: 'Extra Chicken', price: 8, description: 'Double the chicken portion' },
        { id: 'cheese', name: 'Cheese', price: 3, description: 'Melted cheese' },
        { id: 'spicy-sauce', name: 'Spicy Sauce', price: 1, description: 'Hot chili sauce' }
      ]
    },
    {
      id: '4',
      name: 'Lamb Kebab',
      description: 'Grilled lamb skewers seasoned with Middle Eastern spices, served with rice',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
      price: 45,
      rating: 4.8,
      reviewCount: 178,
      prepTime: '20 min',
      category: 'grills',
      available: true,
      isNew: false,
      isPopular: true,
      customizable: false,
      nutrition: { calories: 520, protein: 42, carbs: 25, fat: 28 }
    },
    {
      id: '5',
      name: 'Vegetarian Platter',
      description: 'A variety of Mediterranean vegetarian dishes including stuffed grape leaves and tabbouleh',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      price: 38,
      rating: 4.5,
      reviewCount: 92,
      prepTime: '15 min',
      category: 'mains',
      available: true,
      isNew: true,
      isPopular: false,
      customizable: true,
      nutrition: { calories: 380, protein: 16, carbs: 45, fat: 14 },
      extras: [
        { id: 'extra-tabbouleh', name: 'Extra Tabbouleh', price: 6, description: 'Additional fresh parsley salad' }
      ]
    },
    {
      id: '6',
      name: 'Baklava',
      description: 'Traditional honey-sweetened pastry with nuts and phyllo dough',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
      price: 15,
      rating: 4.7,
      reviewCount: 145,
      prepTime: '5 min',
      category: 'desserts',
      available: true,
      isNew: false,
      isPopular: true,
      customizable: false,
      nutrition: { calories: 240, protein: 6, carbs: 32, fat: 12 }
    },
    {
      id: '7',
      name: 'Fresh Mint Lemonade',
      description: 'Refreshing blend of fresh mint, lemon juice, and sparkling water',
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop',
      price: 12,
      rating: 4.4,
      reviewCount: 67,
      prepTime: '3 min',
      category: 'beverages',
      available: true,
      isNew: false,
      isPopular: false,
      customizable: true,
      nutrition: { calories: 45, protein: 0, carbs: 12, fat: 0 },
      sizes: [
        { id: 'regular', name: 'Regular', priceAdd: 0 },
        { id: 'large', name: 'Large', priceAdd: 4 }
      ],
      extras: [
        { id: 'extra-mint', name: 'Extra Mint', price: 1, description: 'Additional fresh mint leaves' }
      ]
    },
    {
      id: '8',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon grilled to perfection with Mediterranean herbs',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      price: 55,
      rating: 4.9,
      reviewCount: 203,
      prepTime: '25 min',
      category: 'grills',
      available: false,
      isNew: false,
      isPopular: true,
      customizable: false,
      nutrition: { calories: 420, protein: 38, carbs: 8, fat: 26 }
    }
  ];

  // Filter products based on category and search
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeCategory, searchTerm]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setSearchTerm('');
  };

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = (product, quantity = 1) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.totalPrice || product.price,
      quantity: quantity,
      image: product.image,
      selectedSize: product.selectedSize,
      selectedExtras: product.selectedExtras,
      specialInstructions: product.specialInstructions
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === cartItem.id && 
        item.selectedSize === cartItem.selectedSize &&
        JSON.stringify(item.selectedExtras) === JSON.stringify(cartItem.selectedExtras)
      );

      if (existingItem) {
        return prevCart.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, cartItem];
      }
    });
  };

  const handleToggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleToggleStoreFavorite = () => {
    setIsStoreFavorite(!isStoreFavorite);
  };

  const handleCallStore = () => {
    window.open('tel:+966123456789', '_self');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BottomNavigation />
      
      <main className="pt-16 md:pt-30 pb-20 md:pb-4">
        {/* Store Header */}
        <StoreHeader
          store={storeData}
          onCallStore={handleCallStore}
          onToggleFavorite={handleToggleStoreFavorite}
          isFavorite={isStoreFavorite}
        />

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search menu items..."
        />

        {/* Category Navigation */}
        <CategoryNavigation
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Products Grid */}
        <div className="container-safe py-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onProductClick={handleProductClick}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.includes(product.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title={searchTerm ? "No items found" : "No items in this category"}
              description={searchTerm 
                ? `No menu items match "${searchTerm}". Try a different search term.`
                : "This category doesn't have any items yet. Check back later!"
              }
              iconName={searchTerm ? "Search" : "Package"}
              actionText="Clear Search"
              onAction={searchTerm ? () => setSearchTerm('') : undefined}
            />
          )}
        </div>
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Summary Bar */}
      <CartSummaryBar />
    </div>
  );
};

export default StoreMenuProductCatalog;