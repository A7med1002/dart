import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialAuth = ({ onSocialAuth, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      nameAr: 'جوجل',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      nameAr: 'فيسبوك',
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-border"></div>
        <span className="px-4 text-sm text-text-secondary">أو</span>
        <div className="flex-1 border-t border-border"></div>
      </div>

      {socialProviders.map((provider) => (
        <button
          key={provider.id}
          onClick={() => onSocialAuth(provider.id)}
          disabled={isLoading}
          className={`w-full flex items-center justify-center space-x-3 rtl:space-x-reverse py-3 px-4 rounded-lg border transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${provider.bgColor} ${provider.textColor} ${provider.borderColor}`}
        >
          <Icon name={provider.icon} size={20} />
          <span className="font-medium">
            متابعة باستخدام {provider.nameAr}
          </span>
        </button>
      ))}

      <div className="text-center mt-4">
        <p className="text-xs text-text-secondary">
          بالمتابعة، أنت توافق على{' '}
          <button className="text-primary hover:text-primary-700 underline">
            شروط الخدمة
          </button>
          {' '}و{' '}
          <button className="text-primary hover:text-primary-700 underline">
            سياسة الخصوصية
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialAuth;