import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Mock credentials for testing
  const mockCredentials = {
    email: 'ahmed@example.com',
    phone: '+966501234567',
    password: 'password123'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'البريد الإلكتروني أو رقم الهاتف مطلوب';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'كلمة المرور مطلوبة';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Check mock credentials
    const isValidEmail = formData.emailOrPhone === mockCredentials.email && formData.password === mockCredentials.password;
    const isValidPhone = formData.emailOrPhone === mockCredentials.phone && formData.password === mockCredentials.password;
    
    if (isValidEmail || isValidPhone) {
      onSubmit(formData);
    } else {
      setErrors({
        general: `بيانات الدخول غير صحيحة. استخدم:\nالبريد الإلكتروني: ${mockCredentials.email}\nأو الهاتف: ${mockCredentials.phone}\nكلمة المرور: ${mockCredentials.password}`
      });
    }
  };

  const handleForgotPassword = () => {
    // In real app, this would open a modal or navigate to forgot password page
    alert('سيتم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <Icon name="AlertCircle" size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700 whitespace-pre-line">{errors.general}</p>
          </div>
        </div>
      )}

      <div>
        <Input
          type="text"
          name="emailOrPhone"
          placeholder="البريد الإلكتروني أو رقم الهاتف"
          value={formData.emailOrPhone}
          onChange={handleInputChange}
          className={`w-full text-right ${errors.emailOrPhone ? 'border-red-300' : ''}`}
          dir="rtl"
        />
        {errors.emailOrPhone && (
          <p className="text-sm text-red-600 mt-1 text-right">{errors.emailOrPhone}</p>
        )}
      </div>

      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={handleInputChange}
          className={`w-full text-right pr-10 ${errors.password ? 'border-red-300' : ''}`}
          dir="rtl"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
        {errors.password && (
          <p className="text-sm text-red-600 mt-1 text-right">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
        >
          نسيت كلمة المرور؟
        </button>
        
        <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
          <Input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <span className="text-sm text-text-secondary">تذكرني</span>
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        className="mt-6"
      >
        تسجيل الدخول
      </Button>
    </form>
  );
};

export default LoginForm;