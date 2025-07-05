import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^(\+966|0)?[5][0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'يجب الموافقة على الشروط والأحكام';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="fullName"
          placeholder="الاسم الكامل"
          value={formData.fullName}
          onChange={handleInputChange}
          className={`w-full text-right ${errors.fullName ? 'border-red-300' : ''}`}
          dir="rtl"
        />
        {errors.fullName && (
          <p className="text-sm text-red-600 mt-1 text-right">{errors.fullName}</p>
        )}
      </div>

      <div>
        <Input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full text-right ${errors.email ? 'border-red-300' : ''}`}
          dir="rtl"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1 text-right">{errors.email}</p>
        )}
      </div>

      <div>
        <Input
          type="tel"
          name="phone"
          placeholder="رقم الهاتف (+966xxxxxxxxx)"
          value={formData.phone}
          onChange={handleInputChange}
          className={`w-full text-right ${errors.phone ? 'border-red-300' : ''}`}
          dir="rtl"
        />
        {errors.phone && (
          <p className="text-sm text-red-600 mt-1 text-right">{errors.phone}</p>
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

      <div className="relative">
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="تأكيد كلمة المرور"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={`w-full text-right pr-10 ${errors.confirmPassword ? 'border-red-300' : ''}`}
          dir="rtl"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1 text-right">{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label className="flex items-start space-x-3 rtl:space-x-reverse cursor-pointer">
          <Input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="w-4 h-4 mt-1 flex-shrink-0"
          />
          <span className="text-sm text-text-secondary text-right">
            أوافق على{' '}
            <button
              type="button"
              className="text-primary hover:text-primary-700 underline"
            >
              الشروط والأحكام
            </button>
            {' '}و{' '}
            <button
              type="button"
              className="text-primary hover:text-primary-700 underline"
            >
              سياسة الخصوصية
            </button>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-600 mt-1 text-right">{errors.agreeToTerms}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        className="mt-6"
      >
        إنشاء حساب
      </Button>
    </form>
  );
};

export default RegisterForm;