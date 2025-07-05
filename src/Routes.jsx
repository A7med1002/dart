import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginRegistration from "pages/login-registration";
import StoreBrowseCategories from "pages/store-browse-categories";
import StoreMenuProductCatalog from "pages/store-menu-product-catalog";
import ShoppingCartCheckout from "pages/shopping-cart-checkout";
import DashboardHome from "pages/dashboard-home";
import CustomDeliveryRequest from "pages/custom-delivery-request";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<DashboardHome />} />
        <Route path="/login-registration" element={<LoginRegistration />} />
        <Route path="/store-browse-categories" element={<StoreBrowseCategories />} />
        <Route path="/store-menu-product-catalog" element={<StoreMenuProductCatalog />} />
        <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="/custom-delivery-request" element={<CustomDeliveryRequest />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;