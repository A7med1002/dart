import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Open modal when on login-registration page
    if (location.pathname === '/login-registration') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    if (location.pathname === '/login-registration') {
      navigate('/dashboard-home');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      handleClose();
      navigate('/dashboard-home');
    }, 1500);
  };

  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    // Simulate social auth
    setTimeout(() => {
      setIsLoading(false);
      handleClose();
      navigate('/dashboard-home');
    }, 1000);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-elevation-3 animate-scale-in">
        {/* Header */}
        <div className="p-6 text-center border-b border-border">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
          
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
                fill="currentColor"
              />
              <path
                d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
                fill="currentColor"
              />
              <path
                d="M5 15L5.5 17.5L8 18L5.5 18.5L5 21L4.5 18.5L2 18L4.5 17.5L5 15Z"
                fill="currentColor"
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
            {authMode === 'login' ? 'Welcome Back!' : 'Join Dart Delivery'}
          </h2>
          <p className="text-text-secondary">
            {authMode === 'login' ?'Sign in to your account to continue' :'Create your account to get started'
            }
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'register' && (
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            )}
            
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full"
            />
            
            {authMode === 'register' && (
              <Input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            )}
            
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full"
            />
            
            {authMode === 'register' && (
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            )}

            {authMode === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              className="mt-6"
            >
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-sm text-text-secondary">or</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* Social Auth */}
          <div className="space-y-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialAuth('google')}
              disabled={isLoading}
              iconName="Chrome"
              iconPosition="left"
            >
              Continue with Google
            </Button>
            
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialAuth('apple')}
              disabled={isLoading}
              iconName="Apple"
              iconPosition="left"
            >
              Continue with Apple
            </Button>
          </div>

          {/* Switch Auth Mode */}
          <div className="text-center mt-6 pt-4 border-t border-border">
            <p className="text-text-secondary">
              {authMode === 'login' ? "Don't have an account? " :"Already have an account? "
              }
              <button
                type="button"
                onClick={switchAuthMode}
                className="text-primary hover:text-primary-700 font-medium transition-colors duration-200"
              >
                {authMode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;